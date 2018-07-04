open Js.Promise;

let _loadBase64Image:
  (string, (. ImageType.image) => unit, (. 'exn) => unit) => unit = [%raw
  (base64Str, resolve, reject) => {|
        if (typeof window.loadImageBase64_wonder === "undefined") {
window.loadImageBase64_wonder = function(base64Str, resolve, reject){
                    var image = new Image();

                    image.src = base64Str;

                    image.onload = (function () {
                        return resolve(image);
                      });

                    image.onerror = (function (e) {
                      console.trace();
                              return reject(new Error("load base64Str image error. base64Str: " + base64Str));
                            });
};
        }

window.loadImageBase64_wonder(base64Str, resolve, reject)
  |}
];

let loadBase64Image = base64Str =>
  make((~resolve, ~reject) => _loadBase64Image(base64Str, resolve, reject))
  |> Most.fromPromise;

let _loadBlobImage:
  (string, string, (. ImageType.image) => unit, (. 'exn) => unit) => unit = [%raw
  (objectUrl, errorInfo, resolve, reject) => {|
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
  |}
];

let loadBlobImage = (objectUrl, errorInfo) =>
  make((~resolve, ~reject) =>
    _loadBlobImage(objectUrl, errorInfo, resolve, reject)
  )
  |> Most.fromPromise;