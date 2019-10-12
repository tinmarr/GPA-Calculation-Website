//vars
var lettergrades = ["a", "b", "c", "d", "f"],
    percents = [9, 8, 7, 6, 5],
    uwgradepoints = [4, 3, 2, 1, 0],
    apgradepoints = [5, 4, 3, 2, 1],
    hgradepoints = [4.5, 3.5, 2.5, 1.5, 0.5],
    actionCodeSettings = {url: window.location.origin + "/htmls/home.html"},
    acs1 = {url: window.location.origin + "/htmls/signin.html"};

//class management
function addSemester(){
  semester += 1;
  var container = document.getElementById("questions");
  var newsem = document.createElement("div");
  newsem.innerHTML = "Semester " +(semester) +": ";
  newsem.id = "sem" + semester;
  container.appendChild(newsem);
}

function removeSemester(){
  var container = document.getElementById("questions");
  var toRem = document.getElementById("sem"+semester);
  try {
    toRem.remove();
  } catch (err) {window.alert("You can't remove zero semesters!")}
  semester -= 1;
}

function addClass(){
  var container = document.getElementById("sem"+semester), element;
  try{element = container.childElementCount} catch (err) {return window.alert("Try adding a semester first!")}
  var id = "s"+semester+"c"+element;
  var it = (element < 9) ? ("0"+(element+1)) : (element+1);
  
  var newclass = document.createElement("div");
  newclass.id = "classcont"+id;
  
  var classes = document.createElement("input");
  classes.type = "text";
  classes.id = "class"+id;
  classes.placeholder = "Class " + it + " Name";
  newclass.appendChild(classes);
  
  var grade = document.createElement("input");
  grade.type = "text";
  grade.id = "grade"+id;
  grade.placeholder = "Grade";
  newclass.appendChild(grade);
  
  var type = document.createElement("select");
  type.type = "text";
  type.id = "type"+id;
  type.options.add(new Option("AP"));
  type.options.add(new Option("Honors"));
  type.options.add(new Option("Normal"));
  type.value = "Normal";
  newclass.appendChild(type);
  
  container.appendChild(newclass);
}

function removeClass(){
  var container = document.getElementById("sem" + semester);
  var id = "s"+semester+"c"+(container.childElementCount - 1);
  var toRem = document.getElementById("classcont"+id);
  try {
    toRem.remove();
  } catch (err) {window.alert("You can't remove zero classes!")}
}

//calculate unweighted gpa
function calcuwGPA(){
  var gpa;
  var grades = [];
  for (i=1; i<(semester + 1); i++){
    var classes = document.getElementById("sem"+i).childElementCount;
    for (j=0; j<classes; j++){
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
    for (j=0; j<classes; j++){
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
    for (j=0; j<numofclasses; j++){
      var number = "s"+i+"c"+j;
      var name = document.getElementById("class" + number).value;
      var grade = document.getElementById("grade" + number).value;
      var type = document.getElementById("type" + number).value;
      inSem[name] = [grade,type];
    }
    var semName = "Semester" + i;
    semesters[semName] = inSem;
  }
  return semesters;
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
    var newclass = document.createElement("div");
    var classKey = Object.keys(latestSemester)[i];
    newclass.appendChild(document.createTextNode(classKey + " (" + latestSemester[classKey][1] + "): " + latestSemester[classKey][0]));
    
    container.appendChild(newclass);
  }
}

//get and display all semesters
function getSemesters(data){
  var semesters = data.Semesters,
      length = Object.keys(semesters).length,
      container = document.getElementById("questions");
  
  for (i=0; i<length; i++){
    var currentSem = semesters["Semester"+(i+1)],
        currentLength = Object.keys(currentSem).length,
        newsem = document.createElement("div"),
        newline = document.createElement("br");
        
    newsem.innerHTML = "Semester " +(container.childElementCount + 1) +": ";
    newsem.id = "sem" + (container.childElementCount + 1);
    container.appendChild(newsem);
    
    for (j=0; j<currentLength; j++){
      var cn = Object.keys(currentSem)[j],
          cg = currentSem[cn][0],
          ct = currentSem[cn][1],
          cni = document.createElement("input"),
          cgi = document.createElement("input"),
          cti = document.createElement("select"),
          br = document.createElement("br"),
          newline = document.createElement("br"),
          div = document.createElement("div"),
          number = "s" + (i+1) + "c" + j,
          element = newsem.childElementCount,
          it = (element < 9) ? ("0"+(element+1)) : (element+1);
      
      cni.id = "class" + number;
      cgi.id = "grade" + number;
      cti.id = "type" + number;
      div.id = "classcont" + number;
      
      cni.type = "text";
      cgi.type = "text";
      cti.type = "text";
      
      cni.value = cn;
      cgi.value = cg;
      
      cti.options.add(new Option("AP"));
      cti.options.add(new Option("Honors"));
      cti.options.add(new Option("Normal"));
      
      cti.value = ct;
      
      cni.placeholder = "Class " + it + " Name";
      cgi.placeholder = "Grade";
      
      div.appendChild(cni);
      div.appendChild(cgi);
      div.appendChild(cti);
      
      newsem.appendChild(div);
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