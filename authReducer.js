import { GET_ME,
        ERROR_GET_ME,
        LOGIN,
        REGISTER,
        SET_AUTH,
        LOGOUT,
        UPDATE_PROFILE,
        GET_ALL_USERS ,
        TRANSACTION_HISTORY
} from '../actions/actionTypes';

const initialState = {
    token: localStorage.salixJWT ? localStorage.salixJWT : null,
    user: null,
    isAuth: true,
    errors: {},
    login: {
        errorsLogin: {}
    },
    register: {
        errorsRegister: null,
        registerSuccess: false,
        portfolio_id: null,
        portfolio_companies_score: '595'
    },
    errorsUpdateUser: {}    
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user ?  action.user : null,
                token: action.token ? action.token : null,
                isAuth: !!action.user,
                login: {
                    ...state.login,
                    errorsLogin: action.errorsLogin ? action.errorsLogin : {}
                }
            };
        case REGISTER:
            return {
                ...state,
                register: {
                    ...state.register,
                    portfolio_id: action.portfolio_id ? action.portfolio_id : null,
                    portfolio_companies_score: action.portfolio_companies_score ? action.portfolio_companies_score : null,
                    errorsRegister: action.errorsRegister ? action.errorsRegister : null,
                    registerSuccess: action.registerSuccess ? action.registerSuccess : false 
                }
            };
        case GET_ME:
            return {
                ...state,
                user: action.user ? action.user : null,
                errors: action.errors ? action.errors : null
            };
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.status,
                token: action.token
            };
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null,
                user: null
            };
        case ERROR_GET_ME:
            return {
                ...state,
                user: null,
                errors: action.errors
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.updatedFields
                },
                errorsUpdateUser: action.errors ? action.errors : state.errorsUpdateUser
            };
        case TRANSACTION_HISTORY : {
            return{
                ...state,
                auth : {...state.auth, transactionHistory : {...action.payload}}
            }
        }
        default:
            return state
    }
}