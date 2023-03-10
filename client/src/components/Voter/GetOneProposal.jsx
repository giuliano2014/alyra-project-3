import { useState } from "react";

const GetOneProposal = ({ accounts, contract }) => {
    const [idProposal, setIdProposal] = useState("");
    const [proposal, setProposal] = useState(["", ""]);
    const [error, setError] = useState();

    const handleInputChange = e => {
        setIdProposal(e.target.value);
    };

    const getOneProposal = async () => {
        if (idProposal === "") {
            alert("Please enter a value to write.");
            return;
        }

        try {
            const result = await contract.methods.getOneProposal(idProposal).call({ from: accounts[0] });
            setProposal(result);
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };
    return (
        <div>
            <label htmlFor="idProposal">Get a specific Proposal</label>
            <input id="idProposal" type="text" placeholder="uint" value={idProposal}
                onChange={handleInputChange} />
            <button onClick={getOneProposal}>getOneProposal</button>
            <span >
                description <strong>{`${proposal[0]}`}</strong>/ voteCount <strong>{`${proposal[1]}`}</strong>/


            </span>
            {error}
        </div>
    )
}
export default GetOneProposal;