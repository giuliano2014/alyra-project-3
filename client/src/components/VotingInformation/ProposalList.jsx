import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

const ProposalList = ({ accounts, contract }) => {
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
    
            const getEachProposalsData = await Promise.all(
                events.map(event => contract.methods.getOneProposal(event.returnValues.proposalId).call({ from: accounts[0] }))
            );
            const getEachProposalsDescription = getEachProposalsData.map(proposal => proposal.description);
            setProposals([...getEachProposalsDescription]);
        } catch (error) {
            setError(error.message.match(/revert (.*)/)[1]);
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
            {error && <p className="text-danger">{error}</p>}
            <h6>Proposal list : {proposals.length === 0 && <span>No proposal yet ...</span>}</h6>
            {proposals.length > 0 && 
                <ListGroup>
                    {proposals.map((proposal, index) => (
                        <ListGroup.Item key={proposal}>
                            <p className="m-0">ID : {++index}</p>
                            <p className="m-0">Description : {proposal}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </div>
    );
};

export default ProposalList;
