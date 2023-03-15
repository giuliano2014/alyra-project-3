import useEth from "../../contexts/EthContext/useEth";
import useOwnerAddress from "../../hooks/useOwnerAddress";
import AddVoter from "./AddVoter";
import EndProposal from "./EndProposal";
import EndVoting from "./EndVoting";
import StartProposal from "./StartProposal";
import StartVoting from "./StartVoting";
import TallyVotes from "./TallyVotes";

const OwnerContainer = () => {
    const { state: { accounts, contract } } = useEth();
    const [isOwner] = useOwnerAddress(accounts, contract);

    if (!isOwner) return null;

    return (
        <div>
            <hr />
            <h4 className="mt-4">Owner dashboard</h4>
            <AddVoter accounts={accounts} contract={contract} />
            <StartProposal accounts={accounts} contract={contract} />
            <EndProposal accounts={accounts} contract={contract} />
            <StartVoting accounts={accounts} contract={contract} />
            <EndVoting accounts={accounts} contract={contract} />
            <TallyVotes accounts={accounts} contract={contract} />
        </div>
    );
};

export default OwnerContainer;
