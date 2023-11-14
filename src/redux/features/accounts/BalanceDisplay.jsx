import {connect} from "react-redux";

function formatCurrency(value) {
    return new Intl.NumberFormat("en", {
        style: "currency", currency: "USD",
    }).format(value);
}

function BalanceDisplay({balance, loanOutstanding}) {

    return (<>
            <div className="balance">
                {formatCurrency(balance)}
            </div>
            <div className="balance">
                {formatCurrency(loanOutstanding)}
            </div>
        </>);
}

function mapStateToProps(state) {
    return {
        balance: state.account.balance, loanOutstanding: state.account.loanOutstanding
    };
}

export default connect(mapStateToProps)(BalanceDisplay);