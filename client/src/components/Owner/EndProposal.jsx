import { useState } from "react";

const EndProposal = ({ accounts, contract }) => {
    const [error, setError] = useState()

    const endProposal = () => {
        contract.methods.endProposalsRegistering().call({ from: accounts[0] })
            .then(result => {
                return contract.methods.endProposalsRegistering().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div>
            <label>end proposals registering</label>
            <button onClick={endProposal}>endProposalsRegistering</button>
            {error}
        </div>
    )
}

export default EndProposal;
