# Hybrid Cryptographic Scheme 
## Alexander Mendoza

![](https://github.com/mendoska/cryptography-project/blob/main/cryptography-demo.gif)


# How To Use

This is a web app that simulates a Hybrid Cryptographic scheme, a combination of symmetric-key and asymmetric-key encryption. The user is prompted to enter a message they want to send to a recipient. Once the message is sent, there is a "next" button that when pressed will display the order of the operation step by step. 


# About



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



# Ideas & Hopes Future Additions 
* Launch on Heroku (In Progress)
* Implement MongoDB
* Create working drop down options for the type of Encryption (Symmetric and Asymmetric)
* Implement Digital Signature & Hash Functions

