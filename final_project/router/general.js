const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!users.username?.includes(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return new Promise((resolve, reject) => {
    if (!resolve) {
        res.status(400).json({message: "Oops! There's an error somewhere! "})
        reject()
    } else {
        res.status(200).json({message: "Books Available: " + JSON.stringify(books)})
        resolve()
    }
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return new Promise((resolve, reject) => {
    if (!req.params.isbn) {
        res.status(400).json({message: "Oops! There's an error somewhere! "})
        reject()
    } else {
        res.status(200).json({message: "Book with ISBN = " + req.params.isbn + ": " + JSON.stringify(books.filter(l => l.isbn === req.params.isbn))})
        resolve()
    }
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return new Promise((resolve, reject) => {
    if (!req.params.author) {
        res.status(400).json({message: "Oops! There's an error somewhere! "})
        reject()
    } else {
        res.status(200).json({message: "Book whose author is " + req.params.author + ": " + JSON.stringify(books.filter(l => l.author === req.params.author))})
        resolve()
    }
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return new Promise((resolve, reject) => {
    if (!req.params.title) {
        res.status(400).json({message: "Oops! There's an error somewhere! "})
        reject()
    } else {
        res.status(200).json({message: "Book with the title " + req.params.title + ": " + JSON.stringify(books.filter(l => l.title === req.params.title))})
        resolve()
    }
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  return res.status(200).json({message: "Reviews from " + books[req.params.isbn].title + ": " + JSON.stringify(books[req.params.isbn].reviews)});
});

module.exports.general = public_users;
