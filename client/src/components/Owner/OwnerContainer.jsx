import { useEffect, useState } from "react";

import useEth from "../../contexts/EthContext/useEth";
import AddVoter from "./AddVoter";
import StartProposal from "./StartProposal";
import EndProposal from "./EndProposal";
import StartVoting from "./StartVoting";
import EndVoting from "./EndVoting";




const OwnerContainer = () => {
  const { state: { accounts, contract } } = useEth();
  const [isOwner, setIsOwner] = useState(false);

  const getOwnerAddress = async () => {
    if (!contract) return;
    const ownerAddress = await contract.methods.owner().call();
    accounts[0] === ownerAddress ? setIsOwner(true) : setIsOwner(false);
  }

  useEffect(() => { getOwnerAddress() }, [contract]);

  if (!isOwner) return null;

  return (
    <div>
      <hr />
      <h2>Owner</h2>
      <AddVoter accounts={accounts} contract={contract} />
      <StartProposal accounts={accounts} contract={contract} />
      <div>
        <EndProposal accounts={accounts} contract={contract} />
      </div>
      <div>
        <StartVoting accounts={accounts} contract={contract} />
      </div>
      <div>
        <EndVoting accounts={accounts} contract={contract} />
      </div>
      <div>
        <label>Tally votes</label>
        <button>tallyVotes</button>
      </div>
    </div>
  );
};

export default OwnerContainer;
