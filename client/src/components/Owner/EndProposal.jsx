import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

const EndProposal = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const endProposalsRegistering = async () => {
        try {
            await contract.methods.endProposalsRegistering().call({ from: accounts[0] });
            await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };

    return (
        <div className="mt-4">
            <div>
                <Button
                    onClick={endProposalsRegistering}
                    variant="outline-primary"
                >End proposals registering</Button>
            </div>
            {error && 
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            }
        </div>
    );
}

export default EndProposal;
