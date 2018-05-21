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
                        <Button bsStyle="danger"
                                onClick={() => props.fields.remove(index)}>&nbsp;
                                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                    &nbsp;
                        </Button>
                    </div>
                </div>
                <FormGroup>
                    <Field  className="form-control"
                            name={`${member}.network_uuid`}
                            component="select">
                            <option> -- Select a network -- </option>
                            {
                                props.networks.map((network:any, i:number) => <option key={i} value={network.uuid}>{network.name}</option>)
                            }
                    </Field>
                </FormGroup>
                <FormGroup>
                    Make this the primary NIC&nbsp;
                    <Field  onChange={()=> props.selectPrimaryNic(index)}
                            name={`${member}.primary`}
                            type="checkbox"
                            component="input" />
                </FormGroup>
            </div>
        )}
        <div className="field-array-component">
            <Button bsStyle="default"
                    onClick={() => props.fields.push({})}>Attach another NIC
            </Button>
        </div>
    </div>
);