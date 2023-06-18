# RESTful API Exercise
## Using the IPD Database API to display allele data

### Steps

* Created new github repository to keep things organized and created all the necessary files for building the webpage.

* Tested the API in Thunder Client, success

* Linked HTML, CSS, and JS files together

* Created basic HTML structure for the website

* Created JS variables from HTML elements for DOM manipulation

* Wrote fetch request functioning, converted data to json, evaluated structure of data, added error catching at the end

* Created a variable array to hold all incoming data from request

* Built a for loops to loop through all data and create a new HTML element for each allele accession/name pair

* Added conditional logic (if/else) to decide which parent div to append the new child to, based on isotype starting letter

* Added some basic styling and page structure, including columns and scrolling for all the data.

* Added a background image and added some more styling

* Moved some of the functions with the fetch function into the global scope for better readability and organization

* Added a loading message to display while data loads onto the browser

* Created a search input and button with functionality

### Decisions

#### Client Side Rendering:
I decided to use client side rendering because initially it seemed like the simpler way to go, even though it would potentially mean the screen load time was slower.

#### Search functionality:
I created a basic search function that allows the user to search for a specific sequence and find out which sample number or "accession" it came from. However, it doesn't take into account any "fuzzy" search functionality that would display similar sequences in case the user mistypes a number in their search. I would have also liked to include a reverse search where a user could look up a sample number (e.g. HLA00032) and the output would be the actual sequence data. 

### Alternatives

* In the future I could see myself transforming this project into server-side rendering using node to improve the speed of load on initial render.