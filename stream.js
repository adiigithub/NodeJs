const fs=require('fs')

const readabelStream=fs.createReadStream('./file1.txt',{
    encoding:'UTF-8',
    highWaterMark:2
})
const writeabelStream = fs.createWriteStream("./file2.txt")

readabelStream.on('data',(chunk)=>{
    console.log(chunk)
    writeabelStream.write(chunk)
})