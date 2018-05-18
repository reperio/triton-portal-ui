import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import { DropdownList, Multiselect } from 'react-widgets'
import PackageInformation from './packageInformation';
import Error from "../../components/misc/error";
import 'react-widgets/dist/css/react-widgets.css';
import { NicFieldArrayComponent } from '../network/nicFieldArrayComponent';

const dropdownList = (input:any, data:any, valueField:any, textField:any) => {
    <DropdownList {...input}
        valueField={valueField}
        textField={textField}
        data={data}
        placeholder="Select a network" />
}

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
            <FieldArray name="nics" selectNetworks={props.selectNetworks} selectPrimaryNic={props.selectPrimaryNic} networks={props.networks.networks} component={NicFieldArrayComponent}/>
        </FormGroup>
        <FormGroup>
            <button className="btn btn-primary" type="submit">Create</button>
        </FormGroup>
    </form>
);


// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineCreateForm', initialValues: {image: '7b5981c4-1889-11e7-b4c5-3f3bdfc9b88b', brand: 'lx'} })(VirtualMachineCreateForm) as any;