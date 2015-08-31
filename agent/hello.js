var agent = require('./_header')
  , device = require('../device.sample');



console.log(device);




/*agent.createMessage()
  .device("<d641d58f e044d2e3 8418a916 0e3b2ba0 18f1a8df 37eced59 c76ff3f4 04aa6abe>")
  .alert('Hello Ahmed!')
  .send();


// Create a badge message
agent.createMessage()
  .device("<d641d58f e044d2e3 8418a916 0e3b2ba0 18f1a8df 37eced59 c76ff3f4 04aa6abe>")
  .alert('Time to set the badge number to 3.')
  .badge(3)
  .send();

//Custom Payload Variables
agent.createMessage()
  .device("<d641d58f e044d2e3 8418a916 0e3b2ba0 18f1a8df 37eced59 c76ff3f4 04aa6abe>")
  .alert('Custom variables')
  .set('id_1', 12345)
  .set('id_2', 'abcdef')
  .send();
// Create by ahmed

agent.createMessage()
  .device("<d641d58f e044d2e3 8418a916 0e3b2ba0 18f1a8df 37eced59 c76ff3f4 04aa6abe>")
  .alert('MessageSend')
  .sound ("beep9.mp3")
  .set('message', 'Ahla Ahmed cv')
  .send();*/




var fs = require("fs");
var http = require('http');
var mongo = require('mongodb')
var hostdb = "127.0.0.1"
var portdb = 27017
server = http.createServer( function(req, res) {

    console.dir(req.param);
      
      if(req.url == "/login"){
        console.log("url req" + req.url);
        Login( req , res);
      }else{
        Inscription( req , res);
      }
        
      
              

});

var port = 3000;
var host = '192.168.1.69';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);






var config = JSON.parse(fs.readFileSync("./config.json"));
fs.watchFile("./config.json",function (current , previous){
  console.log("Start Config");
  config = JSON.parse(fs.readFileSync("./config.json"))
  console.log(config.message);
  


  agent.createMessage()
  .device("<d641d58f e044d2e3 8418a916 0e3b2ba0 18f1a8df 37eced59 c76ff3f4 04aa6abe>")
  .alert('MessageSend')
  .sound ("beep9.mp3")
  .set('message', config.message)
  .send();

});

function Inscription(req , res){
    if (req.method == 'POST') {
                    console.log("POST");
                    var body = '';
                    req.on('data', function (data) {
                        body += data;
                        //console.log("Partial body: " + body);
                    });
                    req.on('end', function () {
                        console.log("Body: " + body);
                        var db = new mongo.Db("nodejs_inscription" , new mongo.Server(hostdb , portdb,{}))
                          db.open(function(error){
                            if(error){
                              console.log("Problem with mongodb Server");
                            }else{
                              console.log("we are connected to mongodb server");
                              db.collection ("user" , function (error , collection){
                                if(error){
                                  console.log("Error with the collection conifgure");
                                }else{
                                  console.log("Collection access done");
                                  var j=JSON.parse(body);
                                  collection.save(j , function (error){
                                    if(error){
                                      console.log("Proble to save the collection");
                                    }else{
                                      console.log("Collection Save" + j.TokenDevice);

                                        agent.createMessage()
                                        .device(j.TokenDevice)
                                        .alert('Welcome ' +j.FirstName)
                                        .sound ("beep9.mp3")
                                        .set('Welcome ')
                                        .send();

                                    }
                                  });
                                }
                              });
                            }
                          });

                    });
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end('post received ');

                        //res.end('<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>');
                    }
                    else
                    {
                        console.log("GET");
                       // var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
                        var html = fs.readFileSync('index.html');
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
}
function Login(req , res){
  
    if (req.method == 'POST') {
                    console.log("POST");
                    var body = '';
                    req.on('data', function (data) {
                        body += data;
                        //console.log("Partial body: " + body);
                    });
                    req.on('end', function () {
                        console.log("Body: " + body);
                        var db = new mongo.Db("nodejs_inscription" , new mongo.Server(hostdb , portdb,{}))
                          db.open(function(error){
                            if(error){
                              console.log("Problem with mongodb Server");
                            }else{
                              console.log("we are connected to mongodb server");
                              db.collection ("user" , function (error , collection){
                                if(error){
                                  console.log("Error with the collection conifgure");
                                }else{
                                  console.log("Collection access done");
                                  var j=JSON.parse(body);
                                  collection.find(j , function (error , cursor){
                                    if(error){
                                      console.log("Problem with find function");
                                    }else{
                                      cursor.toArray( function ( error , users){
                                        if(users.length == 0){
                                          console.log("No users found")
                                           res.writeHead(404, {'Content-Type': 'text/html'});
                                            res.end('No user found');
                                        }else{
                                          console.log("Found ", users[0]);
                                          res.writeHead(200, {'Content-Type': 'text/html'});
                                          res.end('user find ');
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });

                    });
                   
                        //res.end('<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>');
                    }
                    else
                    {
                        console.log("GET");
                       // var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
                        var html = fs.readFileSync('index.html');
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
}



