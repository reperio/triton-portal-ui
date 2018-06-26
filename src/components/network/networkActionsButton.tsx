import React from 'react'

const NetworkActionsButton = (props: any) => (
    <div className="dropdown">
        <div className="dropdown btn-group">
            <button className="reperio-form-control reperio-btn reperio-warning" onClick={props.deleteNetwork.bind(this, props.row)}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
        </div>
    </div>
);

export default NetworkActionsButton;