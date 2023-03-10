import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import GetVoter from "./GetVoter";


const VoterContainer = () => {
  const { state: { contract, accounts } } = useEth();

  return (
    <div>
      <h2>Voter</h2>
      <GetVoter accounts={accounts} contract={contract} />
      <div>
        <label htmlFor="proposalId">Get one proposal</label>
        <input id="proposalId" type="number" placeholder="Enter a number" />
        <button>getOneProposal</button>
      </div>
      <div>
        <label htmlFor="newProposal">Add a proposal</label>
        <input id="newProposal" type="text" placeholder="Description" />
        <button>addProposal</button>
      </div>
      <div>
        <label htmlFor="proposalChoice">Set your vote</label>
        <input id="proposalChoice" type="number" placeholder="Enter a number" />
        <button>setVote</button>
      </div>
    </div>
  );
}

export default VoterContainer;
