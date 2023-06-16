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
const requestURL = 'https://www.ebi.ac.uk/cgi-bin/ipd/api/allele?limit=20&project=HLA';

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
      let newAllele = document.createElement('div');
      // Adding the allele class to the div:
      newAllele.classList.add('allele');

      let alleleAccession = document.createElement('div');
      alleleAccession.innerHTML = alleleData[i].accession;
      let alleleName = document.createElement('div');
      alleleName.innerHTML = alleleData[i].name;

      newAllele.appendChild(alleleAccession)
      newAllele.appendChild(alleleName)
      // Adding the allele name to the div:
      // Adding the new div to the html:
      // allAlleles[0].appendChild(newAllele);

      // Conditional logic for how to sort them by isotype:
      if (alleleData[i].name.startsWith('A')) {
        hlaA.appendChild(newAllele);
    } else if (alleleData[i].name.startsWith('B')) {
        hlaB.appendChild(newAllele);
    } else if (alleleData[i].name.startsWith('C')) {
        hlaC.appendChild(newAllele);
    } else if (alleleData[i].name.startsWith('DP')) {
        hlaDP.appendChild(newAllele);
    } else if (alleleData[i].name.startsWith('DQ')) {
        hlaDQ.appendChild(newAllele);
    } else if (alleleData[i].name.startsWith('DR')) {
        hlaDR.appendChild(newAllele);
    } else {
        other.appendChild(newAllele);
    }
  }
  })
  // Error catch in case something goes wrong with the request:
  .catch((error) => {
    console.log('Error fetching data from API', error);
  })
})