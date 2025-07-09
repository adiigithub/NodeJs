// require('./add')
// const superHero=require("./super-hero")
// console.log(superHero.getName())
// superHero.setName("aditya")
// console.log(superHero.getName())

const SuperHero=require("./super-hero")
const batman=new SuperHero("Batman")
console.log(batman.getName())

batman.setName("ironMan")
console.log(batman.getName())