import services from "./../services/services";

class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} email
     * @param {string} password
     */
    static authenticateUser(email, password) {
        return services.authenticateUser(email, password).then(result => {
            if (result.status === 200 && result.data.success) {
                localStorage.setItem("token", result.data.token)
            }
            return result;
        }).catch(err => {
            return err.response;
        });
    }

    /**
     * create a user.
     * @param {string} name
     * @param {string} email
     * @param {string} password
     */
    static CreateUser(name, email, password) {
        return services.CreateUser(name, email, password).then(result => {
            return result;
        }).catch(err => {
            return err.response;
        });
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken() {
        return localStorage.getItem('token');
    }


}

export default Auth;