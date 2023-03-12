import { useEffect, useState } from "react";

const AddVoter = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [newVoter, setNewVoter] = useState(undefined);
    const [voterAddress, setVoterAddress] = useState("");

    const voterRegisteredEvent = async () => {
        if (!contract) return;

        await contract.events.VoterRegistered({ fromBlock: "earliest" })
            .on('data', event => {
                setNewVoter(event.returnValues.voterAddress);
            })
            .on('error', (error, receipt) => {
                console.log('receipt', receipt);
                setError(error);
            });
    };

    useEffect(() => {
        voterRegisteredEvent();
    }, [contract]);

    const handleAddVoter = async () => {
        if (!contract) return;

        if (voterAddress === "") {
            setError("Please enter a valid voter address");
            return;
        }

        setNewVoter(undefined);
        await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
        setVoterAddress("");
    };

    const handleInputChange = (event) => {
        setVoterAddress(event.target.value);
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {newVoter && <p>New voter {newVoter} have been added</p>}
            <label htmlFor="voter-address">Add a voter</label>
            <input
                id="voter-address"
                onChange={handleInputChange}
                placeholder="Voter address"
                type="text"
                value={voterAddress}
            />
            <button onClick={handleAddVoter}>addVoter</button>
        </div>
    );
};

export default AddVoter;
