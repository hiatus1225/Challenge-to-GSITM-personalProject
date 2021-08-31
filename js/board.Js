var currentSession = JSON.parse(sessionStorage.getItem("__user__"));;

document.addEventListener("DOMContentLoaded",function(){
	SignedCheck();
	drawing();	
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

function drawing(){
	var list = JSON.parse(localStorage.getItem("contents"));
	var addHtml = '';
    var body = document.getElementById('rows');

    for (let i = list.length-1; 0 <= i; i--) {
		var content  = list[i];
		addHtml += '<tr onclick="View(' + i + ')">';
		addHtml += '<td>' + content.no + '</td>';
		addHtml += '<td>' + content.title + '</td>';
		addHtml += '<td>' + content.writer + '</td>';
		addHtml += '<td>' + manufactureDate(content.write_date) + '</td>';
		addHtml += '</tr>';
    }

    document.getElementById("contentsList").innerHTML = addHtml;
}

function signOut(){
	if(!confirm("로그아웃 하시겠습니까?")){
		return;
	}
	sessionStorage.clear();
	location.href="index.html";
}

function manufactureDate(dateVal){
	var date = new Date(dateVal);
	var year = date.getFullYear();
	var Month = date.getMonth();
	var day = date.getDate();
	var hours = date.getHours();
		hours = hours < 10 ? '0' + hours.toString() : hours.toString();
	var minutes  = date.getMinutes();
		minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();

	var time = "" + hours + " : " + minutes;
	var YMD = "" + year + Month + day;
	if(todays()==YMD){
		return time;
	}else{
		return year + "-" + Month + "-" + day;
	}
}

function todays(){
	var date = new Date();
	var year = date.getFullYear();
	var Month = date.getMonth();
	var day = date.getDate();

	return ""+year+Month+day;
} 

function View(No) {
	location.href = 'view.html?no='+(No+1);
}
