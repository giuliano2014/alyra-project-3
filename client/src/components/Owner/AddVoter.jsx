import { useEffect, useState } from "react";

const AddVoter = ({ accounts, contract }) => {
  const [voterAddress, setVoterAddress] = useState("");

  const voterRegisteredEvent = async () => {
    if (!contract) return;
    await contract.events.VoterRegistered({ fromBlock: "earliest" })
      .on('data', event => {
        console.log('event', event);
        // console.log('event.returnValues.voterAddress', event.returnValues.voterAddress);
      })
      .on('changed', changed => console.log('changed', changed))
      .on('error', err => console.log('error', err))
      .on('connected', str => console.log('connected', str))
  };

  useEffect(() => {
    voterRegisteredEvent();
  }, [contract]);

  const handleAddVoter = async () => {
    await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
  };

  const handleInputChange = (event) => {
    setVoterAddress(event.target.value);
  };

  return (
    <div>
      <label htmlFor="voterAddress">Add a voter</label>
      <input
        id="voterAddress"
        type="text"
        placeholder="Address"
        value={voterAddress}
        onChange={handleInputChange}
      />
      <button onClick={handleAddVoter}>addVoter</button>
    </div>
  );
};

export default AddVoter;
