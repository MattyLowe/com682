GAUEndpoint = "https://prod-41.eastus.logic.azure.com/workflows/61dfe2688efe41b1ba4747ea5e86bfca/triggers/manual/paths/invoke/restapi/v1/pokedex?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z4jUroJ9_8l7XAvjOa_ZdXmSqrNNV5IzY-u-vOKN_6M",
DIUEdpoint1 = "https://prod-05.eastus.logic.azure.com/workflows/4c1a90091b264f4db2a0ef302bfccd29/triggers/manual/paths/invoke/restapi/v1/pokedex/",
DIUEdpoint2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5J6109AJqckOo8NfMBeHQBfk-0hIhficj8i7ul-GfVU",

Authcache = localStorage.getItem("UserData")



$(document).ready(function () {

    if (Authcache == "guest"){
        alert("Guest Accounts Cannot Access This Page")
      window.location.href = 'pokedex.html'
    }


     $("#logout").click(function(){
    localStorage.clear();
    window.location.href = 'index.html'

    
    
  }); 


        $.getJSON(GAUEndpoint, function (data) {
    
            // Create an array to hold all the retrieved assets
            var items = [];
    
            // Clear UserDetails before populating with new data
            $('#userDetails').empty();
    
            // Iterate through the returned records and build HTML, incorporating the key values of the record in the data
            $.each(data, function (key, val) {
                items.push("Account ID: "+val["ID"] + "<br />")
                var date = new Date(val["ID"] * 1000);
                items.push("Account Creation Date: " + `${date.getMonth() + 1}/${date.getDate()}/${(date.getFullYear() % 100).toString().padStart(2, '0')}`+ "<br />");
                items.push("Email: " +data["email"] + "<br />");
                items.push("Username: " +atob(val["username"]) + "<br />");
                items.push("Password: " +val["password"] + "<br />"+"<hr />");
      items.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="deleteAccount('+val["ID"]
      +')">Delete</button> <br/><br/>');
      items.push("<hr />");
            });

            // Append the contents of the items array to the UserDetails Div
            $("<ul/>", {
                "class": "my-new-list",
                html: items.join("")
            }).appendTo("#userDetails");
        });
    
    
});

function deleteAccount(id){
    $.ajax({
    type: "DELETE",
    //Note the need to concatenate the
    url: DIUEdpoint1 + id + DIUEdpoint2,
    }).done(function( msg ) {
    //On success, update the assetlist.
    location.reload();;
    });
    }
