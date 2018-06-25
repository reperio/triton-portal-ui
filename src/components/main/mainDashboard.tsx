import React from 'react'

const MainDashboard = (props: any) => (
    <div>
        <p>Welcome, {props.authSession.user.username}!</p>        
    </div>
);

export default MainDashboard;