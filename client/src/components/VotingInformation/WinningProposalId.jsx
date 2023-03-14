import { useEffect, useState } from "react";

const WinningProposalId = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [winningProposalId, setWinningProposalId] = useState();

    useEffect(() => {
        getWinningProposalId();
    }, [accounts, contract]);

    const getWinningProposalId = async () => {
        if (!contract) return;

        try {
            const winningProposalId = await contract.methods.winningProposalID().call({ from: accounts[0] });
            setWinningProposalId(winningProposalId);
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };

	return (
        <>
            {error}
            <h4>Winning proposal ID : {winningProposalId === "0" ? "Voting is still ongoing" : winningProposalId}</h4>
        </>
	);
};

export default WinningProposalId;
