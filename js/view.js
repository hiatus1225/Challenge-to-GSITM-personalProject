var currentSession = JSON.parse(sessionStorage.getItem("__user__"));;

document.addEventListener("DOMContentLoaded",function(){
	SignedCheck();
    getContents();
    var sessionID = currentSession["id"];
    var writerHTML = document.getElementById("writer").innerText;
    var addButton = "";
    if(sessionID!=writerHTML){
        addButton += '<a href="#" onclick="gotoBoard()">목록</a>';
    }else{
        addButton += "<a href='#' onclick='gotoBoard()'>목록</a> | "; 
        addButton += "<a id='modifyBtn' href='#' onclick='modify()'>수정</a> | "
        addButton += "<a id='deleteBtn' href='#' onclick='deleteContents()'>삭제</a>";
    }
    document.getElementById("btnArea").innerHTML = addButton;
});

function SignedCheck(){
	if(sessionStorage.length==0){
		document.getElementById("ahboard").href = "#";
		document.getElementById("signOut").hidden=true;
		return;
	}
	document.getElementById("signInBtn").hidden=true;
	document.getElementById("signed").innerText = currentSession["id"] + " 님 반갑습니다.";
}


var contents = JSON.parse(localStorage.getItem("contents"));
function getContents() {

    if (!contents) {
        contents = [];
    }

    var content = contents[getParameterByName('no')-1];
    document.getElementById('contentNo').value = content.no;
    document.getElementById('title').innerText = content.title;
    document.getElementById('writer').innerText = content.writer;
    document.getElementById('contents').innerText = content.contents;
    document.getElementById('write_date').innerText = content.write_date;
}

function deleteContents() {
    var deleteConfirm = confirm("정말 삭제하시겠습니까?");
    if(!deleteConfirm){
        return;
    }
    contents.splice(getParameterByName('no')-1, 1);
    localStorage.setItem("contents", JSON.stringify(contents));
    alert("해당 글이 삭제 되었습니다.");
    location.href = "board.html";
}

function getParameterByName(name) { 
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); 
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); 
}

function gotoBoard(){
    location.href = "board.html";

}

function modify(){
    location.href = "write.html?no="+document.getElementById("contentNo").value;
}

function signOut(){
	if(!confirm("로그아웃 하시겠습니까?")){
		return;
	}
	sessionStorage.clear();
	location.href="index.html";
}