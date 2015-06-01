var Bleacon = require('bleacon');
function calculateDistance(rssi) {
  console.log('calc rssi:' + rssi);
  var txPower = -59 //hard coded power value. Usually ranges between -59 to -65
  
  if (rssi == 0) {
    return -1.0; 
  }
 
  var ratio = rssi*1.0/txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  }
  else {
    var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;    
    return distance;
  }
}

console.log('hallo');
Bleacon.startAdvertising('e2c56db5dffb48d2b060d0f5a71096e0', 0, 0, -59);

Bleacon.on('discover', function(bleacon) {
  var bl = JSON.stringify(bleacon);
  console.log('bleacon found: ' + bl );
  console.log("distance: " + calculateDistance(bleacon.rssi));
  
  console.log('');
});

Bleacon.startScanning('appid', 0, 0);