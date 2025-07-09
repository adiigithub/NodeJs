const EventEmitter=require("events")
class Food extends EventEmitter{
constructor(){
    super();
    this.orderId=0
}
order(varieties,quantity,customerName){
    this.emit("Place-order",varieties,quantity,customerName)
    this.orderId++
}
display(){
console.log(`Total order: ${this.orderId}`)
}
closeKitchen(){
this.emit('close')
}
}
module.exports=Food