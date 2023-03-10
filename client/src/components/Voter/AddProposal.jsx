import { useState } from "react";

const AddProposal = ({ accounts, contract }) => {
    const [description, setDescription] = useState("");
    const [error, setError] = useState();

    const handleAddProposal = async () => {
        if (description === "") {
            setError("Please enter a description");
            return;
        }
        contract.methods.addProposal(description).call({ from: accounts[0] })
            .then(result => {
                return contract.methods.addProposal(description).send({ from: accounts[0] });
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
            <label for="description">Add a proposal description</label>
            <input
                id="description"
                onChange={handleInputChange}
                placeholder="description"
                type="text"
                value={description}
            />
            <button onClick={handleAddProposal}>addProposal</button>
            {error}
        </div>
    );
};

export default AddProposal;
