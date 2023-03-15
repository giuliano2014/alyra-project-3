import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

const StartProposal = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const startProposalsRegistering = () => {
        contract.methods.startProposalsRegistering().call({ from: accounts[0] })
            .then(result => {
                contract.methods.startProposalsRegistering().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div className="mt-4">
            <div>
                <Button
                    onClick={startProposalsRegistering}
                    variant="outline-primary"
                >Start proposals registering</Button>
            </div>
            {error && 
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            }
        </div>
    );
}

export default StartProposal;
