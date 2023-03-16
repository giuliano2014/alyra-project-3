import { useEffect, useState } from "react";

const WinningProposalId = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [winningProposalId, setWinningProposalId] = useState();

    useEffect(() => {
        window.addEventListener("tallyVotesEvent", tallyVotesEventCallback);

        return () => {
            window.removeEventListener("tallyVotesEvent", tallyVotesEventCallback);
        };
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

    const tallyVotesEventCallback = event => {
        if (event.done) {
            getWinningProposalId();
        }

        if (!event.done) {
            setWinningProposalId();
        }
    };

	return (
        <>
            {error && <p className="text-danger">{error}</p>}
            <h6>Winning proposal ID : {winningProposalId ??  "Voting is still ongoing ..."}</h6>
        </>
	);
};

export default WinningProposalId;
