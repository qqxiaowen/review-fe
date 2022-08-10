/*
 * @Author: xiaoWen
 * @Date: 2022-02-11 11:31:10
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-02-11 11:31:11
 */
var resolveAfter2Seconds = function() {
  console.log("starting slow promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
};

var resolveAfter1Second = function() {
  console.log("starting fast promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
};

var sequentialStart = async function() {
  console.log('==SEQUENTIAL START==');

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds();
  console.log(slow); // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second();
  console.log(fast); // 3. this runs 3 seconds after 1.
}

var concurrentStart = async function() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second(); // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow); // 2. this runs 2 seconds after 1.
  console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

var concurrentPromise = function() {
  console.log('==CONCURRENT START with Promise.all==');
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
    console.log(messages[0]); // slow
    console.log(messages[1]); // fast
  });
}

var parallel = async function() {
  console.log('==PARALLEL with await Promise.all==');

  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
      (async()=>console.log(await resolveAfter2Seconds()))(),
      (async()=>console.log(await resolveAfter1Second()))()
  ]);
}

// This function does not handle errors. See warning below!
var parallelPromise = function() {
  console.log('==PARALLEL with Promise.then==');
  resolveAfter2Seconds().then((message)=>console.log(message));
  resolveAfter1Second().then((message)=>console.log(message));
}

// sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"
// Promise.then内代码（整个微任务）要全部执行完毕，才执行返回结果；await会阻塞下面的代码。共花费2+1秒

// wait above to finish
// setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"
// 整个Promise内的代码都是同步代码，里面的定时器直接同时进定时器队列里，等待执行。定时器共花费2秒，程序花费4+2秒

// wait again
// setTimeout(concurrentPromise, 7000); // same as concurrentStart

// wait again
setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"
// Promise.all内的代码同时执行，各自的await互不影响

// wait again
setTimeout(parallelPromise, 13000); // same as parallel
// Promise.then不会阻塞代码