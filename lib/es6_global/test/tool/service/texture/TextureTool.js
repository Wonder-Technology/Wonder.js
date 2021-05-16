


function getNearest(param) {
  return /* Nearest */0;
}

function getNearestMipmapNearest(param) {
  return /* Nearest_mipmap_nearest */2;
}

function getLinear(param) {
  return /* Linear */1;
}

function getNearestMipmapLinear(param) {
  return /* Nearest_mipmap_linear */4;
}

function getLinearMipmapNearest(param) {
  return /* Linear_mipmap_nearest */3;
}

function getLinearMipmapLinear(param) {
  return /* Linear_mipmap_linear */5;
}

function buildSource($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 4;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
  return {
          width: width,
          height: height
        };
}

export {
  getNearest ,
  getNearestMipmapNearest ,
  getLinear ,
  getNearestMipmapLinear ,
  getLinearMipmapNearest ,
  getLinearMipmapLinear ,
  buildSource ,
  
}
/* No side effect */
