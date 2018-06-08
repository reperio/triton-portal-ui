import React from 'react'
import {ClipLoader} from "react-spinners";

const LoadingSpinner = (props: any) => (
    <div className='sweet-loading-container'>
        <ClipLoader color={'#123abc'}
                    loading={props.isShowing}
                    size={70}
        />
    </div>
);

export default LoadingSpinner;