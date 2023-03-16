import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

const TallyVotes = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const tallyVotes = () => {
        contract.methods.tallyVotes().call({ from: accounts[0] })
            .then(result => {
                contract.methods.tallyVotes().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div className="mt-4">
            <div>
                <Button
                    onClick={tallyVotes}
                    variant="outline-primary"
                >Tally votes</Button>
            </div>
            {error && 
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            }
        </div>
    );
}

export default TallyVotes;
