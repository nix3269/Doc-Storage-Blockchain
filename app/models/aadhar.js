let crypto = require('crypto');
const keygen = require('../models/Keygen');
class aadhar {
    constructor(name,DOB,Address,signature,anum){
        this.name= name;
        this.anum= anum;
        this.DOB = DOB;
        this.Address = Address;
        this.signature = this.signTransaction(keygen.genFromPri(signature,'hex'));
    }
    SignatureisValid(sign) {
        if (!sign || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }
        const publicKey = ec.keyFromPublic(sign, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.name + this.DOB + this.Address + this.anum).digest('hex');
    }

    signTransaction(signingKey) {
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        return(sig.toDER('hex'));
    }
}
module.exports = aadhar