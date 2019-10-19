//sign out
function signOut(){
  firebase.auth().signOut().then(function () {
    if (auth.currentUser === null){
      window.location.href = "/index.html";
    }
  });
}

//calculate and save gpa and gpa information
function calcGPAs(goalErr){
  var user = auth.currentUser;
  var wgpa, uwgpa, classesAndStuff, goals, semesters;
  try{
    wgpa = calcwGPA();
    uwgpa = calcuwGPA();
    classesAndStuff = getClassesAndGrades(semester);
  } catch (err) {
    console.log(err);
    window.alert("There is a problem with your inputs");
  }
  try{
    goals = getGoals();
  } catch (err) {goalErr ? window.alert("There is a problem with your inputs") : {}}
  db.collection("users").doc(user.uid).get().then((doc)=>{
    if (doc.exists){
      semesters = doc.data().Semesters;
      semesters === undefined ? semesters = {} : {};
      for (i=1; i<(Object.keys(classesAndStuff).length + 1); i++){
        var toAdd = classesAndStuff["Semester" + i];
        semesters["Semester" + (Object.keys(semesters).length + 1)] = toAdd;
      }
      if (! goalErr){
        db.collection("users").doc(user.uid).update({
          Semesters: semesters,
          wgpa: wgpa,
          uwgpa: uwgpa,
        }).then(function() {
          db.collection("users").doc("generals").update({
            uwgpas: firebase.firestore.FieldValue.arrayUnion(uwgpa),
            wgpas: firebase.firestore.FieldValue.arrayUnion(wgpa),
          }).then(()=>{
            console.log("Document Updated!");
            window.location.href="/htmls/home.html";
          }).catch((err)=>{
            console.error("Error:", err);
          });
        }).catch(function(error){
            console.error("Error:", error);
        });
      } else {
        db.collection("users").doc(user.uid).update({
          Semesters: semesters,
          wgpa: wgpa,
          uwgpa: uwgpa,
          wgoal: goals[1],
          uwgoal: goals[0],
        }).then(function() {
          db.collection("users").doc("generals").update({
            uwgpas: firebase.firestore.FieldValue.arrayUnion(uwgpa),
            wgpas: firebase.firestore.FieldValue.arrayUnion(wgpa),
          }).then(()=>{
            console.log("Document Updated!");
            window.location.href="/htmls/home.html";
          }).catch((err)=>{
            console.error("Error:", err);
          });
        }).catch(function(error){
            console.error("Error:", error);
        });
      }
    } else {
      db.collection("users").doc(user.uid).set({
        
      }).then(()=>{
        calcGPAs(goalErr);
      }).catch((err)=>{
        console.error(error);
      });
    }
  });
}

//delete account and user data
function deleteUser(){
  var user = auth.currentUser;
  db.collection("users").doc(user.uid).delete().then(()=>{
    user.delete().then(()=>{
      console.log("User deleted");
      window.location.href = "/index.html";
    }).catch((err)=>{
      console.error("Oppsies, you got an error: \n" + err);
    });
  }).catch((err)=>{
    console.error("Oppsies, you got an error: \n" + err);
  });
}

//update user info
function updateUser(){
  var user = document.getElementById("user").value,
      email = document.getElementById("email").value,
      uwgoal = document.getElementById("uwgoal").value,
      wgoal = document.getElementById("wgoal").value,
      classes = getClassesAndGrades(document.getElementById("class").childElementCount);
  db.collection("users").doc(auth.currentUser.uid).update({
    uwgoal: uwgoal,
    wgoal: wgoal,
    Semesters: classes,
  }).then(function() {
    auth.currentUser.updateProfile({
      displayName: user,
    }).then(()=>{
      auth.currentUser.updateEmail(email).then(()=>{
        db.collection("users").doc(auth.currentUser.uid).get().then((doc) => {
          if (doc.exists){
            semesters = doc.data().Semesters;
            reCalcGPAs(doc.data());
          } else {}
          function wait(){
            if (!done) {
              setTimeout(()=>{wait()}, 100);
            } else {window.location.href = "home.html"}
          }
          wait();
        }).then(()=>{
          console.log("Document Updated!");
        }).catch((error)=>{
          console.error("Error:", error);
        });
      }).catch((error)=>{console.error("Error:", error)});
    }).catch((error)=>{console.error("Error:", error)});
  }).catch(function(error){
    console.error("Error:", error);
  });
}

//change the password
function changePw(){
  var o = document.getElementById("old").value,
      n = document.getElementById("new").value,
      c = document.getElementById("conf").value;
  auth.signInWithEmailAndPassword(auth.currentUser.email, o).then(()=>{
    if(n===c){
      auth.currentUser.updatePassword(n).then(()=>{
        window.location.href="/htmls/home.html";
      }).catch((err)=>{
        window.alert(err.message);
      });
    } else{
      window.alert("Your new password does not match. Please try again.");
    }
  }).catch((err)=>{
    window.alert("Your current password is incorrect. Please try again.");
  });
}