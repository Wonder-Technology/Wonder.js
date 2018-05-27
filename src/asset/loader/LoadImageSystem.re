open Js.Promise;

let loadBase64Image = (base64Str) =>
  make(
    (~resolve, ~reject) => {
      let image = Image.newImage() |> Obj.magic;
      image##src#=base64Str;
      image##onload#=(() => [@bs] resolve(image));
      image##onerror#=((e) => [@bs] reject(e))
    }
  )
  |> Most.fromPromise;