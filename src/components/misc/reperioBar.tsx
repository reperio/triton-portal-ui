import React from 'react'
const image = require('../../assets/rio-slider-colorband1.png');

const ReperioBar = (props: any) => (
    <div className="reperio-bar-container">
        <img className="reperio-bar" src={image} />
    </div>
);

export default ReperioBar;