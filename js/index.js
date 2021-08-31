var date = new Date();  
var year = date.getFullYear(); // 현재 년도
var month = date.getMonth()+1; // 현재 월
var today = date.getDate();   // 오늘 날짜
var currentSession = JSON.parse(sessionStorage.getItem("__user__"));;

document.addEventListener("DOMContentLoaded",function(){
	document.getElementById("calendarBoard").innerHTML = printCalendar();
	SignedCheck();	
	loadingCalendarID();

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

function signOut(){
	if(!confirm("로그아웃 하시겠습니까?")){
		return;
	}
	sessionStorage.clear();
	location.href="index.html";
}

function daySelect(id){
	if (sessionStorage.length==0){
		return;
	}
    var message = prompt("메모할 내용을 입력해 주세요.","");
    if(message==null || message=="" || message=="null"){
        document.getElementById(id).innerHTML  = id;
		noticeSavetoLocalStorage(message,id)
        return;
    }
        document.getElementById(id).innerHTML = id +"<p>"+ message + "</p><br>";
		noticeSavetoLocalStorage(message,id)

}  

function noticeSavetoLocalStorage(message,id){
	var dayNotice = {
		month: month,
		day: today,
		notice: message
	};

	localStorage.setItem("_calendar_"+currentSession["id"]+id,JSON.stringify(dayNotice));
}

function printCalendar(){
	var firstDay = new Date(year,month-1,1).getDay(); // 월 첫째 요일 값 0=일요일 ~ 6= 토요일
	var lastDay = new Date(year,month,0).getDate(); // 월 마지막 날짜
	var cnt = 0; // 7일 카운트
	var	addHtml = "";
	
	
	addHtml += "<tr>";
    // 앞 공백 채우기
	for(var i=0;i<firstDay;i++){ 
		addHtml += "<td></td>";
		cnt++;
	}	
	for(var i=1;i<=lastDay;i++){
        // 일요일
		if(cnt==0){
			addHtml += "<td id=" + i + " style=color:red onclick='daySelect(" + i + ")'>";
            addHtml += i + "<br>";
			addHtml += "</td>";
			cnt++;
        // 토요일
		}else if(cnt==6){
			addHtml += "<td id=" + i + " style=color:lightskyblue onclick='daySelect(" + i + ")'>";
            addHtml += i + "<br>";
			addHtml += "</td>";
			cnt++;
		}else{
			addHtml += "<td id=" + i + " onclick='daySelect(" + i + ")'>";
            addHtml += i + "<br>";
			addHtml += "</td>";
			cnt++;	
		}		
		
		if(cnt%7==0){
			addHtml += "</tr >";
            addHtml += "<tr>";
			cnt=0;
		}
	}
	for(var i=0;i<7-cnt;i++){
        addHtml += "<td></td>"; // 마지막 날짜 이후 공백
    }
		
	addHtml += "</tr>";
	
	
	return addHtml;
}

function monthCheck(noticeDay){
	var calendar = JSON.parse(localStorage.getItem("_calendar_"+currentSession["id"]+noticeDay));
	if(!calendar){
		return false;
	}
	for(let i = localStorage.length; 0<i; i--){
		if(month != calendar["month"]){
			sessionStorage.removeItem("_calendar_"+currentSession["id"]+noticeDay);
		}
	}
	return true;
}

function loadingCalendarID(){
	var localKeys = Object.keys(localStorage)

	for(var idx in localKeys) {

		var key = localKeys[idx]

		if(key.indexOf("_calendar_")<0){
			continue;
		}
		var i = key.replace("_calendar_"+currentSession["id"],'');
		if(!monthCheck(i)){
			continue;
		}
		var loadingNotice = JSON.parse(localStorage.getItem("_calendar_"+currentSession["id"]+i));
		console.log(loadingNotice["notice"]);
		document.getElementById(i).innerHTML = document.getElementById(i).innerText +"<p>"+ loadingNotice["notice"] + "</p><br>";
	}
}


