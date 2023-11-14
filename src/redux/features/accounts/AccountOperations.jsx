import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit as depositToAccount, withdraw as withdrawFromAccount, requestLoan, payLoan as paymentToLoan } from './accountSlice';

export default function AccountOperations() {
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawalAmount, setWithdrawalAmount] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentPurpose, setPaymentPurpose] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");

    const dispatch = useDispatch();
    const {
        loan: currentLoan,
        loanPurpose: currentLoanPurpose,
        loanOutstanding,
        balance,
        isLoading,
    } = useSelector((store) => store.account);

    function handleDeposit() {
        if (!depositAmount) {
            return;
        }

        /*dispatch(depositToAccount(depositAmount, currency));*/
        dispatch((depositToAccount(depositAmount)));
        setDepositAmount("");
        setCurrency("USD");
    }

    function handleWithdrawal(){
        if (!withdrawalAmount) {
            return;
        }
        dispatch(withdrawFromAccount(withdrawalAmount));
        setWithdrawalAmount("");
    }

    function handleRequestLoan() {
        if (!loanAmount || !loanPurpose) {
            return;
        }
        dispatch(requestLoan(loanAmount, loanPurpose));
        setLoanAmount("");
        setLoanPurpose("");
    }

    function handleLoanPayment() {
        if (!paymentAmount || !paymentPurpose) {
            return;
        }
        dispatch(paymentToLoan(paymentAmount, paymentPurpose));
        setPaymentAmount("");
        setPaymentPurpose("");
    }

    return (
        <div>
            <h3 className={'heading-tertiary'}>Account Transactions</h3>
            <div className="inputs">
                <div className={'form-transaction'}>
                    <label>Deposit</label>
                    <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(+e.target.value)}
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">British Pound</option>
                    </select>

                    <button onClick={handleDeposit} disabled={isLoading}>
                        {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
                    </button>
                </div>

                <div className={'form-transaction'}>
                    <label>Withdraw</label>
                    <input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(+e.target.value)}
                    />
                    <button onClick={handleWithdrawal}>
                        Withdraw {withdrawalAmount}
                    </button>
                </div>

                <div className={'form-transaction'}>
                    <label>Request loan</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(+e.target.value)}
                        placeholder="Loan amount"
                    />
                    <input
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                        placeholder="Loan purpose"
                    />
                    <button onClick={handleRequestLoan}>Request loan</button>
                </div>

                { loanOutstanding > 0 && (
                    <div className={'form-transaction'}>
            <span>
              Pay back ${loanOutstanding} ({currentLoanPurpose})
            </span>
                        <label>Loan Payment</label>
                        <input
                            type="number"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(+e.target.value)}
                        />
                        <input
                            value={paymentPurpose}
                            onChange={(e) => setPaymentPurpose(e.target.value)}
                            placeholder="Loan purpose"
                        />
                        <button onClick={handleLoanPayment}>
                            {paymentAmount} Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}