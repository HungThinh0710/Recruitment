
import GAListener from './admin/components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from './admin/components/Layout';

// page
import RoleDetail from './admin/pages/RoleDetail';
import Roles from './admin/pages/Roles';
import RolesPage from './admin/pages/RolesPage';
import LoginPage from './admin/pages/LoginPage'
import DashboardPage from './admin/pages/DashboardPage';
import ProfilePage from './admin/pages/ProfilePage';
import AccountPage from './admin/pages/AccountPage';
import ChangeProfilePage from './admin/pages/ChangeProfilePage';
import ChangeAccountPage from './admin/pages/ChangeAccountPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch,Route } from 'react-router-dom';
import './admin/styles/reduction.scss';
import Homepage from './candidate/components/Hompage';
import Careers from './candidate//components/Careers';
import About from './candidate//components/About';
import Career1 from './candidate//components/Career1'; 
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hasToken: false,
      path: '/login'
    }
  }
  // componentWillMount(){
  //   if (localStorage.getItem('loginToken')!=null){
  //     return <Redirect to='/home'/>
  //   }
  // }
  render() {

    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute 

              exact
              path={"/admin/role/:id"}
              layout={MainLayout}
              component={RoleDetail}
              
            />
            <LayoutRoute 
              exact
              path={"/admin/role"}
              layout={MainLayout}
              component={Roles}
              
            />
            <LayoutRoute 
              exact
              path={"/admin"}
              layout={EmptyLayout}
              component={LoginPage}
              
            />
            <LayoutRoute
              exact
              path="/admin/dashboard"
              layout={MainLayout}
              component={DashboardPage}
            />
            <LayoutRoute
              exact
              path="/admin/profile"
              layout={MainLayout}
              component={ProfilePage}
            />
            <LayoutRoute
              exact
              path="/admin/account"
              layout={MainLayout}
              component={AccountPage}
            />
            <LayoutRoute
              exact
              path="/admin/changeprofile"
              layout={MainLayout}
              component={ChangeProfilePage}
            />
            <LayoutRoute
              exact
              path="/admin/changeaccount"
              layout={MainLayout}
              component={ChangeAccountPage}
            />
            <LayoutRoute
              exact
              path="/admin/test"
              layout={MainLayout}
              component={RolesPage}
            />
        
            {/* <Redirect to="/" /> */}
            <Route path="/" component={Homepage} exact/>
            <Route path="/home" component={Homepage} exact/>
        <Route path="/careers" component={Careers} exact />
        <Route path="/about" component={About} exact/>
        <Route path="/describe" component={Career1} exact />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};


export default componentQueries(query)(App);
