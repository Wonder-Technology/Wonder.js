import { ensureFunc, it, requireCheckFunc } from "../../../../../../../definition/typescript/decorator/contract";
import { SendAttributeConfigMap } from "../../../../../../type/dataType";
import {
    IWebGL2SendUniformConfig, IWebGL2ShaderLibConfig,
    IWebGL2ShaderLibContentGenerator, IWebGL2UboConfig
} from "../../../../../../worker/webgl2/both_file/data/shaderLib_generator";
import { expect } from "wonder-expect.js";
import { forEach, hasDuplicateItems } from "../../../../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../../../../../utils/renderConfigUtils";
import { createMap } from "../../../../../../../utils/objectUtils";
import { initData as initDataUtils } from "../../../../../../utils/worker/render_file/shader/glslSender/glslSenderUtils";
import { Log } from "../../../../../../../utils/Log";
import { VaoConfigData, VaoConfigMap } from "../../../../../type/dataType";

export var addVaoConfig = requireCheckFunc((shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, vaoConfigMap: VaoConfigMap) => {
    it("vaoConfigMap[shaderIndex] should not be defined", () => {
        expect(vaoConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, vaoConfigMap: VaoConfigMap, {
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
                buffer,
                location
            }) => {
                switch (buffer) {
                    case "vertex":
                        _setVaoConfigData(vaoConfigData, "positionLocation", location);
                        _setVaoConfigData(vaoConfigData, "getVertices", getVertices);
                        break;
                    case "normal":
                        _setVaoConfigData(vaoConfigData, "normalLocation", location);
                        _setVaoConfigData(vaoConfigData, "getNormals", getNormals);
                        break;
                    case "texCoord":
                        _setVaoConfigData(vaoConfigData, "texCoordLocation", location);
                        _setVaoConfigData(vaoConfigData, "getTexCoords", getTexCoords);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_INVALID(`bufferName:${buffer}`));
                        break;
                }
            })
        }
    })

    _setVaoConfigData(vaoConfigData, "getIndices", getIndices);

    vaoConfigMap[shaderIndex] = vaoConfigData;
})

var _setVaoConfigData = requireCheckFunc((data:VaoConfigData, name:string, value:any) => {
    it("shouldn't exist duplicate data", () => {
        expect(data[name]).not.exist;
    });
}, (data:VaoConfigData, name:string, value:any) => {
    data[name] = value;
})


export var addSendUniformConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibConfig, GLSLSenderDataFromSystem: any) => {
    it("sendUniformConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibConfig, GLSLSenderDataFromSystem: any) => {
    it("sendUniformConfigMap[shaderIndex] should not be defined", () => {
        expect(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, GLSLSenderDataFromSystem: any) => {
    var sendUniformDataArr: Array<IWebGL2SendUniformConfig> = [],
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

export var initData = (GLSLSenderDataFromSystem: any) => {
    initDataUtils(GLSLSenderDataFromSystem);

    GLSLSenderDataFromSystem.uboBindingPoint = 0;
    GLSLSenderDataFromSystem.uboBindingPointMap = createMap();
    GLSLSenderDataFromSystem.oneUboDataList = [];
    GLSLSenderDataFromSystem.frameUboDataList = [];
    GLSLSenderDataFromSystem.gameObjectUboDataList = [];
    GLSLSenderDataFromSystem.lightUboDataList = [];

    GLSLSenderDataFromSystem.vaoConfigMap = createMap();
}

