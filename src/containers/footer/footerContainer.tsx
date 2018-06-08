import React from 'react'
import { connect } from "react-redux";
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from "redux";
import { history } from '../../store/history';
import Footer from "../../components/footer/footer";
import { State } from '../../store/initialState';

class FooterContainer extends React.Component {
    props: any;

    async componentDidMount() {
    }

    render() {
        return (
            <Footer />
        );
    }
}

function mapStateToProps(state: State) {
    return {};
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(FooterContainer);