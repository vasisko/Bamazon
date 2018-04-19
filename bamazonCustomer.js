// Install npm's inquirer and mysql before running

//Require npm's 
var inquirer = require('inquirer');
var mysql = require('mysql');

var productCount = 0; // # of products available to order

//Set-up connection to mysql
var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password:"Mysqlr00t",
    database: "bamazon_db"
});

//Connect to mysql
connection.connect(function(err){
    if(err) throw err;
    //connection made 
    console.log(`connected as id ${connection.threadId}`);
    listProducts();
    
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      //if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
    });
  }
  


// function listProducts() display all products(query db)  
function listProducts(){
   
    connection.query("SELECT item_id product_name price FROM products", function(err, res){
        console.log("here!!");
        
       // if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`ID #:  ${res[i].item_id}  Item: ${res[i].product_name}  price: ${res[i].price}`);
        } 
        productCount = res.length;
    });
 //   promptUser();
};

// function promptUser() to prompt user for action (using inquirer npm)
function promptUser(){
    
    console.log("To order, please select the item you wish to purchase from the listing above");
        
    inquirer.prompt ([

            //ID of the product they would like to buy
            { name: "itemId",
              type: "input",
              message: "Enter the item ID number: ",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              } 
            },

            //QUANTITY of the product they would like to buy
            { name: "itemQty",
              type: "input",
              message: "Enter the item QUANTITY: ",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
        ])
        . then(function(order) {
            // is product id value valid?
                if(order.itemId<productCount){
                     //yes... continue with order
                    console.log("place order");
                    //processOrder();
                }
                // no - invalid, alert user, try again
                console.log("Invalid product id.  Please try again.");
                listProducts();
            });
        
    };

// function processOrder() to process user input = order
//   function processOrder(order){
 //       var query = connection.query(
 //           "SELECT stock_quantity FROM bamazon_db WHERE ?" [{item_id: order.itemID}]*****************************
 //       )

   // }
//check if store has enough of the product to meet the customer's request
// no:  err msg:  "Insufficient Quantity"  call to promptUser() 
// yes: fullfill order
    // update qty in db, show user total cost


// order complete...disconnect db
connection.end();


