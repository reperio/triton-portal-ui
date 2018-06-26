import React from 'react'
import AppContainer from './containers/appContainer';
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