 /* ReadCookie --
  * Is a function that checks to see if the client has the solution factory cookie.
  * It provides a logging framework for actions on the webpage.
  */
var devmode=true;
var _version_number = '1.1';
var win_location='http://launch.oracle.com/?ca_timline';
var isEmployee =false;
var emailaddress="";
   
function ReadCookie() {  
   var allcookies = document.cookie;
   var hasSfCookie=false;
   var cookiename="none";
   
if (devmode) {//do nothing
console.log('Accelerate Landing Pad Template is in Developer mode. ');
}
else {
   // Get all the cookies pairs in an array
   cookiearray  = allcookies.split(';');
        
   // Now take key value pair out of this array
   for(var i=0; i<cookiearray.length; i++) {
  
    cookiename = cookiearray[i].split('=')[0];
    
     //check to see if WEB2000userid exists and extract email address
     if (cookiename.toLowerCase().indexOf("ora_ucm_info") >= 0) {
      emailaddress =cookiearray[i].split('~')[4];
      hasSfCookie=true;
      break;
      }
   
    //check to see if SF_USERID exists and extract email address
    if (cookiename.toLowerCase().indexOf("sf_userid") >= 0) {
      emailaddress = cookiearray[i].split('=')[1];
      hasSfCookie=true;
      break;
      }
      
    //check to see if WEB2000userid exists and extract email address
    if (cookiename.toLowerCase().indexOf("web2000userid") >= 0) {
      emailaddress = cookiearray[i].split('=')[1];
      hasSfCookie=true;
      break;
      }
      
   }
   
  if (!hasSfCookie) {
    //if no cookie then redirect
    console.log('No Cookie found so redirecting to core website.');
    window.location=win_location;
   } 
  else {
    console.log('Inside ReadCookies for Landing Pad '+win_location);
    log('Viewing Landing Pad ',win_location);
    isOracleEmployee();
  }
  
  
 }
}

function isOracleEmployee(){
 //if contains sf_generic then user not identified.
 if (emailaddress.indexOf('sf_generic') >= 0) {
   isEmployee =false;
 }
  //else if contains oracle then user is employee.
 else if (emailaddress.indexOf('oracle') >= 0){
    isEmployee =true;
 }
 else{
    isEmployee =false;
 }
 
}


/*function log sends actions from the webpage back to the server. 
 * */
function log(operation,machine) {

var p_url="http://isdportal.oracle.com/pls/portal/tsr_admin.CUSTOMIZE.sf_audit_click?p_code=C_CLICK&p_id1=";
var params = p_url+machine+"&p_id2=&p_user_layout="+operation;

if (devmode){
console.log( operation+ '  '+machine);
}
else {
var http = new XMLHttpRequest();
http.open("GET", params, true);
http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		//alert(http.responseText);
	}
}
http.send(null);
}

}



