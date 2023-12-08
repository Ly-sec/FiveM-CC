const dialog = require('electron').ipcRenderer

const os = require('os');
const fs = require('fs');

document.addEventListener('DOMContentLoaded', function() {
    let ccClearBtn = document.getElementById('ccClear');

    ccClearBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const cacheArray = [];
        const dir = `C:\\Users\\${os.hostname}\\AppData\\Local\\FiveM\\FiveM.app\\data`
        cacheArray.push(
            `${dir}\\cache`,
            `${dir}\\server-cache`,
            `${dir}\\server-cache-priv`
        )
        
        if (fs.existsSync(dir)) {
            console.log(`Directory found! \nClearing FiveM cache now.`)
            for (let i of cacheArray) {
                fs.promises.rm(i, { maxRetries: 5, retryDelay: 2000, recursive: true, force: true })
              }
            console.log(`\nCleared your FiveM cache!`)
          } else {
            console.log('Directory not found, please make sure to install FiveM in your AppData Directory.')
          }

        var timeleft = 10;
        var clearTimer = setInterval(function(){
          if(timeleft <= 0){
            clearInterval(clearTimer);
            alert('Done')
          }
          document.getElementById("progressBar").value = 10 - timeleft;
          timeleft -= 1;
        }, 1000);
      }); 


});