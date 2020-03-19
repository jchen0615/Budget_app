# Budget_app

### Quick Introduction
This web application is a personal project for the sole puporse of practicing native JavaScript with Express - NodeJs framework along with MySQL database. It is in no way intended for any profit-making. Please feel free to leverage any code as you would like.

In short, this web app allows users to enter and keep track of their income and expense for individual months. It calculates users' budget as well as expense to income ratio percentage while also updates and visualizes income and expense in the form of lists as users input them. MySQL local databse is leveraged to store these information allowing users to access them through this web app any time. 

### Quick Setup
This web app have 3 main JavaScript files: index.js, app.js, database.js representing frontend, backend and database respectively. Because MySQL is leveraged for this web app, a local MySQL database is required. (Ex. I've used MySQL Workbench and set up port number 3306). 

With MySQL installed and set up, we can now start running this web app. This app leverages Node.js to create local servers thus to start it up, it's as simple as navigate to 'Budget_app/scripts' directory and run 'node index', 'node app' and 'node database' in 3 different command terminals. Open up Google Chrome and navigate to 'http://localhost:3001'. App should be up and running, enjoy!

### Features
**Home page**
- Home page gives you general info for indivdual months: income, expense and budget for that particular month. On the top of the page, there are two arrows that allows you to navigate through the year. Hovering over any month will enlarge it and turns green indicating that particular month is being select.
![Image description](https://github.com/jchen0615/Budget_app/tree/master/public/img/Home.PNG)

**Detail page**
- Click on any months to get a detail list of income and expense for that particular month. This will redirect you to a new page. Located on the top of the page, there is a grid that summarizes the information: income, expense, budget, as well as the expense to income ratio. 

Moving down, we have an 'Add Description' input, a 'Value' input and a check button. Located on the left of 'Add Description' input, there is a box that displays '+'. By clicking '+', it will transform to '-' indcating whether its an income or an expense. 

Moving down the page, we have a list of incomes and expenses. Next to individual expenses, there is a percentage indicating its ratio to income. Hovering any income or expense, you will see a 'x' button that allows you to remove it from the list. That is all, thank you for your interest!
![Image description](https://github.com/jchen0615/Budget_app/tree/master/public/img/Detail.PNG)
