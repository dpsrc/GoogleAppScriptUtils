
Visits all the unread and unstarred emails from the http://mypoints.com reward portal
and automatically clicks on all the links it finds.

When there the URL has moved (status 302), it tries to obtain the redirect URL and visit it.

In the case of success, the processed email message is deleted, otherwise the script keeps it
for the manual processing.

The log is emailed to the current Gmail user.

This can be invoked manually or can be scheduled using the https://script.google.com triggers interface.
