var currentSession = JSON.parse(sessionStorage.getItem("__user__"));;

document.addEventListener("DOMContentLoaded",function(){
	SignedCheck();	
});

function SignedCheck(){
	if(sessionStorage.length==0){
		document.getElementById("ahboard").href = "#";
		document.getElementById("signOut").hidden=true;
		return;
	}
	document.getElementById("signInBtn").hidden=true;
	document.getElementById("signed").innerText = currentSession["id"] + " 님 반갑습니다."
}

function idcheck() {

    var key = Object.keys(localStorage);
    var localID= document.getElementById("id").value;
    if(localID===null || localID===""){
      document.getElementById("id").style.backgroundColor="white";
    }
    if(localID===null || localID===""){
      alert("아이디를 입력해 주세요.");
      return;
    }
    for(let i = 0; i < key.length;i++){
      if (key[i]!=="__user__"){
        if("__user__"+localID === key[i]){
          document.getElementById("id").style.backgroundColor="red";
          style="background-color: rgb(162, 255, 162);"
            return;
          }else {
            document.getElementById("id").style.backgroundColor="rgb(162, 255, 162)";
        }
      }
    }
  }

  function pwcheck(){

    var pw1 = document.getElementById('pw1').value;
    var pw2 = document.getElementById('pw2').value;
    if(pw1===null || pw1===""){document.getElementById("pw1").style.backgroundColor="white";}
    if(pw2===null || pw2===""){document.getElementById("pw2").style.backgroundColor="white";}

    if(pw1 != pw2){
      document.getElementById("pw1").style.backgroundColor="red";
      document.getElementById("pw2").style.backgroundColor="red";
      document.f2.pw2=null;
      return false;
    } else{
      document.getElementById("pw1").style.backgroundColor="rgb(162, 255, 162)";
      document.getElementById("pw2").style.backgroundColor="rgb(162, 255, 162)";
      return true;
    }
  }



  function signup_click(){
      
    var id = document.getElementById('id').value;
    var pw1 = document.getElementById('pw1').value;
    var pw2 = document.getElementById('pw2').value;
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;

    var userkey = '__user__' + id;
    var userInfo = {
        id: id,
        pw: pw1,
        name: name,
        phone: phone,
    }

    if(id==""){
        alert("아이디를 입력해주세요.");
        document.f2.id.focus();
        return;
    }

    if(pw1==""){
        alert("비밀번호를 입력해주세요.");
        document.f2.pw1.focus();
        return;
    }

    if(pw2==""){
        alert("비밀번호를 확인해주세요.");
        document.f2.pw2.focus();
        return;
    }

    if(name==""){
        alert("성명을 입력해주세요.");
        document.f2.name.focus();
        return;
    }

    if(phone==""){
        alert("연락처를 입력해주세요.");
        document.f2.phone.focus();
        return;
    }
    

    console.log(userInfo);
    localStorage.setItem(userkey, JSON.stringify(userInfo));
    alert("가입을 축하합니다.")
    location.href="signin.html";

  }
  
    // localStorage.setItem(document.getElementById('name').value, document.getElementById('name').value);