import ENSAddress from "@ensdomains/react-ens-address";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import logo from "./avalancheLogo.jpg";

import {
  Button,
  Center,
  Box,
  Wrap,
  Text,
  Heading,
  Divider,
  Stack,
  Alert,
  Container,
} from "@chakra-ui/react";

function App() {
  const { web3, enableWeb3, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
      console.log(web3.givenProvider, web3.currentProvider);
    }
  }, [isWeb3Enabled, enableWeb3, web3.givenProvider, web3.currentProvider]);
  return (
    <Container>
      <Center>
        <img width={500} height={500} src={logo} alt="logo" />
      </Center>
      <div className="App">
        {isWeb3Enabled && (
          <ENSAddress provider={web3.givenProvider || web3.currentProvider} />
        )}
        <p>Moralis Mages</p>
      </div>
    </Container>
  );
}

export default App;
