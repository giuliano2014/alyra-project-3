import { useState } from "react";

const AddProposal = ({ accounts, contract }) => {
    const [description, setDescription] = useState("");
    const [error, setError] = useState();

    const addProposal = () => {
        if (description === "") {
            setError("Please enter a description");
            return;
        }

        contract.methods.addProposal(description).call({ from: accounts[0] })
            .then(result => {
                contract.methods.addProposal(description).send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    const handleInputChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <div>
            <label htmlFor="proposal-description">Add a proposal description</label>
            <input
                id="proposal-description"
                onChange={handleInputChange}
                placeholder="Description"
                type="text"
                value={description}
            />
            <button onClick={addProposal}>addProposal</button>
            {error}
        </div>
    );
};

export default AddProposal;
