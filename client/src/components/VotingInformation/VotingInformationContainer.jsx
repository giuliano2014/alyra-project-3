import { useEffect, useState } from "react";

import useEth from "../../contexts/EthContext/useEth";
import ProposalList from "./ProposalList";

const VotingInformationContainer = () => {
  const { state: { accounts, contract } } = useEth();
  const [isOwner, setIsOwner] = useState(false);

    const getOwnerAddress = async () => {
        if (!contract) return;

        const ownerAddress = await contract.methods.owner().call();
        accounts[0] === ownerAddress ? setIsOwner(true) : setIsOwner(false);
    }

    useEffect(() => { getOwnerAddress() }, [contract]);

  return (
    <div>
      <h2>Voting information</h2>
      <h4>Winning proposal ID : xx</h4>
      {!isOwner && <ProposalList accounts={accounts} contract={contract} />}
    </div>
  );
};

export default VotingInformationContainer;
