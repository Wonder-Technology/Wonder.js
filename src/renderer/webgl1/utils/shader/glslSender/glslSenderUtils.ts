import { ensureFunc, it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { SendAttributeConfigMap } from "../../../../type/dataType";
import {
    IWebGL1SendAttributeConfig, IWebGL1SendUniformConfig,
    IWebGL1ShaderLibContentGenerator
} from "../../../../worker/webgl1/both_file/data/shaderLib_generator";
import { expect } from "wonder-expect.js";
import { forEach, hasDuplicateItems } from "../../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../../../utils/renderConfigUtils";

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

