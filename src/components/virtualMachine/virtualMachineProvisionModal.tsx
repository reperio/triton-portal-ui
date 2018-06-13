import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import { DropdownList } from 'react-widgets'
import PackageInformation from './packageInformation';
import Error from "../misc/error";
import { NicFieldArrayComponent } from '../network/nicFieldArrayComponent';
import 'react-widgets/dist/css/react-widgets.css';

const dropdownList = (input:any, data:any, valueField:any, textField:any) => {
    <DropdownList   {...input}
                    valueField={valueField}
                    textField={textField}
                    data={data}
                    placeholder="Select a network" />
}

const VirtualMachineProvisionModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup>
            <Field name="alias" 
                component="input" 
                className="reperio-form-control reperio-text-input"
                type="text" 
                placeholder="Virtual Machine Name" />
        </FormGroup>
        <FormGroup>
            <Field  className="reperio-form-control reperio-dropdown"
                    name='package'
                    onChange={props.showPackageInformation}
                    component="select">
                        <option>-- Select a package --</option>
                        {
                            props.packages.packages.map((_package:any, i:number) => <option key={i} value={_package.uuid}>{_package.name}</option>)
                        }
            </Field>
        </FormGroup>
        {props.packages.showInformation
        ? <PackageInformation   data={props.packages.selectedPackage} 
                                style={{marginBottom: "15px"}} />
        : null}
        <FormGroup>
            <Field  className="reperio-form-control reperio-dropdown"
                    name='image_uuid'
                    onChange={props.selectImage}
                    component="select">
                        <option>-- Select an image --</option>
                        {
                            props.images.images.map((image:any, i:number) => <option key={i} value={image.uuid}>{image.name}</option>)
                        }
            </Field>
        </FormGroup>
        {props.images.selectedImage !== null ?
        <FormGroup>
            <Field  className="reperio-form-control reperio-dropdown"
                    name='brand'
                    component="select">
                        <option> -- Select a brand -- </option>
                        <option disabled={(props.images.selectedImage.type === 'zvol') || (props.images.selectedImage.type === 'lx-dataset')} key={0} value='joyent'>joyent</option>
                        <option disabled={(props.images.selectedImage.type === 'lx-dataset') || (props.images.selectedImage.type === 'zone-dataset')} key={2} value='kvm'>kvm</option>
                        <option disabled={(props.images.selectedImage.type === 'zone-dataset') || (props.images.selectedImage.type === 'zvol')} key={3} value='lx'>lx</option>
                        {/* <option disabled={props.images.selectedImage.os === 'smartos'} key={4} value='sngl'>sngl</option> */}
            </Field>
        </FormGroup>
             : null}
        
        <FormGroup>
            <label>Network Interfaces</label>
            <FieldArray name="nics" 
                        selectNetworks={props.selectNetworks} 
                        selectPrimaryNic={props.selectPrimaryNic} 
                        networks={props.networks.networks} 
                        component={NicFieldArrayComponent}/>
        </FormGroup>
    </form>
);


// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineProvisionModal' })(VirtualMachineProvisionModal) as any;