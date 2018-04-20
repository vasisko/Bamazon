// Install npm's inquirer and mysql before running

//Require npm's 
var mysql = require("mysql");
var inquirer = require("inquirer");

//variables
var productCount = 0;
var orderItem;
var orderQty;

//Set-up parameters for MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mysqlr00t",
    database: "bamazon_db"
});

//Establish connection with MySQL   
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    listProducts();
});

// Function listProducts(): will list out items for ordering, will get # of items (for validation of item #) and will call userPrompt()
function listProducts() {
    //print heading
    console.log("Our Products: \n");
    //query all items from db
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      if (err) throw err;
      // Log results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
        console.log(`Item ID = ${res[i].item_id}... ${res[i].product_name} ${res[i].price}`);
      } 

      //Call function to prompt user
      promptUser();
    });//end query
}

//Function promptUser():  prompts user for item and amt, calls processOrder()
function promptUser(){
    inquirer.prompt([
        { 
          name: "item",
          type: "input",
          message: "TO ORDER: please enter the item ID number: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          } 
        },
        { 
          name: "qty",
          type: "input",
          message: "How many would you like to order: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
           
            return false;
          }   
        }
    ]).then(function(answer) {
        //get User input
        
        //convert string inputs to numbers
        orderItem = parseInt(answer.item);
        orderQty = parseInt(answer.qty);
        
        processOrder();
       
    });
}
// Function processOrder:  check quantities, calculate order total, update database 
function processOrder(){

//Is QTY valid ?
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        
       //console.log(res.length);
       //console.log("Order Item" + orderItem);
       var chosenItem;
       for (var i = 0; i < res.length; i++) {
         if (res[i].item_id === orderItem) {
           chosenItem = res[i];
         }
       }
       
       var qtyInStock = chosenItem.stock_quantity;
        //console.log("# in stock:" + qtyInStock);

        if(!(orderQty > qtyInStock)){
           //console.log("We have that product in stock");
           
            connection.query("UPDATE products SET ? WHERE ?", 
            [
                {   
                    stock_quantity: chosenItem.stock_quantity - orderQty
                },
                {
                item_id: chosenItem.item_id
                }
            ], function(error) {
                if (error) throw err;
                console.log("Order placed successfully! Your total is $" + orderQty*chosenItem.price);
                //console.log("Thank you for your order!");
                promptUser();
              }
            )
        } 
        else { 
          console.log(`Can not place order: Only ${qtyInStock} left.`);
          promptUser();
      }
});
}

