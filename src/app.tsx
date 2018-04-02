import React from 'react'
import ReperioBar from './components/reperioBar';
import AppContainer from './containers/appContainer';


const App = () => (
    <div className="flexContainer">
        <ReperioBar/>
        <AppContainer/>
    </div>
);

export default App;