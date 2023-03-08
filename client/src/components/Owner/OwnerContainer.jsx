const OwnerContainer = () => {
  return (
    <div>
      <h2>Owner</h2>
      <div>
        <label htmlFor="voterAddress">Add a voter</label>
        <input id="voterAddress" type="text" placeholder="Address" />
        <button>addVoter</button>
      </div>
      <div>
        <label>Start proposals registering</label>
        <button>startProposalsRegistering</button>
      </div>
      <div>
        <label>End proposals registering</label>
        <button>endProposalsRegistering</button>
      </div>
      <div>
        <label>Start voting session</label>
        <button>startVotingSession</button>
      </div>
      <div>
        <label>End voting session</label>
        <button>endVotingSession</button>
      </div>
      <div>
        <label>Tally votes</label>
        <button>tallyVotes</button>
      </div>
    </div>
  );
}

export default OwnerContainer;
