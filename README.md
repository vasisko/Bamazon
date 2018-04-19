BAMAZON
=======

The Bamazon command line storefront app allows the user to order from a list of products, specifying item and quantity.  Orders are confirmed with order total, and the mysql database of products is updated to reflect the reduction in the item's in-stock quantity.

Getting Started
---------------
The app will require the following files:
 * bamazonCustomer.js - the store app code 
 * bamazon_db.sql - the product database file
 * package-lock.json and package.json -contain the node npm package files 

To see the app in progress, view demo.

Prerequisites
-------------
You will need to modify the connection password for the MySQL database, located at the top of the customer js file.

Installing
----------
Place all files listed above within the same folder.

Database
--------
The product database, bamazon_db, contains the following fields:
item id, product name, price, and quantity in stock

Store
-----
The command line store can be run by calling bamazonCustomer.js.  The user will be shown a list of products available for ordering.  The user is prompted to enter the Item Id for the item they would like to order, and prompted again for the quantity desired.  

Once an order has been placed, the stock available for the item is verified, and if fully available, the order is processed:  A confirmation order message is displayed for the user with the order total, and the database is updated to reflect the change in stock.

Built With
----------
* MySQL Workbench- to create the product database
* Node.js - to create the command line store 
* mysql NPM - for database integration 
* inquirer NPM - for prompting user

Author
------
Carolyn Vasisko - Initial work
