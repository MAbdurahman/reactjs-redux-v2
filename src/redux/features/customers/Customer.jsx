import { useSelector } from "react-redux";

export default function Customer() {
    const customer = useSelector((store) => store.customer.fullName);

    return (
        <div>
            <h2>👋 Welcome, {customer}</h2>;
        </div>

    );
}