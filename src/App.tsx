import './scss/home-page.scss';
import Homepage from './Pages/home-page';
import SooreList from './Pages/soore-list';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Fragment, lazy, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const Search = lazy(() => import('./Pages/search'));
const AyatPage = lazy(() => import('./Pages/ayate-page'));



function App() {
  return (
    
    <Router>
      
      <>
        <Switch>
          <Route path="/" exact component={() => {
            return <Fragment>
              <Homepage />
              <SooreList />
            </Fragment>
          }}></Route>      
          <Suspense fallback={<div className="spinner"><FontAwesomeIcon  icon={faSpinner}></FontAwesomeIcon></div>}>
            <Route path="/Aye" exact={false} component={AyatPage}></Route>
            <Route path="/Search" component={Search}></Route>
          </Suspense>
        </Switch>
      </>
    </Router> 
  );
}

export default App;
