import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import {DropdownList} from 'react-widgets'
import PackageInformation from './packageInformation';
import 'react-widgets/dist/css/react-widgets.css';

const CreateVirtualMachineForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <h2>Create a virtual machine</h2>
        <FormGroup style={{maxWidth: "280px"}}>
         <Field 
            name="alias" 
            component="input" 
            className="form-control" 
            ype="text" 
            placeholder="Virtual Machine Name" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <DropdownList 
                name="package" 
                valueField="uuid" 
                textField="name" 
                data={props.packages.packages}
                onSelect={props.showPackageInformation} />
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
            <button className="btn btn-primary" type="submit">Create</button>
        </FormGroup>
    </form>
);



// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'createVirtualMachineForm' })(CreateVirtualMachineForm) as any;