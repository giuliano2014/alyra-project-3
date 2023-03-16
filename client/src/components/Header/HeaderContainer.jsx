import { Container, Navbar } from 'react-bootstrap';
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const HeaderContainer = () => {
	const { state: { accounts } } = useEth();
	const [currentAddress, setCurrentAddress] = useState();

	useEffect(() => {
		getAccounts();
	}, [accounts]);

	async function getAccounts() {
		const addressValue = await (accounts[0]);
		const formattedAddress = `${addressValue.slice(0, 4)}xx${addressValue.slice(-4)}`;
		console.log(formattedAddress)
		setCurrentAddress(formattedAddress)
	}
	return (
		<Navbar bg="primary" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Voting Dapp</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						{currentAddress}
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default HeaderContainer;
