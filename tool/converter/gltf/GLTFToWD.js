"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var wdFrp = require("wdfrp");
var ExtendUtils = require("../../ts/ExtendUtils");
var json = require("relaxed-json");
var contract = require("../../ts/definition/typescript/decorator/contract");
var chai = require("chai");
var GLTFAnimationUtils_1 = require("./GLTFAnimationUtils");
var GLTFLightUtils_1 = require("./GLTFLightUtils");
var GLTFMaterialUtils_1 = require("./GLTFMaterialUtils");
var describe = contract.describe, it = contract.it, requireInNodejs = contract.requireInNodejs, requireGetter = contract.requireGetter, requireSetter = contract.requireSetter, requireGetterAndSetter = contract.requireGetterAndSetter, ensure = contract.ensure, ensureGetter = contract.ensureGetter, ensureSetter = contract.ensureSetter, ensureGetterAndSetter = contract.ensureGetterAndSetter, invariant = contract.invariant;
var expect = chai.expect;
var GLTFTowd = (function () {
    function GLTFTowd(version) {
        this.name = "wdJsGLTFToWDConverter";
        this.version = null;
        this.version = version;
    }
    GLTFTowd.create = function (version) {
        var obj = null;
        obj = new this(version);
        return obj;
    };
    GLTFTowd.prototype.convert = function (fileBuffer, filePath) {
        var resultJson = {}, fileContent = fileBuffer.toString();
        resultJson = ExtendUtils.extendDeep(json.parse(fileContent));
        this._convertAssets(resultJson);
        this._convertCameras(resultJson);
        GLTFLightUtils_1.GLTFLightUtils.convertLights(resultJson);
        GLTFMaterialUtils_1.GLTFMaterialUtils.convertMaterials(resultJson);
        this._convertPrimitives(resultJson);
        this._convertNodes(resultJson);
        if (GLTFAnimationUtils_1.GLTFAnimationUtils.isJointAnimationSeparate(resultJson)) {
            GLTFAnimationUtils_1.GLTFAnimationUtils.combineAllJointAnimationDataToBeOneAnimation(resultJson);
        }
        this._clean(resultJson);
        return wdFrp.just([resultJson]);
    };
    GLTFTowd.prototype._convertAssets = function (resultJson) {
        if (resultJson.asset) {
            var asset = resultJson.asset;
            asset.generator = this.name;
            asset.version = this.version;
        }
    };
    GLTFTowd.prototype._convertCameras = function (resultJson) {
        if (resultJson.cameras) {
            for (var name_1 in resultJson.cameras) {
                if (resultJson.cameras.hasOwnProperty(name_1)) {
                    var camera = resultJson.cameras[name_1];
                    if (camera.perspective) {
                        if (camera.perspective.aspect_ratio) {
                            camera.perspective.aspectRatio = camera.perspective.aspect_ratio;
                            delete camera.perspective.aspect_ratio;
                        }
                    }
                }
            }
        }
    };
    GLTFTowd.prototype._convertPrimitives = function (resultJson) {
        if (resultJson.meshes) {
            var meshes = resultJson.meshes;
            for (var name_2 in meshes) {
                if (meshes.hasOwnProperty(name_2)) {
                    var mesh = meshes[name_2];
                    if (mesh.primitives) {
                        for (var _i = 0, _a = mesh.primitives; _i < _a.length; _i++) {
                            var primitive = _a[_i];
                            if (primitive.attributes) {
                                this._removePrimitiveAttributeKeyIndex(primitive.attributes);
                            }
                        }
                    }
                }
            }
        }
    };
    GLTFTowd.prototype._convertNodes = function (resultJson) {
        if (resultJson.nodes) {
            var nodes = resultJson.nodes;
            for (var name_3 in nodes) {
                if (nodes.hasOwnProperty(name_3)) {
                    var node = nodes[name_3];
                    this._convertToSingleMesh(node);
                }
            }
        }
    };
    GLTFTowd.prototype._convertToSingleMesh = function (node) {
        if (node.meshes) {
            node.mesh = node.meshes[0];
            delete node.meshes;
        }
    };
    GLTFTowd.prototype._removePrimitiveAttributeKeyIndex = function (attributes) {
        for (var name_4 in attributes) {
            if (attributes.hasOwnProperty(name_4)) {
                var result = name_4.match(/(\w+)_0+/);
                if (result !== null) {
                    attributes[result[1]] = attributes[name_4];
                    delete attributes[name_4];
                }
            }
        }
    };
    GLTFTowd.prototype._clean = function (resultJson) {
        delete resultJson.extensions;
    };
    return GLTFTowd;
}());
exports.GLTFTowd = GLTFTowd;
__decorate([
    ensure(function (stream) {
        it("should return stream", function () {
            expect(stream).instanceOf(wdFrp.Stream);
        });
    })
], GLTFTowd.prototype, "convert", null);
__decorate([
    requireInNodejs(function (node) {
        it("not support multi meshes", function () {
            if (node.meshes) {
                expect(node.meshes.length).equals(1);
            }
        });
    })
], GLTFTowd.prototype, "_convertToSingleMesh", null);
__decorate([
    requireInNodejs(function (attributes) {
        it("not support multi attribute datas(e.g. TEXCOORD_1)", function () {
            for (var name_5 in attributes) {
                if (attributes.hasOwnProperty(name_5)) {
                    expect(/\w+_[1-9]+\d*/.test(name_5)).false;
                }
            }
        }, this);
    })
], GLTFTowd.prototype, "_removePrimitiveAttributeKeyIndex", null);
