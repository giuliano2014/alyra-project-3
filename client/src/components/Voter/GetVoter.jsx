import { useState } from "react";

const GetVoter = ({ accounts, contract }) => {
    const [voterAddress, setVoterAddress] = useState("");
    const [voter, setVoter] = useState(["", "", ""]);
    const [error, setError] = useState();

    const handleInputChange = e => {
        setVoterAddress(e.target.value);
    };

    const getVoter = async () => {
        if (voterAddress === "") {
            alert("Please enter a value to write.");
            return;
        }

        try {
            const result = await contract.methods.getVoter(voterAddress).call({ from: accounts[0] });
            setVoter(result);
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };
    return (
        <div>
            <label htmlFor="voterAddress">Get a specific voter</label>
            <input id="voterAddress" type="text" placeholder="Address" value={voterAddress}
                onChange={handleInputChange} />
            <button onClick={getVoter}>getVoter</button>
            <span >
                Voter: isRegistered <strong>{`${voter[0]}`}</strong>/ hasVoted <strong>{`${voter[1]}`}</strong>/
                votedProposalId <strong>{`${voter[2]}`}</strong>


            </span>
            {error}
        </div>
    )
}
export default GetVoter;
