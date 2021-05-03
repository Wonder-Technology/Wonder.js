'use strict';


function setRoot($staropt$star, $staropt$star$1, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 100;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 200;
  window.innerWidth = width;
  window.innerHeight = height;
  return /* tuple */[
          width,
          height
        ];
}

exports.setRoot = setRoot;
/* No side effect */
