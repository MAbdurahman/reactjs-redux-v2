import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

export default function CustomerOperations() {
    const [fullName, setFullName] = useState("");
    const [nationalId, setNationalId] = useState("");

    const dispatch = useDispatch();

    function handleClick() {
        if (!fullName || !nationalId) {
            return;
        }
        dispatch(createCustomer(fullName, nationalId));
    }

    return (
        <div>
            <h2 className={'heading-secondary align-center'}>Create New Customer</h2>
            <div className="inputs">
                <div className={'form-input'}>
                    <label>Customer Name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className={'form-input'}>
                    <label>National ID</label>
                    <input
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>
                <button onClick={handleClick}>Create new customer</button>
            </div>
        </div>
    );
}