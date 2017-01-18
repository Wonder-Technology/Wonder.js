import wdFrp = require("wonder-frp");
import wdCb = require("wonder-commonlib");

import ExtendUtils = require("../../../ts/ExtendUtils")

var json = require("relaxed-json");


import contract = require("../../../ts/definition/typescript/decorator/contract");
import chai = require("chai");
import {GLTFAnimationUtils} from "./GLTFAnimationUtils";
import {GLTFLightUtils} from "./GLTFLightUtils";
import {GLTFMaterialUtils} from "./GLTFMaterialUtils";

var describe = contract.describe,
    it = contract.it,
    requireInNodejs = contract.requireInNodejs,
    requireGetter = contract.requireGetter,
    requireSetter = contract.requireSetter,
    requireGetterAndSetter = contract.requireGetterAndSetter,
    ensure = contract.ensure,
    ensureGetter = contract.ensureGetter,
    ensureSetter = contract.ensureSetter,
    ensureGetterAndSetter = contract.ensureGetterAndSetter,
    invariant = contract.invariant;

var expect = chai.expect;

/**
 * convert .gltf file to .wd file
 *
 * this .gltf file should use KHR_materials_common extension
 */
export class GLTFToWD {
    public static create(version: string) {
        var obj = null;

        obj = new this(version);

        return obj;
    }

    constructor(version: string) {
        this.version = version;
    }

    public name: string = "WonderJsGLTFToWDConverter";
    public version: string = null;

    @ensure(function (stream: wdFrp.Stream) {
        it("should return stream", () => {
            expect(stream).instanceOf(wdFrp.Stream);
        });
    })
    public convert(fileBuffer: Buffer, filePath: string): wdFrp.Stream {
        var resultJson: any = {},
            fileContent = fileBuffer.toString();

        //todo convert base64 data(or .wd file support base64 data?)

        resultJson = ExtendUtils.extendDeep(json.parse(fileContent));

        this._convertAssets(resultJson);
        this._convertCameras(resultJson);

        GLTFLightUtils.convertLights(resultJson);

        GLTFMaterialUtils.convertMaterials(resultJson);

        this._convertPrimitives(resultJson);
        this._convertNodes(resultJson);

        /*!
        refer to https://github.com/KhronosGroup/glTF/issues/298
         */
        if (GLTFAnimationUtils.isJointAnimationSeparate(resultJson)) {
            GLTFAnimationUtils.combineAllJointAnimationDataToBeOneAnimation(resultJson);
        }

        this._clean(resultJson);

        return wdFrp.just([resultJson]);
    }

    private _convertAssets(resultJson: any) {
        if (resultJson.asset) {
            let asset = resultJson.asset;

            asset.generator = this.name;
            asset.version = this.version;
        }
    }

    private _convertCameras(resultJson: any) {
        if (resultJson.cameras) {
            for (let name in resultJson.cameras) {
                if (resultJson.cameras.hasOwnProperty(name)) {
                    let camera = resultJson.cameras[name];

                    if (camera.perspective) {
                        if (camera.perspective.aspect_ratio) {
                            camera.perspective.aspectRatio = camera.perspective.aspect_ratio;

                            delete camera.perspective.aspect_ratio;
                        }
                    }
                }
            }
        }
    }

    private _convertPrimitives(resultJson: any) {
        if (resultJson.meshes) {
            let meshes = resultJson.meshes;

            for (let name in meshes) {
                if (meshes.hasOwnProperty(name)) {
                    let mesh = meshes[name];

                    if (mesh.primitives) {
                        for (let primitive of mesh.primitives) {
                            if (primitive.attributes) {
                                this._removePrimitiveAttributeKeyIndex(primitive.attributes);
                            }
                        }
                    }
                }
            }
        }
    }

    private _convertNodes(resultJson: any) {
        if (resultJson.nodes) {
            let nodes = resultJson.nodes;

            for (let name in nodes) {
                if (nodes.hasOwnProperty(name)) {
                    let node = nodes[name];

                    this._convertToSingleMesh(node);
                }
            }
        }
    }

    @requireInNodejs(function (node: any) {
        it("not support multi meshes", () => {
            if (node.meshes) {
                expect(node.meshes.length).equals(1);
            }
        });
    })
    private _convertToSingleMesh(node: any) {
        if (node.meshes) {
            node.mesh = node.meshes[0];

            delete node.meshes;
        }
    }

    @requireInNodejs(function (attributes: any) {
        it("not support multi attribute datas(e.g. TEXCOORD_1)", () => {
            for (let name in attributes) {
                if (attributes.hasOwnProperty(name)) {
                    expect(/\w+_[1-9]+\d*/.test(name)).false;
                }
            }
        }, this);
    })
    private _removePrimitiveAttributeKeyIndex(attributes: any) {
        for (let name in attributes) {
            if (attributes.hasOwnProperty(name)) {
                let result = name.match(/(\w+)_0+/)

                if (result !== null) {
                    attributes[result[1]] = attributes[name];

                    delete attributes[name];
                }
            }
        }
    }

    private _clean(resultJson: any) {
        delete resultJson.extensions;
    }
}
