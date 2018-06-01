import React from 'react'
import ReperioBar from './components/misc/reperioBar';
import AppContainer from './containers/appContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <div className="flexContainer">
        <ReperioBar/>
        <AppContainer/>
    </div>
);

export default App;