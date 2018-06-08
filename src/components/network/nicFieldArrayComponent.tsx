import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";

export const NicFieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index} className="field-array-component" style={{position: "relative"}}>
                <div>
                    <div className="field-array-component-item-label">NIC #{index + 1}</div>
                    <div className="field-array-component-delete-button">
                        <button type='button' className="reperio-form-control reperio-btn reperio-warning" onClick={() => props.fields.remove(index)}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                    </div>
                </div>
                <FormGroup>
                    <Field  className="reperio-form-control reperio-dropdown"
                            name={`${member}.network_uuid`}
                            component="select">
                            <option> -- Select a network -- </option>
                            {
                                props.networks.map((network:any, i:number) => <option key={i} value={network.uuid}>{network.name}</option>)
                            }
                    </Field>
                </FormGroup>
                <FormGroup>
                    <label className="reperio-checkbox-container">
                        Make this the primary NIC
                        <Field  name={`${member}.primary`}
                                type="checkbox"
                                id={`${index}`}
                                onClick={()=> props.selectPrimaryNic(index)}
                                component="input" />
                        <span className="reperio-checkbox"></span>
                    </label>
                </FormGroup>
            </div>
        )}
        <div className="field-array-component">
            <button type='button' className="reperio-form-control reperio-btn reperio-neutral" onClick={() => props.fields.push({})}>Attach another NIC</button>
        </div>
    </div>
);