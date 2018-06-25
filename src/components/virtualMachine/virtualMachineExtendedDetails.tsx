import React from 'react'
import Moment from 'moment'
import { Button } from 'react-bootstrap';

const VirtualMachineExtendedDetails = (props: any) => (
    <div className="nested-table-details col-xs-12">
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Name</div>
            <div className="col-xs-8">{props.data.alias}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Memory & Swap</div>
            <div className="col-xs-8">{props.data.max_physical_memory + ' MB / ' + props.data.max_swap + ' MB'}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Disk</div>
            <div className="col-xs-8">{props.data.quota + ' GB'}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">IP Addresses</div>
            <div className="col-xs-8">{props.data.nics.map((nic:any) => nic.ip).toString().replace(/,/g, ' ')}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Image</div>
            <div className="col-xs-8">
                <a onClick={props.showImageInformation.bind(this)}>
                    {props.data.image_uuid}
                </a>
            </div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Server</div>
            <div className="col-xs-8">{props.data.server_uuid}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Package</div>
            <div className="col-xs-8">
                <a onClick={props.showPackageInformation.bind(this)}>
                    {props.data.billing_id}
                </a>
            </div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Zone Brand</div>
            <div className="col-xs-8">{props.data.brand}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Created</div>
            <div className="col-xs-8">{Moment.utc(props.data.create_timestamp).format('DD MMMM, YYYY HH:mm:ss')} UTC</div>
        </div>
        <div className="row col-xs-12 table-row-bottom-container">
            <div className="col-xs-4 table-row-property">Last Modified</div>
            <div className="col-xs-8">{Moment.utc(props.data.last_modified).format('DD MMMM, YYYY HH:mm:ss')} UTC</div>
        </div>
    </div>
);

export default VirtualMachineExtendedDetails;