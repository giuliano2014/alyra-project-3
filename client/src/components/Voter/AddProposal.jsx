import { useState } from "react";

const AddProposal = ({ accounts, contract }) => {
    const [description, setDescription] = useState("");
    const [error, setError] = useState()


    const handleAddProposal = async () => {
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
            <label htmlFor="description">Add a description</label>
            <input
                id="description"
                type="text"
                placeholder="description"
                value={description}
                onChange={handleInputChange}
            />
            <button onClick={handleAddProposal}>addProposal</button>
            {error}

        </div>
    );
};

export default AddProposal;
