"use strict";
var GLTFMaterialUtils = (function () {
    function GLTFMaterialUtils() {
    }
    GLTFMaterialUtils.convertMaterials = function (resultJson) {
        if (resultJson.materials) {
            var materials = resultJson.materials;
            for (var name_1 in materials) {
                if (materials.hasOwnProperty(name_1)) {
                    var material = materials[name_1];
                    if (material.extensions
                        && material.extensions.KHR_materials_common) {
                        if (material.extensions.KHR_materials_common.values) {
                            this._convertMaterialValue(material.extensions.KHR_materials_common.values);
                        }
                        materials[name_1] = material.extensions.KHR_materials_common;
                        if (!!material.name) {
                            materials[name_1].name = material.name;
                        }
                    }
                }
            }
        }
    };
    GLTFMaterialUtils._convertMaterialValue = function (values) {
        for (var name_2 in values) {
            if (values.hasOwnProperty(name_2)) {
                var value = values[name_2];
                if (value.value !== void 0 && value.value !== null) {
                    values[name_2] = value.value;
                }
            }
        }
    };
    return GLTFMaterialUtils;
}());
exports.GLTFMaterialUtils = GLTFMaterialUtils;
