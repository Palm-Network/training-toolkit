require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const contract = require("../artifacts/contracts/NFT.sol/NFT.json");
const contractInterface = contract.abi;

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#provider-object
let provider = ethers.provider;

const tokenURIArray = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

// let bulkMint = (tokenURI)=> {
//   tokenURI.forEach(mintNFT(process.env.PUBLIC_KEY, tokenURI));
// }

const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);

wallet.provider = provider;
const signer = wallet.connect(provider);

// https://docs.ethers.io/v5/api/contract/contract
const NFT = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractInterface,
  signer
);

let mint = NFT.mintNFT;
function txSender(tokenURIArray, mint) {
  let i = 0;
  let nextTx = function () {
    if (i >= tokenURIArray.length) {
      return;
    }
    let newTx = Promise.resolve(mint(process.env.PUBLIC_KEY, tokenURIArray[i]));
    i++;
    return newTx
      .then((tx) => tx.wait(1))
      .then((receipt) =>
        console.log(
          `Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`
        )
      )
      .then(nextTx);
  };
  return Promise.resolve().then(nextTx);
}

const main = () => {
  console.log("Waiting 5 blocks for each mint confirmation...");
  txSender(tokenURIArray, mint).catch((e) =>
    console.log("something went wrong", e)
  );
};

main();
