const mysql = require("mysql");
const inquirer = require('inquirer');
const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  readProducts();

  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
    });
  }

function askQ() {
    setTimeout(function(){
//Runs the first question and then responds to it based on user input
inquirer.prompt(question1).then(answers1 => {
    let IDsearch = answers1.Enter1;
    let NtoBuy = answers1.Enter2;
    console.log("ID is " + IDsearch);
    console.log("Buy " + NtoBuy + " of this product");
    updateProduct();


    function updateProduct() {
        console.log("Checking stock of items...\n");
        
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;

            if (res[IDsearch-1].stock_quantity < NtoBuy){
                console.log("Not enough in stock, try again later.");
                connection.end();
            }
            else if (res[IDsearch-1].stock_quantity >= NtoBuy){

                let query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: res[IDsearch-1].stock_quantity - NtoBuy
                      },
                      {
                        id: IDsearch
                      }
                    ],
                    function(err, res) {
                      connection.end();
                    }
                  );

            console.log("$" + res[IDsearch-1].price*NtoBuy + " is your total.");
            console.log(res[IDsearch-1].stock_quantity-NtoBuy + " is the new number of " +res[IDsearch-1].product_name + "'s left.");
            }
          });
      }
         });   
        }, 100);
  }
askQ();
});

// Questions -----------------------------------------------------------------------------------------------------------------------------------------------
const question1 = [
    {
        type: 'input',
        name: 'Enter1',
        message: 'What is the ID of the product you want?',
        validate: function(value) {
          let valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
    },
    {
        type: 'input',
        name: 'Enter2',
        message: 'How many of this product would you like to buy?',
        validate: function(value) {
            let valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
          },
          filter: Number
    },
  ];