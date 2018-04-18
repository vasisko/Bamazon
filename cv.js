
var mysql = require("mysql");
var inquirer = require("inquirer");

var productCount = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Mysqlr00t",
    database: "bamazon_db"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    listProduct();
  });

function listProduct() {
    console.log("Our Products: \n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
        console.log(`Item ID = ${res[i].item_id}... ${res[i].product_name} ${res[i].price}`);
      } 
      productCount = res.length;
      console.log(productCount);
      promptUser();
    });
}

function promptUser(){
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "TO order, please enter the item ID number: ",
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
    ])
    .then(function(answer) {
        var orderItem = answer.item;
        var orderQty = answer.qty;
        console.log(answer.item + answer.qty);

        //Is ID valid ?
        if(orderItem < productCount){
            //yes... continue with order
           console.log("id validates");
           //processOrder();
       }
       else {
            // no - invalid, alert user, try again
            console.log("Invalid product id.  Please try again.");
            listProducts();
       }

       //Is QTY valid ?
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
         console.log(res);
        // var qtyInStock = res.stock_quantity;
        //}

        //if(!orderQty > qtyInStock){
        //    console.log("We have that product in stock");
        });
    

    });//end prompt



    connection.end();
}