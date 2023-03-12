import { useEffect, useState } from "react";

import useEth from "../../contexts/EthContext/useEth";
import AddProposal from "./AddProposal";
import GetOneProposal from "./GetOneProposal";
import SetVote from "./SetVote";

const VoterContainer = () => {
    const { state: { accounts, contract } } = useEth();
    const [error, setError] = useState();
    const [isVoter, setIsVoter] = useState(false);

    useEffect(() => { getRegisteredVoters() }, [contract]);

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

    if (!isVoter) return null;

    return (
        <div>
            <hr />
            <h2>Voter</h2>
            {error}
            <AddProposal accounts={accounts} contract={contract} />
            <GetOneProposal accounts={accounts} contract={contract} />
            <SetVote accounts={accounts} contract={contract} />
            <div>
            <label htmlFor="voterAddress">Get a specific voter</label>
            <input id="voterAddress" type="text" placeholder="Address" />
            <button>getVoter</button>
            </div>
        </div>
    );
}

export default VoterContainer;
