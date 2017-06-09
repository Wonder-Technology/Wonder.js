export class MaterialWorkerData{
    public static shaderIndices: Uint32Array = null;
}

export type MaterialInitWorkerData = {
    buffer: SharedArrayBuffer;
    materialCount:number;
}
