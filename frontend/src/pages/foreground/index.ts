// Client ID and API key from the Developer Console
var CLIENT_ID = "Hack&Roll API Key";
var API_KEY = "AIzaSyASzrUVFuUY_7ujuHjXYUaXJm2JgXNRjJQ";

// Array of API discovery doc URLs for APIs used by the sample
var DISCOVERY_DOCS = ["https://docs.googleapis.com/$discovery/rest?version=v1"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/documents.readonly";

var authorizeButton = document.getElementById("authorize-button");
var signoutButton = document.getElementById("signout-button");


console.log("Successful build and invocation")