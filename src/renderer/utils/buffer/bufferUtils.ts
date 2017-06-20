import { isValidMapValue } from "../../../utils/objectUtils";
import { deleteVal } from "../../../utils/arrayUtils";
import { disposeBuffer as disposeArrayBuffer } from "../../worker/render_file/buffer/ArrayBufferWorkerSystem";
import { disposeBuffer as disposeIndexBuffer } from "../../worker/render_file/buffer/IndexBufferWorkerSystem";

export var isBufferExist = (buffer: WebGLBuffer) => isValidMapValue(buffer);

export var disposeBuffer = (geometryIndex: number, buffers: Array<WebGLBuffer>, getGL: Function, DeviceManagerDataFromSystem: any) => {
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
