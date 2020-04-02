// wait for the window to load...
window.addEventListener('load', function() {
   // fetch the JSON
   fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
      // Access the JSON in the response
      response.json().then( function(json) {
         const div = document.getElementById('missionTarget');
         // add html that includes json data
         div.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[4].name}</li>
            <li>Diameter: ${json[4].diameter}</li>
            <li>Star: ${json[4].star}</li>
            <li>Distance from Earth: ${json[4].distance}</li>
            <li>Number of Moons: ${json[4].moons}</li>
         </ol>
         <img src="${json[4].image}">
         `;
      });
   });
   // declare and init variables...
   let form = document.getElementById('launchForm'); 
   let formSubmit = document.getElementById('formSubmit');
   // declare event handler for the form submit button...
   formSubmit.addEventListener('click', function() {
      // declare and init variables...
      let pilot = document.querySelector("input[name=pilotName]").value;
      let copilot = document.querySelector("input[name=copilotName]").value;
      let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
      let cargoMass = document.querySelector("input[name=cargoMass]").value;
      let isInvalid = false;
      // validate that none of the input fields are blank or empty...
      if ( pilot === '' || copilot === '' || fuelLevel === '' || cargoMass === '' ) {
         alert('All fields are required!');
         isInvalid = true;
      }
      // validate that pilot and copilot values are text, and that fuelLevel and cargoMass are numbers...
      else if ( !isNaN(pilot) || !isNaN(copilot) || isNaN(fuelLevel) || isNaN(cargoMass) ) {
         alert('Make sure to enter valid information for each field!');
         isInvalid = true;
      }
      // check if the isInvalid flag is set...
      if (isInvalid) {
         // declare and init variables...
         let shuttleStatus = document.getElementById('launchStatus');
         let shuttleStatusList = document.getElementById('faultyItems');
         // update the shuttle status message...
         shuttleStatus.innerHTML = 'Shuttle Not Ready for Launch';
         shuttleStatus.style.color = 'red';
         // update the shuttle status list style to visible...
         shuttleStatusList.style.visibility = 'visible';
         // update the shuttle status list using template literal...
         event.preventDefault();
      } 
      else {
         // update the shuttle status message...
         alert('All good!');
      }
   });
})
