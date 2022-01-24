const express = require('express');
const app = express();
const port = 3001;
app.set('view engine', 'ejs');

function generateRandomString() {

}

const urlDatabase = {
	b2xVn2: 'http://www.lighthouselabs.ca',
	'9sm5xK': 'http://www.google.com',
};

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/urls', (req, res) => {
	console.log(req.body);
	res.send('Ok');
});

app.get('/urls/new', (req, res) => {
	res.render('urls_new');
});

app.get('/urls', (req, res) => {
	const templateVars = { urls: urlDatabase };
	res.render('urls_index', templateVars);
});

app.get('/urls/:shortURL', (req, res) => {
	const templateVars = { shortURL: req.params.shortURL, longURL: req.params.longURL };
	res.render('urls_show', templateVars);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
