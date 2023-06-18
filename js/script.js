document.addEventListener('DOMContentLoaded', () => {

  // Initial console.log to ensure JS file is linked to HTML:
  console.log('JS file loaded and running')

  // Defining variables from html elements:
  const main = document.getElementById('main-header');
  const loadingDiv = document.getElementById('loading');
  const hlaA = document.getElementById('hla-a');
  const hlaB = document.getElementById('hla-b');
  const hlaC = document.getElementById('hla-c');
  const hlaDP = document.getElementById('hla-dp');
  const hlaDQ = document.getElementById('hla-dq');
  const hlaDR = document.getElementById('hla-dr');
  const other = document.getElementById('other');
  const allAlleles = document.getElementById('all-alleles');
  const searchBox = document.getElementById('search-box');
  const searchBtn = document.getElementById('search-btn');
  const results = document.getElementById('results');

// == SEARCH FOR SPECIFIC SEQUENCE == //

// Create array with only 'name' entries from main data array:
  const allNamesArray = (data) => {
    let namesArray = [];
    for (let i = 0; i < data.length; i++) {
      namesArray.push(data[i].name)
    }
    return namesArray 
  }

// Search loop functionality:
  const searchLoop = (searchValue, allData) => {
    const nameArray = allNamesArray(allData)
    let match = false;
    for (let i = 0; i < nameArray.length; i++) {
      if (searchValue === nameArray[i]) {
        console.log('match', nameArray[i])
        match = true;
        return i
      }
    }
    if (match === false) {
      console.log('no match')
      results.style.display = 'block';
      results.innerHTML = 'No results found'
    }
  }

  // Display match:
    // const matchName = searchLoop(searchValue, nameArray)
    // let matchDiv = document.createElement('div');
    // matchDiv.classList.add('match-div');
    // matchDiv.innerHTML = matchName;
    // main.appendChild(matchDiv);

// == DISPLAYING DATA FROM API == //

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

     //search button functionality 
      searchBtn.addEventListener('click', () => {
        results.innerHTML = 'Results: '
        let searchValue = searchBox.value;
        console.log('search value', searchValue)
        let searchMatchIndex = searchLoop(searchValue, alleleData)
        console.log(searchMatchIndex)
        let matchAccession = alleleData[searchMatchIndex].accession;
        console.log(matchAccession)

        // Create and display div with match name on it:
        results.innerHTML += matchAccession += ': ' + searchValue;
        results.style.display = 'block';
      })

    }

    })

    // Error handling function, in case something goes wrong with the main API request:
    .catch((error) => {
      console.log('Error fetching data from API', error);
    })

  })