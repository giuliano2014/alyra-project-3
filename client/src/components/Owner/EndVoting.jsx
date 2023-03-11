import { useState } from "react";

const EndVoting = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const endVotingSession = () => {
        contract.methods.endVotingSession().call({ from: accounts[0] })
            .then(result => {
                contract.methods.endVotingSession().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div>
            <label>End voting session</label>
            <button onClick={endVotingSession}>endVotingSession</button>
            {error}
        </div>
    );
}

export default EndVoting;
