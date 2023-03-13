import { useState, useEffect } from "react";

const useRegisteredVoters = (contract, accounts) => {
    const [isVoter, setIsVoter] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getRegisteredVoters = async () => {
            if (!contract) return;

            try {
                const events = await contract.getPastEvents("VoterRegistered", {
                    fromBlock: 0,
                    toBlock: "latest",
                });

                const isRegisteredVoter = events.some(
                    (user) => user.returnValues.voterAddress === accounts[0]
                );

                setIsVoter(isRegisteredVoter);
            } catch (error) {
                setError(error.message.match(/revert (.*)/)[1]);
            }
        };

        getRegisteredVoters();
    }, [contract, accounts]);

    return [isVoter, error];
};

export default useRegisteredVoters;

// const [error, setError] = useState();
// const [isVoter, setIsVoter] = useState(false);

// useEffect(() => { getRegisteredVoters() }, [contract]);

// const getRegisteredVoters = async () => {
//     if (!contract) return;

//     try {
//         const events = await contract.getPastEvents('VoterRegistered', {
//             fromBlock: 0,
//             toBlock: 'latest'
//         });

//         const isRegisterdVoter = events.some(user => {
//             return user.returnValues.voterAddress === accounts[0]
//         });

//         setIsVoter(isRegisterdVoter);
//     } catch (error) {
//         setError(error.message.match(/revert (.*)/)[1]);
//     }
// };
