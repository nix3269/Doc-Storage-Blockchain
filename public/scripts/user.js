
function verify() {
    var phone = document.getElementById("phone");
    var pass = document.getElementById("pass");
    fetch("http://localhost:8080/user?u_phone=" + phone.value+"&pass="+pass.value).then(res => res.json()).then(data => {
        if (data.pass == pass.value) {
            sessionStorage.setItem("user", JSON.stringify(data));
            window.location.replace("http://localhost:8080/client1.html")
        } else {
            window.alert("Password and Username do not match")
        }
    })
}

function loadlastobj(x, hash) {
    sessionStorage.setItem("hash",hash);
    
}
function logout(){
    if(sessionStorage.getItem('templ')){
        sessionStorage.removeItem("templ");
    }
    sessionStorage.removeItem("obj");
  sessionStorage.removeItem("id");
  window.location.replace("/");
}