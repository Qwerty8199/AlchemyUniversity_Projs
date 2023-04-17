import { useState } from "react";
import server from "./server";
import * as secp256k1 from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [privateKey, setprivateKey] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKeySignature, setPrivateKeySignature] = useState("");
  const [isSigned, setSigned] = useState(false)

  const setValue = (setter) => (evt) => setter(evt.target.value);
  let msgHash = "";
  let msgSign = [];


  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(
        `send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
          msgHash,
          msgSign
        });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  async function SignTheKey(){
    console.log("Signing the Key");
    const pKey = privateKey

    msgHash = keccak256(
      utf8ToBytes(`sender: ${address},
      amount: ${sendAmount},
      ${recipient}`)
    );
    console.log("msg ",msgHash)
    console.log("private",pKey)

    msgHash = toHex(msgHash);
    msgSign = await secp256k1.sign(msgHash, pKey ,{
      recovered: true
  });

    console.log(msgSign);

    setPrivateKeySignature(toHex(msgSign[0]));
    setSigned(true)
    console.log("Key Signed");
    console.log(`Key : ${msgSign}`);

  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Private Key for Signature
        <input
          placeholder="Only for Learning Purpose..(Private key will be entered by other methods)"
          value={privateKey}
          onChange={setValue(setprivateKey)}
        ></input>
        <button type="button" onClick={SignTheKey}>
          Sign
        </button>
      </label>

      <label>
        Signature
        <textarea
          placeholder="Signature"
          value={privateKeySignature}
          contentEditable={false}
          rows={4}
        ></textarea>
      </label>


      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
