import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import { DropdownList, Multiselect } from 'react-widgets'
import PackageInformation from './packageInformation';
import Error from "../../components/misc/error";
import 'react-widgets/dist/css/react-widgets.css';

const dropdownList = (input:any, data:any, valueField:any, textField:any) => {
    <DropdownList {...input}
        valueField={valueField}
        textField={textField}
        data={data}
        //onChange={props.selectNetworks}
        placeholder="Select a network" />
}

const fieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index} className="field-array-component" style={{maxWidth: "280px", position: "relative"}}>
                <div>
                    <div className="field-array-component-item-label">NIC #{index + 1}</div>
                    <div className="field-array-component-delete-button">
                        <Button
                            bsStyle="danger"
                            onClick={() => props.fields.remove(index)}>&nbsp;
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                &nbsp;
                        </Button>
                    </div>
                </div>
                <FormGroup>
                    <Field
                        className="form-control"
                        name={`${member}.ipv4_uuid`}
                        component="select">
                        {
                            props.networks.map((member:any, index:number) => {
                                return (<option value={member.uuid}>{member.name}</option>)
                            })
                        }
                     </Field>
                </FormGroup>
                <FormGroup>
                    Make this the primary NIC&nbsp;
                    <Field
                        onChange={props.selectPrimaryNic}
                        name={`${member}.primary`}
                        type="checkbox"
                        component="input" />
                </FormGroup>
            </div>
        )}
        <div className="field-array-component" style={{maxWidth: "280px"}}>
            <Button
                bsStyle="default"
                onClick={() => props.fields.push({})}>Attach another NIC
            </Button>
        </div>
    </div>
);

const VirtualMachineCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Create a virtual machine</h2>
        <FormGroup style={{maxWidth: "280px"}}>
         <Field 
            name="alias" 
            component="input" 
            className="form-control" 
            type="text" 
            placeholder="Virtual Machine Name" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <DropdownList
                name="package" 
                valueField="uuid" 
                textField="name" 
                data={props.packages.packages}
                onSelect={props.showPackageInformation}
                placeholder="Select A Package" />
        </FormGroup>
        {props.packages.showInformation
        ? <PackageInformation
            data={props.packages.selectedPackage} 
            style={{maxWidth: "280px", marginBottom: "15px"}} />
        : null}
        <FormGroup style={{maxWidth: "280px"}}>
            <Field
                name="image" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Image" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <Field 
                name="brand" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Brand" />
        </FormGroup>
        <FormGroup>
            <label>Network Interfaces</label>
            <FieldArray name="nics" selectNetworks={props.selectNetworks} selectPrimaryNic={props.selectPrimaryNic} networks={props.networks.networks} component={fieldArrayComponent}/>
        </FormGroup>
        <FormGroup>
            <button className="btn btn-primary" type="submit">Create</button>
        </FormGroup>
    </form>
);



// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineCreateForm', initialValues: {image: '7b5981c4-1889-11e7-b4c5-3f3bdfc9b88b', brand: 'lx'} })(VirtualMachineCreateForm) as any;