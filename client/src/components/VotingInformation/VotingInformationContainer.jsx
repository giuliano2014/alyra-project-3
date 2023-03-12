import { useEffect, useState } from "react";

import useEth from "../../contexts/EthContext/useEth";
import ProposalList from "./ProposalList";

const VotingInformationContainer = () => {
	const { state: { accounts, contract } } = useEth();
	const [error, setError] = useState();
	const [isOwner, setIsOwner] = useState(false);
	const [isVoter, setIsVoter] = useState(false);

	useEffect(() => { 
		getOwnerAddress();
		getRegisteredVoters();
	}, [contract]);

	const getOwnerAddress = async () => {
		if (!contract) return;

		const ownerAddress = await contract.methods.owner().call();
		accounts[0] === ownerAddress ? setIsOwner(true) : setIsOwner(false);
	}

	const getRegisteredVoters = async () => {
		if (!contract) return;

		try {
			const events = await contract.getPastEvents('VoterRegistered', {
				fromBlock: 0,
				toBlock: 'latest'
			});

			const isRegisterdVoter = events.some(user => {
				return user.returnValues.voterAddress === accounts[0];
			});

			setIsVoter(isRegisterdVoter);
		} catch (error) {
			setError(error.message.match(/revert (.*)/)[1]);
		}
	};

	if (!isVoter && !isOwner ) {
		return (
			<>
				{error}
				<h4>You are not a voter</h4>
			</>
		);
	};

	return (
		<div>
			<h2>Voting information</h2>
			{error}
			<h4>Winning proposal ID : xx</h4>
			{!isOwner && <ProposalList accounts={accounts} contract={contract} />}
		</div>
	);
};

export default VotingInformationContainer;
