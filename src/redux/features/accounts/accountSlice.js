import {createSlice} from '@reduxjs/toolkit';
import {accountTypes} from "./accountTypes";

const accountInitialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
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
                ...state, balance: state.balance + action.payload
            }
        case accountTypes.LOAN_REQUEST:
            if (state.loan > 0) {
                return state;
            }
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            }
        case accountTypes.LOAN_PAYMENT:
            return {
                ...state,
                /*loan: 0,*/
                loanPurpose: action.payload.purpose,
                balance: state.balance - action.payload.amount,
                loan: state.balance - action.payload.amount
            }
        default:
            return state;
    }
}

export function depositToAccount(amount) {
    return {type: accountTypes.ACCOUNT_DEPOSIT, payload: amount};

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
        type: accountTypes.PAYMENT_TO_LOAN, payload: {
            amount, purpose
        }
    }
}