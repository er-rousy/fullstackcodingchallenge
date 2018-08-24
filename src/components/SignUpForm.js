import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class SignUpForm extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s4 offset-s4">
                        <div className="card card-login">
                            <div className="card-content">
                                <span className="card-title">Sign Up</span>
                                <form action="/" onSubmit={this.props.onSubmit}>


                                    {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

                                    <div className="field-line">
                                        <TextField
                                            floatingLabelText="Name"
                                            name="name"
                                            errorText={this.props.errors.name}
                                            onChange={this.props.onChange}
                                            value={this.props.user.name}
                                        />
                                    </div>

                                    <div className="field-line">
                                        <TextField
                                            floatingLabelText="Email"
                                            name="email"
                                            errorText={this.props.errors.email}
                                            onChange={this.props.onChange}
                                            value={this.props.user.email}
                                        />
                                    </div>

                                    <div className="field-line">
                                        <TextField
                                            floatingLabelText="Password"
                                            type="password"
                                            name="password"
                                            onChange={this.props.onChange}
                                            errorText={this.props.errors.password}
                                            value={this.props.user.password}
                                        />
                                    </div>

                                    <div className="button-line">
                                        <RaisedButton type="submit" label="Create New Account" primary />
                                    </div>

                                    <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;