import React from 'react'
import { Button } from "react-bootstrap";

const NetworkActionsButton = (props: any) => (
    <Button bsStyle="danger"
            onClick={props.deleteNetwork.bind(this, props.row)}
            className="vm-actions table-action-button-toolbar">Delete <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
    </Button>
);

export default NetworkActionsButton;