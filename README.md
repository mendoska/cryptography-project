# Hybrid Cryptographic Scheme 
## Alexander Mendoza

![](https://github.com/mendoska/cryptography-project/blob/main/cryptography-demo.gif)


# How To Use

This is a web app that simulates a Hybrid Cryptographic scheme, a combination of symmetric-key and asymmetric-key encryption. The user is prompted to enter a message they want to send to a recipient. Once the message is sent, there is a "next" button that when pressed will display the order of the operation step by step. 


# About

This implementation's overview:

1. Alice has a secret message she wants to send to Bob. But she wants to keep it private, so she encrypts it using a secret key.


2. To make sure Bob can decrypt the message, Alice also encrypts the secret key using Bob's public key (RSA). This means only Bob can decrypt her secret key, which he uses to decrypt the message


3. Alice sends the encrypted secret key, the encrypted message (AES), and an initialization vector (IV) to Bob.​

4. Bob receives the encrypted secret key, encrypted message, and IV. He uses his private key (RSA) to decrypt the secret key.

5. Now that Bob has the secret key, he uses it to decrypt (AES) the message using the decrypted secret key and IV that Alice provided.

6. Bob can now read the secret message that Alice sent him!



# Technologies/Languages Used
* HTML/ CSS
* Javascript
* Node JS
* Node JS Crypto https://nodejs.org/api/crypto.html#crypto (great documentation)

# Challenges:

### Dealing with large number of bits
> The minimum for this project being 256-bit, I originally was going to implement this in C++ & create a GUI application. However through some research I found the Node JS Crypto library leading to the creationg of this web app.

### Displaying information from the backend
> The dreaded [OBJECT, OBJECT] in Javascript, being able to convert these large encryption as a string, using the .toString('base64') method helped overcome the issue.

### Way to present and explain the flow of the scheme 
> Creating the Bob & Alice columns and cycling through with Javascript magic 



# Ideas & Future Additions 
* Launch on Heroku (In Progress)
* Implement MongoDB
* Create working drop down options for the type of Encryption (Symmetric and Asymmetric)
* Implement Digital Signature & Hash Functions

