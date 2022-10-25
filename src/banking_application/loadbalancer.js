var https = require('https')
    , httpProxy = require('http-proxy')
    , seaport = require('seaport')
    , ports = seaport.connect('localhost', 9090);

const path = require('path');
const fs = require('fs');
const http = require('http');



const options = {
    key: fs.readFileSync(path.join(__dirname, 'keys', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'keys', 'cert.pem')),
    secure: false
}

let i = -1;
// opstart af server + error hvis ingen servers er ledige
var proxy = httpProxy.createProxyServer({});
var server = https.createServer(options, function(req, res) {
	var addresses = ports.query('server');
	if (!addresses.length) {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('Error! no available servers');
        return;
    }
	i = (i + 1) % addresses.length;
	var host = addresses[i].host.split(":").reverse()[0];
	var port = addresses[i].port;
	proxy.web(req, res, { target: 'https://' + host + ':' + port, secure:  false });	
});

server.listen(8080, function () {
	console.log('load balancer listening on port', 8080);
});