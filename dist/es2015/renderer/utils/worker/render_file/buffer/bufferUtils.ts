import { isBufferExist } from "../../../buffer/bufferUtils";
import { deleteVal } from "../../../../../utils/arrayUtils";

export const disposeBuffer = (geometryIndex: number, buffers: Array<WebGLBuffer>, getGL: Function, DeviceManagerDataFromSystem: any) => {
    var gl = getGL(DeviceManagerDataFromSystem, null),
        buffer = buffers[geometryIndex];

    if (isBufferExist(buffer)) {
        gl.deleteBuffer(buffers[geometryIndex]);

        /*!
         no need to consider the memory problem caused by not-used val in buffers, because geometry index will be repeat(geometry memory will be reallocated)
         */
        deleteVal(geometryIndex, buffers);
    }
}
