 
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const app =	express();

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));

var sess;  

router.get('/',(req,res) => {
	sess = req.session;
	if(sess.email) {
		return res.redirect('/admin');
	}
	res.sendFile('index.html');
});

router.post('/login',(req,res) => {
	sess = req.session;
	var username = req.body.email;

	sess.email = username;
	res.end('done');
});

router.get('/admin',(req,res) => {
	sess = req.session;
	if(sess.email) {
		res.write(`<h1>Hello ${sess.email} </h1><br>`);
		res.end('<a href='+'/logout'+'>Logout</a>');
	}
	else {
		res.write('<h1>Please login first.</h1>');
		res.end('<a href='+'/'+'>Login</a>');
	}
});

router.get('/logout',(req,res) => {
	req.session.destroy((err) => {
		if(err) {
			return console.log(err);
		}
		res.redirect('/');
	});

});

app.use('/', router);


function token(username){
 let username = "GeeksforGeeks";  
 let bufferObj = Buffer.from(originalString, "utf8"); 
 let en_token = bufferObj.toString("base64"); 
 return en_token;
}

app.listen(process.env.PORT || 3000,() => {
	console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
