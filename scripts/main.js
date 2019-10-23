//vars
var lettergrades = ["a", "b", "c", "d", "f"],
    percents = [9, 8, 7, 6, 5],
    uwgradepoints = [4, 3, 2, 1, 0],
    apgradepoints = [5, 4, 3, 2, 1],
    hgradepoints = [4.5, 3.5, 2.5, 1.5, 0.5],
    actionCodeSettings = {url: window.location.origin + "/htmls/home.html"},
    acs1 = {url: window.location.origin + "/htmls/signin.html"};

//add a text field
function newInput(hint, id, type, element, options = null){
  var div = document.createElement("div"),
      input = document.createElement(element);
      
  div.classList.add("form-group");
  
  input.id = id;
  input.type = type;
  input.classList.add("form-control");
  input.setAttribute("placeholder", hint);
  
  if (options === null) {
    div.appendChild(input);
    return div;
  } else {
    for (i=0; i<(options.length - 1); i++){
      var option = document.createElement("option");
      option.innerHTML = options[i];
      input.appendChild(option);
    }
    input.value = options[options.length - 1];
    div.appendChild(input);
    return div;
  }
}

//class management
function addSemester(){
  semester += 1;
  var container = document.getElementById("questions"),
      newsem = document.createElement("div"),
      remove = document.createElement("button"),
      row = document.createElement("div"),
      col1 = document.createElement("div"),
      col2 = document.createElement("div"),
      semid = "sem"+semester;
      
  col1.innerHTML = "Semester " + semester + ": ";
  newsem.id = semid;
  newsem.classList.add("h3");
  newsem.classList.add("container");
  
  col1.classList.add("col-sm");
  col2.classList.add("col-sm");
  row.classList.add("row");
  
  remove.type = "button";
  remove.id = "remsem" + semester;
  remove.setAttribute("class", "btn btn-dark m-1");
  remove.innerHTML = "Remove";
  remove.addEventListener("click", ()=>{
    removeSemester(semid);
  });
  
  col1.appendChild(remove);
  col2.appendChild(remove);
  row.appendChild(col1);
  row.appendChild(col2);
  newsem.appendChild(row);
  container.appendChild(newsem);
  
  addClass();
}

function removeSemester(id){
  var container = document.getElementById("questions");
  var toRem = document.getElementById(id);
  try {
    toRem.remove();
  } catch (err) {window.alert("You can't remove zero semesters!"); console.log(err)}
  semester -= 1;
}

function addClass(){
  var container = document.getElementById("sem"+semester), element;
  try{element = container.childElementCount - 1} catch (err) {return window.alert("Try adding a semester first!")}
  var classid = "s"+semester+"c"+element,
      it = (element < 9) ? ("0"+(element+1)) : (element+1),
      newclass = document.createElement("div"),
      button = document.createElement("button"),
      row = document.createElement("div"),
      col1 = document.createElement("div"),
      col2 = document.createElement("div"),
      col3 = document.createElement("div"),
      col4 = document.createElement("div");
      
  newclass.id = "classcont"+classid;
  newclass.classList.add("container");
  col1.classList.add("col-sm");
  col2.classList.add("col-sm");
  col3.classList.add("col-sm");
  col4.classList.add("col-sm");
  row.classList.add("row");
  
  button.type = "button";
  button.id = "remcla" + classid;
  button.setAttribute("class", "btn btn-outline-dark m-1");
  button.innerHTML = "Remove";
  button.addEventListener("click", ()=>{
    removeClass(classid);
  });
  
  col1.appendChild(newInput("Class Name", "class"+classid, "text", "input"));
  col2.appendChild(newInput("Grade", "grade"+classid, "text", "input"));
  col3.appendChild(newInput("", "type"+classid, "text", "select", ["AP", "Honors", "Normal", "Normal"]));
  col4.appendChild(button);
  
  
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  row.appendChild(col4);
  
  newclass.appendChild(row);
  container.appendChild(newclass);
}

function removeClass(id){
  var container = document.getElementById("sem" + semester);
  var toRem = document.getElementById("classcont"+id);
  try {
    toRem.remove();
    if (container.childElementCount === 0){
      removeSemester();
    }
  } catch (err) {window.alert("You can't remove zero classes!"); console.log(err)}
}

//calculate unweighted gpa
function calcuwGPA(){
  var gpa;
  var grades = [];
  for (i=1; i<(semester + 1); i++){
    var classes = document.getElementById("sem"+i).childElementCount;
    for (j=0; j<(classes - 1); j++){
      var number = "s"+i+"c"+j;
      var grade;
      var value = document.getElementById("grade"+number).value;
      if (isNaN(value)){
        grade = uwgradepoints[lettergrades.indexOf(value.replace(/[^a-zA-Z ]/g, "").toLowerCase())];
      } else if (!isNaN(value)){
        var num = Math.floor(value / 10);
        if (value >= 100) num = 9;
        if (num < 5) num = 5;
        grade = uwgradepoints[percents.indexOf(num)];
      }
      grades.push(grade);
    }
  }
  gpa = Math.round(10*(grades.reduce((a,b) => a + b, 0) / grades.length)) / 10;
  return gpa.toFixed(1);
}

//calculate weighted gpa
function calcwGPA(){
  var gpa;
  var grades = [];
  for (i=1; i<(semester + 1); i++){
    var classes = document.getElementById("sem"+i).childElementCount;
    for (j=0; j<(classes - 1); j++){
      var number = "s"+i+"c"+j;
      var grade;
      var value = document.getElementById("grade"+number).value;
      var rawtype = document.getElementById("type"+number).value;
      var pointlist = (rawtype === "AP") ? apgradepoints : ((rawtype === "Honors") ? hgradepoints : uwgradepoints);
      if (isNaN(value)){
        grade = pointlist[lettergrades.indexOf(value.replace(/[^a-zA-Z ]/g, "").toLowerCase())];
      } else if (!isNaN(value)){
        var num = Math.floor(value / 10);
        if (value >= 100) num = 9;
        if (num < 5) num = 5;
        grade = pointlist[percents.indexOf(num)];
      }
      grades.push(grade);
    }
  }
  gpa = Math.round(10*(grades.reduce((a,b) => a + b, 0) / grades.length)) / 10;
  return gpa.toFixed(1);
}

//get the class and grade info
function getClassesAndGrades(semester){
  var semesters = {};
  for (i=1; i<(semester + 1); i++){
    var numofclasses = document.getElementById("sem"+i).childElementCount;
    var inSem = {};
    for (j=0; j<(numofclasses-1); j++){
      var number = "s"+i+"c"+j;
      var name = document.getElementById("class" + number).value;
      var grade = document.getElementById("grade" + number).value;
      var type = document.getElementById("type" + number).value;
      inSem[name] = [grade,type];
    }
    var semName = "Semester" + i;
    semesters[semName] = inSem;
  }
  if (Object.keys(semesters).length === 0) {
    window.alert("You must have some inputs!")
    document.getElementById("loading").remove();
  } else {
    return semesters;
  }
}

//get goal info
function getGoals(){
  var unweighted = Math.round(10*(document.getElementById("uwgoal").value))/10;
  var weighted = Math.round(10*(document.getElementById("wgoal").value))/10;
  var returnvals = [unweighted.toFixed(1), weighted.toFixed(1)];
  return returnvals;
}

//get the latest semesters
function getLatestSemester(data){
  var semesters = data.Semesters;
  var length = Object.keys(semesters).length;
  var latestSemester = semesters["Semester"+length];

  var container = document.getElementById("latest");
  for (i=0; i<Object.keys(latestSemester).length; i++) {
    var newclass = document.createElement("li"),
        classKey = Object.keys(latestSemester)[i];
        
    newclass.classList.add("list-group-item");
    
    newclass.appendChild(document.createTextNode(classKey + " (" + latestSemester[classKey][1] + "): "+ latestSemester[classKey][0]));

    container.appendChild(newclass);
  }
}

//get and display all semesters
function getSemesters(data){
  var semesters = data.Semesters,
      length = Object.keys(semesters).length,
      container = document.getElementById("questions");
  console.log(length)
  for (i=0; i<length; i++){
    console.log("ran", i)
    var currentSem = semesters["Semester"+(i+1)],
        currentLength = Object.keys(currentSem).length,
        newsem = document.createElement("div"),
        newline = document.createElement("br");
    var num = i;
    addSemester();
    i = num;
    for (j=0; j<currentLength; j++){
      var cn = Object.keys(currentSem)[j],
          cg = currentSem[cn][0],
          ct = currentSem[cn][1],
          number = "s" + (i+1) + "c" + j;
          console.log(number, i, j)
      if (document.getElementById("classcont" + number)){
        document.getElementById("class"+number).value = cn;
        document.getElementById("grade"+number).value = cg;
        document.getElementById("type"+number).value = ct;
      } else {
        var numj = j;
        addClass();
        j = numj;
        i = num;
        document.getElementById("class"+number).value = cn;
        document.getElementById("grade"+number).value = cg;
        document.getElementById("type"+number).value = ct;
      }
    }
  }
}

//recalculate the gpas
function reCalcGPAs(data){
  var semester = Object.keys(data.Semesters).length;
  
  var uwgpa;
  var grades = [];
  for (i=1; i<(semester + 1); i++){
    var classesObj = window.semesters["Semester"+i];
    var classesKeys = Object.keys(classesObj);
    for (j=0; j<classesKeys.length; j++){
      var grade;
      var value = classesObj[classesKeys[j]][0];
      if (isNaN(value)){
        grade = uwgradepoints[lettergrades.indexOf(value.replace(/[^a-zA-Z ]/g, "").toLowerCase())];
      } else if (!isNaN(value)){
        var num = Math.floor(value / 10);
        if (value >= 100) num = 9;
        if (num < 5) num = 5;
        grade = uwgradepoints[percents.indexOf(num)];
      }
      grades.push(grade);
    }
  }
  uwgpa = Math.round(10*(grades.reduce((a,b) => a + b, 0) / grades.length)) / 10;
  
  var wgpa;
  var grades = [];
  for (i=1; i<(semester + 1); i++){
    var classesObj = window.semesters["Semester"+i];
    var classesKeys = Object.keys(classesObj);
    for (j=0; j<classesKeys.length; j++){
      var grade;
      var value = classesObj[classesKeys[j]][0];
      var rawtype = classesObj[classesKeys[j]][1];
      var pointlist = (rawtype === "AP") ? apgradepoints : ((rawtype === "Honors") ? hgradepoints : uwgradepoints);
      if (isNaN(value)){
        grade = pointlist[lettergrades.indexOf(value.replace(/[^a-zA-Z ]/g, "").toLowerCase())];
      } else if (!isNaN(value)){
        var num = Math.floor(value / 10);
        if (value >= 100) num = 9;
        if (num < 5) num = 5;
        grade = pointlist[percents.indexOf(num)];
      }
      grades.push(grade);
    }
  }
  wgpa = Math.round(10*(grades.reduce((a,b) => a + b, 0) / grades.length)) / 10;
  
  db.collection("users").doc(auth.currentUser.uid).update({
    wgpa: wgpa,
    uwgpa: uwgpa,
  }).then(function() {
    console.log("Document Updated!");
    done = true;
  }).catch(function(error){
    console.error("Error:", error);
  });
}

//calculate percentile
function percentile(array, datapoint){
  var length = array.length;
  array.sort((a, b)=>{return a-b});
  for (i=0; i<length; i++){
    if (array[i] >= datapoint) {
      return ordinal_suffix_of((((i+1)/length) * 100).toFixed(0));
    } else {}
  }
}

//add st, nd, rd, th
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

//parse the url
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

//pass for urls
function pass(){
  done = true;
}

//show password
function showPW(id) {
  var x = document.getElementById(id);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

//loading bar
function loadingBar(){
  var div = document.createElement("div"),
      strong = document.createElement("strong"),
      spinner = document.createElement("div");
  
  div.setAttribute("class", "d-flex align-items-center m-3");
  div.setAttribute("id", "loading");
  
  strong.innerHTML = "Loading..."
  
  spinner.setAttribute("class", "spinner-border ml-auto");
  spinner.setAttribute("role", "status");
  spinner.setAttribute("aria-hidden", "true");
  
  div.appendChild(strong);
  div.appendChild(spinner);
  
  return div;
}