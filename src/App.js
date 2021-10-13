// import ENSAddress from "@ensdomains/react-ens-address";
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
  const [ensAddres, setEnsAddress] = useState("");

  const handleDomainChange = (event) => setDomainName(event.target.value);

  //function to call the Unstoppable domain resolver through Moralis API
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
    { autoFetch: false } //so that it doesn't fetch on every component render
  );

  const ensCall = () => {
    web3.eth.ens.getAddress(domainName).then(function (address) {
      setEnsAddress(address);
    });
  };

  //Make sure Web3 is enabled before running the functions
  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [isWeb3Enabled, enableWeb3]);

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
          Resolve the Unstoppable Domain{" "}
        </Button>
        <Button onClick={ensCall} style={{ color: "blue", fontWeight: "700" }}>
          Resolve the ENS Domain{" "}
        </Button>
      </Center>
      <br />
      <Center style={{ fontWeight: "700" }}>
        Unstoppable Domain:{" "}
        {data ? data.address : "Enter valid Unstoppable domain"}
      </Center>
      <Center style={{ fontWeight: "700" }}>
        ENS Domain: {ensAddres ? ensAddres : "Enter valid ENS domain"}
      </Center>
      <Divider />

      {/* <Center>
        <p style={{ fontWeight: "700", fontSize: "large", padding: 10 }}>
          ENS Domain Resolver
        </p>
        <div>
          {isWeb3Enabled && (
            <ENSAddress provider={web3.givenProvider || web3.currentProvider} />
          )}
        </div>
      </Center> */}
    </Box>
  );
}

export default App;
