var express = require('express');
var cmd = require('node-cmd');
var mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb://localhost:27017/neuralNetworks");
db = mongoose.connection;
db.once('open', ()=>{console.log("Successfully connected to database");});
db.on('error', (err)=>{console.log("Error occurred: " + err + "\n endError");});

const Session = require('./nnModel.js');

app.use(express.static(".")); //use(express.static(“path_of_index_file”)); so that all static resources appear
app.use(express.urlencoded());

app.get('/', (req, res)=>{res.sendFile('sandbox.html', { root: __dirname});});

app.post('/', (req, res)=>{
	if(notNull(req.body.generation) && notNull(req.body.network) && notNull(req.body.sessionId))
	{
		let sessionId = req.body.sessionId;
		let gen = req.body.generation;
		let network = req.body.network;
		//put the generation and network into the database	
		/*let smData = Session.find({_id: sessionId});
		console.log(smData);*/
		Session.find({_id: sessionId}, (err, data)=>{
			if(err)
			{
				console.log(err);
			}
			else
			{
				let theData = data;
				let theArray = JSON.parse(theData[0]['theArray']);
				theArray.push({"generation": gen, "network": network});
				theArray = JSON.stringify(theArray);
				Session.findOneAndUpdate({_id: sessionId}, {theArray: theArray}, {upsert: true}, (err, doc)=>{
					if(err)
					{
						console.log(`Error: ${err}`);
					}
					else
					{
						console.log(`Doc: ${doc}`);
						console.log(`Successfully Entered New Stuff`);
					}
				});
			}
		});
		console.log(network);
	}
	else if(notNull(req.body.newSession))
	{
		let theSession = req.body.newSession;
		let theSessionId = new mongoose.Types.ObjectId;
		const newSession = Session({
			_id: theSessionId,
			theArray: theSession 
		});
		newSession.save().then(res.send(JSON.stringify({"thisSessionId":theSessionId})));
	}
	else if(notNull(req.body.themSessions))
	{
		Session.find((err, data)=>{
			if(err)
			{
				console.log(`Error: ${err}`);
			}
			else
			{
				res.set({
					'Access-Control-Allow-Origin':'*',
					'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE'
				});
				res.send(data);
			}
		});
	}
});

//dirname should actually be whatever you put in app.use(); __dirname is just the current directory
//which is not always the case
app.listen(8088, function()
{
    console.log("Server Start");
});

function notNull(inObj)
{
	let returnVal = false;
	if(inObj != null && inObj != undefined)
	{
		returnVal = true;
	}
	return returnVal;
}
