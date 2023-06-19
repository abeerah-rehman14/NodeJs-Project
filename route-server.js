const http = require('http')


const server = http.createServer((req, res)=>{

    if(req.url === "/")
    {
        res.write("Welcome to training session 1 demo project\n")
    }
    else if(req.url === "/home")
    {
        res.write("Home is in progress\n")
    }
    else
    {
        res.write("Invalid url, page not found.\n")
    }

    res.end(`Request Url = ${req.url}`)

})

server.listen(3000)