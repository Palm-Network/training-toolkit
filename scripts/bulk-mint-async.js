require("dotenv").config();
// require("@nomiclabs/hardhat-ethers");
const { ethers } = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
const contract = require("../artifacts/contracts/NFT.sol/NFT.json");
const contractInterface = contract.abi;

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#provider-object
// let provider = ethers.provider;
let provider = new ethers.providers.JsonRpcProvider(
  "https://palm-testnet.infura.io/v3/f2d2fd1311b742f19e36eec5eb53b718"
);
const tokenURIArray = [
  "https://bafkreifvtwuiypleu4vv7edh4zclmymp5ixh44xxmd3hb2imiqa7mp2c3a.ipfs.dweb.link0/",
  "https://bafkreifvtwuiypleu4vv7edh4zclmymp5ixh44xxmd3hb2imiqa7mp2c3a.ipfs.dweb.link1/",
  "https://bafkreifvtwuiypleu4vv7edh4zclmymp5ixh44xxmd3hb2imiqa7mp2c3a.ipfs.dweb.link2/",
  "https://bafkreifvtwuiypleu4vv7edh4zclmymp5ixh44xxmd3hb2imiqa7mp2c3a.ipfs.dweb.link3/",
  "https://bafkreifvtwuiypleu4vv7edh4zclmymp5ixh44xxmd3hb2imiqa7mp2c3a.ipfs.dweb.link4/",
];
const tokenURI =
  "https://bafkreifvtwuiypleu4vv7edh4zclmymp5ixh44xxmd3hb2imiqa7mp2c3a.ipfs.dweb.link0/";
const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);
wallet.provider = provider;
const signer = wallet.connect(provider);
const nonceManager = new NonceManager(signer);
// https://docs.ethers.io/v5/api/contract/contract
const NFT = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractInterface,
  signer
);
const main = () => {
  console.log("Waiting 1 blocks for confirmation...");
  let initialNonce = provider.getTransactionCount(signer.getAddress())
    .then((initialNonce)=> 
  tokenURIArray.forEach((tokenURIArray, i) => {
    NFT.mintNFT(process.env.PUBLIC_KEY, tokenURIArray[i],{nonce: initialNonce});
    initialNonce ++;
  }))
     .then((tx) => tx.wait(1))
      .then((receipt) =>
        console.log(
          `Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`
        )
      )
     .catch((e) => console.log("something went wrong", e));
 };

main();
