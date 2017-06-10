import {
    addSendAttributeConfig as addSendAttributeConfigUtils, addSendUniformConfig as addSendUniformConfigUtils,
    getUniformData as getUniformDataUtils, initData as initDataUtils, sendBuffer as sendBufferUtils, sendFloat1 as sendFloat1Utils, sendMatrix4 as sendMatrix4Utils,
    sendVector3 as sendVector3Utils
} from "../../../utils/shader/glslSender/glslSenderUtils";

export var getUniformData = getUniformDataUtils;

export var sendBuffer = sendBufferUtils;

export var sendMatrix4 = sendMatrix4Utils;

export var sendVector3 = sendVector3Utils;

export var sendFloat1 = sendFloat1Utils;

export var addSendAttributeConfig = addSendAttributeConfigUtils;

export var addSendUniformConfig = addSendUniformConfigUtils;

export var initData = initDataUtils;
