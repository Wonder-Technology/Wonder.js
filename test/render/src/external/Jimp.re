/* let getImageData = [%bs.raw
     {|
      function(imagePath) {
       return require("jimp").read(imagePath).then(function(image){
           return image.bitmap.data
       })
     }
       |}
   ]; */
open JimpType;

[@bs.module "jimp"] external read : string => Js.Promise.t('a) = "";

[@bs.module "jimp"] external distance : (jimpImage, jimpImage) => float = "";

[@bs.module "jimp"] external diff : (jimpImage, jimpImage, float) => diffResult = "";

/* [@bs.send.pipe : jimpImage] external write : (string, unit => unit) => unit = */
[@bs.send.pipe : jimpImage] external write : string => unit = "";
/* let getMatchImageData: (string, string) => Js.Promise.t(Js.Nullable.t(jimpImage)) = [%bs.raw */
/* let getMatchImageData: (string, string) => Js.Promise.t((Js.boolean, jimpImage)) = [%bs.raw
     {|
      function(imagePath1, imagePath2) {
          var jimp = require("jimp");



       jimp.read(imagePath1).then(function(image1){

       jimp.read(imagePath2).then(function(image2){
           var distance = jimp.distance(image1, image2);
           var diff = jimp.diff(image1, image2, 0.1);

           /* throw new Error(distance + diff.percent) */

           if(distance < 0.15 || diff.percenet < 0.15){
               /* return undefined; */
               return [true, diff.image];
           }
           else{
               return [false, diff.image];
           }

       }).catch(function(err){
           console.error(err)
       })

       }).catch(function(err){
           console.error(err)
       })
     }
       |}
   ]; */