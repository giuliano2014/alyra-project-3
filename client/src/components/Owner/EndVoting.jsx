import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

const EndVoting = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const endVotingSession = () => {
        contract.methods.endVotingSession().call({ from: accounts[0] })
            .then(result => {
                contract.methods.endVotingSession().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div className="mt-3">
            <div>
                <Button
                    onClick={endVotingSession}
                    variant="outline-primary"
                >End voting session</Button>
            </div>
            {error && 
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            }
        </div>
    );
}

export default EndVoting;
