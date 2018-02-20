import React from 'react';
import {TestService} from '../services';
import TestTextInput from './testTextInput';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/noteActions';
import PropTypes from 'prop-types';


export class TestPage extends React.Component {
    props:any
    static propTypes:any;

    handleChange = (e: any) => {
        this.props.actions.handleUpdate(e.target.name, e.target.value);
    }

    addNote = (e: any) => {
        this.props.actions.addNote(this.props.notes.noteToAdd);
    }

    render() {
        return (
            <div>
                <h1>Test</h1>
                {/* <p><b>Value from API:</b> {this.state.testVal}</p> */}
                {/* <input type="text" value={this.state.noteToAdd} onChange={this.handleChange.bind(this)} /> */}
                <TestTextInput onChange={this.handleChange} name="noteToAdd" label="Add Note" value={this.props.notes.noteToAdd} />
                <button onClick={this.addNote}>Add note</button>
                {this.props.notes.noteList.map((n:string, index:number) => <p key={index}>{n}</p>)}
            </div>
        );
    }
}

TestPage.propTypes = {
    actions: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired
};

function mapStateToProps(state:any) {
    return {
        notes: state.notes
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
)(TestPage);
