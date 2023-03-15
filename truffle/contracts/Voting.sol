// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting
 * @dev Ce contrat permet la création et le vote sur des propositions, ainsi que le comptage des votes.
 */
contract Voting is Ownable {
    uint public winningProposalID;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping(address => Voter) voters;

    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );
    event ProposalRegistered(uint proposalId);
    event Voted(address voter, uint proposalId);
    /**
     * @dev Modificateur pour s'assurer que seul un votant peut appeler une fonction
     */
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    /**
     * @dev Fonction pour obtenir les informations d'un votant
     * @param _addr Adresse du votant à obtenir
     * @return Voter Les informations du votant
     */
    function getVoter(
        address _addr
    ) external view onlyVoters returns (Voter memory) {
        return voters[_addr];
    }

    /**
     * @dev Fonction pour obtenir les informations d'une proposition
     * @param _id ID de la proposition à obtenir
     * @return Proposal Les informations de la proposition
     */
    function getOneProposal(
        uint _id
    ) external view onlyVoters returns (Proposal memory) {
        return proposalsArray[_id];
    }

    /**
     * @dev Fonction pour ajouter un votant
     * @param _addr Adresse du votant à ajouter
     */
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    /**
     * @dev Fonction permettant d'enregistrer une proposition.
     * @param _desc La description de la proposition à enregistrer.
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        );
        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    /**
     * @dev Fonction permettant à un votant de voter pour une proposition.
     * @param _id L'identifiant de la proposition pour laquelle le votant vote.
     */
    function setVote(uint _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    /**
     * @dev Démarre la phase d'enregistrement des propositions.
     * Cette fonction ne peut être appelée que par le propriétaire du contrat.
     * @notice Nécessite que la phase d'enregistrement des électeurs soit terminée.
     * @notice Ajoute une proposition "GENESIS" à l'array de propositions.
     * @notice Émet un événement pour signaler le changement de statut.
     */
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    /**
     * @dev Termine la phase d'enregistrement des propositions.
     * Cette fonction ne peut être appelée que par le propriétaire du contrat.
     * @notice Nécessite que la phase d'enregistrement des propositions soit en cours.
     * @notice Émet un événement pour signaler le changement de statut.
     */
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /**
     * @dev Démarre la session de vote.
     * Cette fonction ne peut être appelée que par le propriétaire du contrat.
     * @notice Nécessite que la phase d'enregistrement des propositions soit terminée.
     * @notice Émet un événement pour signaler le changement de statut.
     */
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /**
     * @dev Termine la phase de vote par le propriétaire du contrat.
     * Doit être appelé après que la phase de vote ait commencé.
     * Change le statut de WorkflowStatus.VotingSessionStarted à WorkflowStatus.VotingSessionEnded.
     * Émet un événement WorkflowStatusChange pour notifier les observateurs du changement de statut.
     */
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /**
     * @dev Cette fonction permet de comptabiliser les votes pour les propositions soumises et de déterminer la proposition gagnante.
     * Ne peut être appelée que par le propriétaire du contrat.
     * La fonction vérifie que le statut actuel du workflow est "VotingSessionEnded".
     * Une fois la proposition gagnante déterminée, son identifiant est stocké dans la variable winningProposalID.
     * Le statut du workflow est mis à jour en "VotesTallied".
     * Un événement WorkflowStatusChange est émis pour notifier les observateurs du changement d'état du workflow.
     */
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        uint _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (
                proposalsArray[p].voteCount >
                proposalsArray[_winningProposalId].voteCount
            ) {
                _winningProposalId = p;
            }
        }
        winningProposalID = _winningProposalId;

        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
}
