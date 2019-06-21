//http://braziljs.github.io/eloquente-javascript/chapters/http/

function get(url) {
  return new Promise(function(succeed, fail) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
      if (req.status < 400)
        succeed(req.responseText);
      else
        fail(new Error("Request failed: " + req.statusText));
    });
    req.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    req.send(null);
  });
}

function getJSON(url) {
  return get(url).then(JSON.parse);
}


// get("http://5d0ac2d5c5896f0014e86e03.mockapi.io/sistema").then(function(text) {
//   console.log("data.txt: " + text);
// }, function(error) {
//   console.log("Failed to fetch data.txt: " + error);
// });