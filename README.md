# Stock Portfolio

This website is separated into five essential routes: Landing, Sign Up, Sign In, Portfolio, and Transactions.



## Landing

When user first visits the website, they have the option to sign up and sign in via the Header component.

![alt text](https://github.com/yongchengzhu/TTP-FS/blob/v2-portfolio/diagrams/Landing.png)



## Sign Up

User is prompted to up with *name*, *email*, and *password*. When the 'submit' button is clicked, user the signUp action-creator will be invoked and it will make a POST request to the backend server via `/signup`. If the user enters an email that's already been used, then it an error message will be prompted and prevent user from signing up. Otherwise, when the user has successfully signed up and the information will be saved inside of MongoDB. (Password will be hashed with a generated salt.) As a response, a JSON web token will be created (encoded with id, timestamp, and secret string.) and sent back to the client side. This token will be stored in two places: the browser's localStorage and inside the reducer.

![alt text](https://github.com/yongchengzhu/TTP-FS/blob/v2-portfolio/diagrams/Sign%20Up.png)



## Sign In

User is prompted to in with *email* and *password*. When the 'submit' button is clicked, user the signIn action-creator will be invoked and it will make a POST request to the backend server via `/signin. For this route, the request needs to go inside of a middleware called Local Strategy, which first checks if this email exists in the database. If it does, it calls a bcrypt method to compare the given password with the password stored inside the database (hashed). If it is the same, then the middleware allows the request to get pass and user is authenticated and a JSON web token will be sent back as a response. Again, this token will be saved in the localStorage of the browser and in the reducer as well.

![alt text](https://github.com/yongchengzhu/TTP-FS/blob/v2-portfolio/diagrams/Sign%20In.png)


## Portfolio

After user has successfully been authenticated by Local Strategy, they will automatically be redirected to the Portfolio route by the history object. There are two sub-components within the Portfolio component, the OwnedStocks component and the BuyForm component. 

The BuyForm component allows user to submit a purchase on a certain stock with the eligible symbol and the amount of shares. When the 'submit' button is clicked, an API request will be sent to the IEX server to get the latest price on the stock symbol. Then, checks if the user have enough balance to make the purchase. If the user does indeed have enough balance, then the request will be sent to the backend server with the JSON web token that belongs to this user as a POST request to `/buy`. And so on. 

The OwnedStocks component is responsible for keeping track of the user's performance. It lists a list of stocks that owned by the user and dynamically change the color of the stocks based on it's latest price versus open price. When the Portfolio component is loaded, the OwnedStocks component will first make an API call to the backend server to fetch all the stocks that's owned by this user from the database. Then, for every two seconds, it will make an API call to the IEX server to check the latest price and the open price for every stocks owned by the user and decide what color to give them.

![alt text](https://github.com/yongchengzhu/TTP-FS/blob/v2-portfolio/diagrams/Portfolio.png)


## Transactions

This page keeps track of all the individual purchases by the user including the stock name and the price at which the user made the purchase. When this component is first loaded, it simply makes a GET request to the backend server to retrieve all the transactions of this user that was stored in the database and render them on the screen.

![alt text](https://github.com/yongchengzhu/TTP-FS/blob/v2-portfolio/diagrams/Transactions.png)