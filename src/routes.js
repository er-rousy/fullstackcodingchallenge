import Base from './components/Base.js';
import HomePage from './containers/HomePage.js';
import loginPage from './containers/loginPage.js';
import SignUpPage from './containers/SignUpPage.js';
import AlbumsPage from './containers/albumsPage';
import AlbumPage from './containers/albumPage';
import Auth from './modules/Auth';
const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, HomePage);
        } else {
          callback(null, loginPage);
        }
      }
    }
    , {
      path: '/login',
      component: loginPage
    }, {
      path: '/signup',
      component: SignUpPage
    }
    , {
      path: '/albums',
      component: AlbumsPage
    }
    , {
      path: '/album/:albumId', 
      component: AlbumPage
    }
    ,
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        // change the current URL to /
        replace('/');
      }
    }
  ]
};

export default routes;