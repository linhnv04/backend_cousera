// general.js
const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_user.js").isValid;
let users = require("./auth_user.js").users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (isValid(username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    users.push({ username, password });

    return res.status(200).json({ message: "Registration successful", username });
});

// Using Promises
public_users.get('/', (req, res) => {
    axios.get('http://localhost:5000/books')
        .then(response => {
            res.status(200).send(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching books", error: error.message });
        });
});

// Using async-await
public_users.get('/async', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/books');
        res.status(200).send(JSON.stringify(response.data, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Using Promises
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    axios.get(`http://localhost:5000/books/${isbn}`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching book details", error: error.message });
        });
});

// Using async-await
public_users.get('/async/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const response = await axios.get(`http://localhost:5000/books/${isbn}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details", error: error.message });
    }
});
// Using Promises to get book details by Author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;

    axios.get(`http://localhost:5000/books/author/${author}`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching book details", error: error.message });
        });
});

// Using async-await to get book details by Author
public_users.get('/async/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const response = await axios.get(`http://localhost:5000/books/author/${author}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details", error: error.message });
    }
});

// Using Promises to get book details by Title
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title;

    axios.get(`http://localhost:5000/books/title/${title}`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching book details", error: error.message });
        });
});

// Using async-await to get book details by Title
public_users.get('/async/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const response = await axios.get(`http://localhost:5000/books/title/${title}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details", error: error.message });
    }
});

// Get book review
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
