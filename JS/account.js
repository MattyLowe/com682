GAUEndpoint = "https://prod-41.eastus.logic.azure.com/workflows/61dfe2688efe41b1ba4747ea5e86bfca/triggers/manual/paths/invoke/restapi/v1/pokedex?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z4jUroJ9_8l7XAvjOa_ZdXmSqrNNV5IzY-u-vOKN_6M",
GIUEndpoint1 = "https://prod-00.eastus.logic.azure.com/workflows/02983e9ad1ef4f9bbd45f22654df1e66/triggers/manual/paths/invoke/restapi/v1/pokedex/"
GIUEndpoint2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=N6jKWai_7ueKZybKqWpc3nEa8bi4PP7bmj8eGZILH1I"
DIUEdpoint1 = "https://prod-05.eastus.logic.azure.com/workflows/4c1a90091b264f4db2a0ef302bfccd29/triggers/manual/paths/invoke/restapi/v1/pokedex/",
DIUEdpoint2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5J6109AJqckOo8NfMBeHQBfk-0hIhficj8i7ul-GfVU",
UEUEndpoint1= "https://prod-42.eastus.logic.azure.com/workflows/ba5b6f4372f64dba9862fd4cf77670f8/triggers/manual/paths/invoke/restapi/v1/userdata/"
UEUEndpoint2= "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Bh1iwxPRtuOj0wCbG0EpZerEU3v_An7m3X9AKLY_T8I"

Authcache = localStorage.getItem("UserData")

var currentUserID = ""



$(document).ready(function () {

        if (Authcache == "guest"){
            alert("Guest Accounts Cannot Access This Page")
          window.location.href = 'pokedex.html'
        }
      
    $("#logout").click(function () {
        localStorage.clear();
        window.location.href = 'index.html';
    });

    getMyAccount();

});


function getMyAccount(){
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
                userAccount.push("Account ID: "+data["ID"] + "<br />")
                var date = new Date(data["ID"] * 1000);
                userAccount.push("Account Creation Date: " + `${date.getMonth() + 1}/${date.getDate()}/${(date.getFullYear() % 100).toString().padStart(2, '0')}`+ "<br />");
                userAccount.push("Email: " +data["email"] + "<br />");
                userAccount.push("Username: " +atob(data["username"]) + "<br />");
                userAccount.push("Password: " +data["password"] + "<br />"+"<hr />");
                userAccount.push('<button type="button" id="subNewForm" class="btn btn-primary" onclick="showEditForm(\'' + data["ID"] + '\')">Edit</button>');
                userAccount.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="deleteAccount('+data["ID"]
                +')">Delete</button> <br/><br/>');
                console.log("yeeeee")
                userAccount.push("<hr />");
                $("<ul/>", {
                    "class": "my-new-list",
                    html: userAccount.join("")
                }).appendTo("#userDetails");
            });
        });
    });
}


function getNewAccount(){
    $('#userDetails').empty();

    var userAccount = [];
    $.ajax({ 
        type: "GET",
        //Note the need to concatenate the
        url: GIUEndpoint1 + currentUserID + GIUEndpoint2,
    }).done(function (data) {
        // Use 'data' instead of 'msg' and 'val'
        userAccount.push("Account ID: "+data["ID"] + "<br />")
        var date = new Date(data["ID"] * 1000);
        userAccount.push("Account Creation Date: " + `${date.getMonth() + 1}/${date.getDate()}/${(date.getFullYear() % 100).toString().padStart(2, '0')}`+ "<br />");
        userAccount.push("Email: " +data["email"] + "<br />");
        userAccount.push("Username: " +atob(data["username"]) + "<br />");
        userAccount.push("Password: " +data["password"] + "<br />"+"<hr />");
        userAccount.push('<button type="button" id="subNewForm" class="btn btn-primary" onclick="showEditForm(\'' + data["ID"] + '\')">Edit</button>');
        userAccount.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="deleteAccount('+data["ID"]
        +')">Delete</button> <br/><br/>');
        console.log("yeeeee")
        userAccount.push("<hr />");
        $("<ul/>", {
            "class": "my-new-list",
            html: userAccount.join("")
        }).appendTo("#userDetails");
    });


}


function deleteAccount(id){
    $.ajax({
    type: "DELETE",
    //Note the need to concatenate the
    url: DIUEdpoint1 + id + DIUEdpoint2,
    }).done(function( msg ) {
    //On success, update the assetlist.
    localStorage.clear();
    window.location.href = 'index.html';
    });
    }

function showEditForm(id) {
    currentUserID = id;
    $('#editModal').modal('show');
  }
  
  function hideEditForm() {
    $('#editModal').modal('hide');
  }
  
  function editAccount() {
    // Construct JSON Object for new item
    
    var subObj = {
        username: btoa($('#editusername').val()),
        password: btoa($('#editusername').val()),
        email:    $('#editusername').val(),
    };

    // Convert to a JSON String
    var subObjString = JSON.stringify(subObj);

    

    // Post the JSON string to the endpoint, note the need to set the content type header
    $.ajax({
        url: UEUEndpoint1+currentUserID+UEUEndpoint2,
        type: 'PATCH',
        data: subObjString,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            getNewAccount();
            hideEditForm();

        },
        error: function (error) { 
            // Handle error if needed
        }
    });
}