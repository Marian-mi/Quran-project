import './scss/home-page.scss';
import Homepage from './Pages/home-page';
import SooreList from './Pages/soore-list';
import AyatPage from './Pages/ayate-page'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Fragment } from 'react';
import Setting from  './Components/settings';
import Search from './Pages/search'



function App() {
  return (
    
    <Router>
      <Setting />
      <>
        <Switch>
          <Route path="/" exact component={() => {
            return <Fragment>
              <Homepage />
              <SooreList />
            </Fragment>
          }}></Route>
          <Route path="/Aye" exact={false} component={AyatPage}></Route>
          <Route path="/Search" component={Search}></Route>
        </Switch>
      </>
    </Router> 
  );
}

export default App;
