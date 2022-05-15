const fs = require('fs');

let p = new Promise((resolve, reject) => {
    fs.readFile('test.txt', 'utf-8', (err, data) => {
    if(err){
        reject(err);
    }else{
        resolve(data);
    }
})

});
p.then(message => {console.log(message)}).catch(error => {console.log(error)})
