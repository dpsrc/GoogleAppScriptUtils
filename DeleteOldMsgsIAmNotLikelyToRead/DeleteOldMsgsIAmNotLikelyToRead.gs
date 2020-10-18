function main() {
  var commonProhibitedLabelsToExclude = ' -label:Reg -label:Bills -label:Money -label:MoneyBTC -label:booking_shipment -label:Cars -label:Friends -label:Traveling -label:Support -label:Taccianka -label:Langs -label:Scans -label:Med -label:SubscrWebinars -label:Purchases_ebay -label:Insurance -label:edu -label:to-read';
  
  // Delete old emails from alerts@giftcardgranny.com
  deleteOldNonWanted('older_than:1d subject:"Your Daily Deal Digest" from:"alerts@giftcardgranny.com" label:DealsAndRewards -is:starred is:unread');
  
  // Delete old emails from Groupon
  deleteOldNonWanted('older_than:1d from:("noreply@r.groupon.com" OR "noreply@insight.groupon.com") (deals OR deal OR extra OR off OR "Groupon Experiences" OR spa OR beauty OR Get OR exclusive OR offer OR "To adjust how often you receive Groupon emails, including unsubscribing" OR "signed up to receive Groupon communications") label:DealsAndRewards -label:booking_shipment category:promotions -is:starred is:unread');
  
  // Delete old emails from raise.com newsletter
  deleteOldNonWanted('older_than:1d from:"newsletter@email.raise.com" label:DealsAndRewards category:promotions -is:starred is:unread');
  
  // Delete old emails from saveya.com newsletter
  deleteOldNonWanted('older_than:1d from:"postmaster@mail.saveya.com" label:DealsAndRewards category:promotions -is:starred is:unread');
  
  // Delete old emails from ebay search subscribtions
  deleteOldNonWanted('older_than:1d from:"ebay@ebay.com" "emails for this search" subject:NEW label:DealsAndRewards category:promotions -is:starred is:unread');
  
  // Delete old emails from AUTO.RIA на выходные - news@auto.ria.com
  deleteOldNonWanted('older_than:30d from:"news@auto.ria.com" "AUTO.RIA на выходные" -is:starred is:unread');  
  
  // Delete old emails from travelcheaters.com Flights to
  deleteOldNonWanted('older_than:7d from:"travelcheaters.com" subject:"Flights to" category:promotions -is:starred is:unread');  
  
  // Delete old emails from nextvacay.com
  deleteOldNonWanted('older_than:7d from:"nextvacay.com" subject:"next vacay" subject:(to from) -is:starred is:unread');  
  
  // Delete old emails from skiplagged SMS
  deleteOldNonWanted('older_than:2d from:"txt.voice.google.com" subject:"New text message from" "http://skipl.ag" -is:starred is:unread');  
  
  // Delete old emails from skiplagged.com
  deleteOldNonWanted('older_than:7d from:"alerts@skiplagged.com" subject:"Your tracked flight to" -is:starred is:unread');  
  
  // Delete old emails from king soopers
  deleteOldNonWanted('older_than:7d from:"KingSoopers@e.kingsoopersmail.com" category:promotions -is:starred is:unread');  
  
  // Delete old emails from Tecketmaster
  deleteOldNonWanted('older_than:20d from:"newsletter@email.ticketmaster.com" category:promotions -is:starred is:unread');  
  
  // Delete old emails from dining rewards network
  deleteOldNonWanted('older_than:30d from:dining from:"rewardsnetwork.com" "rewards network" -is:starred is:unread -label:Reg');  
  
  // Delete old emails from dining rewards meetup.com
  deleteOldNonWanted('older_than:10d from:"meetup.com" -is:starred is:unread -label:Reg');  
  
  // Delete old emails from kayak
  deleteOldNonWanted('older_than:15d from:"kayak.com" -is:starred is:unread -label:Reg');  
  
  // Delete old emails from Highlands Ranch HOA
  deleteOldNonWanted('older_than:50d from:hrcaonline  -is:starred is:unread -label:Reg -label:Bills -label:Money -label:MoneyBTC');  
  
  // Delete old emails from Social
  deleteOldNonWanted('older_than:30d category:social -is:starred is:unread ' + commonProhibitedLabelsToExclude);  
  
  // Delete old emails from Google alerts
  deleteOldNonWanted('older_than:20d from:"googlealerts-noreply@google.com" -is:starred is:unread -label:Reg');  
  
  // Delete old emails from Promotions
  deleteOldNonWanted('older_than:30d category:promotions -statement -statements -is:starred is:unread -label:dealsandrewards ' + commonProhibitedLabelsToExclude);  
  
  // Delete old emails from glassdoor.com
  deleteOldNonWanted('older_than:21d from:"glassdoor.com" jobs -is:starred is:unread -label:Reg');  
  
  // Delete old emails from Lana Cordier newsletter
  deleteOldNonWanted('older_than:30d (rezora OR "Having trouble viewing this email") from:"Lana Cordier" -is:starred is:unread -label:Reg');  
  
  // Delete old emails from Lake Como Naturally & cypresscoveresort newsletter
  deleteOldNonWanted('older_than:30d Newsletter from:("marketing@lakecomonaturally.com" OR "newsletter@cypresscoveresort.com") -is:starred is:unread -label:Reg');  
  
  // Delete the least important financial emails from banks
  deleteOldNonWanted('older_than:21d -is:starred is:unread -label:Reg from:(citi OR citibank OR "chase.com" OR 24273) subject:("Your account balance plus pending transactions exceeded" OR "New text message from CitiBank USA Alerts" OR "Your account balance exceeded" OR "Your Balance Has Reached Set Threshold Alert From Chase Card Services" OR "Your Online/Phone/Mail Charge Alert from Chase" OR "New text message from 24273")');  
  
  // Delete from fido7.ru@googlegroups
  deleteOldNonWanted('older_than:30d -is:starred is:unread -label:Reg from:("fido7.ru" AND googlegroups)');  
  
  // Delete old emails from Google Flights
  deleteOldNonWanted('older_than:2d -is:starred is:unread -label:Reg from:"Google Flights" subject:("tracked flight" OR "tracked flights")');  
  
  // Delete old emails from:"Highlands Ranch Community Association"
  deleteOldNonWanted('older_than:60d -is:starred is:unread -label:Reg from:"Highlands Ranch Community Association"');  

  // Delete old emails from credit.com
  deleteOldNonWanted('older_than:60d from:"credit.com" -is:starred is:unread -label:Reg -label:Money');
  
  // Delete old summariess of Google Scripts failures
  deleteOldNonWanted('older_than:30d from:"apps-scripts-notifications@google.com" subject:"Summary of failures" -is:starred is:unread');
  
  // Delete old redit notifications
  deleteOldNonWanted('older_than:14d from:"redditmail.com" -label:Reg -is:starred is:unread');
  


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
