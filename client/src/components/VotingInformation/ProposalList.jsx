import { useEffect, useState } from "react";

const ProposalList = ({ accounts, contract }) => {
    const [error, setError] = useState();
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        getProposals();
        console.log("proposals", proposals);
    }, [contract]);

    const getProposals = () => {
        if (!contract) {
            return;
        }

        contract.getPastEvents('ProposalRegistered', {
            fromBlock: 0,
            toBlock: 'latest'
        }).then( events => {
            let tempProposals = [];
            events.forEach(event => {
                // console.log('event.returnValues.proposalId', event.returnValues.proposalId);
                // console.log('event.returnValues[0]', event.returnValues[0]);
                tempProposals = [...tempProposals, ...event.returnValues[0]];
            });
            setProposals([...tempProposals]);

            // let oldies = [];
            // events.forEach(event => {
            //     // console.log('event.returnValues[0]', event.returnValues[0]);
            //     oldies.push(event.returnValues.proposalId);
            // });
            // setProposals(oldies);

        }).then( error => {
            console.log("error", error);
        });
    };

    // useEffect(() => {
    //     (async function () {
    //       let oldEvents= await contract.getPastEvents('ValueChanged', {
    //         fromBlock: 0,
    //         toBlock: 'latest'
    //       });
    //       let oldies=[];
    
    //       oldEvents.forEach(event => {
    //           console.log('event', event);
    //           oldies.push(event.returnValues.newValue);
    //       });
    
    //       setOldEvents(oldies);
    
    //       await contract.events.ValueChanged({fromBlock:"earliest"})
    //         .on('data', event => {
    //           let lesevents = event.returnValues.newValue;
    //           setEventValue(lesevents);
    //         })          
    //         .on('changed', changed => console.log(changed))
    //         .on('error', err => console.log(err))
    //         .on('connected', str => console.log(str))
    //     })();
    //   }, [contract]);
    
    return (
        <div>
            <h2>Proposal list</h2>
            {/* {proposals} */}
            {error}
            <div>
                <ul>
                {proposals.map((proposal, index) => (
                    <li key={index}>{proposal}</li>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default ProposalList;
