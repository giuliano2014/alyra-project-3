import { useState } from "react";

const GetOneProposal = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [proposal, setProposal] = useState({});
    const [proposalId, setProposalId] = useState("");

    const getOneProposal = async () => {
        if (!proposalId) {
            alert("Please enter a correct proposal ID");
            return;
        }

        try {
            const result = await contract.methods.getOneProposal(proposalId).call({ from: accounts[0] });
            setProposal({ description: result.description, voteCount: result.voteCount });
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };

    const handleInputChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setProposalId(e.target.value);
        }
    };

    return (
        <div>
            <label htmlFor="proposal-id">Get a specific Proposal</label>
            <input
                id="proposal-id"
                onChange={handleInputChange}
                placeholder="Proposal ID"
                type="text"
                value={proposalId}
            />
            <button onClick={getOneProposal}>getOneProposal</button>
            <span>Description {proposal.description} / Vote count {proposal.voteCount}</span>
            {error}
        </div>
    );
}

export default GetOneProposal;
