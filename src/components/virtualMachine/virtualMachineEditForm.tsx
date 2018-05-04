import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormGroup } from "react-bootstrap";
import { DropdownList } from 'react-widgets'
import PackageInformation from './packageInformation';
import 'react-widgets/dist/css/react-widgets.css';
import Error from "../../components/misc/error";

const VirtualMachineEditForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Editing virtual machine: {props.initialValues.selectedVm.alias}</h2>
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
                defaultValue={props.initialValues.selectedVm.billing_id}
                name="package" 
                valueField="uuid" 
                textField="name"
                data={props.initialValues.packages}
                onSelect={props.showPackageInformation}
                placeholder="Select A Package" />
        </FormGroup>
        {props.selectedPackage != null
        ? <PackageInformation
            data={props.selectedPackage} 
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
        <FormGroup>
            <button className="btn btn-primary" type="submit">Save</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineEditForm' })(VirtualMachineEditForm) as any;