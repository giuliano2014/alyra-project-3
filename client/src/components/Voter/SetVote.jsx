import { useState } from "react";

const SetVote = ({ accounts, contract }) => {
    const [uint, setUint] = useState("");
    const [error, setError] = useState()


    const handleVote = async () => {
        contract.methods.setVote(uint).call({ from: accounts[0] })
            .then(result => {
                return contract.methods.setVote(uint).send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    const handleInputChange = (event) => {
        if (/^\d+$|^$/.test(event.target.value)) {
            setUint(event.target.value);
        }
    };

    return (
        <div>
            <label htmlFor="description">set your vote</label>
            <input
                id="uint"
                type="text"
                placeholder="uint"
                value={uint}
                onChange={handleInputChange}
            />
            <button onClick={handleVote}>setVote</button>
            {error}

        </div>
    );
};

export default SetVote;
