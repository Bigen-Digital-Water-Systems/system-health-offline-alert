# System Health Offline Alert

## Overview

This script is designed to monitor the uptime of IoT devices and notify a set recipient via email if any devices go offline beyond a specified time threshold. It is particularly useful for maintaining awareness of the operational status of IoT devices deployed in various environments.

## Functionality

The script performs the following tasks:

- Device Uptime Monitoring: It checks the uptime of each device by comparing the current time with the timestamp of the last communication received from the device.
- Offline Device Detection: If a device is offline for a duration exceeding the specified threshold (plus a tolerance of 5 minutes), the script identifies it as offline.
- Email Notification: It generates an email notification listing the offline devices, their details, and the time of their last communication.
  Customizable Templates: The email notification template is customizable and can be adjusted according to specific requirements.

## Running the Script

1. Include the Script: Incorporate the provided code snippet into your Node.js project.
2. Define Device Information: Create an array of objects containing information about the IoT devices to be monitored. Each object should include the following properties:

   - DeviceId: Unique identifier for the device.
   - Name: Name or description of the device.
   - DateTime: Timestamp indicating the last communication from the device.
   - Lqi: Signal strength of the device (1 - 5).
   - Battery: Battery level of the device (1 - 5).
   - KeepAliveMinutes: Time interval in minutes after which a device is considered offline if no communication is received.

3. Invoke the Function: Call the checkDevicesUptime function, passing the array of device objects as an argument.
4. Handle Output: The function returns either an HTML-formatted email notification if any devices are offline, or null if all devices are online.
