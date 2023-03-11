import { useState } from "react";

const EndProposal = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const endProposalsRegistering = async () => {
        try {
            await contract.methods.endProposalsRegistering().call({ from: accounts[0] });
            await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };

    return (
        <div>
            <label>End proposals registering</label>
            <button onClick={endProposalsRegistering}>endProposalsRegistering</button>
            {error}
        </div>
    );
}

export default EndProposal;
