import ENSAddress from "@ensdomains/react-ens-address";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { useEffect, useState } from "react";
import logo from "./MageLogo.jpg";
import { Button, Center, Box, Input, Divider } from "@chakra-ui/react";

function App() {
  const { web3, enableWeb3, isWeb3Enabled } = useMoralis();

  const Web3Api = useMoralisWeb3Api();

  const [domainName, setDomainName] = useState("");
  const handleDomainChange = (event) => setDomainName(event.target.value);

  const {
    fetch: fetchAddressForDomain,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(
    Web3Api.resolve.resolveDomain,
    {
      currency: "eth",
      domain: domainName,
    },
    { autoFetch: false }
  );

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
      console.log(web3.givenProvider, web3.currentProvider);
    }
  }, [isWeb3Enabled, enableWeb3, web3.givenProvider, web3.currentProvider]);

  return (
    <Box display={"block"} p={35} className="App">
      <Center padding={40}>
        <img width={300} height={300} src={logo} alt="logo" />
      </Center>
      <Center>
        <Input
          value={domainName}
          onChange={handleDomainChange}
          placeholder="Enter Unstoppable domain name"
          size="sm"
          style={{
            height: "auto",
            width: "50%",
          }}
        />
        <Button
          onClick={fetchAddressForDomain}
          style={{ color: "blue", fontWeight: "700" }}>
          {" "}
          Resolve the Unstoppable Domain{" "}
        </Button>
      </Center>
      <br />
      <Center style={{ fontWeight: "700" }}>
        Unstoppable Domain: {data ? data.address : ""}
      </Center>
      <Divider />
      <Center>
        <p style={{ fontWeight: "700", fontSize: "large" }}>
          ENS Domain Resolver
        </p>
        <div>
          {isWeb3Enabled && (
            <ENSAddress provider={web3.givenProvider || web3.currentProvider} />
          )}
        </div>
      </Center>
    </Box>
  );
}

export default App;
