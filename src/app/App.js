import {useSelector} from "react-redux";
import AccountOperations from "../redux/features/accounts/AccountOperations";
import BalanceDisplay from "../redux/features/accounts/BalanceDisplay";
import CustomerOperations from "../redux/features/customers/CustomerOperations";
import Customer from "../redux/features/customers/Customer";

export default function App() {
    const fullName = useSelector((state) => state.customer.fullName);

    return (
        <div>
            <h1 className={'heading-primary align-center'}>The State Bank </h1>
            {fullName === "" ? (
                <CustomerOperations />
            ) : (
                <>
                    <Customer />
                    <AccountOperations />
                    <BalanceDisplay />
                </>
            )}
        </div>

    );
}