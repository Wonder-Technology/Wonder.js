

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as BufferTextureService$Wonderjs from "../../../record/main/texture/BufferTextureService.js";
import * as TextureFilterService$Wonderjs from "../../../primitive/texture/TextureFilterService.js";
import * as OperateTypeArrayTextureService$Wonderjs from "../../../record/all/texture/OperateTypeArrayTextureService.js";

function _isPowerOfTwo(value) {
  if ((value & (value - 1 | 0)) === 0 && value !== 0) {
    return value !== 1;
  } else {
    return false;
  }
}

function _isSourcePowerOfTwo(width, height) {
  if (_isPowerOfTwo(width)) {
    return _isPowerOfTwo(height);
  } else {
    return false;
  }
}

function _filterFallback(filter, gl) {
  switch (filter) {
    case 0 : 
    case 2 : 
    case 4 : 
        return gl.NEAREST;
    case 1 : 
    case 3 : 
    case 5 : 
        return gl.LINEAR;
    
  }
}

function _setTextureParameters(gl, target, isSourcePowerOfTwo, param) {
  var minFilter = param[3];
  var magFilter = param[2];
  if (isSourcePowerOfTwo) {
    gl.texParameteri(target, gl.TEXTURE_WRAP_S, param[0]);
    gl.texParameteri(target, gl.TEXTURE_WRAP_T, param[1]);
    gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, TextureFilterService$Wonderjs.getGlFilter(gl, magFilter));
    gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, TextureFilterService$Wonderjs.getGlFilter(gl, minFilter));
    return /* () */0;
  } else {
    gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, _filterFallback(magFilter, gl));
    gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, _filterFallback(minFilter, gl));
    return /* () */0;
  }
}

function _isFilterMipmaps(filter) {
  return filter >= 2;
}

function update(param, param$1, param$2, param$3) {
  var wholeTarget = param$1[9];
  var minFilter = param$1[5];
  var magFilter = param$1[4];
  var gl = param[0];
  var isSourcePowerOfTwo = _isSourcePowerOfTwo(param$1[0], param$1[1]);
  Curry._3(param$3[1], gl, param$1[8], param$2[1]);
  gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
  _setTextureParameters(gl, wholeTarget, isSourcePowerOfTwo, /* tuple */[
        param$1[2],
        param$1[3],
        magFilter,
        minFilter
      ]);
  Curry._3(param$3[0], gl, /* tuple */[
        param$1[10],
        param$1[6],
        param$1[7]
      ], param[2]);
  var match = isSourcePowerOfTwo && (_isFilterMipmaps(magFilter) || _isFilterMipmaps(minFilter));
  if (match) {
    gl.generateMipmap(wholeTarget);
  }
  OperateTypeArrayTextureService$Wonderjs.setIsNeedUpdate(param[1], BufferTextureService$Wonderjs.getNotNeedUpdate(/* () */0), param$2[0]);
  return /* () */0;
}

export {
  _isPowerOfTwo ,
  _isSourcePowerOfTwo ,
  _filterFallback ,
  _setTextureParameters ,
  _isFilterMipmaps ,
  update ,
  
}
/* OperateTypeArrayTextureService-Wonderjs Not a pure module */
