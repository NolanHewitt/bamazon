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

  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  };

  function readProducts2() {
    console.log("Selecting all low inventory products...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  };



// Questions -----------------------------------------------------------------------------------------------------------------------------------------------
const question1 = [
    {
        type: 'list',
        name: 'options',
        message: 'What size do you need?',
        choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product'],
        filter: function(val) {
          return val.toLowerCase();
        }
    },
    
  ];

  const question2 = [
    {
        type: 'input',
        name: 'options2',
        message: 'What is the ID of the product you want to add inventory to?',
        validate: function(value) {
          let valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
    },
    {
        type: 'input',
        name: 'options3',
        message: 'How much of this product would you like to add?',
        validate: function(value) {
          let valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
    },
    
  ];

  const question3 = [
    {
        type: 'input',
        name: 'options4',
        message: 'Product Name?',
    },
    {
        type: 'input',
        name: 'options5',
        message: 'Product Department?',
    },
    {
        type: 'input',
        name: 'options6',
        message: 'Product Price?',
        validate: function(value) {
          let valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
    },
    {
        type: 'input',
        name: 'options7',
        message: 'Product Stock?',
        validate: function(value) {
          let valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
    },
    
  ];

  

    inquirer.prompt(question1).then(answers1 => {
    console.log(answers1.options);

    //If the user chooses to post an item then run question2 to continue this tree
    if (answers1.options==="view products for sale") {
        readProducts();
        };
//--------------------------------------------------------------------------------------------
        if (answers1.options==="view low inventory") {
            readProducts2();
            };
//--------------------------------------------------------------------------------------------
            if (answers1.options==="add to inventory") {
                inquirer.prompt(question2).then(answers2 => {
                    console.log(answers2);
                    let IDsearch = answers2.options2;
                    let NUMtoadd = answers2.options3;
                    updateProduct();
                
                    function updateProduct() {
                        
                        connection.query("SELECT * FROM products", function(err, res) {
                            if (err) throw err;
                            console.log(res[IDsearch-1].stock_quantity+NUMtoadd + " is the new number of " +res[IDsearch-1].product_name + "'s in stock.");
                
                                let query = connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [
                                      {
                                        stock_quantity: res[IDsearch-1].stock_quantity + NUMtoadd
                                      },
                                      {
                                        id: IDsearch
                                      }
                                    ],
                                    function(err, res) {
                                      connection.end();
                                    }
                                  );
                          });
                      }
                })
                };
//-------------------------------------------------------------------------------------------------------------------
                if (answers1.options==="add new product") {
                    inquirer.prompt(question3).then(answers3 => {
                        let newName = answers3.options4;
                        let newDep = answers3.options5;
                        let newPrice = answers3.options6;
                        let newStock = answers3.options7;
                        console.log(newName);
                        console.log(newDep);
                        console.log(newPrice);
                        console.log(newStock);
                        let sql = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?`;
                        let products = [
                            [newName, newDep, newPrice, newStock],
                          ];

                          connection.query(sql, [products], (err, results, fields) => {
                            if (err) {
                              return console.error(err.message);
                            }
                          });

                        connection.end();
                    });

    };

});
});