import React from 'react'
import { DropdownButton, MenuItem } from "react-bootstrap";
import ReperioBar from '../misc/reperioBar';

const VirtualMachineActionsButton = (props: any) => (
    <div className="dropdown">
        <DropdownButton pullRight
                        title="Actions"
                        id="dropdown"
                        className="vm-actions reperio-form-control reperio-btn reperio-success">
            <div className="dropdown-content-container">
                <div className="dropdown-content">
                    {props.row.original.state.toLowerCase() !== "running" ? 
                        <div className="dropdown-item" onClick={props.startVirtualMachine.bind(this, props.row)}>Start</div> 
                    : null}
                    {props.row.original.state.toLowerCase() === "running" ?
                        <div className="dropdown-item" onClick={props.endVirtualMachine.bind(this, props.row)}>Stop</div>
                    : null}
                    {props.row.original.state.toLowerCase() === "running" ?
                        <div className="dropdown-item" onClick={props.restartVirtualMachine.bind(this, props.row)}>Reboot</div>
                    : null}
                    <MenuItem divider />
                    <div className="dropdown-item" onClick={props.renameVirtualMachine.bind(this, props.row)}>Rename alias</div>
                    <MenuItem divider />
                    {props.row.original.brand.toLowerCase() !== "kvm" 
                    ? 
                        <div className="dropdown-item" onClick={props.reprovisionVirtualMachine.bind(this, props.row)}>Reprovision</div>
                    : null}

                    {props.row.original.brand.toLowerCase() !== "kvm" 
                    ? 
                        <div className="dropdown-item" onClick={props.resizeVirtualMachine.bind(this, props.row)}>Resize</div>
                    : null}

                    {props.row.original.brand.toLowerCase() !== "kvm" 
                    ? 
                        <MenuItem divider />
                    : null}

                    <div className="dropdown-item" onClick={props.editNics.bind(this, props.row)}>Edit Nics</div>
                    <div className="dropdown-item" onClick={props.editFirewallRules.bind(this, props.row)}>Edit Firewall Rules</div>
                    <div className="dropdown-item" onClick={props.editTags.bind(this, props.row)}>Edit Tags</div>
                    <MenuItem divider />
                    <div className="dropdown-item" onClick={props.deleteVirtualMachine.bind(this, props.row)}>Delete</div>
                </div>
                <div className="dropdown-content-bottom">
                    <ReperioBar height={"8px"} />
                </div>
            </div>
        </DropdownButton>
    </div>
);

export default VirtualMachineActionsButton;