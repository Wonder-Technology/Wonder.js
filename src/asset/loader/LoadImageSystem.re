open Js.Promise;

let _loadImage = [%bs.raw
  {|
  function(base64Str, resolve, reject){
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
  }
  |}
];

let loadBase64Image = (base64Str) =>
  make(
    (~resolve, ~reject) =>
      /* let image = Image.newImage() |> Obj.magic;
         image##src#=base64Str;
         image##onload#=(() => [@bs] resolve(image));
         image##onerror#=((e) => [@bs] reject(e)) */
      _loadImage(
        base64Str,
        resolve,
        reject
      )
  )
  |> Most.fromPromise;