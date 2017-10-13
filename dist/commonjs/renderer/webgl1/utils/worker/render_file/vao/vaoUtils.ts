import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { removeVao } from "../../../../../utils/worker/render_file/vao/vaoUtils";
import { VaoMap, VboArrayMap } from "../../../../../type/dataType";

export const createVao = (extension: any) => {
    return extension.createVertexArrayOES();
}

export const bindVao = (extension: any, vao: WebGLVertexArrayObject) => {
    extension.bindVertexArrayOES(vao);
}

export const unbindVao = (extension: any) => {
    extension.bindVertexArrayOES(null);
}

export const disposeVao = (gl: any, extension: any, geometryIndex: number, vaoMap: VaoMap, vboArrayMap: VboArrayMap) => {
    extension.deleteVertexArrayOES(vaoMap[geometryIndex]);

    removeVao(gl, geometryIndex, vaoMap, vboArrayMap);
}
