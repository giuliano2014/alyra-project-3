import { useState } from "react";

const SetVote = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [proposalId, setProposalId] = useState("");

    const handleInputChange = (event) => {
        if (/^\d+$|^$/.test(event.target.value)) {
            setProposalId(event.target.value);
        }
    };

    const setVote = () => {
        if (!proposalId) {
            alert("Please enter a correct proposal ID");
            return;
        }
    
        contract.methods.setVote(proposalId).call({ from: accounts[0] })
            .then(result => {
                contract.methods.setVote(proposalId).send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div>
            <label htmlFor="set-your-vote">Set your vote</label>
            <input
                id="set-your-vote"
                onChange={handleInputChange}
                placeholder="Proposal ID"
                type="text"
                value={proposalId}
            />
            <button onClick={setVote}>setVote</button>
            {error}
        </div>
    );
};

export default SetVote;
