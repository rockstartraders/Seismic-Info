
// gbl scope variables





// side nav function 
document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('.sidenav');
   var instances = M.Sidenav.init(elems);
   instances;
  
 }); // end side nav function 
 

//  close button side nav function
 document.querySelector('.fa-xmark').addEventListener('click', function (){
   var elems = document.querySelectorAll('.sidenav');
   var instances = M.Sidenav.init(elems);
   instances;

 

 }) // end of close button side nav function




// onload function

async function equake(){

   console.log('working');
   document.querySelector(".loader").style.display = "block";  // this is for the progress indicator || Display
 

   try {

    
    var  equake_api = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake&reviewstatus=reviewed&minmagnitude=0.1`);
    var equake = await equake_api.json();

    var equake_features = await equake.features;
    var equakeall = Object.values(equake_features).slice(0, 200);   // to array

    equakeall.forEach(async function (equake_info_all) {

      var equake_title = await equake_info_all.properties.title; // title for all confirmed Earthquake
      //   a = await equakeall.properties.mag;
      var equake_magnitude = await (equake_info_all.properties.mag).toFixed(1); // Magnitude for all confirmed Earthquake 
      var equake_time = await moment(equake_info_all.properties.time).format('LL'); // Time for all confirmed Earthquake
      var equake_id = await equake_info_all.id; // ID for all confirmed Earthquake

      
       var  quake_kmdepth = await (equake_info_all.geometry.coordinates[2]).toFixed(1); // KM Depth for all confirmed Earthquake

    


       if (equake_magnitude <= 4) {

        document.querySelector('#info_container').innerHTML += 
        `<div class="divider"></div>   
        <div class="equake_wrapper"> 
            <p id="quake_title" >${equake_title}</p>  
            <p id="quake_time">${equake_time} at ${moment(equake_info_all.properties.time).format('LT')}</p>            
            <p id="quake_coord">USGS ID & Geolocation:  <a href="https://earthquake.usgs.gov/earthquakes/eventpage/${equake_id}/map" target="_blank" title= "A unique identifier for the event, this is the current preferred id for the event, and may change over time.">${equake_id}</a></p> 
            <p id="quake_kmdepth">Depth: ${quake_kmdepth} Km </p>             
            <p id="magnitude_green">${equake_magnitude}</p>            
            <div class="divider" id="info_divider"></div>              
        </div> `;

        
         
      }else if(equake_magnitude <= 5){
        document.querySelector('#info_container').innerHTML += 
          `<div class="divider"></div>   
          <div class="equake_wrapper"> 
              <p id="quake_title">${equake_title}</p>  
              <p id="quake_time">${equake_time} at ${moment(equake_info_all.properties.time).format('LT')}</p>            
              <p id="quake_coord">USGS ID & Geolocation:  <a href="https://earthquake.usgs.gov/earthquakes/eventpage/${equake_id}/map" target="_blank" title= "A unique identifier for the event, this is the current preferred id for the event, and may change over time.">${equake_id}</a></p> 
              <p id="quake_kmdepth">Depth: ${quake_kmdepth} Km </p>              
              <p id="magnitude_yellow">${equake_magnitude}</p>            
              <div class="divider" id="info_divider"></div>              
          </div> `;


       }else if(equake_magnitude <= 6){
        document.querySelector('#info_container').innerHTML += 
        `<div class="divider"></div>   
        <div class="equake_wrapper"> 
            <p id="quake_title">${equake_title}</p>  
            <p id="quake_time">${equake_time} at ${moment(equake_info_all.properties.time).format('LT')}</p>            
            <p id="quake_coord">USGS ID & Geolocation:  <a href="https://earthquake.usgs.gov/earthquakes/eventpage/${equake_id}/map" target="_blank" title= "A unique identifier for the event, this is the current preferred id for the event, and may change over time.">${equake_id}</a></p> 
            <p id="quake_kmdepth">Depth: ${quake_kmdepth} Km </p>           
            <p id="magnitude_red">${equake_magnitude}</p>            
            <div class="divider" id="info_divider"></div>              
        </div> `;

       

       }else {
        document.querySelector('#info_container').innerHTML += 
        `<div class="divider"></div>   
        <div class="equake_wrapper"> 
            <p id="quake_title">${equake_title}</p>  
            <p id="quake_time">${equake_time} at ${moment(equake_info_all.properties.time).format('LT')}</p>            
            <p id="quake_coord">USGS ID & Geolocation:  <a href="https://earthquake.usgs.gov/earthquakes/eventpage/${equake_id}/map" target="_blank"  title= "A unique identifier for the event, this is the current preferred id for the event, and may change over time.">${equake_id}</a></p> 
            <p id="quake_kmdepth">Depth: ${quake_kmdepth} Km </p>            
            <p id="magnitude_danger">${equake_magnitude}</p>            
            <div class="divider" id="info_divider"></div>              
        </div> `;
       
      }


    
    })// end of FOREACH

  

    document.querySelector(".loader").style.display = "none";  // this is for the progress indicator || HIDE
    document.querySelector(".fa-bars").style.visibility = "visible";   // Menu Icon show 
   
    mapplot(); // function to ploy coordinates

    
    
   } catch (error) {
    
    console.log(error);  

    Swal.fire({
      title: `<i class="fa-regular fa-bug"></i><br>An Unexpected Error Occurred`,
      showDenyButton: true,          
      denyButtonText: `No choice`,
      showConfirmButton: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isDenied) {
        window.location.reload(); } // end of IF
    })

    } // end of try catch block 



} // end of indol function 


async function mapplot(){

  document.querySelector(".loader2").style.visibility = "visible";   // Map loader show

  try {   

      if (map != undefined) map.remove();           

      // var map = L.map('map').setView([0, 0], 2);

     

      var map = L.map('map', {
        center: [0, 0],
        minZoom: 2,
        zoom: 2
       });

      
     
      // map.scrollWheelZoom.disable();
      // map.dragging.disable();

    

      // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {       
      //   attribution: '© OpenStreetMap'
      // }).addTo(map);

      var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {      
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
     }).addTo(map);


     
     var UsgsAPI = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake&reviewstatus=reviewed&minmagnitude=0.1`);
     var map_equake = await UsgsAPI.json();
     var usgsPlot = await map_equake.features.slice(0,600);

    

    //  console.log(usgsPlot);

     for (usgsPlot_all of usgsPlot){

      var place = usgsPlot_all.properties.title;  // place and Title
      var time = usgsPlot_all.properties.time;  // Time 
      var url = usgsPlot_all.properties.url;  // URL
      var lat = await usgsPlot_all.geometry.coordinates[1];  //lat
      var long = await usgsPlot_all.geometry.coordinates[0];  //long
      var kmdepth = await usgsPlot_all.geometry.coordinates[2];  //long
      var usgsmag = await (usgsPlot_all.properties.mag).toFixed(1); // magnitude


      
      if (usgsmag <= 4) {

        // green 

      var circle = L.circleMarker([lat, long], {
          color: '#0FFF50',
          fillColor: '#0FFF50',
          fillOpacity: 0.8,         
          radius: usgsmag * 0.2
      }).addTo(map);

        
         
      }else if(usgsmag <= 5){
        
        // yellow

        var circle = L.circleMarker([lat, long], {
          color: '#FFF01F',
          fillColor: '#FFF01F',
          fillOpacity: 1,
          radius: usgsmag * 0.7
      }).addTo(map);

       }else if(usgsmag <= 6){
          
           // red 

          var circle = L.circleMarker([lat, long], {
          color: 'red',
          fillColor: '#ee6e73',
          fillOpacity: 0.6,
          radius: usgsmag * 1.3
      }).addTo(map);

       

       }else {
           // danger

           
          var circle = L.circleMarker([lat, long], {
            color: 'red',
            fillColor: '#ae1a1a',
            fillOpacity: 0.8,
            radius: usgsmag * 1.8
          }).addTo(map);
       } // end of else

       circle.bindPopup(`
       <p id="popup_place">${place}</p>          
       <p id="popup_magnitude">Magnitude: ${usgsmag}</p>       
       <p id="popup_depth">Depth: ${kmdepth.toFixed(1)} km</p>
       <p id="popup_time">Occured:  ${moment(time).startOf('hour').fromNow()}</p>  
       <a href=${url} target="_blank" id="usgs_link">More Info.</a>        
       `);  // End of pop up when click.

       
   

   
  }  // end of for Loop
  
     
     document.querySelector(".loader2").style.visibility = "hidden";   // Map loader HIDE


    
  } catch (error) {
    console.log(error);  

    Swal.fire({
      title: `<i class="fa-regular fa-bug"></i><br>An Unexpected Error Occurred`,
      showDenyButton: true,          
      denyButtonText: `No choice`,
      showConfirmButton: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isDenied) {
        window.location.reload(); } // end of IF
    })
  } // end of try catch bloack
}


