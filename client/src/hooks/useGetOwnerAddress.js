import { useState, useEffect } from "react";

const useGetOwnerAddress = (accounts, contract) => {
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        getOwnerAddress()
    }, [accounts, contract]);

    const getOwnerAddress = async () => {
        if (!contract) return;

        const ownerAddress = await contract.methods.owner().call();
        accounts[0] === ownerAddress ? setIsOwner(true) : setIsOwner(false);
    }

    return [isOwner];
};

export default useGetOwnerAddress;
