import { ensureFunc, it, requireCheckFunc } from "../../../../../../../definition/typescript/decorator/contract";
import { SendAttributeConfigMap } from "../../../../../../type/dataType";
import {
    IWebGL2SendAttributeConfig, IWebGL2SendUniformConfig, IWebGL2ShaderLibConfig,
    IWebGL2ShaderLibContentGenerator, IWebGL2UboConfig
} from "../../../../../../worker/webgl2/both_file/data/shaderLib_generator";
import { expect } from "wonder-expect.js";
import { forEach, hasDuplicateItems } from "../../../../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../../../../../utils/renderConfigUtils";
import { bindUniformBlock } from "../../ubo/uboUtils";
import { createMap, isValidMapValue } from "../../../../../../../utils/objectUtils";
import { initData as initDataUtils } from "../../../../../../utils/worker/render_file/shader/glslSender/glslSenderUtils";
import { Log } from "../../../../../../../utils/Log";

export var addSendAttributeConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibConfig, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibConfig, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap[shaderIndex] should not be defined", () => {
        expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    var sendDataArr: Array<IWebGL2SendAttributeConfig> = [];

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
    })

    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}))

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
}

