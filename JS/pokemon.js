//The URIs of the REST endpoint
IUPS = "https://prod-49.eastus.logic.azure.com:443/workflows/6f68fd6255514f0b9c49f017fd2469b7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LrNtcUEBKlnk5IFbB2fjh_DDOonTq5J35Fd48M_h8U0";
RAI = "https://prod-68.eastus.logic.azure.com:443/workflows/42e76e2096ae43d1b4074e3df6db787f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XS6BZcoJmeo6xpfELmB_s9r9o5iYR_ddmVWoLruZZu8";
DIP1 ="https://prod-40.eastus.logic.azure.com/workflows/56f6890e7c7943438decc485216bd21f/triggers/manual/paths/invoke/restapi/v1/images/";
DIP2 ="?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rmgPfMO4ou9-gjA4xV8gqx2olsMrwU7-4mJAmYmrYDY";
GAUEndpoint = "https://prod-41.eastus.logic.azure.com/workflows/61dfe2688efe41b1ba4747ea5e86bfca/triggers/manual/paths/invoke/restapi/v1/pokedex?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z4jUroJ9_8l7XAvjOa_ZdXmSqrNNV5IzY-u-vOKN_6M",
GIUEndpoint1 = "https://prod-00.eastus.logic.azure.com/workflows/02983e9ad1ef4f9bbd45f22654df1e66/triggers/manual/paths/invoke/restapi/v1/pokedex/"
GIUEndpoint2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=N6jKWai_7ueKZybKqWpc3nEa8bi4PP7bmj8eGZILH1I"
BLOB_ACCOUNT = "https://pokedexblobstore.blob.core.windows.net";
UIPEndpoint1 = "https://prod-27.eastus.logic.azure.com/workflows/5fbe1593409c4d41a261b2057a329d21/triggers/manual/paths/invoke/restapi/v1/pokedex/";
UIPEndpoint2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4yYr3XYfddMc7KKT8zCpwdqXiX30uS5EnjyEg_yEFkI";



Authcache = localStorage.getItem("UserData")
var clickedPokemonId


//Handlers for button clicks
$(document).ready(function() {
  if (Authcache == null){
    window.location.href = 'index.html'
}
var currentPage = window.location.pathname;

      // Add a class to the corresponding navigation link based on the current page
      $('ul.navbar li a').filter(function () {
        return $(this).attr('href') === currentPage;
      }).addClass('active');
 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 
  $("#logout").click(function(){
    localStorage.clear();
    window.location.href = 'index.html'

    
    
  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    if (localStorage.getItem("UserData") == "guest"){
      alert('Guest are not able to upload images')
    }
    else{
      submitNewAsset();
    }
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
//A function to submit a new asset to the REST endpoint
function submitNewAsset(){

  $.getJSON(GAUEndpoint, function (data) {
    // Create an array to hold all the retrieved assets
    var items = [];
    var userAccount = [];
    var userIDs = []; // To collect multiple UserIDs

    // Clear UserDetails before populating with new data
    $('#userDetails').empty();

    // Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
        items.push(val["ID"] + "-" + atob(val["username"]) + "-" + atob(val["password"]));
    });

    var searchTerm = localStorage.getItem("UserData");

    // Filter the array based on the search term
    var filteredArray = items.filter(function (item) {
        return item.includes(atob(searchTerm));
    });

    // Remove hyphens from each element in the filteredArray and map it to resultArray
    var resultArray = filteredArray.map(function (item) {
        // Split the string by hyphen and take the first part, then parse it as an integer
        return parseInt(item.split('-')[0], 10);
    });

    // Print out the result
    resultArray.forEach(function (item) {
        userIDs.push(item);

        $.ajax({
            type: "GET",
            //Note the need to concatenate the
            url: GIUEndpoint1 + item + GIUEndpoint2,
        }).done(function (data) {
            // Use 'data' instead of 'msg' and 'val'
            UserName = atob(data["username"]);
            //Create a form data object
   submitData = new FormData();
   //Get form variables and append them to the form data object
   submitData.append('FileName', $('#fileName').val());
   submitData.append('username', "Uploaded by: "+ UserName);
   submitData.append('pokemonID', $('#pokemonid').val());
   submitData.append('pokemonName', $('#pokemonname').val());
   submitData.append('pokemonType', $('#pokemontype').val());
   submitData.append('pokemonSpecies', $('#pokemonspecies').val());
   submitData.append('File', $("#UpFile")[0].files[0]);

  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
    
   url: IUPS,
   data: submitData,
   cache: false,
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,
   type: 'POST',
   success: function(data){
  
   }
   });
        });
    });
});
  }

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span></div>');

  $.getJSON(RAI, function(data) {
    // Create an array to hold all the retrieved assets
    var pokemon = [];

    // Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function(key, val) {
      pokemon.push("<hr />");
      pokemon.push("<img src='" + BLOB_ACCOUNT + val["filePath"] + "' width='400'/> <br/>");
      pokemon.push(val["username"] + "<br />");
      pokemon.push("pokemonID : " + val["pokemonid"] + "<br />");
      pokemon.push("pokemonName : " + val["pokemonname"] + "<br />");
      pokemon.push("pokemonType : " + val["pokemontype"] + "<br />");
      pokemon.push("pokemonSpecies : " + val["pokemonspecies"] + "<br />");

      if (localStorage.getItem("UserData") != "guest"){
        BLOBID = val["id"]
        pokemon.push('<button type="button" class="btn btn-danger" onclick="deletePokemon(\'' + val["id"] + '\')">Delete</button> <br/><br/>');
        pokemon.push('<button type="button" class="btn btn-primary" onclick="showEditForm(\'' + val["id"] + '\')">Edit</button> <br/><br/>');
      }
    });

    // Clear the assetlist div
    $('#ImageList').empty();

    // Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: pokemon.join("")
    }).appendTo("#ImageList");
  });
}

function showEditForm(id) {
  clickedPokemonId = id;
  $('#editModal').modal('show');
}

function hideEditForm() {
  $('#editModal').modal('hide');
}


function deletePokemon(id) {
  $.ajax({
    type: "DELETE",
    url: DIP1 + id + DIP2
  }).done(function (msg) {
    // On success, update the asset list.
    location.reload();
  });
}

function editPokemon(){
  $.getJSON(GAUEndpoint, function (data) {
    // Create an array to hold all the retrieved assets
    var items = [];
    var userAccount = [];
    var userIDs = []; // To collect multiple UserIDs

    // Clear UserDetails before populating with new data
    $('#userDetails').empty();

    // Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
        items.push(val["ID"] + "-" + atob(val["username"]) + "-" + atob(val["password"]));
    });

    var searchTerm = localStorage.getItem("UserData");

    // Filter the array based on the search term
    var filteredArray = items.filter(function (item) {
        return item.includes(atob(searchTerm));
    });

    // Remove hyphens from each element in the filteredArray and map it to resultArray
    var resultArray = filteredArray.map(function (item) {
        // Split the string by hyphen and take the first part, then parse it as an integer
        return parseInt(item.split('-')[0], 10);
    });

    // Print out the result
    resultArray.forEach(function (item) {
        userIDs.push(item);

        $.ajax({
            type: "GET",
            //Note the need to concatenate the
            url: GIUEndpoint1 + item + GIUEndpoint2,
        }).done(function (data) {
            // Use 'data' instead of 'msg' and 'val'
            UserName = atob(data["username"]);
            //Create a form data object
   editedPokemon = new FormData();
   //Get form variables and append them to the form data object
   editedPokemon.append('username', "Edited by: "+ UserName);
   editedPokemon.append('pokemonid', $('#editpokemonid').val());
   editedPokemon.append('pokemonname', $('#editpokemonname').val());
   editedPokemon.append('pokemontype', $('#editpokemontype').val());
   editedPokemon.append('pokemonspecies', $('#editpokemonspecies').val());
  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
    url: UIPEndpoint1 + clickedPokemonId + UIPEndpoint2,
   data: editedPokemon,
   cache: false,
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,
   type: 'PATCH',
   success: function(data){
  
   }
   });
        });
    });
});
}