import http from 'http';
import fs from 'fs';


const server = http.createServer((req, res) => {

    console.log('estoy en server', req.url);

    //  res.writeHead(
    //     200,
    //     { 'Content-Type': 'text/html' });
    //  res.write(`<h1>URL ${req.url}</h1>`);
    //  res.end();  

    // const data = {
    //     name: 'John Doe',
    //     age: 30,
    //     email: 'john.doe@example.com'
    // };

    // res.writeHead(200, {  'Content-Type': 'application/json'        });
    // res.end(JSON.stringify(data));
    const htmlFile = fs.readFileSync(
    './public/index.html', 'utf-8');
    // if (req.url === '/css') {
    //     res.writeHead(200, { 'Content-Type': 'text/css' });
    // }
    // if (req.url === '/js') {
    //     res.writeHead(200, { 'Content-Type': 'application/javascript' });
    // }

    if (req.url === '/') {  
       res.writeHead(200, { 'Content-Type': 'text/html' });
       res.end( htmlFile );

    }else  {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page Not Found</h1>');
    }        

});

 server.listen(8080, () => {
     console.log('Server running on port 8080!!');
 });

