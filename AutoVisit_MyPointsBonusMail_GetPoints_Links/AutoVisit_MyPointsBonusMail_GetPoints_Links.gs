function main() {
  // Main part
  
  var label = GmailApp.getUserLabelByName("DealsAndRewards");
  var threads = label.getThreads();
  
  var i_allEmails = 0;
  var i_successfullyProcessedEmails = 0;
  var options = {muteHttpExceptions: true};
 
  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    
    messages.forEach(function(message) {
      ++i_allEmails;
      var status;
      //var statusBody;
      var fetchResult;
      var contentText;
      var subject;
    
      var from = message.getFrom();
      if (!from)
         from = "";
      
      Logger.log("");
      Logger.log("=========== Checking email # " + i_allEmails + ": " + message.getDate() + "\n\tFrom:\t\t" + from + "\n\tSubject:\t" + message.getSubject());
      subject = message.getSubject(); // just for the debug purpose
          
      from = from.match(/[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([A-Za-z]{1,6}\.)?[A-Za-z]{2,6}/g)[0]; // email address
      
      if (from != "BonusMailReply@mypoints.com")
        Logger.log("Skipping email from " + from + " != BonusMailReply@mypoints.com");
      else if (message.isStarred())
        Logger.log("Skipping starred email");
      else if (message.isInInbox())
        Logger.log("Skipping non-archived email");
      else if (!message.isUnread())
        Logger.log("Skipping read email");
      else if (message.isInTrash())
        Logger.log("Skipping deleted email");
      else {
        var rawContent = message.getRawContent();
        // Remove line ends so that URL broken into lines could be found
        rawContent = rawContent.replace(/(=\r\n|=\n|=\r)/gm, ""); // replace('\r\n', '').replace('\n\r', '').replace('\n', '');
        // Replace =3D with = so that URL broken into pieces with =3D could be found
        rawContent = rawContent.replace(/(=3D)/gm, "=");
        
        var matchedUrls = rawContent.match(/(https?:\/\/api.mypoints.com\/\?cmd=oh-offer-click[^">]+)/m);
        
//        if (!matchedUrls) {
           // Debug   rawContent = "<!-- Client Creative Start --><a href=\"http[s?]://api.mypoints.com/?cmd=oh-offer-click&placementID=572=75&hash=b42GRwL3V9kgcGMcMRtv6KyI3YlacYzNtLCgELjR&taskID=1005846&redirec=tlink=&directLink=https%3A%2F%2Fwww.mypoints.com%2Fgames%3Fgid%3D229\"><=img src=\"http://www.sbx-media.com/pimages/d8/d8314007-65d2-4703-ac4c-978a=9bb83c08.jpg\" width=\"600\" height=\"450\" style=\"display:block;\" border==\"0\"></a><!-- Client Creative End -->";
//           matchedUrls = rawContent.match(/(https?:\/\/api.mypoints.com\/\?cmd=3Doh-offer-click&.+)/m);
//        }
           
        if (matchedUrls) {
          var getPointsUrl = matchedUrls[0];
        
          if (getPointsUrl) {
              Logger.log("getPointsUrl = " + getPointsUrl);
              try {
                 fetchResult = UrlFetchApp.fetch(getPointsUrl, options);
                 status = fetchResult.getResponseCode();
                 //statusBody = fetchResult.getResponseBody();
                 if (status == 200)
                   Logger.log("Status=" + status);
                 else {
                   contentText = fetchResult.getContentText();
                   Logger.log("Status=" + status + ": " + contentText);
                 }
                 
                 if (status == 302) {
                    matchedUrls = contentText.match(/has moved <a href="(http.*)">here/m); // http://www.regextester.com/
                    if (matchedUrls) {
                      getPointsUrl = matchedUrls[1];
                      Logger.log("Redirect 'has moved' URL = " + getPointsUrl);
                    }
                    else
                      Logger.log("Unable to match Redirect 'has moved' URL");
                    
                    if (matchedUrls && getPointsUrl) {
                       Logger.log("Trying redirect URL getPointsUrl = " + getPointsUrl);
                       fetchResult = UrlFetchApp.fetch(getPointsUrl, options);
                       status = fetchResult.getResponseCode();
                       contentText = fetchResult.getContentText();
                       if (status == 200)
                         Logger.log("Status=" + status);
                       else {
                         contentText = fetchResult.getContentText();
                         Logger.log("Status=" + status + ": " + contentText);
                       }
                    }
                 }
              }
              catch (e)
              {
                 Logger.log("Error opening Url " + getPointsUrl + " - 1st attempt: [" + e + "][" + contentText + "]");
                 status = -1;
              }

              if (status == -1)
                 try {
                    fetchResult = UrlFetchApp.fetch(getPointsUrl, options);
                    status = fetchResult.getResponseCode();
                    Logger.log("Status=" + status + ":" + fetchResult.getContentText());
                 }
                 catch (e)
                 {
                    Logger.log("Error opening Url " + getPointsUrl + " 2nd attempt: [" + e + "]");
                 }
                
              Logger.log("Final Status=" + status);
              
              if (status == 200) {
                 message.moveToTrash();
                 ++i_successfullyProcessedEmails;
                 Logger.log("Email message deleted");
              }
          }
          else
             Logger.log("Unable to obtain " + getPointsUrl);
        }
        else
           Logger.log("Unable to match Get Points Urls");
      }
    });
  }); // messages.forEach(function(message)
  
  Logger.log("");
  Logger.log("==============================================================");
  Logger.log("Total checked emails i_allEmails = " + i_allEmails);
  Logger.log("i_successfullyProcessedEmails = " + i_successfullyProcessedEmails + "\n\n");
  
  var logEmailTo = Session.getActiveUser().getEmail();
  var logEmailSubjectBase = "AutoVisit_MyPointsBonusMail_GetPoints_Links execution log";
  var logEmailSubject = logEmailSubjectBase + ": " + i_successfullyProcessedEmails + "/" + i_allEmails;
  
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
