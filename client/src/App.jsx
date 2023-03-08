import { EthProvider } from "./contexts/EthContext";

import Demo from "./components/Demo";
import HeaderContainer from "./components/Header/HeaderContainer";
import OwnerContainer from "./components/Owner/OwnerContainer";
import VoterContainer from "./components/Voter/VoterContainer";
import VotingInformationContainer from "./components/VotingInformation/VotingInformationContainer";

const App = () => {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <hr />
          <HeaderContainer />
          <hr />
          <VotingInformationContainer />
          <hr />
          <OwnerContainer />
          <hr />
          <VoterContainer />
          <hr />
          <Demo />
          <hr />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
