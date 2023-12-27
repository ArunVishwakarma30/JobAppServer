1. index.js // *
2. models
3. Controllers

folder structure
1. Controllers 
    --> It contains implementation on route handlers
        Responsible for handling incoming request 
        and processing data interacting with models and database
        and send back appropriate response 
        the controller function will receive reqest and response object as parameter to perform necessary task

// while managining API request , when we use 
//         1. req.params.PARAMETER_NAME --> this get the value from link e.g ( https://google.com/api/login/PARAMETER_NAME)  
//         2. req.user.PARAMETER_NAME --> this get the value from token which we pass in the request header   

2. Middleware
    --> here we will perform authentication ,
        error handling,
        here we will verfie wethere the data passing through the ui is 
        valid or not

3. models
    --> It contains the files that define the data structure of 
        our applicatiion means which type of data will be stored in the database

4. routes 
    --> In our routes we will define routes of our applicatiion
        It maps an http request , get post and put request and 
        specifies the Controllers that should be executed when the 
        route matched





// first we create index.js and then we create models for which and what type of data coming from the app
// after that we create a controllers for managining the req and res coming form UI 
// and then we create routes 
// now import the router in the index.js 