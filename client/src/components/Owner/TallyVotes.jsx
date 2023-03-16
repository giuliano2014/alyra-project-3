import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

const TallyVotes = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const tallyVotesEvent = new CustomEvent("tallyVotesEvent", { done: false });

    const tallyVotes = () => {
        contract.methods.tallyVotes().call({ from: accounts[0] })
            .then(result => {
                return contract.methods.tallyVotes().send({ from: accounts[0] });
            })
            .then(result => {
                tallyVotesEventDispatch();
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    const tallyVotesEventDispatch = () => {
        tallyVotesEvent.done = true;
        window.dispatchEvent(tallyVotesEvent);
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
