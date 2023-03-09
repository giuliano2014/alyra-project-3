import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";


const VoterContainer = () => {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [voter, setVoter] = useState(["", "", ""]);
  const [error, setError] = useState();

  const handleInputChange = e => {
    // if (/^\d+$|^$/.test(e.target.value)) {
    setInputValue(e.target.value);
    // }
  };

  const getVoter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputValue;
    await contract.methods.getVoter(newValue).call({ from: accounts[0] }, function (error, result) {
      if (error) {
        setError(error.message.match(/revert (.*)/)[1]); // Affiche le message d'erreur du require()
      } else {
        setVoter(result);
      }
    });

  };
  return (
    <div>
      <h2>Voter</h2>
      <div>
        <label htmlFor="voterAddress">Get a specific voter</label>
        <input id="voterAddress" type="text" placeholder="Address" value={inputValue}
          onChange={handleInputChange} accounts={accounts} contract={contract} />
        <button onClick={getVoter} accounts={accounts} contract={contract}>getVoter</button>
        <span className="secondary-color" >
          Voter: isRegistered <strong>{`${voter[0]}`}</strong>/ hasVoted <strong>{`${voter[1]}`}</strong>/
          votedProposalId <strong>{`${voter[2]}`}</strong>


        </span>
        {error}
      </div>
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
