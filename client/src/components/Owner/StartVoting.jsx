import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

const StartVoting = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const startVotingSession = () => {
        contract.methods.startVotingSession().call({ from: accounts[0] })
            .then(result => {
                contract.methods.startVotingSession().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div className="mt-4">
            <div>
                <Button
                    onClick={startVotingSession}
                    variant="outline-primary"
                >Start voting session</Button>
            </div>
            {error && 
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            }
        </div>
    );
}

export default StartVoting;
