import React from 'react'
import Error from '../misc/error';

const PackageInformation = (props: any) => (
    <div style={{marginBottom: "15px"}}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <div className="row table-row-container">
            <div className="col-md-6"><b>{props.data.name}</b></div>
            <div className="col-md-6"></div>
        </div>
        <div className="row table-row-container">
            <div className="col-md-6">Memory</div>
            <div className="col-md-6"><b>{props.data.max_physical_memory}</b></div>
        </div>
        <div className="row table-row-container">
            <div className="col-md-6">Swap</div>
            <div className="col-md-6"><b>{props.data.max_swap}</b></div>
        </div>
        <div className="row table-row-container">
            <div className="col-md-6">V-CPUs</div>
            <div className="col-md-6"><b>{props.data.vcpus}</b></div>
        </div>
        <div className="row table-row-container">
            <div className="col-md-6">Disk Quota</div>
            <div className="col-md-6"><b>{props.data.quota}</b></div>
        </div>
        <div className="row table-row-bottom-container">
            <div className="col-md-6">Disk IO Priority</div>
            <div className="col-md-6"><b>{props.data.zfs_io_priority}</b></div>
        </div>
    </div>
);

export default PackageInformation;