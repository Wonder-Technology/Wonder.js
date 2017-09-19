export class MapManagerData {
    public static buffer: SharedArrayBuffer = null;

    public static textureIndices: Uint32Array = null;
    public static textureCounts: Uint8Array = null;

    public static materialTextureMap:MaterialTextureMap  = null;
}

export type MaterialTextureMap = {
    [materialIndex: number]: Array<number>
}
