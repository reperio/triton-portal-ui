import React from 'react'
import Moment from 'moment'

const NetworkMachineExtendedDetails = (props: any) => (
    <div className="nested-table-details col-xs-12">
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">UUID</div>
            <div className="col-xs-8">{props.data.uuid}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Owners</div>
            <div className="col-xs-8">{props.data.owner_uuid}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">VLAN ID</div>
            <div className="col-xs-8">{props.data.vlan_id}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Network</div>
            <div className="col-xs-8">{props.data.subnet}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Gateway</div>
            <div className="col-xs-8">{props.data.gateway}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Netmask</div>
            <div className="col-xs-8">{props.data.netmask}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">IP Range</div>
            <div className="col-xs-8">{props.data.provision_start_ip + ' - ' + props.data.provision_end_ip}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">NIC Tag</div>
            <div className="col-xs-8">{props.data.nic_tag}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Resolvers</div>
            <div className="col-xs-8">{props.data.resolvers.map((resolver:string) => resolver).toString().replace(/,/g, ', ')}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">MTU</div>
            <div className="col-xs-8">{props.data.mtu}</div>
        </div>
        <div className="row col-xs-12 table-row-container">
            <div className="col-xs-4 table-row-property">Provision a NAT zone</div>
            <div className="col-xs-8">{props.data.gateway_provisioned ? "Yes" : "No"}</div>
        </div>
        <div className="row col-xs-12 table-row-bottom-container">
            <div className="col-xs-4 table-row-property">Description</div>
            <div className="col-xs-8">{props.data.description !== undefined ? props.data.description : ""}</div>
        </div>
    </div>
);

export default NetworkMachineExtendedDetails;