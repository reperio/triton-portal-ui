import React from 'react'
import { DropdownButton, MenuItem, ButtonToolbar } from "react-bootstrap";

const VirtualMachineActionsButton = (props: any) => (
    <div className="table-action-button-toolbar">
        <DropdownButton pullRight
                        title="Actions"
                        id="dropdown"
                        className="vm-actions reperio-form-control reperio-btn reperio-success">
            {props.row.original.state.toLowerCase() !== "running" ? 
                <MenuItem onClick={props.startVirtualMachine.bind(this, props.row)} eventKey="1">Start</MenuItem> 
            : null}
            {props.row.original.state.toLowerCase() === "running" ? 
                <MenuItem onClick={props.endVirtualMachine.bind(this, props.row)} eventKey="2">Stop</MenuItem>
            : null}
            {props.row.original.state.toLowerCase() === "running" ? 
                <MenuItem onClick={props.restartVirtualMachine.bind(this, props.row)} eventKey="3">Reboot</MenuItem>
            : null}
            <MenuItem divider />
            <MenuItem onClick={props.renameVirtualMachine.bind(this, props.row)} eventKey="4">Rename alias</MenuItem>
            <MenuItem divider />
            {props.row.original.brand.toLowerCase() !== "kvm" 
            ? 
                <MenuItem onClick={props.reprovisionVirtualMachine.bind(this, props.row)} eventKey="5">Reprovision</MenuItem>
            : null}

            {props.row.original.brand.toLowerCase() !== "kvm" 
            ? 
                <MenuItem onClick={props.resizeVirtualMachine.bind(this, props.row)} eventKey="6">Resize</MenuItem>
            : null}

            {props.row.original.brand.toLowerCase() !== "kvm" 
            ? 
                <MenuItem divider />
            : null}

            <MenuItem onClick={props.editNics.bind(this, props.row)} eventKey="7">Edit Nics</MenuItem>
            <MenuItem divider />
            <MenuItem className="danger" onClick={props.deleteVirtualMachine.bind(this, props.row)} eventKey="8">Delete</MenuItem>
        </DropdownButton>
    </div>
);

export default VirtualMachineActionsButton;