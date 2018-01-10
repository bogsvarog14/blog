//TODO: Implementirati mogucnost dodavanja novog bloga, brisanje starog

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
var hbs = require('hbs');
var blogEngine = require('./blog');
app.use(bodyParser.json())

var entries = require (`./entries.json`);

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.render('index', { title: "My Blog", entries: blogEngine.getBlogEntries() });
});

app.get('/about', function (req, res) {
	res.render('about', { title: "About Me" });
});

app.get('/article/:id', function (req, res) {
	var entry = blogEngine.getBlogEntry(req.params.id);
	res.render('article', { title: entry.title, blog: entry });
});

app.post(`/addUser`, function (req, res) {
	fs.readFile(__dirname + "/" + "package.json", `utf0`, function (err, data) {
		data = JSON.parse(data);
		data.push(req.body);
		console.log(req.body);
		var jsonData = JSON.stringify(data);
		fs.writeFile(__dirname + "/" + "entries.json", jsonData);
		res.end(jsonData);
	});
})

app.delete(`/deleteUser/:id`, function (req, res) {

	fs.readFile(__dirname + "/" + "entries.json", `utf8`, function (err, data) {

		var users = JSON.parse(data);
		console.log(users);
		for (var i = 0; i < users.lenght; i++) {
			if (users[i].id == req.params.id) {
				users.splice(i, 1);
				break;

			}

		}
		var jsonData = JSON.stringify(users);
		fs.writeFile(__dirname + "/" + "entries.json", jsonData);
		res.end(jsonData);
	});
})

app.listen(3000);
