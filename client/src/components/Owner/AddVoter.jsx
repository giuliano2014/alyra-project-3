import { useEffect, useState } from "react";
import { Alert, Button, Form } from 'react-bootstrap';

const AddVoter = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [newVoter, setNewVoter] = useState(undefined);
    const [voterAddress, setVoterAddress] = useState("");

    useEffect(() => {
        voterRegisteredEvent();
    }, [contract, newVoter]);

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
        <>
            {newVoter &&
                <Alert
                    dismissible
                    onClose={() => setNewVoter(undefined)}
                    variant="success"
                >
                    <p>New voter {newVoter} have been successfully added</p>
                </Alert>
            }
            <Form>
                <Form.Group className="mb-3" controlId="voterAddress">
                    <Form.Label>Add a voter</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        placeholder="Voter address"
                        type="text"
                        value={voterAddress}
                    />
                    {error && 
                        <Form.Text className="text-danger">
                            {error}
                        </Form.Text>
                    }
                </Form.Group>
                <Button
                    onClick={addVoter}
                    type="button"
                    variant="primary"
                >Add</Button>
            </Form>
        </>
    );
};

export default AddVoter;
