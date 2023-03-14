import useEth from "../../contexts/EthContext/useEth";
import useOwnerAddress from "../../hooks/useOwnerAddress";
import useRegisteredVoters from "../../hooks/useRegisteredVoters";
import ProposalList from "./ProposalList";
import WinningProposalId from "./WinningProposalId";

const VotingInformationContainer = () => {
	const { state: { accounts, contract } } = useEth();
	const [isOwner] = useOwnerAddress(accounts, contract);
	const [error, isVoter] = useRegisteredVoters(accounts, contract);

	if (!isOwner && !isVoter) {
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
			<WinningProposalId accounts={accounts} contract={contract} />
			{isVoter && <ProposalList accounts={accounts} contract={contract} />}
		</div>
	);
};

export default VotingInformationContainer;
