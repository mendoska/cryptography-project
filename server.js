/*
Lots of helps from //https://nodejs.org/api/crypto.html#crypto
Great built in library from Node.js and good documentation
*/


//node modules
const express = require('express');
const app = express ();
const bodyParser = require ('body-parser');
const crypto = require('crypto');
const axios = require ('axios');
const { error } = require('console');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));

 app.use(express.static('./public'))



app.use (bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//create function to received front end 

app.post('/?plaintxt=:plaintxt', function(req,res){
  //receiving message to encrypt
  var plaintxt = req.body.plaintxt;
  console.log("The message to be encrypted: " + plaintxt);
});



//I will change this to input
const plaintext = "Hello World!";
console.log("The message to be encrypted: " + plaintext);

/*
********************
CREATE/SELECT A SYMMETRIC- KEY ALGORITHM TO ENCRYPT THE TEXT (AES)
CREATE SYMMETRIC KEY
ENCRYPT KEY
********************
*/

//creating a 256-bit symmetric key for AES Encryption
//.randomBytes generates 
const symmetricKey = crypto.randomBytes(32);
//console.log ("The symmetric key is:  "+ symmetricKey);

//creating an IV for the .createCipherIV 
//this is for CBC -> Cipher Block Chaining
//The IV will XORed with the first block of plaintext during encryption
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);

//1st param text to be encrypted
//2nd encoding of the input message
//3rd output encoding format
//cipher.final will end the object from being encrypted (final block)
let encrypted = cipher.update(plaintext, 'utf8','hex');
encrypted += cipher.final('hex');

//console.log("The encrypted text is: "+ encrypted);

/*
********************
CREATE/SELECT AN ASYMMETRIC- KEY ALGORITHM TO ENCRYPT THE TEXT (RSA)
ENCRYPT KEY
********************
*/


//generate a pair of public & private keys for the public key encryption
//could go up as high as 2048 which is seen as the standard
//generateKeyPairSync 
const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa',{
  modulusLength:2048,
  //formatting to be a string
  publicKeyEncoding:{
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  },
});

//for testing, long fun outputs 
// console.log("This is the public key generated by RSA " + publicKey);
// console.log("This is the private key generated by RSA " + privateKey);


//encrypting the public key with the symmeticKey 
//using rsa protocols
const encryptedSymmeticKey = crypto.publicEncrypt(publicKey, symmetricKey);

//creating an object for data to send
const dataToSend = {
  //converting obj to string
  encryptedSymmeticKey: encryptedSymmeticKey.toString('base64'),
  encryptedMessage: encrypted,
  //sending IV that was created for first round of encryption
  iv:iv.toString('base64'),
};


// At the recipient's end, decrypt the symmetric key using the recipient's private key
const decryptedSymmetricKey = crypto.privateDecrypt(
  privateKey,
  //creates a buffer object from the base64-encoded string 
  Buffer.from(dataToSend.encryptedSymmeticKey, 'base64')
);

/*
DECRYPT THE MESSAGE
USE AES-256
the decrypted symmetric key 
and IV
*/
//note to self -> read more on documentaton of buffer
const decipher = crypto.createDecipheriv('aes-256-cbc', decryptedSymmetricKey,Buffer.from(dataToSend.iv, 'base64'));
//look at encryped has similar process
let decrypted = decipher.update(dataToSend.encryptedMessage, 'hex', 'utf8');
decrypted = decipher.final('utf8');

//console.log("The message is " + decrypted);
app.listen(5678); //start the server
console.log('Server is running...');