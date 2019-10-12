try {document.getElementById("signout").onclick = signOut} catch(err) {}
try {document.getElementById("signup").onclick = ()=>{
  window.location.href="/htmls/signup.html";
}} catch(err) {}
try {document.getElementById("signin").onclick = ()=>{
  window.location.href="/htmls/signin.html?redirect=/htmls/home.html";
}} catch(err) {}
try {document.getElementById("addsem").onclick = addSemester} catch(err) {}
try {document.getElementById("remsem").onclick = removeSemester} catch(err) {}
try {document.getElementById("addcla").onclick = addClass} catch(err) {}
try {document.getElementById("remcla").onclick = removeClass} catch(err) {}
try {document.getElementById("save").onclick = ()=>{
  calcGPAs(true);
}} catch(err) {}
try {document.getElementById("resave").onclick = ()=>{
  calcGPAs(false);
}} catch(err) {}
try {document.getElementById("updateUser").onclick = updateUser} catch(err) {}
try {document.getElementById("changepw").onclick = ()=>{
  window.location.href='/htmls/changepw.html';
}} catch(err) {}
try {document.getElementById("delete").onclick = ()=>{
  window.location.href='/htmls/signin.html?redirect=/htmls/delete.html';
}} catch(err) {}
try {document.getElementById("home").onclick = ()=>{
  window.location.href='/htmls/home.html';
}} catch(err) {}
try {document.getElementById("settings").onclick = ()=>{
  window.location.href = '/htmls/settings.html';
}} catch(err) {}
try {document.getElementById("addsems").onclick = ()=>{
  window.location.href = '/htmls/addsem.html';
}} catch(err) {}
try {document.getElementById("changepw").onclick = ()=>{
  window.location.href = "/html/changepw.html";
}} catch(err) {}
try {document.getElementById("sigoogle").onclick = ()=>{
  firebase.auth().signInWithRedirect(provider);
}} catch(err) {}
try {document.getElementById("sugoogle").onclick = ()=>{
  firebase.auth().signInWithRedirect(provider);
}} catch(err) {}
try {document.getElementById("yes").onclick = ()=>{
  deleteUser();
}} catch(err) {}
try {document.getElementById("no").onclick = ()=>{
  window.location.href="/htmls/home.html";
}} catch(err) {}
try {document.getElementById("verify").onclick = ()=>{
  auth.currentUser.sendEmailVerification(actionCodeSettings).then(()=>{
    document.getElementById("verifyed").innerHTML = "Email Sent!";
  });
}} catch(err) {}
try {document.getElementById("forgot").href = "/htmls/resetpw.html"} catch(err) {}
try {document.getElementById("reset").onclick = ()=>{
  auth.sendPasswordResetEmail(document.getElementById("email").value, acs1).then(()=>{
    window.location.href = "/index.html";
  });
}} catch(err) {}
try {document.getElementById("sishow").onclick = ()=>{
  showPW("signin-password");
}} catch(err) {}
try {document.getElementById("sushow").onclick = ()=>{
  showPW("signup-password");
}} catch(err) {}