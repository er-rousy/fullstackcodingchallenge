import axios from 'axios'

class Services {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} email
     * @param {string} password
     */
    static authenticateUser(email, password) {
        let AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return axios.post("/auth/login", { password, email }, AxiosRequestConfig)
    }


    /**
     * 
     * get firebase Token.
     * 
     */
    static getTokenFirbase(user_fb_id) {

        let tokenjwt = localStorage.getItem("token");
        let AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + tokenjwt
            }
        };
        return axios.post("/api/get-token", { user_fb_id }, AxiosRequestConfig)

    }

    /**
     * 
     * get file blob from  Url.
     * 
     */
    static getFileBlobFromUrl(url) {
       return axios.get(url, { responseType: 'blob' });
    }


    /**
    * create new a user.
    *
    * @param {string} name
    * @param {string} email
    * @param {string} password
    */
    static CreateUser(name, email, password) {
        debugger;
        let AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return axios.post("/auth/signup", { name, password, email }, AxiosRequestConfig)
    }

    /**
    * Valide Token.
    *
    * @param {string} token
    */
    static ValideToken(token) {
        let AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return axios.post("/auth/validetoken", { token }, AxiosRequestConfig);
    }

}

export default Services;