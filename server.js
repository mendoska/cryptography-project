//node modules
const express = require('express');
const app = express ();
const bodyParser = require ('body-parser');
//https://nodejs.org/api/crypto.html#crypto
const crypto = require('crypto');
const axios = require ('axios');
const { error } = require('console');

// //function to convert hex to binary
// function hexToBinary(hex) {
//     let binary = '';
//     for (let i = 0; i < hex.length; i += 2) {
//       const byte = parseInt(hex.substr(i, 2), 16);
//       binary += byte.toString(2).padStart(8, '0');
//     }
//     return binary;
//   }

//   //generates a hex number of 256 bits 
//   crypto.generatePrime(256, (err, prime) => {
//     if (err) {
//       console.error(err);
//     } else {
//         //had an issue with array buffer need to create this variable
//       const buffer = Buffer.from(prime);
//       const hexString = buffer.toString('hex');
//       const binaryString = hexToBinary(hexString);
//       console.log(binaryString);
//       console.log(binaryString.length);
//     }
//   });

app.use (bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



function encryptAES(key, data) {

  //creates iv to enject
  const iv = crypto.randomBytes(16);
  //using aes 256-bits
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + encrypted;
}

function decryptAES(key, data) {
  const iv = Buffer.from(data.slice(0, 32), 'hex');
  const encrypted = data.slice(32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage
const key = crypto.randomBytes(32); // Generate a 256-bit (32-byte) random key
const plaintext = 'ZE WARUDO';
const ciphertext = encryptAES(key, plaintext);
const decryptedText = decryptAES(key, ciphertext);
console.log(`Plaintext: ${plaintext}`);
console.log(`Ciphertext: ${ciphertext}`);
console.log(`Decrypted text: ${decryptedText}`);



//  app.get('/', function(req, res){
//     if (error) throw error;
//     var obj ={};
//     crypto.generatePrime(256, (err, prime) => {
//         if (error) {
//           console.error(error);
//         } else {
//             //had an issue with array buffer need to create this variable
//           const buffer = Buffer.from(prime);
//           const hexString = buffer.toString('hex');
//           const binaryString = hexToBinary(hexString);
//          // console.log(binaryString);
//           console.log(binaryString.length);
//           obj.number = binaryString;
//           res.status(200).send({obj});
//         }
//       });


//  });




app.listen(5678); //start the server
console.log('Server is running...');