let crypto = require("crypto")
let keygen = require("./Keygen")
class User{
    constructor(name,pass,phone,hashs){
        this.u_name=name;
        this.pass=pass;
        this.u_phone=phone;
        this.hashs=hashs;
    }
    SignatureisValid(sign) {
        if (!sign || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }
        const publicKey = ec.keyFromPublic(sign, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
    
    setvals(u_name,pass,u_phone){
        if(u_name){
            this.u_name=u_name;
        }
        if(pass){
            this.pass=pass;
        }
        if(u_phone){
            this.u_phone=u_phone;
        }
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.name + this.pass + this.u_phone +  this.hashs).digest('hex');
    }
    
    signTransaction(signingKey) {
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
    
        return(sig.toDER('hex'));
    }
}
module.exports=User;