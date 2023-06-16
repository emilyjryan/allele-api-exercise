// Initial console.log to ensure JS file is linked to hmtl:
console.log('JS file loaded and running')

// Throwing the API url in a variable:
const requestURL = 'https://www.ebi.ac.uk/cgi-bin/ipd/api/allele?limit=10&project=HLA';

// Fetch request to the API for the allele data:
fetch(requestURL)
  // converting data to json:
  .then((responseData) => {
    return responseData.json();
  })
  .then((jsonData)=>{
    console.log('Allele data:', jsonData);
  })
  // Error catching in case something goes wrong with the request:
  .catch((error) => {
    console.log('Error fetching data from API', error);
  })