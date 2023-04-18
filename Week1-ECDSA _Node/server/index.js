const secp256k1 = require('ethereum-cryptography/secp256k1');
const keccak = require('ethereum-cryptography/keccak');
const utils = require('ethereum-cryptography/utils');

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xe822e9a0ee8ff9fd4402c60a29724beba4fd04dc": 100,
  "0x237e5ac2af2384a3cdd6e02c819d9282bf39a37d": 50,
  "0x7dc8211290d49afb4ee47066ff85a1ae1e028675": 75,
  "0x32103cb0003fbc0c26dba7d5745431d38d311ac5": 125,
  "0x4409cd27ded29f5c49e013af07679e7473e487f8": 500
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  console.log("body",req.body)
  const { sender, 
          recipient,
          amount, 
          msgHash, 
          msgSignHex,
          recBit
        } = req.body;

    
  console.log(sender, recipient, amount, msgHash, msgSignHex, recBit)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const isValid = isValidUser(msgHash, msgSignHex, recBit, sender);
  if (!isValid) return res.status(400)
                          .send(
                            { message: 'Invalid Signature...' 
                          });

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ 
      balance: balances[sender],
      message: "Transfer Complete."
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function isValidUser(hashMsg, msgSignHex, recBit, sender){
  console.log("msg",hashMsg)
  const signature =  msgSignHex
  console.log("sign",signature)
  let recPubKey = secp256k1.recoverPublicKey(
    hashMsg,
    msgSignHex,
    recBit
  );


  console.log("recPub",recPubKey)

  const isSigned = secp256k1.verify(msgSignHex, hashMsg, recPubKey);

  const isValidUserbool = sender.toString() === `0x${getAddrFromPublicKey(recPubKey)}`;
  console.log(sender, `0x${getAddrFromPublicKey(recPubKey)}`);
  if (isValidUserbool && isSigned) return true;
  return false;
}

function getAddrFromPublicKey(key){
  let address = keccak.keccak256(key.slice(1)).slice(-20)
  return utils.toHex(address)
}
