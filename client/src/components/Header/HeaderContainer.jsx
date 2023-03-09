import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";


const HeaderContainer = () => {
  const { state: { contract, accounts } } = useEth();
  const [address, setAddress] = useState();
  const [owner, setOwner] = useState();


  useEffect(() => {
    if (contract?.methods) {
      setAddress(accounts[0])
      ownerise()
    }
  }, [contract])

  async function ownerise() {
    const ownerAdress = await contract.methods.owner().call();
    setOwner(ownerAdress)
  }

  if (address === owner) {
    return (
      <div>
        <button>Connexion</button>
        <h1>Voting Dapp</h1>
        <h4>Address of user logged : {address}</h4>
      </div>
    );

  } else {
    return (<div>You are not the owner</div>)
  }
}

export default HeaderContainer;
