//node modules
const express = require('express');
const app = express ();
const bodyParser = require ('body-parser');
//https://nodejs.org/api/crypto.html#crypto
const crypto = require('crypto');
const axios = require ('axios');
const { error } = require('console');

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
     // console.log(binaryString);
      console.log(binaryString.length);
    }
  });

app.use (bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 app.get('/', function(req, res){
    if (error) throw error;
    var obj ={};
    crypto.generatePrime(256, (err, prime) => {
        if (error) {
          console.error(error);
        } else {
            //had an issue with array buffer need to create this variable
          const buffer = Buffer.from(prime);
          const hexString = buffer.toString('hex');
          const binaryString = hexToBinary(hexString);
         // console.log(binaryString);
          console.log(binaryString.length);
          obj.number = binaryString;
          res.status(200).send({obj});
        }
      });

    


 });




app.listen(5678); //start the server
console.log('Server is running...');