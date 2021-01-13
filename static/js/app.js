// function readJSON(path) { 
//     var xhr = new XMLHttpRequest(); 
//     xhr.open('GET', path, true); 
//     xhr.responseType = 'blob'; 
//     xhr.onload = function(e) {  
//       if (this.status == 200) { 
//           var file = new File([this.response], 'temp'); 
//           var fileReader = new FileReader(); 
//           fileReader.addEventListener('load', function(){ 
//                //do stuff with fileReader.result 
//           }); 
//           fileReader.readAsText(file); 
//       }  
//     } 
//     xhr.send(); 
// };

// let data = readJSON("./static/samples.json");

// var data = require('./static/samples.json');

fetch("./static/samples.json")
  .then(response => response.json())
  .then(json => console.log(json));



//console.log(data);
