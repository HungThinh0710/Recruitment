import GAListener from './admin/components/GAListener';
import {
  EmptyLayout,
  LayoutRoute,
  MainLayout
} from './admin/components/Layout';

// page

/*------Action-----*/
import AddNewArticlePage from './admin/pages/AddNewArticlePage';
/*------Action-----*/

/*------Sidebar----*/
import TestPage from './admin/pages/TestPage';
import Roles from './admin/pages/Roles';
import RoleDetail from './admin/pages/RoleDetail';
import UsersPage from './admin/pages/UsersPage';
import UserDetail from './admin/pages/UserDetail';
import JobsPage from './admin/pages/JobsPage';
import JobDetail from './admin/pages/JobDetail';
import ArticlesPage from './admin/pages/ArticlesPage';
import ArticleDetail from './admin/pages/ArticleDetail';
import InterviewsPage from './admin/pages/InterviewsPage';
import InterviewDetail from './admin/pages/InterviewDetail';
import Candidates from './admin/pages/candidate/candidate'
import CandidateDetail from './admin/pages/candidate/detailCandidate';
import ListInterviewer from './admin/pages/interviewer/ListInterviewer'; 
/*------Sidebar----*/
import LoginPage from './admin/pages/LoginPage';
import ForgotPasswordPage from './admin/pages/ForgotPasswordPage';
import ResetPassword from './admin/pages/ResetPassword';
import DashboardPage from './admin/pages/DashboardPage';
import ProfilePage from './admin/pages/ProfilePage';
import ChangeProfilePage from './admin/pages/ChangeProfilePage';
import ChangeAccountPage from './admin/pages/ChangeAccountPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './admin/styles/reduction.scss';
import Homepage from './candidate/components/Home/Hompage';
import Careers from './candidate/components/Career/Careers';
import About from './candidate/components/About/About';
import Career1 from './candidate/components/Describe/Career1';
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasToken: false,
      path: '/login'
    };
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
              path={'/dashboard/login'}
              layout={EmptyLayout}
              component={LoginPage}
            />
            <LayoutRoute
              exact
              path={'/dashboard/forgotpassword'}
              layout={EmptyLayout}
              component={ForgotPasswordPage}
            />
            <LayoutRoute
              path={'/dashboard/reset-password'}
              layout={EmptyLayout}
              component={ResetPassword}
            />
            <LayoutRoute
              exact
              path="/dashboard/profile"
              layout={MainLayout}
              component={ProfilePage}
            />
            <LayoutRoute
              exact
              path="/dashboard/changeprofile"
              layout={MainLayout}
              component={ChangeProfilePage}
            />
            <LayoutRoute
              exact
              path="/dashboard/changeaccount"
              layout={MainLayout}
              component={ChangeAccountPage}
            />
            <LayoutRoute
              exact
              path={'/dashboard/role'}
              layout={MainLayout}
              component={Roles}
            />
            <LayoutRoute
              exact
              path={'/dashboard/role/:id'}
              layout={MainLayout}
              component={RoleDetail}
            />
            <LayoutRoute
              exact
              path={'/dashboard/user'}
              layout={MainLayout}
              component={UsersPage}
            />
            <LayoutRoute
              exact
              path={'/dashboard/user/:id'}
              layout={MainLayout}
              component={UserDetail}
            />
            <LayoutRoute
              exact
              path={'/dashboard/job'}
              layout={MainLayout}
              component={JobsPage}
            />
            <LayoutRoute
              exact
              path={'/dashboard/job/:id'}
              layout={MainLayout}
              component={JobDetail}
            />
            <LayoutRoute
              exact
              path={'/dashboard/article'}
              layout={MainLayout}
              component={ArticlesPage}
            />
            <LayoutRoute
              exact
              path={'/dashboard/article/:id'}
              layout={MainLayout}
              component={ArticleDetail}
            />
            <LayoutRoute
              exact
              path={'/dashboard/create-article'}
              layout={MainLayout}
              component={AddNewArticlePage}
            />
            <LayoutRoute
              exact
              path={'/dashboard/interview'}
              layout={MainLayout}
              component={InterviewsPage}
            />
            <LayoutRoute
              exact
              path={'/dashboard/interview/:id'}
              layout={MainLayout}
              component={InterviewDetail}
            />
            <LayoutRoute
              exact
              path={'/dashboard/candidate'}
              layout={MainLayout}
              component={Candidates}
            />
             <LayoutRoute
              exact
              path={'/dashboard/candidate/:id'}
              layout={MainLayout}
              component={CandidateDetail}
            />
            <LayoutRoute
              exact
              path={'/dashboard/interviewer'}
              layout={MainLayout}
              component={ListInterviewer}
            />
            <LayoutRoute
              exact
              path={'/dashboard/test'}
              layout={MainLayout}
              component={TestPage}
            />
            {/* <Redirect to="/" /> */}
            <Route path="/" component={Homepage} exact />
            <Route path="/careers" component={Careers} />
            <Route path="/about" component={About} />
            <Route path="/article/:id" component={Career1} />
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
