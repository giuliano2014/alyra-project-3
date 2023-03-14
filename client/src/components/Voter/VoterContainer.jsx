import useEth from "../../contexts/EthContext/useEth";
import useRegisteredVoters from "../../hooks/useRegisteredVoters";
import AddProposal from "./AddProposal";
import GetOneProposal from "./GetOneProposal";
import GetVoter from "./GetVoter";
import SetVote from "./SetVote";

const VoterContainer = () => {
    const { state: { accounts, contract } } = useEth();
    const [error, isVoter] = useRegisteredVoters(accounts, contract);

    if (!isVoter) return null;

    return (
        <div>
            <hr />
            <h2>Voter</h2>
            {error}
            <AddProposal accounts={accounts} contract={contract} />
            <GetOneProposal accounts={accounts} contract={contract} />
            <SetVote accounts={accounts} contract={contract} />
            <GetVoter accounts={accounts} contract={contract} />
        </div>
    );
}

export default VoterContainer;
