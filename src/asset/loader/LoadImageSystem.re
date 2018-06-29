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
                              return reject(e);
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
  (string, (. ImageType.image) => unit, (. 'exn) => unit) => unit = [%raw
  (objectUrl, resolve, reject) => {|
        if (typeof window.loadImageBlob_wonder === "undefined") {
window.loadImageBlob_wonder = function(objectUrl, resolve, reject){
                    var image = new Image();

                    image.src = objectUrl;

                    image.onload = (function () {
                        return resolve(image);
                      });

                    image.onerror = (function (e) {
                              return reject(e);
                            });
};
        }

window.loadImageBlob_wonder(objectUrl, resolve, reject)
  |}
];

let loadBlobImage = objectUrl =>
  make((~resolve, ~reject) => _loadBlobImage(objectUrl, resolve, reject))
  |> Most.fromPromise;