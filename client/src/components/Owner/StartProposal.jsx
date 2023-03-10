import { useState } from "react";

const StartProposal = ({ accounts, contract }) => {
    const [error, setError] = useState()

    const startProposal = () => {
        contract.methods.startProposalsRegistering().call({ from: accounts[0] })
            .then(result => {
                return contract.methods.startProposalsRegistering().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };
    return (
        <div>
            <label>Start proposals registering</label>
            <button onClick={startProposal}>startProposalsRegistering</button>
            {error}
        </div>
    )
}
export default StartProposal;
