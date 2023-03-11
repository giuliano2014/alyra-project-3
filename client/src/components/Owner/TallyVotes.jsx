import { useState } from "react";

const TallyVotes = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const tallyVotes = () => {
        contract.methods.tallyVotes().call({ from: accounts[0] })
            .then(result => {
                contract.methods.tallyVotes().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div>
            <label>Tally Votes</label>
            <button onClick={tallyVotes}>tallyVotes</button>
            {error}
        </div>
    );
}

export default TallyVotes;
