document.addEventListener('DOMContentLoaded', () => {

// Initial console.log to ensure JS file is linked to hmtl:
console.log('JS file loaded and running')

// Defining variables from html elements:
const hlaA = document.getElementById('hla-a');
const hlaB = document.getElementById('hla-b');
const hlaC = document.getElementById('hla-c');
const hlaDP = document.getElementById('hla-dp');
const hlaDQ = document.getElementById('hla-dq');
const hlaDR = document.getElementById('hla-dr');
const other = document.getElementById('other');

// Throwing the API url in a variable:
const requestURL = 'https://www.ebi.ac.uk/cgi-bin/ipd/api/allele?limit=1000&project=HLA';

// Fetch request to the API for the allele data:
fetch(requestURL)
  // converting data to json:
  .then((responseData) => {
    return responseData.json();
  })
  .then((jsonData)=>{
    console.log('Allele data:', jsonData.data);
    let alleleData = jsonData.data;
    // Console logs to make sure I'm accessing the specific part of the data I'm looking for:
    console.log(alleleData[0].accession);
    console.log(alleleData[0].name);

   // For loop to loop through data array of objects to create separate divs for each allele accession/name pair:
    for (let i = 0; i < alleleData.length; i++) {
      let newAllele = document.createElement('div');
      newAllele.classList.add('allele');

      // Creating individual divs for each accession and name, and then appending both to new parent div:
      let alleleAccession = document.createElement('div');
      alleleAccession.classList.add('allele-element');
      alleleAccession.innerHTML = alleleData[i].accession + ':';
      newAllele.appendChild(alleleAccession)

      let alleleName = document.createElement('div');
      alleleName.classList.add('allele-element');
      alleleName.innerHTML = alleleData[i].name;
      newAllele.appendChild(alleleName)

      // Conditional logic for sorting them by isotype:
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
  // Error catch function, in case something goes wrong with the main API request:
  .catch((error) => {
    console.log('Error fetching data from API', error);
  })
})