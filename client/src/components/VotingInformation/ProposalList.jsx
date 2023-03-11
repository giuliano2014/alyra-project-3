import { useEffect, useState } from "react";

const ProposalList = ({ contract }) => {
    const [error, setError] = useState();
    const [isNewProposal, setIsNewProposal] = useState(false);
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        getProposals();
    }, [contract, isNewProposal]);

    useEffect(() => {
        voterRegisteredEvent();
    }, [proposals]);

    // const getProposals = () => {
    //     if (!contract) return;
    
    //     contract.getPastEvents('ProposalRegistered', {
    //         fromBlock: 0,
    //         toBlock: 'latest'
    //     }).then(events => {
    //         setIsNewProposal(false);
    //         const tempProposals = events.map((event) => event.returnValues[0]);
    //         setProposals([...tempProposals]);
    //     }).catch(error => {
    //         setError(error);
    //     });
    // };

    const getProposals = async () => {
        if (!contract) return;

        
        try {
            const events = await contract.getPastEvents('ProposalRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            setIsNewProposal(false);
            const tempProposals = events.map(event => event.returnValues[0]);
            setProposals([...tempProposals]);
        } catch (error) {
            setError(error);
        }
    };

    const voterRegisteredEvent = () => {
        if (!contract) return;

        contract.events.ProposalRegistered({ fromBlock: "earliest" })
            .on('data', event => {
                setIsNewProposal(true);
            })
            .on('error', (error, receipt) => {
                console.log('receipt', receipt);
                setError(error);
            });
    };
    
    return (
        <div>
            <h2>Proposal list</h2>
            {error}
            {proposals.length > 0 && 
                <ul>
                    {proposals.map((proposal, index) => (
                        <li key={index}>{proposal}</li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default ProposalList;
