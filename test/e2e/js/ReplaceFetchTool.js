var ReplaceFetchTool = (function () {
  return {
    replaceFetchForTest: function () {
      if (typeof window.readFileAsUtf8Sync !== "undefined") {
        window.fetch = function (filePath) {
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