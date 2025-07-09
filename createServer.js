const http=require("http");
const server=http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"text/plain"})
    res.write("hello world")
    res.end("end")
})
server.listen(3000,()=>{
    console.log("the server load in port numberr 3000")
})