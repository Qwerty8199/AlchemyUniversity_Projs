
import * as secp256k1 from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";


for(let i=0;i<5;i++){
    let privateKey = secp256k1.utils.randomPrivateKey()

    let publicKey = secp256k1.getPublicKey(privateKey)
    let address = keccak256(publicKey.slice(1)).slice(-20)

    console.log(`Private : ${toHex(privateKey)}`)
    console.log(`public : ${toHex(publicKey)}`)
    console.log(`address : ${toHex(address)}`)
}
