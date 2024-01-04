var usersData;
var user = {};
var emppty = "All inputs is required";
var wrongData = "incorrect email or password";
var arr = [];
var myHttp = new XMLHttpRequest();
var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");
var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");
if (localStorage.getItem("usersData") !== null) {
  usersData = JSON.parse(localStorage.getItem("usersData"));
} else {
  usersData = [];
}
document.querySelector("#signup").addEventListener("click", showSignup);
document.querySelector("#signin").addEventListener("click", showSignin);
document.querySelector(".singup").addEventListener("click", function () {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    showExit();
  } else if (
    signupName.value !== "" &&
    signupEmail.value !== "" &&
    signupPassword.value !== "" &&
    validMail() == true
  ) {
    showExit2();
  } else {
    showExit3();
  }
});
document.querySelector(".loginBtn").addEventListener("click", function () {
  if (signinEmail.value == "" || signinPassword.value == "") {
    showEmpty();
  } else if (localStorage.getItem("usersData") !== null) {
    EnterTOLoginPage();
  }
  if (signinEmail.value !== "" && signinPassword.value !== "") {
    showIncorrect();
  }
});
function showSignup() {
  document.querySelector("#container1").style.display = "none";
  document.querySelector("#container2").style.display = "block";
}

function showSignin() {
  document.querySelector("#container1").style.display = "block";
  document.querySelector("#container2").style.display = "none";
}

function showExit() {
  document.querySelector("#exist").style.display = "block";
  document.querySelector("#exist3").style.display = "none";
  document.querySelector("#exist2").style.display = "none";
}
function showExit2() {
  document.querySelector("#exist").style.display = "none";
  document.querySelector("#exist2").style.display = "block";
  document.querySelector("#exist3").style.display = "none";
}
function showExit3() {
  document.querySelector("#exist").style.display = "none";
  document.querySelector("#exist2").style.display = "none";
  getData();
  deletName();
  document.querySelector("#exist3").style.display = "block";
  showSignin();
}

function validMail() {
  for (var i = 0; i < usersData.length; i++) {
    if (usersData[i].mail == signupEmail.value) {
      return true;
    }
  }
}

function deletName() {
  signupName.value = "";
}
function getData() {
  user = {
    name: signupName.value,
    mail: signupEmail.value,
    password: signupPassword.value,
  };
  usersData.push(user);
  localStorage.setItem("usersData", JSON.stringify(usersData));
}
function showEmpty() {
  document.querySelector("#incorrect").innerHTML = `${emppty}`;
}
function EnterTOLoginPage() {
  usersData = JSON.parse(localStorage.getItem("usersData"));
  for (var i = 0; i < usersData.length; i++) {
    if (
      usersData[i].mail == signinEmail.value &&
      usersData[i].password == signinPassword.value
    ) {
      document.querySelector("#container3").style.display = "block";
      document.querySelector("#container1").style.display = "none";
      document.querySelector(
        "#username"
      ).innerHTML = `welcom ${usersData[i].name}`;
      getApi();
    }
  }
}
function showIncorrect() {
  document.querySelector("#incorrect").innerHTML = `${wrongData}`;
}

function getApi() {
  myHttp.open("GET", "https://fakestoreapi.com/products");
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4) {
      arr = JSON.parse(myHttp.response);
      console.log(arr);
      displayRows();
    }
  });
}
function displayRows() {
  var cartoona = "";
  for (var i = 0; i < arr.length; i++) {
    cartoona += `<div class="col-md-4 ">
    <div>
        <img src="${arr[i].image}" class="w-100 h-50">
        <h2>${arr[i].title}</h2>
        <p>${arr[i].description}</p>
    </div>
</div>`;
  }
  document.querySelector(".row").innerHTML = cartoona;
}
