import useEth from "../../contexts/EthContext/useEth";
import ProposalList from "./ProposalList";

const VotingInformationContainer = () => {
  const { state: { contract } } = useEth();

  return (
    <div>
      <h2>Voting information</h2>
      <h4>Winning proposal ID : xx</h4>
      <ProposalList contract={contract} />
    </div>
  );
};

export default VotingInformationContainer;
