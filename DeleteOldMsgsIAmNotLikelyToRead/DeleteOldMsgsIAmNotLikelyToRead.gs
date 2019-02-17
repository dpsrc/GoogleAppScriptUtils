function main() {
  // Delete old emails from alerts@giftcardgranny.com
  deleteOldNonWanted('older_than:1d subject:"Your Daily Deal Digest" from:"alerts@giftcardgranny.com" label:DealsAndRewards -is:starred is:unread');
  
  // Delete old emails from Groupon
  deleteOldNonWanted('older_than:1d from:"noreply@r.groupon.com" (deals OR deal OR extra OR off OR "Groupon Experiences" OR spa OR beauty OR Get OR exclusive OR offer OR "To adjust how often you receive Groupon emails, including unsubscribing" OR "signed up to receive Groupon communications") label:DealsAndRewards -label:booking_shipment category:promotions -is:starred is:unread');
  
  // Delete old emails from raise.com newsletter
  deleteOldNonWanted('older_than:1d from:"newsletter@email.raise.com" label:DealsAndRewards category:promotions -is:starred is:unread');
  
  // Delete old emails from saveya.com newsletter
  deleteOldNonWanted('older_than:1d from:"postmaster@mail.saveya.com" label:DealsAndRewards category:promotions -is:starred is:unread');
  
  // Delete old emails from ebay search subscribtions
  deleteOldNonWanted('older_than:1d from:"ebay@ebay.com" "Turn off emails for this search" subject:NEW label:DealsAndRewards category:promotions -is:starred is:unread');
  
  // Delete old emails from AUTO.RIA на выходные - news@auto.ria.com
  deleteOldNonWanted('older_than:30d from:"news@auto.ria.com" "AUTO.RIA на выходные" -is:starred is:unread');  
  
  
  var logEmailTo = Session.getActiveUser().getEmail();
  var logEmailSubjectBase = "DeleteOldMsgsIAmNotLikelyToRead execution log";
  var logEmailSubject = logEmailSubjectBase;
  
  // Deleting old log messsages
  var logThreads = GmailApp.search('older_than:10d subject:"' + logEmailSubjectBase + '" from:"' + logEmailTo + '" to:"' + logEmailTo + '"');
  logThreads.forEach(function(logThread) {
    var logEmlMessages = logThread.getMessages();
    
    logEmlMessages.forEach(function(logEmlMessage) {
       Logger.log("Deleting old log message: " + logEmlMessage.getDate() + ", from:" + logEmlMessage.getFrom() + ", to:" + logEmlMessage.getTo() + ", subject:" + logEmlMessage.getSubject());
       logEmlMessage.moveToTrash();
    })
  })
  
  GmailApp.sendEmail(logEmailTo, logEmailSubject, Logger.getLog())
}

function deleteOldNonWanted(searchCondition) {
  Logger.log("\n=======  " + searchCondition + "  ===\n");

  //var alertEmailTo = Session.getActiveUser().getEmail();
  var alertThreads = GmailApp.search(searchCondition);
  
  alertThreads.forEach(function(alertThread) {
    var alertEmlMessages = alertThread.getMessages();
    
    alertEmlMessages.forEach(function(alertEmlMessage) {
       Logger.log("Deleting old unwanted message: " + alertEmlMessage.getDate() + ", from:" + alertEmlMessage.getFrom() + ", to:" + alertEmlMessage.getTo() + ",\n\tsubject:" + alertEmlMessage.getSubject());
       alertEmlMessage.moveToTrash();
    })
  })
}
