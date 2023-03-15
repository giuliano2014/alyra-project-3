import { useState } from "react";
import { Alert, Button, Form } from 'react-bootstrap';

const GetVoter = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [isVoterRequested, setIsVoterRequested] = useState(false);
    const [voter, setVoter] = useState(undefined);
    const [voterAddress, setVoterAddress] = useState("");

    // const getVoter = () => {
    //     if (!contract) return;

    //     if (voterAddress === "") {
    //         setError("Please enter a correct address");
    //         return;
    //     }

    //     contract.methods.getVoter(voterAddress).call({ from: accounts[0] })
    //         .then(result => {
    //             const { hasVoted, isRegistered, votedProposalId } = result;
    //             const formatHasVoted = hasVoted ? "Yes" : "No";
    //             const formatIsRegistered = isRegistered ? "Yes" : "No";
    //             setVoter({ hasVoted: formatHasVoted, isRegistered: formatIsRegistered, votedProposalId: votedProposalId });
    //             setVoterAddress("");
    //         })
    //         .catch(error => {
    //             setError(error.message.match(/revert (.*)/)[1]);
    //         });
    // };

    const getVoter = async () => {
        if (!contract) return;

        if (!voterAddress) {
            setError("Please enter a correct address");
            return;
        }
        
        try {
            const { hasVoted, isRegistered, votedProposalId } = await contract.methods.getVoter(voterAddress).call({ from: accounts[0] });
            setVoter({ hasVoted: hasVoted ? "Yes" : "No", isRegistered: isRegistered ? "Yes" : "No", votedProposalId });
            setIsVoterRequested(true);
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };

    const handleCloseAlert = () => {
        setIsVoterRequested(false);
        setVoterAddress("");
    };

    const handleInputChange = (event) => {
        setVoterAddress(event.target.value);
    };

    return (
        <Form className="mt-3" >
            <Form.Group className="mb-3" controlId="voterAddress">
                <Form.Label>Get a specific voter</Form.Label>
                <Form.Control
                    onChange={handleInputChange}
                    placeholder="Address"
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
                onClick={getVoter}
                type="button"
                variant="primary"
            >Get voter</Button>
            {isVoterRequested &&
                <Alert show={voter} variant="info" className="mt-3">
                    <Alert.Heading>Voter's information</Alert.Heading>
                    <p>Voter has voted : {voter.hasVoted}</p>
                    <hr />
                    <p>Voter is registered : {voter.isRegistered}</p>
                    <hr />
                    <p>Voter's vote : {voter.votedProposalId === "0" ? "Unknown" : voter.votedProposalId}</p>
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
};

export default GetVoter;
