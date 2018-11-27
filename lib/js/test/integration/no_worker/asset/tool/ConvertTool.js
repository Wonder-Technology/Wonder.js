'use strict';


var buildFakeLoadImage = function (){
        window.loadImageBase64_wonder = function(base64Str, resolve, reject){
            resolve(base64Str)
        }

        window.loadImageBlob_wonder = function(objectUrl, errorInfo, resolve, reject){
            resolve(objectUrl)
        }

    };

function getJsonSerializedNone() {
  return null;
}

var setFakeTransformCount = function (count){
    window.wonder_transformCount_forTest = count;
    };

exports.buildFakeLoadImage = buildFakeLoadImage;
exports.getJsonSerializedNone = getJsonSerializedNone;
exports.setFakeTransformCount = setFakeTransformCount;
/* No side effect */
