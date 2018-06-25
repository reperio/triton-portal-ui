import React from 'react'
import Error from '../misc/error';

const ImageInformationModal = (props: any) => (
    <div className="image-information">
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <div className="col-md-3 image-information-image-container">
            <img className="image-information-image" src={`https://triton-ops.reper.io/img/os-${props.data.os}.png`}/>
        </div>
        <div className="col-md-9">
            <div className="row table-row-container">
                <div className="col-md-3 table-row-property">Name</div>
                <div className="col-md-9">{props.data.uuid}</div>
            </div>
            <div className="row table-row-container">
                <div className="col-md-3 table-row-property">Owner</div>
                <div className="col-md-9">{props.data.owner}</div>
            </div>
            <div className="row table-row-container">
                <div className="col-md-3 table-row-property">Publish Date</div>
                <div className="col-md-9">{props.data.published_at}</div>
            </div>
            <div className="row table-row-container">
                <div className="col-md-3 table-row-property">Operating System</div>
                <div className="col-md-9">{props.data.os}</div>
            </div>
            <div className="row table-row-container">
                <div className="col-md-3 table-row-property">Image Type</div>
                <div className="col-md-9">{props.data.type}</div>
            </div>
        </div>
    </div>
    
);

export default ImageInformationModal;