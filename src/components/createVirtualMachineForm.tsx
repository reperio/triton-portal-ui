import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import {DropdownList, Multiselect} from 'react-widgets'
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
            <Multiselect
                valueField="uuid"
                textField="name"
                data={props.networks.networks}
                onSelect={props.selectNetworks}
                placeholder="Networks" />
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
export default reduxForm({ form: 'createVirtualMachineForm', initialValues: {image: '7b5981c4-1889-11e7-b4c5-3f3bdfc9b88b', brand: 'lx'} })(CreateVirtualMachineForm) as any;