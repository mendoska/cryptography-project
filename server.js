//node modules
const express = require('express');
const app = express ();
const bodyParser = require ('body-parser');


const crypto = require('crypto');

//function to convert hex to binary
function hexToBinary(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i += 2) {
      const byte = parseInt(hex.substr(i, 2), 16);
      binary += byte.toString(2).padStart(8, '0');
    }
    return binary;
  }

  //generates a hex number of 256 bits 
  crypto.generatePrime(256, (err, prime) => {
    if (err) {
      console.error(err);
    } else {
        //had an issue with array buffer need to create this variable
      const buffer = Buffer.from(prime);
      const hexString = buffer.toString('hex');
      const binaryString = hexToBinary(hexString);
      console.log(binaryString);
      console.log(binaryString.length);
    }
  });
// //used to generate large number
// //https://www.npmjs.com/package/node-forge
// const forge = require('node-forge');


// //generates prime 256 - binary and its length 
// const bits = 256;

// forge.prime.generateProbablePrime(bits, (err, num) => {
//   if (err) {
//     console.error(err);
//   } else {
//     const binaryString = (num.toString(2));
//     console.log(binaryString);
//     console.log(binaryString.length)
//   }
// });

app.use (bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(5678); //start the server
console.log('Server is running...');