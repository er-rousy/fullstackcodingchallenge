import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { blue900, grey900, fullWhite } from 'material-ui/styles/colors';
import Mood from 'material-ui/svg-icons/social/mood';
import facebook from '../services/facebook';
import Avatar from 'material-ui/Avatar'
import Collections from 'material-ui/svg-icons/image/collections'
import { Link } from 'react-router'
import CircularProgress from 'material-ui/CircularProgress'
class HomePage extends React.Component {

    constructor(props) {
        super(props)
        // make sure class methods are bound to this object/component
        this.doLogin = this.doLogin.bind(this);
        this.doCheckLogin = this.doCheckLogin.bind(this);

        this.facebook = new facebook();
        // listen to logout authentication event
        this.facebook.on('auth.logout', this.doCheckLogin)
        this.state = {
            isLoading: true
        }
    }

    /**
     * redirect user to Facebook OAuth login page
     */
    async doLogin() {
        try {
            await this.facebook.login('facebook')
            await this.doCheckLogin()
        } catch (exception) {
            console.error(exception)
        }
    }

    componentWillMount() {
        this.doCheckLogin()
    }

    /**
     * check if current user is logged in and get his profile if possible
     */
    async doCheckLogin() {
        try {
            debugger;
            this.setState({
                isLoggedIn: await this.facebook.isLoggedIn(),
                profile: await this.facebook.getProfile()
            })
        } catch (exception) {
            console.error(exception)
        } finally {
            this.setState({
                isLoading: false
            })
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Home Page</span>
                                {this.state.isLoading ?
                                    (
                                        <div style={{ textAlign: 'center' }}><CircularProgress size={60} thickness={5} /></div>
                                    )
                                    :
                                    this.state.isLoggedIn ?
                                        (
                                            <div>
                                                <Avatar src={this.state.profile.thumbnail} size={60} />
                                                <h3 style={{ color: grey900, fontWeight: 100 }}>{this.state.profile.name}</h3>
                                                <Link to="/albums">
                                                    <RaisedButton label="Get started" backgroundColor={grey900} labelColor={fullWhite} icon={<Collections color={fullWhite} />} />
                                                </Link>
                                            </div>
                                        )
                                        :
                                        (
                                            <RaisedButton
                                                label="Sign in"
                                                backgroundColor={blue900}
                                                labelColor={fullWhite}
                                                icon={<Mood color={fullWhite} />}
                                                onTouchTap={this.doLogin}
                                            />
                                        )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;