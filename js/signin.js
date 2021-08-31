function goto_signin() {
    var SigninForm = document.SigninForm;
    var userInfo = JSON.parse(localStorage.getItem("__user__" + SigninForm.user_id.value));
    
    if(!SigninForm.user_id.value) {
        alert("아이디를 입력해 주세요.")
        SigninForm.user_id.focus();
        return 0;
    }

    if(!SigninForm.pw.value) {
        alert("비밀번호를 입력해 주세요.");
        SigninForm.pw.focus();
        return 0;
    }
    
    try {
        var pw = userInfo["pw"];
    } catch (e) {
        alert("로그인에 실패하였습니다.");
        return 0;
    }

    try {
        if(userInfo===null){
            alert("id혹은 password를 찾을수 없습니다.");
            return;
        }
        var pw = userInfo["pw"];

        if(pw===SigninForm.pw.value){
            var sessionUserInfo = {
                id: userInfo["id"],
                name: userInfo["name"],
                phone: userInfo["contact"],

            };
            sessionStorage.setItem("__user__",JSON.stringify(sessionUserInfo));
            location.href="index.html";
            return ;
        }
        alert("id혹은 password를 찾을수 없습니다.");
    } catch (e) {
        // 로그인 실패시
        alert("id혹은 password를 찾을수 없습니다.");
        return;
    }
}

function checkValidation(){
//  -------todossssssssssssssssss
}
function goto_signup(){
    location.href="signup.html";
 
}