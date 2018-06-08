import React from 'react'
import { Button } from "react-bootstrap";

const NetworkActionsButton = (props: any) => (
    <div className="table-action-button-toolbar">
        <button className="reperio-form-control reperio-btn reperio-warning" onClick={props.deleteNetwork.bind(this, props.row)}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
    </div>
);

export default NetworkActionsButton;