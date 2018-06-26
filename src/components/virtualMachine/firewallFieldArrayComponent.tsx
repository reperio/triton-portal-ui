import React from 'react';
import { Field } from 'redux-form'
import { FormGroup, Label } from "react-bootstrap";

export const FirewallFieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <fieldset disabled={props.firewallRules != null ? props.firewallRules[index].global : false}>
                <div key={index} className="field-array-component">
                    <div>
                        <div className="field-array-component-item-label">Rule #{index + 1}</div>
                        <div className="field-array-component-delete-button">
                            <button type='button' className="reperio-form-control reperio-btn reperio-warning" onClick={() => props.firewallRules != null && !props.firewallRules[index].global && props.fields.remove(index)}>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div className="firewall-rule-crumb-trail">
                        {props.firewallRules != null && props.firewallRules[index].global ?
                            <div>
                                <Label className="black-label">
                                    <i className="fa fa-globe"></i>&nbsp;GLOBAL
                                </Label>
                            </div>
                        : null }
                        <div>
                            <Label className="default">
                                {props.firewallRules[index].from}
                            </Label>
                        </div>
                        <div>
                            <Label className="pale-blue-label">
                                <i className="fa fa-long-arrow-right"></i>
                            </Label>
                        </div>
                        <div>
                            <Label bsStyle="default">
                                {props.firewallRules[index].to}
                            </Label>
                        </div>
                        <div>
                            <Label bsStyle={`${props.firewallRules[index].allow ? 'success' : 'danger'}`}>
                                {props.firewallRules[index].allow}
                            </Label>
                        </div>
                        <div>
                            <Label className='light-gray-label'>
                                {props.firewallRules[index].actionPredicate}
                            </Label>
                        </div>
                    </div>
                    <FormGroup>
                        <Field  name={`${member}.from`}
                                component="input" 
                                className="reperio-form-control reperio-text-input"
                                type="text" 
                                placeholder="From" />
                    </FormGroup>
                    <FormGroup>
                        <Field  name={`${member}.to`}
                                component="input" 
                                className="reperio-form-control reperio-text-input"
                                type="text" 
                                placeholder="To" />
                    </FormGroup>
                    <FormGroup style={{display: 'flex'}}>
                        <div className="col-md-3" style={{padding: 0}}>
                            <Field  className="reperio-form-control reperio-dropdown"
                                    name={`${member}.allow`}
                                    component="select">
                                        <option> -- Select an action -- </option>
                                        <option key={0} value='ALLOW'>ALLOW</option>
                                        <option key={1} value='BLOCK'>BLOCK</option>
                            </Field>
                        </div>
                        <div className="col-md-9" style={{paddingRight: 0}}>
                            <Field  name={`${member}.actionPredicate`}
                                    component="input" 
                                    className="reperio-form-control reperio-text-input"
                                    type="text" 
                                    placeholder="Action predicate" />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label className="reperio-checkbox-container">
                            Enable this rule
                            <Field  name={`${member}.enabled`}
                                    type="checkbox"
                                    id={`${index}`}
                                    component="input" />
                            <span className="reperio-checkbox"></span>
                        </label>
                    </FormGroup>
                </div>
            </fieldset>
        )}
        <div className="field-array-component">
            <button type='button' className="reperio-form-control reperio-btn reperio-neutral" onClick={() => props.fields.push({})}>Create Firewall Rule</button>
        </div>
    </div>
);