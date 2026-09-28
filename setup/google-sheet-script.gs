/* Paste this into Extensions → Apps Script in your Google Sheet.
   It saves every form on the website into its own tab:
   requests, newsletter, franchise. Free, no limits you'll hit. */

function doPost(e) {
  var p = e.parameter || {};
  if (p.website) return ContentService.createTextOutput("ok"); // spam trap
  var tab = { requests: "requests", newsletter: "newsletter", franchise: "franchise" }[p.form] || "other";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(tab) || ss.insertSheet(tab);
  var keys = Object.keys(p).filter(function (k) { return k !== "form" && k !== "page"; });

  if (sh.getLastRow() === 0) sh.appendRow(["time"].concat(keys));
  var headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  keys.forEach(function (k) {
    if (headers.indexOf(k) === -1) { headers.push(k); sh.getRange(1, headers.length).setValue(k); }
  });
  sh.appendRow(headers.map(function (h) { return h === "time" ? new Date() : (p[h] || ""); }));
  return ContentService.createTextOutput("ok");
}
