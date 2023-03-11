import { useEffect, useState } from "react";

const GetOneProposal = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [proposal, setProposal] = useState({});
    const [proposalId, setProposalId] = useState("");

    const handleInputChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setProposalId(e.target.value);
        }
    };

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

    useEffect(() => {
        console.log("proposal", proposal);
    }, [proposal]);

    return (
        <div>
            <label htmlFor="proposalId">Get a specific Proposal</label>
            <input
                id="proposalId"
                type="text"
                onChange={handleInputChange}
                placeholder="Number"
                value={proposalId}
            />
            <button onClick={getOneProposal}>getOneProposal</button>
            <span>description {proposal.description} / voteCount {proposal.voteCount}</span>
            {error}
        </div>
    )
}

export default GetOneProposal;
