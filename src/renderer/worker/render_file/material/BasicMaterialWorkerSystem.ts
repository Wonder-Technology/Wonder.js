// import { initMapManager } from "../texture/MapManagerWorkerSystem";
// import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
// import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
// import { MapManagerWorkerData } from "../texture/MapManagerWorkerData";
// import { TextureWorkerData } from "../texture/TextureWorkerData";
import { MaterialWorkerData } from "./MaterialWorkerData";
import { getClassName } from "../../../utils/worker/render_file/material/basicMaterialUtils";
import { initMaterial as initMaterialBase } from "./MaterialWorkerSystem";
import { Map } from "immutable";

export const initMaterialWithoutInitMap = (index: number, state: Map<any, any>) => {
    initMaterialBase(index, state, getClassName(), MaterialWorkerData);
}

// export const initMaterial = (index: number, state: Map<any, any>) => {
//     initMaterialBase(index, state, getClassName(), MapManagerWorkerData);
//
//     initMapManager(getGL(DeviceManagerWorkerData, state), index, MapManagerWorkerData, TextureWorkerData);
// }
