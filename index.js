// Node modules
const fs = require("fs");
const moment = require("moment");

/*
    Description: This script will send an email to a set recipient and notifies the recipient an IOT device is offline after a set time specified for the device.

    Variables: 
    devices: array of objects
    {
        DeviceId: String,
        Name: String,
        DateTime: date,
        Lqi: int, (1 - 5)
        Battery int, (1 - 5)
        KeepAliveMinutes: int
    }
*/

function checkDevicesUptime(devices) {
  let bulk = [];

  // Loop through all loggers aand check which devices are offline
  for (let device of devices) {
    // Push to array
    let diffMinutes = moment.duration(moment().diff(moment(device.DateTime))).asMinutes();
    if (diffMinutes >= parseInt(device.KeepAliveMinutes) && diffMinutes <= parseInt(device.KeepAliveMinutes) + 5) {
      bulk.push({
        DeviceId: device.LoggerId,
        Name: device.Name,
        LastMessage: moment(device.DateTime).format("YYYY-MM-DD HH:mm"),
        DiffMinutes: moment.duration(moment().diff(moment(device.DateTime))).asMinutes(),
        SignalStrength: device.SignalStrength,
        Battery: device.Battery,
      });
    }
  }

  // If any devices are offline, then we return an email
  if (bulk.length > 0) {
    let html = `<ul>`;
    bulk.forEach((device) => {
      html += `<li>${device.Name} (${device.DeviceId})<br>Last Message: ${moment(device.DateTime)
        .add(2, "h")
        .format("YYYY-MM-DD HH:mm")}<br>Battery: ${device.Battery}<br>Signal: ${device.Lqi}</li>`;
    });
    html += `</ul>`;

    // Populate email template
    var emailHtml = fs.readFileSync(process.cwd() + "/templates/device-offline.html").toString();
    emailHtml = emailHtml.replaceAll("{{0}}", html);

    // Send email
    return emailHtml;
  } else {
    return null;
  }
}

module.exports = checkDevicesUptime;
