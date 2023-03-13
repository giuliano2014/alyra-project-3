import useEth from "../../contexts/EthContext/useEth";
import useRegisteredVoters from "../../hooks/useRegisteredVoters";
import AddProposal from "./AddProposal";
import GetOneProposal from "./GetOneProposal";
import SetVote from "./SetVote";

const VoterContainer = () => {
    const { state: { accounts, contract } } = useEth();
    const [isVoter, error] = useRegisteredVoters(contract, accounts);

    if (!isVoter) return null;

    return (
        <div>
            <hr />
            <h2>Voter</h2>
            {error}
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
