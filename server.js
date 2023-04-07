//node modules
const express = require('express');
const app = express ();
const bodyParser = require ('body-parser');
//https://nodejs.org/api/crypto.html#crypto
const crypto = require('crypto');
const axios = require ('axios');
const { error } = require('console');



app.use (bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//I will change this to input
const plaintext = "Hello World!";


/*
********************
CREATE/SELECT A SYMMETRIC- KEY ALGORITHM TO ENCRYPT THE TEXT
CREATE SYMMETRIC KEY
ENCRYPT KEY
********************
*/


//creating a 256-bit symmetric key for AES Encryption
//.randomBytes generates 
const symmetricKey = crypto.randomBytes(32);

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







app.listen(5678); //start the server
console.log('Server is running...');