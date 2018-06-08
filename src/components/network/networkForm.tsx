import React from 'react'
import { reduxForm } from 'redux-form'
import Error from '../../components/misc/error';

const NetworkForm = (props: any) => (
    <form>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Networks</h2>
        <hr />
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'networkForm' })(NetworkForm) as any;