import React from 'react';
import PropTypes from 'prop-types';

class TestTextInputProperties {
    name: string;
    value: string;
    label: string;
    onChange: (e: any) => void;
}

const TestTextInput = (properties: TestTextInputProperties) => {
    return (
        <div className="group">      
            <input 
                className="inputMaterial" 
                name={properties.name}
                type="text" 
                required 
                value={properties.value}
                onChange={properties.onChange} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{properties.label}</label>
        </div>
    );
};

export default TestTextInput;
