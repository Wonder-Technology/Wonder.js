import { MaterialTextureList } from "../type/dataType";

export class MapManagerData {
    public static buffer: SharedArrayBuffer = null;

    public static textureIndices: Uint32Array = null;
    public static textureCounts: Uint8Array = null;

    public static materialTextureList:MaterialTextureList  = null;
}
