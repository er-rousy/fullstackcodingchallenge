import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.js';
import Auth from '../modules/Auth';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
debugger;
    // create a string for an HTTP body message
    const name = this.state.user.name;
    const email = this.state.user.email;
    const password = this.state.user.password;

    Auth.CreateUser(name, email, password).then(result => {
      debugger;
      if (result.status === 200 && result.data.success) {

        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // set a message
        localStorage.setItem('successMessage', result.data.message);

        // make a redirect
        this.context.router.replace('/login');
      } else {
        // failure

        const errors =result.data.errors ? result.data.errors : {};
        errors.summary = result.data.message;

        this.setState({
          errors
        });
      }
    });

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;