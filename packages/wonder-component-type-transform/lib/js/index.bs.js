'use strict';


var componentName = "Transform";

var dataName = {
  parent: 0,
  children: 1,
  localPosition: 2,
  localRotation: 3,
  localScale: 4,
  position: 5,
  rotation: 6,
  scale: 7,
  localEulerAngles: 8,
  eulerAngles: 9,
  normalMatrix: 10,
  localToWorldMatrix: 11,
  dirty: 12,
  update: 13
};

exports.componentName = componentName;
exports.dataName = dataName;
/* No side effect */
