import React from 'react'
import ReperioBar from './components/misc/reperioBar';
import AppContainer from './containers/appContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavMenuContainer from "./containers/navMenu/navMenuContainer";
import FooterContainer from './containers/footer/FooterContainer';

const App = () => (
    <div className="flexContainer">
        <NavMenuContainer/>
        <AppContainer/>
        <FooterContainer />
    </div>
);

export default App;