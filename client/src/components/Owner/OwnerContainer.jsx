import { useEffect, useState } from "react";

import useEth from "../../contexts/EthContext/useEth";
import AddVoter from "./AddVoter";
import EndProposal from "./EndProposal";
import EndVoting from "./EndVoting";
import StartProposal from "./StartProposal";
import StartVoting from "./StartVoting";
import TallyVotes from "./TallyVotes";

const OwnerContainer = () => {
  const { state: { accounts, contract } } = useEth();
  const [isOwner, setIsOwner] = useState(false);

  const getOwnerAddress = async () => {
    if (!contract) return;
    const ownerAddress = await contract.methods.owner().call();
    accounts[0] === ownerAddress ? setIsOwner(true) : setIsOwner(false);
  }

  useEffect(() => { getOwnerAddress() }, [contract]);

  // if (!isOwner) return null;

  return (
    <div>
      <hr />
      <h2>Owner</h2>
      <AddVoter accounts={accounts} contract={contract} />
      <StartProposal accounts={accounts} contract={contract} />
      <EndProposal accounts={accounts} contract={contract} />
      <div>
        <StartVoting accounts={accounts} contract={contract} />
      </div>
      <div>
        <EndVoting accounts={accounts} contract={contract} />
      </div>
      <div>
        <TallyVotes accounts={accounts} contract={contract} />
      </div>
    </div>
  );
};

export default OwnerContainer;
