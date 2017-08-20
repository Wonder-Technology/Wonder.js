import {
    use as useUtils
} from "../../../utils/worker/render_file/shader/shaderUtils";
import { createMap } from "../../../../utils/objectUtils";

export var use = useUtils;

//todo refactor: move to utils
export var initData = (ShaderWorkerData: any) => {
    ShaderWorkerData.index = 0;
    ShaderWorkerData.count = 0;

    ShaderWorkerData.shaderIndexByMaterialIndexAndShaderNameMap = createMap();
}
