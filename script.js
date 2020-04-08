// wait for the window to load...
window.addEventListener('load', function() {
   // fetch the JSON
   fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
      // Access the JSON in the response
      response.json().then( function(json) {
         // create random index to randomize mission destination...
         let index = Math.floor(Math.random() * 6);
         const div = document.getElementById('missionTarget');
         // add html that includes json data
         div.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src="${json[index].image}">
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
      let fuelStatus = document.getElementById('fuelStatus');
      let cargoStatus = document.getElementById('cargoStatus');
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
      // check fuel level status and update faulty items list...
      if (fuelLevel < 10000) {
         fuelStatus.innerHTML = `Fuel level too low for launch`
         isInvalid = true;
      } else {
         fuelStatus.innerHTML = `Fuel level high enough for launch`
      };
      // check cargo mass status and update faulty items list...
      if (cargoMass > 10000) {
         cargoStatus.innerHTML = `Cargo mass too high for launch`
         isInvalid = true;
      } else {
         cargoStatus.innerHTML = `Cargo mass low enough for launch`
      };
      
      // check if the isInvalid flag is set...
      if (isInvalid) {
         // declare and init variables...
         let shuttleStatus = document.getElementById('launchStatus');
         let shuttleStatusList = document.getElementById('faultyItems');
         let pilotStatus = document.getElementById('pilotStatus');
         let copilotStatus = document.getElementById('copilotStatus');
         // update the shuttle status message...
         shuttleStatus.innerHTML = 'Shuttle Not Ready for Launch';
         shuttleStatus.style.color = 'red';
         // update the shuttle status list style to visible...
         shuttleStatusList.style.visibility = 'visible';
         // update the shuttle status list using template literal...
         // check pilot status and update faulty items list...
         if (pilot !== '') {
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
         } else {
            pilotStatus.innerHTML = `Pilot is not ready for launch`
         };
         // check co-pilot status and update faulty items list...
         if (copilot !== '') {
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
         } else {
            copilotStatus.innerHTML = `Co-pilot is not ready for launch`
         };
         // prevent default action of the submit button...
         event.preventDefault();
      } 
   });
})
