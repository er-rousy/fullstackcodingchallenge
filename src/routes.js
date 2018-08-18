import Base from './components/Base.js';
import HomePage from './components/HomePage.js';



const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    }

  ]
};

export default routes;