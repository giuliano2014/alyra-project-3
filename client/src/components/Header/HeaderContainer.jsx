import { Container, Navbar } from 'react-bootstrap';
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const HeaderContainer = () => {
	const { state: { accounts } } = useEth();
	const [currentAddress, setCurrentAddress] = useState();

	useEffect(() => {
		getConnectedAccount();
	}, [accounts]);

	const getConnectedAccount = async () => {
		const connectedAddress = await accounts[0];
		const formattedConnectedAddress = `${connectedAddress.slice(0, 5)}...${connectedAddress.slice(-4)}`;
		setCurrentAddress(formattedConnectedAddress);
	}
	return (
		<Navbar bg="primary" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Voting Dapp</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						{currentAddress ? `Connected account : ${currentAddress}` : "No account connected"}					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default HeaderContainer;
