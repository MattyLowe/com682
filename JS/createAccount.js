CNUEnpoint ="https://prod-70.eastus.logic.azure.com/workflows/0af94b52eaaa4863b5b2ae094c42352c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mYSdd23eGkG1wRDB-DEqFXYEIJPDyFReFbckAvsAe1c"


Authcache = localStorage.getItem("UserData")


function submitNewUser() {
    // Construct JSON Object for new item
    var subObj = {
        ID : Math.floor(Date.now() / 1000),
        username: btoa($('#username').val()),
        password: btoa($('#password').val()),
        email:    $('#email').val(),
    };

    // Convert to a JSON String
    var subObjString = JSON.stringify(subObj);

    // Post the JSON string to the endpoint, note the need to set the content type header
    $.ajax({
        url: CNUEnpoint,
        type: 'POST',
        data: subObjString,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            // Handle success if needed
        },
        error: function (error) {
            // Handle error if needed
        }
    });
}
function goToSignIn() {
    // Redirect to the create an account page
    window.location.href = 'index.html';
}

function validateRegistration() {
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    


    // Perform your registration validation logic here
    if (username && password && email) {
        submitNewUser();
        alert('Account created successfully!');
        goToSignIn();
        // You can add further logic here, e.g., sending data to a server
    } else {
        alert('Please fill in all fields.');
    }
}