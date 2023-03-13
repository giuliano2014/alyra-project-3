import { useState, useEffect } from "react";

const useRegisteredVoters = (accounts, contract) => {
    const [error, setError] = useState();
    const [isVoter, setIsVoter] = useState(false);

    useEffect(() => {
        getRegisteredVoters()
    }, [contract]); // [accounts, contract] ?

    const getRegisteredVoters = async () => {
        if (!contract) return;

        try {
            const events = await contract.getPastEvents('VoterRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            });

            const isRegisterdVoter = events.some(user => {
                return user.returnValues.voterAddress === accounts[0]
            });

            setIsVoter(isRegisterdVoter);
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
        }
    };

    return  [error, isVoter];

};

export default useRegisteredVoters;
