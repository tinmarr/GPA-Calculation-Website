try {document.getElementById("signout").onclick = signOut} catch(err) {}
try {document.getElementById("signup").onclick = ()=>{
  window.location.href="/htmls/signup.html";
}} catch(err) {}
try {document.getElementById("signin").onclick = ()=>{
  window.location.href="/htmls/signin.html?redirect=/htmls/home.html";
}} catch(err) {}
try {document.getElementById("addsem").onclick = addSemester} catch(err) {}
try {document.getElementById("addcla").onclick = addClass} catch(err) {}
try {document.getElementById("save").onclick = ()=>{
  document.getElementById("body").insertBefore(loadingBar(), document.getElementById("body").childNodes[0]);
  calcGPAs(true);
}} catch(err) {}
try {document.getElementById("resave").onclick = ()=>{
  document.getElementById("body").insertBefore(loadingBar(), document.getElementById("body").childNodes[0]);
  calcGPAs(false);
}} catch(err) {}
try {document.getElementById("updateUser").onclick = ()=>{
  document.getElementById("body").insertBefore(loadingBar(), document.getElementById("body").childNodes[0]);
  updateUser();
}} catch(err) {}
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
try {document.getElementById("updatepw").onclick = ()=>{
  document.getElementById("body").insertBefore(loadingBar(), document.getElementById("body").childNodes[0]);
  changePw();
}} catch(err) {}
try {document.getElementById("sigoogle").onclick = ()=>{
  firebase.auth().signInWithRedirect(provider);
}} catch(err) {}
try {document.getElementById("sugoogle").onclick = ()=>{
  firebase.auth().signInWithRedirect(provider);
}} catch(err) {}
try {document.getElementById("yes").onclick = ()=>{
  document.getElementById("body").insertBefore(loadingBar(), document.getElementById("body").childNodes[0]);
  deleteUser();
}} catch(err) {}
try {document.getElementById("no").onclick = ()=>{
  window.location.href="/htmls/home.html";
}} catch(err) {}
try {document.getElementById("verify").onclick = ()=>{
  document.getElementById("body").insertBefore(loadingBar(), document.getElementById("body").childNodes[0]);
  auth.currentUser.sendEmailVerification(actionCodeSettings).then(()=>{
    document.getElementById("loading").remove();
    document.getElementById("verifyed").innerHTML = "Email Sent!";
  });
}} catch(err) {}
try {document.getElementById("forgot").href = "/htmls/resetpw.html"} catch(err) {}
try {document.getElementById("reset").onclick = ()=>{
  document.getElementById("body").insertBefore(loadingBar(), document.getElementById("body").childNodes[0]);
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