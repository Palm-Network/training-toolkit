require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const contract = require("../artifacts/contracts/NFT.sol/NFT.json");
const contractInterface = contract.abi;

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#provider-object
let provider = ethers.provider;

const tokenURI = "https://bafkreid62y6ghstiw45ri6lckw3wvcjyfj6ufggt7xrkumf4mnv7zd5lki.ipfs.dweb.link/";
const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);

wallet.provider = provider;
const signer = wallet.connect(provider);

// https://docs.ethers.io/v5/api/contract/contract
const nft = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractInterface,
  signer
);

const main = () => {
  console.log("Waiting 1 blocks for confirmation...");
  nft
    .mintNFT(process.env.PUBLIC_KEY, tokenURI)    
    .then((tx) => tx.wait(1))
    .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))

    .catch((e) => console.log("something went wrong", e));
};

main();
