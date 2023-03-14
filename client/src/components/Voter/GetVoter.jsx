import { useState } from "react";

const GetVoter = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [voter, setVoter] = useState(undefined);
    const [voterAddress, setVoterAddress] = useState("");

    // const getVoter = () => {
    //     if (!contract) return;

    //     if (voterAddress === "") {
    //         setError("Please enter a correct address");
    //         return;
    //     }

    //     contract.methods.getVoter(voterAddress).call({ from: accounts[0] })
    //         .then(result => {
    //             const { hasVoted, isRegistered, votedProposalId } = result;
    //             const formatHasVoted = hasVoted ? "Yes" : "No";
    //             const formatIsRegistered = isRegistered ? "Yes" : "No";
    //             setVoter({ hasVoted: formatHasVoted, isRegistered: formatIsRegistered, votedProposalId: votedProposalId });
    //             setVoterAddress("");
    //         })
    //         .catch(error => {
    //             setError(error.message.match(/revert (.*)/)[1]);
    //         });
    // };

    const getVoter = async () => {
        if (!contract) return;

        if (!voterAddress) {
            setError("Please enter a correct address");
            return;
        }
        
        try {
            const { hasVoted, isRegistered, votedProposalId } = await contract.methods.getVoter(voterAddress).call({ from: accounts[0] });
            setVoter({ hasVoted: hasVoted ? "Yes" : "No", isRegistered: isRegistered ? "Yes" : "No", votedProposalId });
            setVoterAddress("");
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };

    const handleInputChange = (event) => {
        setVoterAddress(event.target.value);
    };

    return (
        <div>
            {error}
            {voter && <p>hasVoted : {voter.hasVoted} / isRegistered: {voter.isRegistered} / votedProposalId: {voter.votedProposalId}</p>}
            <label htmlFor="voter-address">Get a specific voter</label>
            <input
                id="voter-address"
                onChange={handleInputChange}
                placeholder="Address"
                type="text"
                value={voterAddress}
            />
            <button onClick={getVoter}>getVoter</button>
        </div>
    );
};

export default GetVoter;
