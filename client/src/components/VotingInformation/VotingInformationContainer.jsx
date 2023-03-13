import useEth from "../../contexts/EthContext/useEth";
import useGetOwnerAddress from "../../hooks/useGetOwnerAddress";
import useRegisteredVoters from "../../hooks/useRegisteredVoters";
import ProposalList from "./ProposalList";

const VotingInformationContainer = () => {
	const { state: { accounts, contract } } = useEth();
	const [isOwner] = useGetOwnerAddress(accounts, contract);
	const [isVoter, error] = useRegisteredVoters(contract, accounts);

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
