import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import validateEditCompany from '../../../services/validation/companies/editCompany';
import InputV2 from '../../../components/helpers/Inputs/InputV2';

import { 
    showErrorModal, showWarningModal,  showSuccessModal
} from '../../../actions/alertsActions';
import {
    addCompanyAsync, getAllCompaniesAsync
} from '../../../actions/companyActions';


class AddCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCompany: {
                company_name: "",
                open_price: "",
                fces: ""

            },
            newCompanyErrors: {},
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.chosenEditCompanyErrors) {
            let x = {};
            for (let field in nextProps.chosenEditCompanyErrors) {
                x[field] = nextProps.chosenEditCompanyErrors[field][0]
            }

            console.log(nextProps.chosenEditCompanyErrors, 'nextProps.chosenEditCompanyErrors')
            this.setState({newCompanyErrors: x});
        }
    };

    handleChange = (e) => {
        if( e.target.name === "open_price" && (e.target.value.indexOf(".") === 0 || e.target.value.indexOf(",") === 0 )){
            let value = e.target.value;
            this.setState({newCompany: {...this.state.newCompany, [e.target.name]:value.replace(value[0], "0.")}});
        }else{
            this.setState({newCompany: {...this.state.newCompany, [e.target.name]: e.target.value}});
        }
    };

    formValidation = (e) => {
        const { newCompany } = this.state;
        const {errors, isValid} = validateEditCompany(newCompany);

        if (isValid) {
            this.props.addCompanyAsync(newCompany, this.props.history, this.props.getAllCompaniesAsync);
        } else {
            this.setState({newCompanyErrors: errors});
        }
    };
        
    render() {
        const { newCompany, newCompanyErrors } = this.state;

        return (
            <div className="front dashboard">
                <section className="section-add">
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            <Link
                                to="/admin/manage-companies"
                                className="btn btn-primary btn-sm back">
                                <FormattedMessage 
                                    id="back"
                                    defaultMessage="Back"
                                />
                            </Link>
                            <h2>
                                <FormattedMessage 
                                    id="add-company"
                                    defaultMessage="Add Company"
                                />
                            </h2>
                        </div>
                        <div className="col-12 col-md-8">
                        <div className="form-group row">
                            <label htmlFor="companyName" className="col-3 col-form-label">
                                <FormattedMessage 
                                    id="company-name"
                                    defaultMessage="Company Name"
                                />
                            </label>
                            <div className="col-9">
                                <InputV2
                                    type="text"
                                    onChange={this.handleChange}
                                    value={newCompany.company_name}
                                    name="company_name"
                                    id="companyName"
                                    errors={newCompanyErrors.company_name}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="openPrice" className="col-3 col-form-label">
                                <FormattedMessage 
                                    id="open-price"
                                    defaultMessage="Open price"
                                /></label>
                            <div className="col-9">
                                <InputV2
                                    type="number"
                                    onChange={this.handleChange}
                                    value={newCompany.open_price}
                                    name="open_price"
                                    id="openPrice"
                                    errors={newCompanyErrors.open_price}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="FCES" className="col-3 col-form-label">
                                FCES
                            </label>
                            <div className="col-9">
                                <InputV2
                                    type="number"
                                    onChange={this.handleChange}
                                    value={newCompany.fces}
                                    name="fces"
                                    id="FCES"
                                    errors={newCompanyErrors.fces}
                                />
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-md-8">
                        <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={(e) => this.formValidation(e)}>
                            <FormattedMessage 
                                id="save"
                                defaultMessage="Save"
                            />
                        </button>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        companies: state.data.companies.items,
        chosenEditCompany: state.data.companies.chosenEditCompany,
        chosenEditCompanyErrors: state.data.companies.chosenEditCompanyErrors
    }
}


export default connect(mapStateToProps, {
    showErrorModal, showWarningModal, showSuccessModal, getAllCompaniesAsync, addCompanyAsync
})(withRouter(AddCompany));


