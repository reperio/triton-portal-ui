import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TestTextInput from './testTextInput';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/testActions';

export class StatusPage extends React.Component {
    props:any
    static propTypes:any;


    handleChange = (e: any) => {
        this.props.actions.test(e.target.name, e.target.value);
    }

    handleClick = (e:any) => {
        this.props.actions.test2();
    }

    render() {
        return (
            <div>
                <h1>Status</h1>
                    <br/>
                    <br/>
                    <form action="" method="post">
                        <div className="col-md-6">
                            <TestTextInput onChange={this.handleChange} name="message1" label="Message 1" value={this.props.test.message1} />
                            <TestTextInput onChange={this.handleChange} name="message2" label="Message 2" value={this.props.test.message2} />
                            <TestTextInput onChange={this.handleChange} name="message3" label="Message 3" value={this.props.test.message3} />
                            <TestTextInput onChange={this.handleChange} name="message4" label="Message 4" value={this.props.test.message4} />
                        </div>
                        <div className="col-md-6">
                            <TestTextInput onChange={this.handleChange} name="message5" label="Message 5" value={this.props.test.message5} />
                            <TestTextInput onChange={this.handleChange} name="message6" label="Message 6" value={this.props.test.message6} />
                            <TestTextInput onChange={this.handleChange} name="message7" label="Message 7" value={this.props.test.message7} />
                            <TestTextInput onChange={this.handleChange} name="message8" label="Message 8" value={this.props.test.message8} />
                        </div>
                        <div className="col-md-12">
                            <input type="text" name="testMessage" onChange={this.handleChange} value={this.props.test.testMessage} />
                        </div>
                        <div className="col-md-12">
                            <input type="text" name="testAsyncMessage" value={this.props.test.testAsyncMessage} />
                            <button type="button" name="loadMessage" onClick={this.handleClick}>Test</button>
                        </div>
                    </form>
            </div>
        );
    }
}

StatusPage.propTypes = {
    actions: PropTypes.object.isRequired,
    test: PropTypes.object.isRequired
};


function mapStateToProps(state:any) {
    return {
        test: state.test
    };
}

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatusPage);
