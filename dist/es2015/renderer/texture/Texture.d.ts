import { ITexture } from "../interface/ITexture";
export declare class Texture implements ITexture {
    index: number;
}
export declare const createTexture: () => any;
export declare const initTexture: (texture: Texture) => void;
export declare const disposeTexture: Function;
export declare const getTextureSource: Function;
export declare const setTextureSource: Function;
export declare const getTextureWidth: Function;
export declare const setTextureWidth: Function;
export declare const getTextureHeight: Function;
export declare const setTextureHeight: Function;
export declare const getTextureIsNeedUpdate: Function;
export declare const setTextureIsNeedUpdate: Function;
