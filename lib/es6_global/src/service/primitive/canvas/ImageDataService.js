

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Canvas$Wonderjs from "../../../external/Canvas.js";
import * as DomService$Wonderjs from "../DomService.js";

function getImageData(source, width, height) {
  var canvas = DomService$Wonderjs.buildCanvas();
  var ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  return Curry._5(Canvas$Wonderjs.getImageData, 0, 0, width, height, Curry._4(Canvas$Wonderjs.drawImage, source, 0, 0, ctx));
}

function getArrayBuffer(imageData) {
  return imageData.data.buffer;
}

function convertImageToImageData(image) {
  var width = image.width;
  var height = image.height;
  var imageData = getImageData(image, width, height);
  return /* tuple */[
          imageData.data.buffer,
          width,
          height
        ];
}

export {
  getImageData ,
  getArrayBuffer ,
  convertImageToImageData ,
  
}
/* Canvas-Wonderjs Not a pure module */
