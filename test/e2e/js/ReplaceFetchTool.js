var ReplaceFetchTool = (function () {
  return {
    replaceFetchForTest: function () {
      if (typeof window.readFileAsUtf8Sync !== "undefined") {
          // console.error(window.fetch);

        window.fetch = function (filePath) {
          // console.error(filePath);
        // throw new Error(filePath);


        //   return new Promise((resolve, reject) => {

        //           return window.readFileAsUtf8Sync("./test/e2e/asset/1.jpg").then(function (content) {
        // throw new Error(content);
        //             resolve(JSON.parse(content))
        //           });
        //         });




          return new Promise((resolve, reject) => {
            resolve({
              json: function () {
                return new Promise((resolve, reject) => {
                  return window.readFileAsUtf8Sync(filePath).then(function (content) {
                    resolve(JSON.parse(content))
                  });
                })
              }
            })
          })
        };
      }
    }
  }
})()