import { isValueExist } from "../../utils/stateUtils";

export var isConfigDataExist = (configData: any) => {
    return isValueExist(configData);
}

