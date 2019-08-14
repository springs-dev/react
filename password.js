import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import API from '../../services/api';
import Input from '../../components/helpers/Inputs/InputV1'
import validateLogin from '../../services/validation/loginForm';
import { 
    showErrorModal, 
    showWarningModal, 
    showSuccessModal 
} from '../../actions/alertsActions';
import { loginAsync } from '../../actions/authActions'
import history from '../../router/index';
import PasswordReset from '../../containers/PasswordReset';
import PasswordRecovery from '../../containers/PasswordRecovery';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recoveryEmail: "",
            recoveryEmailErrors: {}
        };

    }

    componentWillMount = () => {
        this.props.location.pathname === '/password' ? this.props.history.push('/password/recovery') : null;
        this.props.location.pathname === '/password/reset' ? this.props.history.push('/login') : null;
    }

    render() {
        return (
            <div>
                <Route path={`/password/recovery`}  component={PasswordRecovery} />
                <Route path={`/password/reset/:token`}  component={PasswordReset} />
            </div>
        )
    }

}

export default connect(null)(withRouter(Password));

