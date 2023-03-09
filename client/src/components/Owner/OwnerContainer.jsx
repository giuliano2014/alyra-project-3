import useEth from "../../contexts/EthContext/useEth";
import AddVoter from "./AddVoter";

const OwnerContainer = () => {
  const { state: { accounts, contract } } = useEth();

  return (
    <div>
      <h2>Owner</h2>
      <AddVoter accounts={accounts} contract={contract} />
      <div>
        <label>Start proposals registering</label>
        <button>startProposalsRegistering</button>
      </div>
      <div>
        <label>End proposals registering</label>
        <button>endProposalsRegistering</button>
      </div>
      <div>
        <label>Start voting session</label>
        <button>startVotingSession</button>
      </div>
      <div>
        <label>End voting session</label>
        <button>endVotingSession</button>
      </div>
      <div>
        <label>Tally votes</label>
        <button>tallyVotes</button>
      </div>
    </div>
  );
};

export default OwnerContainer;
