import {createSlice} from '@reduxjs/toolkit';
import {accountTypes} from "./accountTypes";

const accountInitialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};