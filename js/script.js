document.addEventListener('DOMContentLoaded', () => {

  // Initial console.log to ensure JS file is linked to HTML:
  console.log('JS file loaded and running')

  // Defining variables from html elements:
  const main = document.getElementById('main-header');

  const loadingDiv = document.getElementById('loading');

  // const hlaAHeader = document.getElementById('hla-a-header');
  const hlaA = document.getElementById('hla-a');

  // const hlaBHeader = document.getElementById('hla-b-header');
  const hlaB = document.getElementById('hla-b');

  // const hlaCHeader = document.getElementById('hla-c-header');
  const hlaC = document.getElementById('hla-c');

  // const hlaDPHeader = document.getElementById('hla-dp-header');
  const hlaDP = document.getElementById('hla-dp');

  // const hlaDQHeader = document.getElementById('hla-dq-header');
  const hlaDQ = document.getElementById('hla-dq');

  // const hlaDRHeader = document.getElementById('hla-dr-header');
  const hlaDR = document.getElementById('hla-dr');

  // const classHeaders = document.getElementsByClassName('hla-class-header');
  const other = document.getElementById('other');

  const allAlleles = document.getElementById('all-alleles');

  // console.log(allAlleles)

  // const loadedContent = [hlaA, hlaB, hlaC, hlaDP, hlaDQ, hlaDR, other]
  // const headers = [hlaAHeader, hlaBHeader, hlaCHeader, hlaDPHeader, hlaDQHeader, hlaDRHeader]

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

  let loading = true;

  if (loading === true) {
    allAlleles.style.display = 'none'; 

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

      loading = false;

    // For loop, to loop through each data object and create separate divs for each allele accession/name pair and then sort them based on isotype:
      if (loading === false) {
       allAlleles.style.display = 'block';
       loadingDiv.style.display = 'none';

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
    }

    })

    // Error handling function, in case something goes wrong with the main API request:
    .catch((error) => {
      console.log('Error fetching data from API', error);
    })

  })