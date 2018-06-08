import React from 'react'

const MainDashboard = (props: any) => (
    <div>
        <p>Welcome, {props.authSession.user.data.username}!</p>        
    </div>
);

export default MainDashboard;