const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
let p = new Promise((resolve, reject) => {
    if(err){
        reject(err);
    }else{
        resolve(data);
    }
})

  p.then(message => {console.log(message)}).catch(error => {console.log(error)})
});
