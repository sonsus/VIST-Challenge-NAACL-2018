$(document).ready(function() {
            	
	 $("#image-container").justifiedGallery({
 		rowHeight : 200,
     	lastRow : 'nojustify',
     	margins : 10
  	});
              // Instructions expand/collapse
              var content = $('#instructionBody');
              var trigger = $('#collapseTrigger');
              content.hide();
              $('.collapse-text').text('(Click to expand)');
              trigger.click(function(){
                content.toggle();
                var isVisible = content.is(':visible');
                if(isVisible){
                  $('.collapse-text').text('(Click to collapse)');
                }else{
                  $('.collapse-text').text('(Click to expand)');
                }
              });
              // end expand/collapse
            });

/**
 * Gets a URL parameter from the query string
 */
function turkGetParam( name, defaultValue ) { 
   alert("turkGetParam")
   var regexS = "[\?&]"+name+"=([^&#]*)"; 
   var regex = new RegExp( regexS ); 
   var tmpURL = window.location.href; //current window url
   var results = regex.exec( tmpURL ); //using regex defined above to extract workerID and HIT_ID 
   
   if( results == null ) { 
     return defaultValue; 
   } else { 
     return results[1];    
   } 
}

/**
 * URL decode a parameter
 */
function decode(strToDecode){

  alert("decode")
  var encoded = strToDecode;
  return unescape(encoded.replace(/\+/g,  " "));
}


/**
 * Returns the Mechanical Turk Site to post the HIT to (sandbox. prod)
 */
function turkGetSubmitToHost() {
  alert("turkGetSubmitToHost")
  return decode(turkGetParam("turkSubmitTo", "https://www.mturk.com"));
}


/**
 * Sets the assignment ID in the form. Defaults to use mturk_form and submitButton
 */ 
function turkSetAssignmentID( form_name, button_name ) {
  alert("turkSetAssignmentID")
  if (form_name == null) {
    form_name = "mturk_form";
  }

  if (button_name == null) {
    button_name = "submitButton";
  }

  assignmentID = turkGetParam('assignmentId', "");
  alert("assignmentID is" + assignmentID)
  document.getElementById('assignmentId').value = assignmentID;

  if (assignmentID == "ASSIGNMENT_ID_NOT_AVAILABLE") { 
    // If we're previewing, disable the button and give it a helpful message
    btn = document.getElementById(button_name);
    if (btn) {
      btn.disabled = true; 
      btn.value = "You must ACCEPT the HIT before you can submit the results.";
    } 
  }

  form = document.getElementById(form_name); 
  if (form) {
     form.action = turkGetSubmitToHost() + "/mturk/externalSubmit"; 
  }
}





    