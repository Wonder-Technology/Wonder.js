import {
    getUniformLocation as getUniformLocationUtils, initData as initDataUtils, isUniformLocationNotExist as isUniformLocationNotExistUtils
} from "../../../../utils/worker/render_file/shader/location/locationUtils";

export var getUniformLocation = getUniformLocationUtils;

export var isUniformLocationNotExist = isUniformLocationNotExistUtils;

export var initData = initDataUtils;
