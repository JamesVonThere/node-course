let dt = new Date();
console.log(`起床了 at ${dt.toISOString()}`);
let addTime=0;
let doWork = function (job, timer, cb) {
    timer += addTime;
    addTime = timer;
    console.log(addTime)
  setTimeout(() => {
    let dt = new Date();
    let result = `完成工作: ${job} at ${dt.toISOString()}`;
    cb(result);

  }, 
  timer
  );
  

  console.log(`在 setTimeout 之後 ${job}`);
};
let additionTimer = function(timer){
    timer += addTimer;
    addTimer = timer;
    return timer;
}
// 刷牙 (3000) -> 吃早餐 (5000) -> 寫功課 (3000)

doWork('刷牙', 3000, function (result) {
  console.log(result);
});

doWork('吃早餐', 5000, function (result) {
  console.log(result);
});

doWork('寫功課', 3000, function (result) {
  console.log(result);
});