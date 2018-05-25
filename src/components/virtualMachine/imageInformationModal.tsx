import React from 'react'
import Error from '../misc/error';
import { Image } from 'react-bootstrap';

const ImageInformationModal = (props: any) => (
    <div style={{display: "flex"}}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <div className="col-xs-3" style={{flexDirection: "column", display: "flex", margin: "auto"}}>
            <Image src={`https://triton-ops.reper.io/img/os-${props.data.os}.png`} style={{margin: "auto"}}/>
        </div>
        <div className="col-xs-9" style={{flex: "1 0 0"}}>
            <div className="row col-xs-12 table-row-container">
                <div className="col-xs-3 table-row-property">Name</div>
                <div className="col-xs-9">{props.data.uuid}</div>
            </div>
            <div className="row col-xs-12 table-row-container">
                <div className="col-xs-3 table-row-property">Owner</div>
                <div className="col-xs-9">{props.data.owner}</div>
            </div>
            <div className="row col-xs-12 table-row-container">
                <div className="col-xs-3 table-row-property">Publish Date</div>
                <div className="col-xs-9">{props.data.published_at}</div>
            </div>
            <div className="row col-xs-12 table-row-container">
                <div className="col-xs-3 table-row-property">Operating System</div>
                <div className="col-xs-9">{props.data.os}</div>
            </div>
            <div className="row col-xs-12 table-row-container">
                <div className="col-xs-3 table-row-property">Image Type</div>
                <div className="col-xs-9">{props.data.type}</div>
            </div>
        </div>
    </div>
    
);

export default ImageInformationModal;