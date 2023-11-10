
const http = require('http');
let customers=require('./temp.json');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
  
  if (req.method === 'GET') {
    if (req.url.includes('/get')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(customers));
    }
  }
  if (req.method === 'POST') {
    if (req.url.includes('/post')){
      let body;
      req.on('data', (chunk) => {
        body = JSON.parse(chunk.toString());
      });
      req.on('end', () => {
        customers.push(body);
        res.writeHead(200, { 'Content-Type': 'application/plain-text' });
        res.end('Customer added successfully');
    });
}
}
if (req.method === 'DELETE') {
    if (req.url.includes('/delete')) {
      const customerID = parseInt(req.url.split('/')[2]);
      const updatedProducts = customers.filter((customer) => customer.id !== customerID);
      customers = updatedProducts;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Customer deleted successfully');
  }
}
if(req.method==='PUT'){
    if(req.url.includes('/update')){
        const customerID=parseInt(req.url.split('/')[2]);
        const custToReplace=customers.find((customer)=>customer.id===customerID);
        if(custToReplace){
            req.on('data', (chunk) => {
                let payLoad = JSON.parse(chunk.toString());;
                let newName=payLoad.name;
                const newData={name: newName,id: customerID};
                 const index=customers.indexOf(custToReplace);
                 customers[index]=newData;
              });
              req.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(customers));
            });
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Customer not found');
      }
    }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
  });




