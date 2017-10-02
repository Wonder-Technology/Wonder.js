export interface IWDSourceData {
    metadata:IWDSourceMetadata;

    accessors: Array<IWDSourceAcccessor>;

    // buffers: Array<IWDSourceBuffer>;
    buffer: IWDSourceBuffer;

    bufferViews: Array<IWDSourceBufferView>;

    textures?: Array<IWDSourceTexture>;

    // samplers?: Array<IWDSourceSampler>;

    images?: Array<IWDSourceImage>;




    gameObjectCount: number;

    componentTypes: Array<IWDSourceComponentType>;

    parentIndices: AccessorIndex;
}

export interface IWDSourceComponentType {
    type: ComponentType;
    count: number;
    gameObjectIndices: AccessorIndex;
    data: IWDSourceComponentData
}

export interface IWDSourceComponentData{
}

export interface IWDSourceThreeDTransformData extends IWDSourceComponentData{
    localPositions?:AccessorIndex;
    // localRotations?:AccessorIndex;
    // localScales?:AccessorIndex;
}

//todo add more component data

export interface IWDSourceChildRootProperty {
    // name?: string;
}

export interface IWDSourceAcccessor extends IWDSourceChildRootProperty {
    bufferView: BufferViewIndex;
    byteOffset: number;
    // byteStride: number;
    count: number;
    type: "SCALAR"|"VEC2"|"VEC3"|"VEC4"|"MAT2"|"MAT3"|"MAT4";
    componentType: number;

    max?: Array<number>;
    min?: Array<number>;
}

export interface IWDSourceBuffer extends IWDSourceChildRootProperty {
    uri: string;

    byteLength: number;
    // type: "arraybuffer"|"text";
    type: "arraybuffer";
}

export interface IWDSourceBufferView extends IWDSourceChildRootProperty {
    buffer: BufferIndex;
    byteOffset: number;
    byteLength: number;

    target?: number;
}

export interface IWDSourceTexture extends IWDSourceChildRootProperty {
    // count:number;

    paramData:BufferViewIndex;
    source: ImageIndex;
    //
    //
    // sampler: SamplerIndex;
    // source: ImageIndex;
    //
    // format?: AccessorIndex;
    // internalFormat?: AccessorIndex;
    // target?: AccessorIndex;
    // type?: AccessorIndex;
    //
    // flipY
}

// export interface IWDSourceSampler extends IWDSourceChildRootProperty {
//     magFilter?: AccessorIndex;
//     minFilter?: AccessorIndex;
//     wrapS?: AccessorIndex;
//     wrapT?: AccessorIndex;
//
//     // isPremultipliedAlpha?:boolean;
//
//     // repeatRegion?: Array<number>;
// }

export interface IWDSourceImage extends IWDSourceChildRootProperty {
    // uri: string;

    //todo why not use AccessorIndex?
    bufferView:BufferViewIndex;
    //todo support jpg?
    mimeType:"image/png";
}

export interface IWDSourceMetadata {
    version:string;
    generator?:string;
    copyright?:string;

    // Specifies if the shaders were generated with premultiplied alpha.
    // premultipliedAlpha?:boolean;

    profile?: {
        api? :string;
        version?:string;
    };
}

export type AccessorIndex = number;
// export type NodeIndex = number;
// export type MeshIndex = number;
// export type MaterialIndex = number;
export type BufferViewIndex = number;
export type BufferIndex = number;
// export type SamplerIndex = number;
export type ImageIndex = number;
// export type TextureIndex = number;
// export type CameraIndex = number;
// export type LightIndex = number;
export type ComponentType = "ThreeDTransform"
    | "BasicMaterial" | "LightMaterial"
    | "CameraController";

