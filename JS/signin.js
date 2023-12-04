GAUEndpoint = "https://prod-41.eastus.logic.azure.com/workflows/61dfe2688efe41b1ba4747ea5e86bfca/triggers/manual/paths/invoke/restapi/v1/pokedex?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z4jUroJ9_8l7XAvjOa_ZdXmSqrNNV5IzY-u-vOKN_6M",


function validateForm(){
    $.getJSON(GAUEndpoint, function( data ) {
  
      //Create an array to hold all the retrieved assets
      var items = [];
      var ids = [];
        
      //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
      $.each( data, function( key, val ) {
        items.push(atob(val["username"]) +"-"+ atob(val["password"]));
        });
        ids.push(val["ID"])


        if(items.includes(accountdata)){
            localStorage.setItem("UserData", accountdata)
            window.location.href = 'pokedex.html';
          }
          else{
            alert('username or password is not correct');
          }
      });
}


function validateUser() {
      //Get the JSON from the RAA API 
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
  
      accountdata = username +"-" + password
      $.getJSON(GAUEndpoint, function( data ) {
    
        //Create an array to hold all the retrieved assets
        var items = [];
        var ids = [];
          
        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each( data, function( key, val ) {
            ids.push(val["ID"])
        });
        $.each( data, function( key, val ) {
          items.push(atob(val["username"]) +"-"+ atob(val["password"]));
          });

          
          if(items.includes(accountdata)){
              localStorage.setItem("UserData", btoa(accountdata))
              window.location.href = 'pokedex.html';
            }
            else{
              alert('username or password is not correct');
            }
        });
}

function guestUserSignIn() {
  //Get the JSON from the RAA API 
  localStorage.setItem("UserData", "guest")
  window.location.href = 'pokedex.html';
 
}


function goToCreateAccount() {
    // Redirect to the create an account page
    window.location.href = 'createaccount.html';
}