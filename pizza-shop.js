const EventEmitter=require("events")

class PizzaShop extends EventEmitter{
    constructor(){
        super()
        this.orderNumber=0
    }
    order(size,topping){
        this.emit("order",size,topping)
        this.orderNumber++
    }
    displayOrderNumber(){
        console.log(`current order Number is:${this.orderNumber}`)
    }
}
module.exports=PizzaShop;