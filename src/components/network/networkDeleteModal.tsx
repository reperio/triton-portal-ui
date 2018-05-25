import React from 'react';
import { reduxForm } from 'redux-form'
import Error from '../misc/error';

const NetworkDeleteModal = (props: any) => (
    <div>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
    </div>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'networkDeleteModal' })(NetworkDeleteModal) as any;