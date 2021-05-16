'use strict';


function buildFakeLoadImage (){
        window.loadImageBase64_wonder = function(base64Str, resolve, reject){
            resolve(base64Str)
        }

        window.loadImageBlob_wonder = function(objectUrl, errorInfo, resolve, reject){
            resolve(objectUrl)
        }

    };

function getJsonSerializedNone(param) {
  return null;
}

function setFakeTransformCount (count){
    window.wonder_transformCount_forTest = count;
    };

exports.buildFakeLoadImage = buildFakeLoadImage;
exports.getJsonSerializedNone = getJsonSerializedNone;
exports.setFakeTransformCount = setFakeTransformCount;
/* No side effect */
