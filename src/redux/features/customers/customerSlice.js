
import {createSlice} from '@reduxjs/toolkit';
import {customerTypes} from "./customerTypes";


const customerInitialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
}

export default function customerReducer (state = customerInitialState, action) {
    switch(action.type) {
        case customerTypes.CREATE_CUSTOMER:
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case customerTypes.UPDATE_CUSTOMER:
            return {
                ...state, fullName: action.payload
            }
        default:
            return state;
    }
}

export function createCustomer(fullName, nationalID) {
    return {type: customerTypes.CREATE_CUSTOMER, payload: {fullName, nationalID}}

}

export function updateCustomer(fullName) {
    return {type: customerTypes.UPDATE_CUSTOMER, payload: fullName}
}