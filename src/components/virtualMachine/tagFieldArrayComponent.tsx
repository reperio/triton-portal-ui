import React from 'react';
import { Field } from 'redux-form'
import { FormGroup } from "react-bootstrap";

export const TagFieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index} className="field-array-component">
                <div>
                    <div className="field-array-component-item-label">Tag #{index + 1}</div>
                    <div className="field-array-component-delete-button">
                        <button type='button' className="reperio-form-control reperio-btn reperio-warning" onClick={() => props.fields.remove(index)}>
                            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <FormGroup>
                    <Field  name={`${member}.name`}
                            component="input" 
                            className="reperio-form-control reperio-text-input"
                            type="text" 
                            placeholder="Name" />
                </FormGroup>
                <FormGroup>
                    <Field  name={`${member}.value`}
                            component="input" 
                            className="reperio-form-control reperio-text-input"
                            type="text" 
                            placeholder="Value" />
                </FormGroup>
            </div>
        )}
        <div className="field-array-component">
            <button type='button' className="reperio-form-control reperio-btn reperio-neutral" onClick={() => props.fields.push({})}>Add another tag</button>
        </div>
    </div>
);