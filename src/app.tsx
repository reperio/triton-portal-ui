import React from 'react'
import NavMenuContainer from "./containers/navMenuContainer";
import Routes from "./components/routes";
import ReperioBar from './components/reperioBar';
import AppContainer from './containers/appContainer';


const App = () => (
    <div className="container-fluid">
        <ReperioBar/>
        <AppContainer/>
    </div>
);

export default App;