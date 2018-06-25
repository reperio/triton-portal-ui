import React from 'react'

const NavMenu = (props: any) => (
    <div className="footer-container">
        <div className="footer-content">
            {props.selectedVirtualMachines !== undefined && props.selectedVirtualMachines.length > 0 ?
                <div className="footer-content-body col-xs-12">
                    <div className="col-xs-4">
                        {props.selectedVirtualMachines.length} virtual machine{props.selectedVirtualMachines.length > 1 ? 's' : ''} selected
                    </div>
                    <div className="col-xs-4">
                        <a onClick={props.showAddTagModal.bind(this)}>
                            <i className="fa fa-fw fa-tag"></i>
                            <span> Tags</span>
                        </a>
                    </div>
                    <div className="col-xs-4">
                        <a onClick={props.clearSelectedVirtualMachines.bind(this)}>
                            <i className="fa fa-times"></i>
                            <span> Clear</span>
                        </a>
                    </div>
                </div>
            : null}
        </div>
    </div>
);

export default NavMenu;