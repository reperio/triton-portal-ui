import React from 'react'
import {ClipLoader} from "react-spinners";

const LoadingSpinner = (props: any) => (
    <div className='sweet-loading'>
        <ClipLoader
            color={'#123abc'}
            loading={props.isShowing}
        />
    </div>
);

export default LoadingSpinner;