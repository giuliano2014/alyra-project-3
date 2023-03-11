import useEth from "../../contexts/EthContext/useEth";
import ProposalList from "./ProposalList";

const VotingInformationContainer = () => {
  const { state: { accounts, contract } } = useEth();

  return (
    <div>
      <h2>Voting information</h2>
      <h4>Winning proposal ID : xx</h4>
      <ProposalList accounts={accounts} contract={contract} />
    </div>
  );
};

export default VotingInformationContainer;
