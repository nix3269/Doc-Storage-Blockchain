const EC = require('elliptic').ec;
// You can use any elliptic curve you want
const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-strings
const genkey = () =>{
    
    const key = ec.genKeyPair();
    
    return (key);
};

const genFromPri = (key) => {
    const key1 = ec.keyFromPrivate(key, 'hex');
    return(key1);
}

//console.log(ec.genKeyPair().getPublic('hex'));

exports.genkey = genkey;
exports.genFromPri = genFromPri;