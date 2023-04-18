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
  const [msgHash, setMsgHash] = useState("");
  const [recBit, setRecBit] = useState(0);

  async function transfer(evt) {
    evt.preventDefault();

    if(!isSigned){
      alert("Sign the Transaction");
      return
    }

    try {
      const {
        data : { balance, message },
      } = await server.post(
        `send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient: recipient,
          msgHash: msgHash,
          msgSignHex: privateKeySignature,
          recBit: recBit
        });
      setBalance(balance);
      alert(message);
    } catch (ex) {
      alert(ex.response.data.message);
    }
    setPrivateKeySignature("")
    setprivateKey("")
    setMsgHash("")
    setSigned(false)
  }

  async function SignTheKey(){

    if(privateKey.length != 64){
      alert("Enter Valid PrivateKey");
      return
    }

    let _msgHash = toHex(keccak256(
      utf8ToBytes(JSON.stringify(`sender: ${address},
      amount: ${sendAmount},
      ${recipient}`))
    ));

    setMsgHash(_msgHash);

    try{
      let [ _msgSignHex, _recBit ] = 
        await secp256k1.sign(_msgHash,
                             privateKey ,{
        recovered: true
      });

      setRecBit(_recBit);

      _msgSignHex = toHex(_msgSignHex);
      setPrivateKeySignature(_msgSignHex);

      setSigned(true);

    }catch(ex){
      console.log(ex)
    }

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
