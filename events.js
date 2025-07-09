
// const EventEmitter=require("events")
//  const emiter = new EventEmitter()
// emiter.on("order-Pizza",(size,topping,hello)=>{
//     console.log(`there is a new order=pizza wih ${size} ${topping} ${hello}`)
// }).on("order-Pizza",(size)=>{
//     if(size==="larze"){
//         console.log("print it");
//     }
// })

// emiter.emit("order-Pizza",'larze','mushrooms' ,"hello")
// const EventEmitter=require("events")
//  const emiter = new EventEmitter()
// emiter.on("order-Pizza",(size,topping,hello)=>{
//     console.log(`there is a new order=pizza wih ${size} ${topping} ${hello}`)
// }).on("order-Pizza",(size)=>{
//     if(size==="larze"){
//         console.log("print it");
//     }  
// })
// emiter.emit("order-Pizza",'larze','mushrooms' ,"hello")
const PizzaShop=require("./pizza-shop")
const DrinkMachine=require("./drink-machine")

const pizzaShop= new PizzaShop()
const drinkmachine=new DrinkMachine()

pizzaShop.on("order",(size,topping)=>{
        console.log(`there is a new order=pizza wih ${size} ${topping}`)
        drinkmachine.serveDrink(size)
})
pizzaShop.order("larze","paneer")
pizzaShop.displayOrderNumber() 