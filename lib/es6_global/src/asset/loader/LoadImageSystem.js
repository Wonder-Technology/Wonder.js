

import * as Most from "most";

var _loadBlobImage = function (objectUrl,errorInfo,resolve,reject){
        if (typeof window.loadImageBlob_wonder === "undefined") {
window.loadImageBlob_wonder = function(objectUrl, errorInfo, resolve, reject){
                    var image = new Image();

                    image.src = objectUrl;

                    image.onload = (function () {
                        return resolve(image);
                      });

                    image.onerror = (function (e) {
                      console.trace();
                              return reject(new Error(errorInfo));
                            });
};
        }

window.loadImageBlob_wonder(objectUrl, errorInfo, resolve, reject)
  };

function loadBlobImage(objectUrl, errorInfo) {
  return Most.fromPromise(new Promise((function (resolve, reject) {
                    return _loadBlobImage(objectUrl, errorInfo, resolve, reject);
                  })));
}

export {
  _loadBlobImage ,
  loadBlobImage ,
  
}
/* most Not a pure module */
