import { useState } from "react";
import { Alert, Button, Form } from 'react-bootstrap';

const GetOneProposal = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [isProposalRequested, setIsProposalRequested] = useState(false);
    const [proposal, setProposal] = useState({});
    const [proposalId, setProposalId] = useState("");

    const getOneProposal = async () => {
        if (!proposalId) {
            setError("Please enter a correct proposal ID");
            return;
        }

        try {
            const result = await contract.methods.getOneProposal(proposalId).call({ from: accounts[0] });
            setProposal({ description: result.description, voteCount: result.voteCount });
            setIsProposalRequested(true);
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };

    const handleCloseAlert = () => {
        setIsProposalRequested(false);
        setProposalId("");
    };

    const handleInputChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setProposalId(e.target.value);
        }
    };

    return (
        <Form className="mt-3" >
            <Form.Group className="mb-3" controlId="proposalId">
                <Form.Label>Get a specific proposal</Form.Label>
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
                onClick={getOneProposal}
                type="button"
                variant="primary"
            >Get proposal</Button>
            {isProposalRequested &&
                <Alert show={proposal} variant="info" className="mt-3">
                    <Alert.Heading>Proposal ID : {proposalId}</Alert.Heading>
                    <p>Description : {proposal.description}</p>
                    <hr />
                    <p>Vote count : {proposal.voteCount}</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                    <Button onClick={handleCloseAlert} variant="outline-info">
                        Close
                    </Button>
                    </div>
                </Alert>
            }
        </Form>
    );
}

export default GetOneProposal;
