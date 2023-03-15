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
				<h6>You are not a voter</h6>
				<p className="text-danger">{error}</p>
			</>
		);
	};

	return (
		<div>
			<h4>Voting information</h4>
			<p className="text-danger">{error}</p>
			<WinningProposalId accounts={accounts} contract={contract} />
			{isVoter && <ProposalList accounts={accounts} contract={contract} />}
		</div>
	);
};

export default VotingInformationContainer;
