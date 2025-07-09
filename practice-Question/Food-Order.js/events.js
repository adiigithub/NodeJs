const Food = require("./food");
const readline = require("readline");
const food = new Food();
food.on("Place-order", (varieties, quantiy, customerName) => {
  console.log(`order received : ${quantiy} X ${varieties} for ${customerName}`);
});
food.once("close", () => {
  console.log("kitchen is now closed. No more ordes will be accepted");
});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function TakeOrde() {
  while (true) {
    const varieties = await askQuestion("Write your varieties which you want ");
    const quantity = await askQuestion("how much quantity you want ");
    const customerName = await askQuestion("tell me your name ");

    food.order(varieties, quantity, customerName);

    const answer = await askQuestion(
      `do you want to palce more ordre ? (yes/no)`
    );
    if (answer.trim().toLowerCase() !== "yes") {
      break;
    }
  }
  food.display();
  food.closeKitchen();
  rl.close();
}
TakeOrde();
// food.order("burger","5","aditya")
// food.order("pizza","2","neha ")
// food.order("sushi","1","hritik")
