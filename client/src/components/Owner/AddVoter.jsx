import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { useEffect, useState } from "react";

const AddVoter = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [newVoter, setNewVoter] = useState(undefined);
    const [voterAddress, setVoterAddress] = useState("");

    useEffect(() => {
        voterRegisteredEvent();
    }, [contract]);

    const addVoter = async () => {
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

    const voterRegisteredEvent = async () => {
        if (!contract) return;

        await contract.events.VoterRegistered({ fromBlock: "earliest" })
            .on('data', event => {
                setNewVoter(event.returnValues.voterAddress);
            })
            .on('error', (error, receipt) => {
                console.log('receipt', receipt);
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div>
            {error}
            {newVoter && <p>New voter {newVoter} have been successfully added</p>}
            <label htmlFor="voter-address">Add a voter</label>
            <input
                id="voter-address"
                onChange={handleInputChange}
                placeholder="Voter address"
                type="text"
                value={voterAddress}
            />
            <button onClick={addVoter}>addVoter</button>
            <hr />
            

            <FormGroup>
    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    size="small"
                />
    <Button variant="outlined" size="large">Primary</Button>
  </FormGroup>

            
        </div>
    );
};

export default AddVoter;
