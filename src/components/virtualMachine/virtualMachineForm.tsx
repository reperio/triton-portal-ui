import React from 'react'
import { reduxForm } from 'redux-form'
import Error from '../../components/misc/error';

const VirtualMachineForm = (props: any) => (
    <form>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Virtual Machines</h2>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineForm' })(VirtualMachineForm) as any;