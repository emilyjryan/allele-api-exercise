document.addEventListener('DOMContentLoaded', () => {

  // Initial console.log to ensure JS file is linked to HTML:
  console.log('JS file loaded and running')

  // Defining variables from html elements:
  const hlaA = document.getElementById('hla-a');
  const hlaB = document.getElementById('hla-b');
  const hlaC = document.getElementById('hla-c');
  const hlaDP = document.getElementById('hla-dp');
  const hlaDQ = document.getElementById('hla-dq');
  const hlaDR = document.getElementById('hla-dr');
  const other = document.getElementById('other');

  // Function to create a separate parent div for each allele:
  const alleleDivCreator = () => {
    let newAllele = document.createElement('div');
    newAllele.classList.add('allele');
    return newAllele;
  }

  // Function to create separate child divs for both accession and name:
  const alleleElementDivCreator = (parentDiv) => {
    let alleleElement = document.createElement('div');
    alleleElement.classList.add('allele-element');
    parentDiv.appendChild(alleleElement)
    return alleleElement;
  }

  // Function to conditionally sort data for display based on isotype:
  const isotypeSorter = (alleleToSort, alleleString) => {

    const strLowerCase = alleleString.toLowerCase();
        
    if (strLowerCase.startsWith('a')) {
        hlaA.appendChild(alleleToSort);
    } else if (strLowerCase.startsWith('b')) {
        hlaB.appendChild(alleleToSort);
    } else if (strLowerCase.startsWith('c')) {
        hlaC.appendChild(alleleToSort);
    } else if (strLowerCase.startsWith('dp')) {
        hlaDP.appendChild(alleleToSort);
    } else if (strLowerCase.startsWith('dq')) {
        hlaDQ.appendChild(alleleToSort);
    } else if (strLowerCase.startsWith('dr')) {
        hlaDR.appendChild(alleleToSort);
    } else {
        other.appendChild(alleleToSort);
    }

  }

  // Creating a variable for the API url:
  const requestURL = 'https://www.ebi.ac.uk/cgi-bin/ipd/api/allele?limit=1000&project=HLA';

  // Fetch request to the API for the allele data:
  fetch(requestURL)

    // Converting the data to json:
    .then((responseData) => {
      return responseData.json();
    })

    // Creating a variable for all json data:
    .then((jsonData)=>{
      // Initial console log to see the structure of data received:
      console.log('Allele data:', jsonData.data);
      let alleleData = jsonData.data;
      // Console logs to ensure I'm accessing the specific part of data I'm looking for:
      console.log(alleleData[0].accession);
      console.log(alleleData[0].name);

    // For loop, to loop through each data object and create separate divs for each allele accession/name pair and then sort them based on isotype:
      for (let i = 0; i < alleleData.length; i++) {
        
        // Creating parent div:
        const newParentDiv = alleleDivCreator()
        
        // Creating both child divs, one for accession and one for name:
        const newAlleleAccession = alleleElementDivCreator(newParentDiv);
        newAlleleAccession.innerHTML = alleleData[i].accession + ':';

        const newAlleleName = alleleElementDivCreator(newParentDiv);
        const alleleString = newAlleleName.innerHTML += alleleData[i].name;

        // Sorting them for display based on isotype:
        isotypeSorter(newParentDiv, alleleString);

      }

    })

    // Error handling function, in case something goes wrong with the main API request:
    .catch((error) => {
      console.log('Error fetching data from API', error);
    })

  })