let crypto = require('crypto');
const keygen = require('../models/Keygen')
class license {
    constructor(lic){
        this.name= lic.name;
        this.DOB = lic.DOB;
        this.Address = lic.Address;
        this.Expiry = lic.Expiry;
        this.signature = lic.signature;
    }
    constructor(name,DOB,Address,Expiry,signature){
        this.name= name;
        this.DOB = DOB;
        this.Address = Address;
        this.Expiry = Expiry;
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
        return crypto.createHash('sha256').update(this.name + this.DOB + this.Address +  this.Expiry).digest('hex');
    }

    signTransaction(signingKey) {
        // if (signingKey.getPublic('hex') !== this.fromAddress) {
        //     throw new Error('You cannot sign transactions for other wallets!');
        // }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');

        return(sig.toDER('hex'));
    }
}
module.exports = license