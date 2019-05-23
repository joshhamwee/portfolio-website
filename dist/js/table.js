const Http = new XMLHttpRequest();
const url = "https://api.github.com/users/joshhamwee/repos";

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

var json = httpGet(url);
parsed = JSON.parse(json);

function addTable(tabledata) {
  var myTableDiv = document.getElementById("metric_results");
  var table = document.createElement("TABLE");
  var tableBody = document.createElement("TBODY");

  table.appendChild(tableBody);

  var heading = new Array();
  heading[0] = "Project Name";
  heading[1] = "Language";
  heading[2] = "Date Created";
  heading[3] = "URL";

  var population = new Array();
  for (i in tabledata) {
    population[i] = new Array(
      parsed[i].name,
      parsed[i].language,
      parsed[i].created_at,
      parsed[i].url
    );
  }

  //TABLE COLUMNS
  var tr = document.createElement("TR");
  tableBody.appendChild(tr);
  for (i = 0; i < heading.length; i++) {
    var th = document.createElement("TH");
    th.width = "75";
    th.appendChild(document.createTextNode(heading[i]));
    tr.appendChild(th);
  }

  //TABLE ROWS
  var tr = document.createElement("TR");
  tableBody.appendChild(tr);

  for (i = 0; i < population.length; i++) {
    var tr = document.createElement("TR");
    for (j = 0; j < population[i].length; j++) {
      var td = document.createElement("TD");
      if (j == 3) {
        td.innerHTML =
          "<a href=https://github.com/joshhamwee/" +
          population[i][0].replace(/['"]+/g, "") +
          ">" +
          "Take me to that project!!" +
          "</a>";
        // For IE only, you can simply set the innerText of the node.
        // The below code, however, should work on all browsers.
      } else {
        td.appendChild(document.createTextNode(population[i][j]));
      }

      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }

  myTableDiv.appendChild(table);
}

addTable(parsed);
