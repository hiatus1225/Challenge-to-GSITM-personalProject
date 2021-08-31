var currentSession = JSON.parse(sessionStorage.getItem("__user__"));;
var parameter = parameterCheck();

document.addEventListener("DOMContentLoaded",function(){
	SignedCheck();
	document.getElementById("writer").value=currentSession["id"];
  document.getElementById("saveBtn").hidden=false;
  if(parameter>0){
    document.getElementById("saveBtn").hidden=true;
    document.getElementById("modifyBtn").hidden=false;
    getContents(parameter);
  }

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

function save() {
  var contents;
  var title = document.getElementById('title').value;
  var writer = document.getElementById('writer').value;
  var content = document.getElementById('contents').value;
  var contentNo;

  if (!confirm('저장하시겠습니까?')) {
    return;
  }

  try {
    contents = JSON.parse(localStorage.getItem("contents"));
  } catch (e) {
    contents = null;
  }

  if (!contents) {
    contents = [];
    contentNo = 1;
  }else{
    contentNo = contents[contents.length-1].no+1;
  }

  contents.push({
  no: contentNo
    , title: title
    , writer: writer
    , contents: content
    , write_date: new Date()
	});
    localStorage.setItem("contents", JSON.stringify(contents));

    alert('저장되었습니다.');
    location.href = 'board.html';
}

function signOut(){
	if(!confirm("로그아웃 하시겠습니까?")){
		return;
	}
	sessionStorage.clear();
	location.href="index.html";
}

function parameterCheck(){
  return getParameterByName('no');
}

function getParameterByName(name) { 
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); 
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); 
}

function getContents(no) {
  var contents = JSON.parse(localStorage.getItem("contents"));
  if(!no){
    return;
  }
  var index =0; 
  for(let i = contents.length-1;0<=i;i--){
    if(contents[i].no === parseInt(no)){
      index=i;
      break;
    }
  }
  var content = contents[index];
  document.getElementById('title').value = content.title;
  document.getElementById('writer').value = content.writer;
  document.getElementById('contents').innerText = content.contents;
}

function modify(){
  var contents;
  var title = document.getElementById('title').value;
  var content = document.getElementById('contents').value;

  if (!confirm('수정하시겠습니까?')) {
    return;
  }

    contents = JSON.parse(localStorage.getItem("contents"));

  var index =0; 
  for(let i = contents.length-1;0<=i;i--){
    if(contents[i].no === parseInt(parameter)){
      index=i;
      break;
    }
  }
    contents[index].title=title;
    contents[index].contents = content;

    localStorage.setItem("contents", JSON.stringify(contents));
    alert('수정이 완료되었습니다.');
    location.href = 'view.html?no='+parameter;
}