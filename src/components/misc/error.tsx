import React from 'react'

const Error = (props: any) => (
    <div>
        <div className="alert alert-danger">{props.errors.map((e:string, k:any) => <p key={k}>{e}</p>)}</div>
    </div>
);

export default Error;