import {createSlice} from '@reduxjs/toolkit';
import {accountTypes} from "./accountTypes";

const accountInitialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    loanOutstanding: 0,
    isLoading: false,
};


export default function accountReducer( state = accountInitialState, action) {
    switch(action.type) {
        case accountTypes.ACCOUNT_WITHDRAW:
            return {
                ...state, balance: state.balance - action.payload
            }
        case accountTypes.ACCOUNT_DEPOSIT:
            return {
                ...state, balance: state.balance + action.payload, isLoading: false
            }
        case accountTypes.LOAN_REQUEST:
            if (state.loan > 0) {
                return state;
            }
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                loanOutstanding: action.payload.amount
                /*balance: state.balance + action.payload.amount,*/
            }
        case accountTypes.LOAN_PAYMENT:
            return {
                ...state,
                /*loan: 0,*/
                loanPurpose: action.payload.purpose,
                loanOutstanding: state.loanOutstanding - action.payload.amount
/*                balance: state.balance - action.payload.amount,*/

                /*loan: state.balance - action.payload.amount*/
            }
        case accountTypes.ACCOUNT_DEPOSIT:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}

export function depositToAccount(amount, currency) {
    if (currency === "USD") {
        return {type: accountTypes.ACCOUNT_DEPOSIT, payload: amount};
    }
    return async function (dispatch, getState) {

        dispatch({ type: accountTypes.CONVERT_CURRENCY });

        const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
        );
        const data = await res.json();
        const convertedCurrency = data.rates.USD;

        dispatch({ type: accountTypes.ACCOUNT_DEPOSIT, payload: convertedCurrency });
    };

}

export function withdrawFromAccount(amount) {
    return {type: accountTypes.ACCOUNT_WITHDRAW, payload: amount};
}

export function requestLoan(amount, purpose) {
    return {
        type: accountTypes.LOAN_REQUEST, payload: {amount, purpose}
    };
}

export function paymentToLoan(amount, purpose) {
    return {
        type: accountTypes.LOAN_PAYMENT, payload: {
            amount, purpose
        }
    }
}