require('dotenv').config();

const sdk = require('dorita980');
const { exec } = require('child_process');

const USERNAME = process.argv[2];
const PASSWORD = process.argv[3];

function getIP() {
  return new Promise((resolve, reject) => {
    sdk.getRobotIP((err, ip) => {
      if (err) {
        reject(err);
      } else {
        resolve(ip);
      }
    });
  });
}

function getBLID(username, password) {
  return new Promise((resolve, reject) => {
    exec(`npx get-roomba-password-cloud ${username} ${password}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout.split(/=> | <=|\n/)[3]);
      }
    });
  });
}

function getPassword(username, password) {
  return new Promise((resolve, reject) => {
    exec(`npx get-roomba-password-cloud ${username} ${password}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout.split(/=> | <=|\n/)[5]);
      }
    });
  });
}

(async function main() {
  const ip = await getIP();
  const blid = await getBLID(USERNAME, PASSWORD);
  const password = await getPassword(USERNAME, PASSWORD);
  
  console.log(ip, blid, password);
  
  const roomba = new sdk.Local(blid, password, ip);

  roomba.on('connect', () => {
      
  });

  // roomba.on('close', data => {console.log('close'); console.log(data);});
  // roomba.on('offline', data => {console.log('close'); console.log(data);});
  // roomba.on('update', data => {
  //   roomba.find();
  // });
  // roomba.on('mission', console.log);
  // roomba.on('state', console.log);

})();
