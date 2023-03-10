const VoterContainer = () => {
  return (
    <div>
      <hr />
      <h2>Voter</h2>
      <div>
        <label htmlFor="voterAddress">Get a specific voter</label>
        <input id="voterAddress" type="text" placeholder="Address" />
        <button>getVoter</button>
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
