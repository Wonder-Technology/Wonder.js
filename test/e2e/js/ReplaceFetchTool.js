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
            }
          })
        })
      };
    }
  }
})()