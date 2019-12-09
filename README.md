# Stock Portfolio

**Update 12/8/2019:** Since IEX API is no longer free, the app is updated to use Alphavantage to fetch latest quotes instead. However the downside is that Alphavantage only allows 5 calls per minute and 500 calls per day for the free plan.

**Update 6/5/2019:** We cannot make GET requests to `'/stock/aapl/price'` anymore. Hence, the code is updated so that when the user purchases a stock, a GET request is sent to `'/stock/aapl/quote'` to get the  *latestPrice* instead.



This is a web-based application that stimulates a live stock market exchange situation using the IEX API. When a user first visits the application, the user is required to register a new account and which then gets redirected to `/portfolio` route. Here, the user have an initial balance of $5000.00 and is allowed to purchase any stock by entering their eligible symbol and the amount of shares into the purchase form and click BUY. The performance of the stock is shown on the left panel, and the history of purchases can be reviewed via `/transactions`.



The backend server is built with ExpressJS for route handling and JWT authentication, as well as MongoDB for data storage. The frontend is built with React & Redux. The styling is done by Semantic-UI library.



The application is deployed into heroku:

https://stormy-caverns-22476.herokuapp.com



## User Stories

Before I developed the application, I drew the user interfaces and routes with draw.io, so that I have blueprint to follow and meet all the requirements.



### Landing

When user first visits the website, they have the option to sign up and sign in via the Header component.

<img src="https://i.imgur.com/uIB3FbQ.png" width=500>



### Sign Up

User is prompted to up with *name*, *email*, and *password*. When the 'submit' button is clicked, user the signUp action-creator will be invoked and it will make a POST request to the backend server via `/signup`. If the user enters an email that's already been used, then it an error message will be prompted and prevent user from signing up. Otherwise, when the user has successfully signed up and the information will be saved inside of MongoDB. (Password will be hashed with a generated salt.) As a response, a JSON web token will be created (encoded with id, timestamp, and secret string.) and sent back to the client side. This token will be stored in two places: the browser's localStorage and inside the reducer.

<img src="https://i.imgur.com/EJsqkpj.png" width=500>



### Sign In

User is prompted to in with *email* and *password*. When the 'submit' button is clicked, user the signIn action-creator will be invoked and it will make a POST request to the backend server via `/signin. For this route, the request needs to go inside of a middleware called Local Strategy, which first checks if this email exists in the database. If it does, it calls a bcrypt method to compare the given password with the password stored inside the database (hashed). If it is the same, then the middleware allows the request to get pass and user is authenticated and a JSON web token will be sent back as a response. Again, this token will be saved in the localStorage of the browser and in the reducer as well.

<img src="https://i.imgur.com/SRoMavZ.png" width=500>

### Portfolio

After user has successfully been authenticated by Local Strategy, they will automatically be redirected to the Portfolio route by the history object. There are two sub-components within the Portfolio component, the OwnedStocks component and the BuyForm component. 

The BuyForm component allows user to submit a purchase on a certain stock with the eligible symbol and the amount of shares. When the 'submit' button is clicked, an API request will be sent to the IEX server to get the latest price on the stock symbol. Then, checks if the user have enough balance to make the purchase. If the user does indeed have enough balance, then the request will be sent to the backend server with the JSON web token that belongs to this user as a POST request to `/buy`. And so on. 

The OwnedStocks component is responsible for keeping track of the user's performance. It lists a list of stocks that owned by the user and dynamically change the color of the stocks based on it's latest price versus open price. When the Portfolio component is loaded, the OwnedStocks component will first make an API call to the backend server to fetch all the stocks that's owned by this user from the database. Then, for every two seconds, it will make an API call to the IEX server to check the latest price and the open price for every stocks owned by the user and decide what color to give them.

<img src="https://i.imgur.com/YwkrsPR.png" width=500>


### Transactions

This page keeps track of all the individual purchases by the user including the stock name and the price at which the user made the purchase. When this component is first loaded, it simply makes a GET request to the backend server to retrieve all the transactions of this user that was stored in the database and render them on the screen.

<img src="https://i.imgur.com/qGa3p0O.png" width=500>