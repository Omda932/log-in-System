var usersData
var user={}
var count=1 
var signupName= document.querySelector("#signupName")
var signupEmail= document.querySelector("#signupEmail")
var signupPassword= document.querySelector("#signupPassword")
var signinEmail=document.querySelector("#signinEmail")
var signinPassword=document.querySelector("#signinPassword")
if(localStorage.getItem("usersData") !== null){
    usersData= JSON.parse(localStorage.getItem("usersData"))
    
      }else{
        usersData=[];
      }


document.querySelector("#signup").addEventListener("click",function(){
    document.querySelector("#container1").style.display = "none"
    document.querySelector("#container2").style.display = "block"
   
})
document.querySelector("#signin").addEventListener("click",function(){
    document.querySelector("#container1").style.display = "block"
    document.querySelector("#container2").style.display = "none"
   
})
document.querySelector(".singup").addEventListener("click",function(){
  
 if(signupName.value =="" || signupEmail.value =="" || signupPassword.value ==""){  
    document.querySelector("#exist").style.display = "block"
    document.querySelector("#exist3").style.display = "none" 
    document.querySelector("#exist2").style.display = "none" 
    
}

 else if(signupName.value !=="" &&signupEmail.value !==""&&signupPassword.value !==""&& validMail()==true){  
    document.querySelector("#exist").style.display = "none"
    document.querySelector("#exist2").style.display = "block" 
    document.querySelector("#exist3").style.display = "none"
   
   }else{
    document.querySelector("#exist").style.display = "none"
    document.querySelector("#exist2").style.display = "none" 
    getData()
    deletName() 
    document.querySelector("#exist3").style.display = "block" 
    console.log("hiiii");
   }
   
    
})
function validMail(){
    for(var i=0;i<usersData.length;i++){
        if(usersData[i].mail==signupEmail.value)
        {
            return true
        }
    }
    
}
 
function deletName(){
    signupName.value="" 
}
function getData(){
    user={
        name: signupName.value,
        mail: signupEmail.value,
        password: signupPassword.value
       }
       usersData.push(user)
       localStorage.setItem("usersData",JSON.stringify(usersData))
}
document.querySelector(".loginBtn").addEventListener("click",function(){
   var emppty="All inputs is required"
   var wrongData="incorrect email or password"
    if (signinEmail.value =="" ||signinPassword.value ==""){
        document.querySelector("#incorrect").innerHTML = `${emppty}`
       } 
       else if(localStorage.getItem("usersData") !== null){
        usersData=JSON.parse (localStorage.getItem("usersData"))
        for(var i=0;i<usersData.length;i++){
            if(usersData[i].mail==signinEmail.value && usersData[i].password==signinPassword.value )
            {
                document.querySelector("#container3").style.display = "block"
                document.querySelector("#container1").style.display = "none"
                document.querySelector("#username").innerHTML=`welcom ${usersData[i].name}`
            }
        }
       } 
     if(signinEmail.value !=="" && signinPassword.value !==""){
        
        document.querySelector("#incorrect").innerHTML = `${wrongData}`
       }
})
// function validateSignupName(signupName){
//     var signupNameRegex = /^[a-z]*[0-9 _]/
//     return signupNameRegex.test(signupName)
//   }
//   function valideSignupEmail(signupEmail) {
//     var signupEmailRegex = /^[]a-z[\w]+@[\w]{0,10}\.com$/;
//     return signupEmailRegex.test(signupEmail);
//   }
//   function valideSignupEmail(signupPassword) {
//     var signupPasswordRegex = /[\w]{3,20}/;
//     return signupPasswordRegex.test(signupPassword);
//   }