// Install npm's inquirer and mysql before running

//Require npm's 
var inquirer = require('inquirer');
var mysql = require('mysql');

var productCount = 0; // # of products available to order

//Set-up connection to mysql
var connection = mysql.connection({
    host:"localhost",
    port: 3306,
    user: "root",
    password:"Mysqlr00t",
    database: "bamazon_db"
});

//Connect to mysql
connection.connect(function(err, results){
    if(err) throw err;
    //connection made 
    console.log(`connected as id ${connection.threadId}`);
    listProducts();
    }

// function listProducts() display all products(query db)  
    function listProducts(){
        var query = connection.query(
            "SELECT item_id product_name price FROM bamazon_db"
            , function(err, res){
                if (err) throw err;
                console.log(res);
                productCount = res.length;
            }
        );
        promptUser();
    }

// function promptUser() to prompt user for action (using inquirer npm)
    function promptUser(){
        console.log("To order, please select the item you wish to purchase from the listing above");
        inquirer.prompt ([  //questions to ask user
            { name: "itemId",
              type: "input",
              message: "Enter the item id number: ",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              } 
            },
            { name: "itemQty",
              type: "input",
              message: "Enter the item quantity: ",
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
                if((order.itemId<productCount) && (order.itemId>0){
                     //yes... continue with order
                    processOrder();
                }
                // no - invalid, alert user, try again
                console.log("Invalid product id.  Please try again.");
                listProducts();
            }
        }
    };

// The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.
// (both item and qty are reqd inputs)


// function processOrder() to process user input = order
//check if Gstore has enough of the product to meet the customer's request
// no:  err msg:  "Insufficient Quantity"  call to promptUser() 
// yes: fullfill order
    // update qty in db, show user total cost


connection.end();


});
