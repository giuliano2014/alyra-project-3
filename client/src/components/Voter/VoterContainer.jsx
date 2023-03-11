import useEth from "../../contexts/EthContext/useEth";
import AddProposal from "./AddProposal";
import GetOneProposal from "./GetOneProposal";
import SetVote from "./SetVote";


const VoterContainer = () => {
  const { state: { accounts, contract } } = useEth();

  return (
    <div>
      <hr />
      <h2>Voter</h2>
      <AddProposal accounts={accounts} contract={contract} />
      <GetOneProposal accounts={accounts} contract={contract} />
      <SetVote accounts={accounts} contract={contract} />
      <div>
        <label htmlFor="voterAddress">Get a specific voter</label>
        <input id="voterAddress" type="text" placeholder="Address" />
        <button>getVoter</button>
      </div>
    </div>
  );
}

export default VoterContainer;
