import { useState } from "react";
import { Alert, Button, Form } from 'react-bootstrap';

const SetVote = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [proposalId, setProposalId] = useState("");
    const [voted, setVoted] = useState(false);

    const handleCloseAlert = () => {
        setVoted(false);
        setProposalId("");
    };

    const handleInputChange = (event) => {
        if (/^\d+$|^$/.test(event.target.value)) {
            setProposalId(event.target.value);
        }
    };

    const setVote = () => {
        if (!proposalId) {
            setError("Please enter a correct proposal ID");
            return;
        }
    
        contract.methods.setVote(proposalId).call({ from: accounts[0] })
            .then(result => {
                return contract.methods.setVote(proposalId).send({ from: accounts[0] });
            })
            .then(result => {
                setVoted(true);
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <>
            {voted &&
                <Alert
                    dismissible
                    onClose={handleCloseAlert}
                    variant="success"
                >
                    <p>Your vote has been taken into account</p>
                </Alert>
            }
            <Form className="mb-4">
                <Form.Group className="mb-3" controlId="setYourVote">
                    <Form.Label>Set your vote</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        placeholder="Proposal ID"
                        type="text"
                        value={proposalId}
                    />
                    {error && 
                        <Form.Text className="text-danger">
                            {error}
                        </Form.Text>
                    }
                </Form.Group>
                <Button
                    onClick={setVote}
                    type="button"
                    variant="primary"
                >Vote</Button>
            </Form>
        </>
    );
};

export default SetVote;
