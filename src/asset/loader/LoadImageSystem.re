open Js.Promise;

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