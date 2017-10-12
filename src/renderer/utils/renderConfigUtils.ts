import { isValueExist } from "../../utils/stateUtils";

export const isConfigDataExist = (configData: any) => {
    return isValueExist(configData);
}

