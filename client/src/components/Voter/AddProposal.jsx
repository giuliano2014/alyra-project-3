import { useState } from "react";

const AddProposal = ({ accounts, contract }) => {
    const [description, setDescription] = useState("");

    const handleAddProposal = async () => {
        await contract.methods.addProposal(description).send({ from: accounts[0] });
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
        </div>
    );
};

export default AddProposal;
