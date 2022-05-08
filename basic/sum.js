let sum = (n) => (n + 1) * (n / 2);
console.log(sum(100));
console.log(sum(3));




function sum2(n){
const array = [];
let num = n;
for(let i = 1; i < num; i++){
    array.push(i);
}
const sum = array.reduce((previousValue, currentValue) => previousValue + currentValue,
n
);
return sum;
}


console.log(sum2(100));
console.log(sum2(3));


let sum3 = (n) => {
    let sum = 0;
    for(let i = 1; i < n; i++){
        sum += i;
    }
    return sum;
}