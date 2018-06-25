import React from 'react'
import { connect } from "react-redux";
import { getRulesByVmUuid, hideFirewallRulesModal, editFirewallRules } from "../../actions/firewallActions";
import { bindActionCreators } from "redux";
import { formValueSelector } from 'redux-form';
import { toggleLoadingBar } from "../../actions/navActions";
import VirtualMachineEditFirewallRulesModal from '../../components/virtualMachine/virtualMachineEditFirewallRulesModal';
import FirewallRuleFormattedModel from '../../models/firewallRuleFormattedModel';
import { State } from '../../store/initialState';

class VirtualMachineEditFirewallRulesModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getRulesByVmUuid(this.props.row.original.uuid);
        this.props.actions.toggleLoadingBar(false);
    }

    async closeFirewallRulesModal() {
        await this.props.actions.hideFirewallRulesModal();
    }

    async editFirewallRules(form: any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.editFirewallRules(form.firewallRules, this.props.authSession.user.ownerUuid, this.props.row.original.uuid);
        this.props.actions.toggleLoadingBar(false);
    }

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <VirtualMachineEditFirewallRulesModal   close={this.closeFirewallRulesModal.bind(this)} 
                                                        onSubmit={this.editFirewallRules.bind(this)}
                                                        initialValues={{firewallRules: this.props.firewallRules}}
                                                        errorMessages={this.props.errorMessages}/>
            </fieldset>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineEditFirewallRulesModal');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        firewallRules: selectorModal(state, 'firewallRules'),
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row'),
        isLoading: selectorLoading(state, 'isLoading'),
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({hideFirewallRulesModal, toggleLoadingBar, getRulesByVmUuid, editFirewallRules}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineEditFirewallRulesModalContainer);