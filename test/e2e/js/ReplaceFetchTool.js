var ReplaceFetchTool = (function () {
  function _toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);

    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }

  return {
    replaceFetchForTest: function () {
      if (typeof window.readFileAsUtf8Sync === "undefined") {
        return;
      }

      window.fetch = function (filePath) {
        return new Promise((resolve, reject) => {
          resolve({
            headers: {
              get: function (key) {
                switch (key) {
                  case "content-length":
                    return 0;
                  default:
                    throw new Error("unknown key: ", key);
                }
              }
            },
            json: function () {
              return new Promise((resolve, reject) => {
                return window.readFileAsUtf8Sync(filePath).then(function (content) {
                  resolve(JSON.parse(content))
                });
              })
            },
            arrayBuffer: function () {
              return new Promise((resolve, reject) => {
                return window.readFileAsBufferDataSync(filePath).then(function (bufferData) {
                  try {
                    resolve(_toArrayBuffer(bufferData.data))
                  } catch (e) {
                    reject(new Error("fetch arrayBuffer error"))
                  }
                });
              })
            },

            text: function () {
              return new Promise((resolve, reject) => {
                return window.readFileAsUtf8Sync(filePath).then(function (content) {
                  try {
                    resolve(content)
                  } catch (e) {
                    reject(new Error("fetch text error"))
                  }
                });
              })
            },
            blob: function () {
              return new Promise((resolve, reject) => {
                return window.readFileAsBufferDataSync(filePath).then(function (bufferData) {
                  try {
                    resolve(new Blob([_toArrayBuffer(bufferData.data)]))
                  } catch (e) {
                    reject(new Error("fetch blob error"))
                  }
                });
              })
            }
          })
        })
      };
    }
  }
})()