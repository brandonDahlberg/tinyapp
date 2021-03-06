const express = require('express');
const app = express();
const port = 3001;
const cookie = require('cookie-parser');
app.set('view engine', 'ejs');
app.use(cookie());

const rndmNum = function () {
	let rndmStr = (Math.random() + 1).toString(36).substring(7);
	return rndmStr;
};

const urlDatabase = {
	b2xVn2: 'http://www.lighthouselabs.ca',
	'9sm5xK': 'http://www.google.com',
};

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect('/urls');
});

app.post('/logout', (req, res) => {
	res.clearCookie('username', req.body.username);
	res.redirect('/urls');
});

app.post('/urls', (req, res) => {
	const shortURL = rndmNum();
	urlDatabase[shortURL] = req.body.longURL;

	res.redirect(`/urls/${shortURL}`);
});

app.post('/urls/:shortURL/delete', (req, res) => {
	delete urlDatabase[req.params.shortURL];
	res.redirect(`/urls`);
});

app.post('/urls/:shortURL', (req, res) => {
	const shortURL = req.params.shortURL;
	const longURL = req.body.longURL;
	urlDatabase[shortURL] = longURL;

	res.redirect('/urls');
});

app.get('/u/:shortURL', (req, res) => {
	const longURL = urlDatabase[req.params.shortURL];
	res.redirect(longURL);
});

app.get('/urls/new', (req, res) => {
	const templateVars = {
		username: req.cookies['username'],
	};
	res.render('urls_new', templateVars);
});

app.get('/urls', (req, res) => {
	const templateVars = { urls: urlDatabase, username: req.cookies['username'] };
	res.render('urls_index', templateVars);
});

app.get('/urls/:shortURL', (req, res) => {
	const templateVars = {
		shortURL: req.params.shortURL,
		longURL: urlDatabase[req.params.shortURL],
		username: req.cookies['username'],
	};
	res.render('urls_show', templateVars);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
