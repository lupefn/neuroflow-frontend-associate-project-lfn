# Neuroflow Frontend Associate Project

## Frameworks used
- [Milligram](https://milligram.io/), a minimalist CSS framework
- [Express](https://expressjs.com/), "Fast, unopinionated, minimalist web framework for Node.js"

## Instructions on how to view the application
*Note: These instructions assume that you have Node.js installed. If you do not have it downloaded, it can be downloaded [here](https://nodejs.org/en/download/).*

Enter the top level of the project and run the `node server.js` command on your terminal. 

From here, enter the address `http://localhost:3000/` in your web browser to view the the project's main page.

## Summary
I chose Milligram as the framework to format the table, as it is an incredibly simplistic framework that can be seamlessly integrated into a web application. It is not overly complicated to integrate for something that you may need to quickly put together. If I had more time, I'd  add more interactivity with a different framework like React. I would also add in the ability to communicate with an API to display album covers of the different artists.

I chose the Express framework also due to its ease in integration to a web application. It's quick in allowing you to specify how you'd like to serve your web app's files.

## Note on Integration of Mock API
I had to move the mockFetchHelper function and provided `albums.json` info within my Javascript file that contained my code for the client-side since Firefox refused to let me import the function at the "top-level", saying something about a CORS request. [Here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp) is a link to the article that the issue linked me to.

I also kept getting errors about "Uncaught SyntaxError: import declarations may only appear at top level of a module", no matter what I changed in my import statement. Apologies in advance for any inconvenience that this may cause.
