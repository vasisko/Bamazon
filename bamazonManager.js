//Require npm's 
var mysql = require("mysql");
var inquirer = require("inquirer");

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
    promptMgr();
});

//FUNCTION promptMgrUser():  prompts user for item and amt, calls processOrder()
function promptMgr(){
    inquirer.prompt([
        { 
          name: "task",
          type: "list",
          message: "Select a task from the following",
          choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
             ]
        },
        
    ]).then(function(answer) {
    //get Manager input
    
    var task = answer.task;
   
       switch(task) {
    
       case "View Products for Sale":
        viewProducts();
        break;
       case "View Low Inventory":
        viewLowInv();
        break;
       case "Add to Inventory":
        addInventory();
        break;
       case "Add New Product":
        addNewProduct();
        break;

       }

    });//end prompt
}
//

//View Products for Sale:  list every available item (the item IDs, names, prices, and quantities)
function viewProducts(){
   //print heading
   console.log("Our Products: \n");
   //query all items from db
   var query = "SELECT * FROM products";
   connection.query(query, function(err, res) {
     if (err) throw err;
     // Log results of the SELECT statement
     for (var i = 0; i < res.length; i++) {
        console.log(`Item ID = ${res[i].item_id}... ${res[i].product_name} '$'${res[i].price} Qty=${res[i].stock_quantity}`);
     } 
     //Return to task selection 
     promptMgr();
   });
}

//View Low Inventory: list all items with an inventory count lower than five.
function viewLowInv(){
    //print heading
   console.log("Low Inventory Products: \n");
   //query all items from db
   var query = "SELECT * FROM products WHERE stock_quantity < 5";
   connection.query(query, function(err, res) {
     if (err) throw err;
     // Log results of the SELECT statement
     for (var i = 0; i < res.length; i++) {
        console.log(`Item ID = ${res[i].item_id}... ${res[i].product_name} $${res[i].price} Qty:${res[i].stock_quantity}`);
     } 
     //Return to task selection 
     promptMgr();
   });
}

//If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory(){
    //print heading
   console.log("Add Inventory: \n");
   //query all items from db
   var query = "SELECT * FROM products";
   connection.query(query, function(err, res) {
     if (err) throw err;
    
     // Log results of the SELECT statement
     for (var i = 0; i < res.length; i++) {
        console.log(`Item ID: ${res[i].item_id}... ${res[i].product_name} $${res[i].price} Qty:${res[i].stock_quantity}`);
     } 
    });
    
    //Prompt manager to pick item to add stock to
    inquirer.prompt([
            { 
              name: "item",
              type: "input",
              message: "Enter the item ID number of the product you wish to update: ",
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
              message: "How many units you like to add to inventory: ",
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
            
            dbAddStock();
           
        });
    }

function dbAddStock(){
    
    //Update db with new stock for chosen item
    var query = "SELECT item_id, stock_quantity FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
                
        var chosenItem;
            for (var i = 0; i < res.length; i++) {
                 if (res[i].item_id === orderItem) {
                   chosenItem = res[i];
                 }
               }
            
            var qtyInStock = chosenItem.stock_quantity;
                
            connection.query("UPDATE products SET ? WHERE ?", 
                [
                    {   
                        stock_quantity: chosenItem.stock_quantity + orderQty
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ], function(error) {
                    if (error) throw err;
                    console.log(`Stock updated.  The total now in stock is ${chosenItem.stock_quantity + orderQty}`);
                        
                    promptMgr();
                    }
                ) 
             
        });
    }        
//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function addNewProduct(){
/*********************************** */
//Prompt manager to add product parameters
inquirer.prompt([
    { 
      name: "id",
      type: "input",
      message: "Enter the details of the new product to be added below:\n Item ID number: ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      } 
    },
    { 
        name: "item",
        type: "input",
        message: "Product name: ",
    },
    { 
        name: "department",
        type: "input",
        message: "Department: ",
    },
    { 
        name: "price",
        type: "input",
        message: "Unit price: ",
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
      message: "Quantity: ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }   
    }
]).then(function(answer) {
    //get User input
    
    //Update db with new item
    connection.query("INSERT INTO products SET ? ", 
        { item_id: parseInt(answer.id),
          product_name: answer.item,
          department_name: answer.department,
          price: parseFloat(answer.price),
          stock_quantity: parseInt(answer.qty)
        }),
      function(err, res) {
        if (err) throw err;
        console.log(`Product added: \n ${answer.iid}...${answer.item}...${answer.department} $${    answer.price}...qty: ${answer.qty}`); 
      }
        promptMgr();
         
    });
}        