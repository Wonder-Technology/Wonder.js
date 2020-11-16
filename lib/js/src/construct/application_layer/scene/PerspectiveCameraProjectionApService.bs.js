'use strict';

var FrustumPerspectiveCameraProjectionDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/perspective_camera_projection/FrustumPerspectiveCameraProjectionDoService.bs.js");
var PMatrixPerspectiveCameraProjectionDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/perspective_camera_projection/PMatrixPerspectiveCameraProjectionDoService.bs.js");

var getPMatrix = PMatrixPerspectiveCameraProjectionDoService$Wonderjs.getPMatrix;

var getFovy = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getFovy;

var getAspect = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getAspect;

var getNear = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getNear;

var getFar = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getFar;

exports.getPMatrix = getPMatrix;
exports.getFovy = getFovy;
exports.getAspect = getAspect;
exports.getNear = getNear;
exports.getFar = getFar;
/* No side effect */
