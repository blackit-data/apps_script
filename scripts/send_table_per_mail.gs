function send_mail() {
  
  // Sheet with email addresses
  var def_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('NAME');
  
  // number of email addresses
    var numMails = def_sheet.getRange('RC1').getValue()
  
  // get the list of emails
  var Mail = def_sheet.getRange(ROW,COL,numMails).getValues()
  var mail_addresses = Mail[0][0]
  
    if (numMails>1){
      for (var i = 1; i<numMails; ++i){
        mail_addresses+=','+Mail[i][0]
      }
    } 
  
  // Sheet with text to send
  var minor_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tab with table');
  
  // Trigger (if zero, no emails)
  var num_notifs = def_sheet.getRange('RC1').getValue()
  
  if (num_notifs>0) {
  
  // define table to send
  var table_to_send = minor_sheet.getRange("RC1 Range").getValues()
  
  // First row bold (here 6 columns)
  var bodyHTML = '<p><table  border="1" style="width:60%"><tr><td align="center"><b>'+ table_to_send[0][0]	+'</td><td align="center"><b>'+ table_to_send[0][1]+'	</td><td align="center"><b>'+table_to_send[0][2]+'</td><td align="center"><b>'+	table_to_send[0][3]+'</td><td align="center"><b>'+	table_to_send[0][4]+'</td><td align="center"><b>'+	table_to_send[0][5] +'</td></tr>';
  
  // Other rows same regular font - not bold
  
  var num_rows = 3
  for ( var i = 1; i <= num_rows-1; ++i ){
  
  // Assumed you send numbers)
    bodyHTML = bodyHTML+'<tr><td align="center"> '+Math.round(table_to_send[i][0])+' </td><td align="center"> '+Math.round(table_to_send[i][1])+'%'+' </td><td align="center"> '+table_to_send[i][2]+' </td><td align="center">'+ table_to_send[i][3]+' </td><td align="center"> '+table_to_send[i][4]+' </td><td align="center"> '+table_to_send[i][5]+' </td></tr>'
  }
    
 bodyHTML += '</table></p>';

// Sharable link to this file
  var link = "Sharable LINK"
  
  var bodyHTML0 = "TEXT OF MESSAGE. Detailed information you can find  <a href='" + link +"'>here.</a>You can access the file from your COMPANY account only."
  
  var subject = "TEST SUBJECT"
  
  MailApp.sendEmail({to:mail_addresses, subject:subject, htmlBody:bodyHTML0+bodyHTML});   
  
  
  }

}
