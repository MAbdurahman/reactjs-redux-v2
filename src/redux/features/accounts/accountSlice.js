/*import {createSlice} from '@reduxjs/toolkit';*/
import {accountTypes} from "./accountTypes";
/*
const initialState = {
    balance: 0, loan: 0, loanPurpose: "", loanOutstanding: 0, isLoading: false,
};


const accountSlice = createSlice({
    name: "account", initialState, reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose },
                };
            },
            reducer(state, action) {
                if (state.loan > 0) {
                    return;
                }
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.loanOutstanding = state.loan;
            },
            payLoan(state, action) {
                state.loanPurpose = action.payload.purpose;
                    state.loanOutstanding -= action.payload.amount;
            }
        }
    }
});

console.log(accountSlice)

export const {deposit, withdraw, requestLoan, payLoan} = accountSlice.actions;

export default accountSlice.reducer;*/


const accountInitialState = {
    balance: 0, loan: 0, loanPurpose: "", loanOutstanding: 0, isLoading: false,
};

export default function accountReducer(state = accountInitialState, action) {
    switch (action.type) {
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
            if (state.loan === 0 || state.loan < 0) {
                return {
                    ...state,
                    loan: action.payload.amount,
                    loanPurpose: action.payload.purpose,
                    loanOutstanding: action.payload.amount
                }

            }
        case accountTypes.LOAN_PAYMENT:
            if (state.loanOutstanding < action.payload.amount) {
                return state;
            }
            if (state.loanOutstanding < action.payload.amount) {
                return {
                    ...state,
                    loanPurpose: action.payload.purpose,
                    loanOutstanding: state.loanOutstanding - action.payload.amount

                }
            } else {
                return {
                    ...state,
                    loanPurpose: action.payload.purpose,
                    loanOutstanding: state.loanOutstanding - action.payload.amount,
                    loan: Number(0),
                }
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

        dispatch({type: accountTypes.CONVERT_CURRENCY});

        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const convertedCurrency = data.rates.USD;

        dispatch({type: accountTypes.ACCOUNT_DEPOSIT, payload: convertedCurrency});
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