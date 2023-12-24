export const allSettled = function (promiseList: any[]) {
  let results = new Array(promiseList.length);

  return new Promise((ok, rej) => {
    let fillAndCheck = function (i: any) {
      return function (ret: any) {
        results[i] = ret;
        for (let j = 0; j < results.length; j++) {
          if (results[j] == null) return;
        }
        ok(results);
      };
    };

    for (let i = 0; i < promiseList.length; i++) {
      promiseList[i].then(fillAndCheck(i), fillAndCheck(i));
    }
  });
};
