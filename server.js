let express = require('express');
let app = express();

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mongodb://admin:node123@ds029595.mlab.com:29595/cursonode

let mongoose = require('mongoose');
mongoose.connect(
	"mongodb://admin:node123@ds029595.mlab.com:29595/cursonode",
	{ useNewUrlParser: true }
);

let ToDo = require("./models/todo");

app.get('/', function (req, res) {
	res.send('Hello World Travis!'); // envia texto
})

//get with callback
app.get('/todo', function (req, res) {
	ToDo
		.find()
		.exec((err, todos) => {
			if(!err){
				res.json({
					success: true,
					message: "ToDos buscados com sucesso.",
					todos
				}); //responde com um objeto json
			}else{
				res.json({success: false, message: err.message, todos: [] });
			}
		})
});

//post com async/await e try/catch
app.post('/todo', async(req, res) => {
	try{
		let title = req.body.title;

		let newTodo = new ToDo({
			title: title
		});

		let savedTodo = await newTodo.save();

		res.json({ success: false, message: "Sucesso!!!", todo: savedTodo }); // ESTAVA TRUE!!!
	}catch(err){
		res.json({ success: false, message: err.message });
	}
});

//console.log(process.env);

//SERVER listening
let port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log('Example app listening on port ' + port);
});

//add exports to app at server.js
module.exports = app;