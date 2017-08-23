import { ensureFunc, it, requireCheckFunc } from "../../../../../../../definition/typescript/decorator/contract";
import {
    AttributeLocationMap, SendAttributeConfigMap, VaoConfigData,
    VaoConfigMap
} from "../../../../../../type/dataType";
import {
    IWebGL1SendAttributeConfig, IWebGL1SendUniformConfig,
    IWebGL1ShaderLibContentGenerator
} from "../../../../../../worker/webgl1/both_file/data/shaderLib_generator";
import { expect } from "wonder-expect.js";
import { forEach, hasDuplicateItems } from "../../../../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../../../../../utils/renderConfigUtils";
import {
    initData as initDataUtils,
    setVaoConfigData
} from "../../../../../../utils/worker/render_file/shader/glslSender/glslSenderUtils";
import { createMap } from "../../../../../../../utils/objectUtils";
import { Log } from "../../../../../../../utils/Log";
import { getAttribLocation } from "../location/locationUtils";

export var addSendAttributeConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap[shaderIndex] should not be defined", () => {
        expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    var sendDataArr: Array<IWebGL1SendAttributeConfig> = [];

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
    })

    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}))

export var addSendUniformConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, GLSLSenderDataFromSystem: any) => {
    it("sendUniformConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, GLSLSenderDataFromSystem: any) => {
    it("sendUniformConfigMap[shaderIndex] should not be defined", () => {
        expect(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, GLSLSenderDataFromSystem: any) => {
    var sendUniformDataArr: Array<IWebGL1SendUniformConfig> = [],
        sendUniformFuncDataArr: Array<Function> = [];

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if (isConfigDataExist(sendData)) {
            if (isConfigDataExist(sendData.uniform)) {
                sendUniformDataArr = sendUniformDataArr.concat(sendData.uniform);
            }

            if (isConfigDataExist(sendData.uniformFunc)) {
                sendUniformFuncDataArr = sendUniformFuncDataArr.concat(sendData.uniformFunc);
            }
        }
    });

    GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex] = sendUniformDataArr;
    GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex] = sendUniformFuncDataArr;
}))

export var addVaoConfig = requireCheckFunc((gl:any, shaderIndex: number, program:WebGLProgram, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, attributeLocationMap:AttributeLocationMap, vaoConfigMap: VaoConfigMap) => {
    it("vaoConfigMap[shaderIndex] should not be defined", () => {
        expect(vaoConfigMap[shaderIndex]).not.exist;
    });
}, (gl:any, shaderIndex: number, program:WebGLProgram, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, attributeLocationMap:AttributeLocationMap, vaoConfigMap: VaoConfigMap, {
    getVertices,
    getNormals,
    getTexCoords,
    getIndices
}) => {
    var vaoConfigData: VaoConfigData = <any>{};

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            forEach(sendData.attribute, ({
                                             name,
                                             buffer
                                         }) => {
                var location = getAttribLocation(gl, program, name, attributeLocationMap);

                switch (buffer) {
                    case "vertex":
                        setVaoConfigData(vaoConfigData, "positionLocation", location);
                        setVaoConfigData(vaoConfigData, "getVertices", getVertices);
                        break;
                    case "normal":
                        setVaoConfigData(vaoConfigData, "normalLocation", location);
                        setVaoConfigData(vaoConfigData, "getNormals", getNormals);
                        break;
                    case "texCoord":
                        setVaoConfigData(vaoConfigData, "texCoordLocation", location);
                        setVaoConfigData(vaoConfigData, "getTexCoords", getTexCoords);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_INVALID(`bufferName:${buffer}`));
                        break;
                }
            })
        }
    })

    setVaoConfigData(vaoConfigData, "getIndices", getIndices);

    vaoConfigMap[shaderIndex] = vaoConfigData;
})

export var initData = (GLSLSenderDataFromSystem: any) => {
    initDataUtils(GLSLSenderDataFromSystem);

    GLSLSenderDataFromSystem.sendAttributeConfigMap = createMap();
    GLSLSenderDataFromSystem.attributeLocationMap = createMap();
}

