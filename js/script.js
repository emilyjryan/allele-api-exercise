document.addEventListener('DOMContentLoaded', () => {

// Initial console.log to ensure JS file is linked to hmtl:
console.log('JS file loaded and running')

// Defining variables from html elements:
const allAlleles = document.getElementsByClassName('all-alleles');
const classOne = document.getElementById('class-1');
const classTwo = document.getElementById('class-2');
const other = document.getElementById('other');
const hlaA = document.getElementById('hla-a');
const hlaB = document.getElementById('hla-b');
const hlaC = document.getElementById('hla-c');
const hlaDP = document.getElementById('hla-dp');
const hlaDQ = document.getElementById('hla-dq');
const hlaDR = document.getElementById('hla-dr');

// Throwing the API url in a variable:
const requestURL = 'https://www.ebi.ac.uk/cgi-bin/ipd/api/allele?limit=200&project=HLA';

// Fetch request to the API for the allele data:
fetch(requestURL)
  // converting data to json:
  .then((responseData) => {
    return responseData.json();
  })
  .then((jsonData)=>{
    console.log('Allele data:', jsonData.data);
    let alleleData = jsonData.data;
    console.log(alleleData[0].accession);
    console.log(alleleData[0].name);

    // Looping through the allele data to get the accession and name:
    for (let i = 0; i < alleleData.length; i++) {
      // Creating a new div for each allele:
      let newType = document.createElement('div');
      // Adding the allele class to the div:
      newType.classList.add('allele');
      // Adding the allele accession to the div:
      newType.innerHTML = alleleData[i].accession;
      // Adding the allele name to the div:
      newType.innerHTML += ': ' + alleleData[i].name;
      // Adding the new div to the html:
      // allAlleles[0].appendChild(newType);

      if (alleleData[i].name.startsWith('A')) {
        hlaA.appendChild(newType);
    } else if (alleleData[i].name.startsWith('B')) {
        hlaB.appendChild(newType);
    } else if (alleleData[i].name.startsWith('C')) {
        hlaC.appendChild(newType);
    } else if (alleleData[i].name.startsWith('DP')) {
        hlaDP.appendChild(newType);
    } else if (alleleData[i].name.startsWith('DQ')) {
        hlaDQ.appendChild(newType);
    } else if (alleleData[i].name.startsWith('DR')) {
        hlaDR.appendChild(newType);
    } else {
        other.appendChild(newType);
    }
  }
  })
  // Error catch in case something goes wrong with the request:
  .catch((error) => {
    console.log('Error fetching data from API', error);
  })
})