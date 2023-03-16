import { useEffect, useState } from "react";
import { Alert, Button, Form } from 'react-bootstrap';

const AddProposal = ({ accounts, contract }) => {
    const [description, setDescription] = useState("");
    const [error, setError] = useState();
    const [isNewProposal, setIsNewProposal] = useState(false);

    useEffect(() => {
        voterRegisteredEvent();
    }, [contract, isNewProposal]);

    const addProposal = () => {
        if (description === "") {
            setError("Please enter a description");
            return;
        }

        setIsNewProposal(false);

        contract.methods.addProposal(description).call({ from: accounts[0] })
            .then(result => {
                return contract.methods.addProposal(description).send({ from: accounts[0] });
            })
            .then(result => {
                setDescription("");
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    const handleInputChange = (event) => {
        setDescription(event.target.value);
    };

    const voterRegisteredEvent = () => {
        if (!contract) return;

        contract.events.ProposalRegistered({ fromBlock: "earliest" })
            .on('data', event => {
                setIsNewProposal(true);
            })
            .on('error', (error, receipt) => {
                console.log('receipt', receipt);
                setError(error);
            });
    };

    return (
        <>
            {isNewProposal &&
                <Alert
                    dismissible
                    onClose={() => setIsNewProposal(false)}
                    variant="success"
                >
                    <p>New proposal have been successfully added</p>
                </Alert>
            }
            <Form className="mt-4">
                <Form.Group className="mb-3" controlId="proposalDescription">
                    <Form.Label>Add a proposal</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        placeholder="Description"
                        type="text"
                        value={description}
                    />
                    {error && 
                        <Form.Text className="text-danger">
                            {error}
                        </Form.Text>
                    }
                </Form.Group>
                <Button
                    onClick={addProposal}
                    type="button"
                    variant="primary"
                >Add</Button>
            </Form>
        </>
    );
};

export default AddProposal;
