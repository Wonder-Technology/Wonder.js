module wd {
    export type AccessorId = string;
    export type NodeId = string;
    export type MeshId = string;
    export type MaterialId = string;
    export type BufferId = string;
    export type SamplerId = string;
    export type ImageId = string;
    export type TextureId = string;
    export type CameraId = string;
    export type LightId = string;

    export type AnimationParameterId = string;
    export type AnimationSamplerId = string;

    export type SkinId = string;
    export type JointName = string;

    export interface IWDJsonDataParser {
        asset: IWDAssetParser;
        scene: string;
        scenes: {
            [id:string]: IWDSceneParser
        };
        nodes: {
            [id:string]: IWDNodeParser
        };
        meshes: {
            [id:string]: IWDMeshParser
        };
        accessors: {
            [id:string]: IWDAcccessorParser
        };
        buffers: {
            [id:string]: IWDBufferParser
        };
        bufferViews: {
            [id:string]: IWDBufferViewParser
        };
        cameras?: {
            [id:string]: IWDCameraParser
        };
        images?: {
            [id:string]: IWDImageParser
        };
        textures?: {
            [id:string]: IWDTextureParser
        };
        samplers: {
            [id:string]: IWDSamplerParser
        };
        materials: {
            [id:string]: IWDMaterialParser
        };
        animations: {
            [id:string]: IWDAnimationParser
        };
        lights: {
            [id:string]: IWDLightParser
        };
        skins: {
            [id:string]: IWDSkinParser
        }
    }

    export interface IWDChildRootPropertyParser {
        name?: string;
    }

    export interface IWDSceneParser extends IWDChildRootPropertyParser {
        nodes: Array<NodeId>;
    }



    export interface IWDNodeParser extends IWDChildRootPropertyParser {
        children: Array<string>;
        camera?: CameraId;

        skin?: SkinId;
        skeletons?:Array<NodeId>;
        jointName?: JointName;

        matrix?: Array<number>;
        mesh?: MeshId;
        // meshes?: Array<string>;
        rotation?: Array<number>;
        scale?: Array<number>;
        translation?: Array<number>;

        light?:LightId;

        // extensions?:Object;
    }

    export interface IWDMeshParser extends IWDChildRootPropertyParser {
        primitives: Array<IWDMeshPrimitiveParser>;
    }

    export interface IWDMeshPrimitiveParser {
        name?:string;

        attributes: IWDAttributeParser;

        morphTargets?: Array<IWDMorphTargetParser>;

        indices?: AccessorId;
        material: MaterialId;
        mode: number;
    }

    export interface IWDMorphTargetParser {
        name:string;
        vertices:AccessorId;
        normals?:AccessorId;
    }

    export interface IWDAttributeParser {
        POSITION:AccessorId;
        NORMAL?:AccessorId;
        // todo support multi TexCoords
        TEXCOORD?:AccessorId;
        COLOR?:AccessorId;

        JOINT?:AccessorId;
        WEIGH?:AccessorId;
    }

    export interface IWDAcccessorParser extends IWDChildRootPropertyParser {
        bufferView: string;
        byteOffset: number;
        // byteStride: number;
        count: number;
        type: "SCALAR"|"VEC2"|"VEC3"|"VEC4"|"MAT2"|"MAT3"|"MAT4";
        componentType: number;

        max?: Array<number>;
        min?: Array<number>;
    }

    export interface IWDBufferParser extends IWDChildRootPropertyParser {
        uri: string;

        byteLength: number;
        type: "arraybuffer"|"text";
    }

    export interface IWDBufferViewParser extends IWDChildRootPropertyParser {
        buffer: BufferId;
        byteOffset: number;
        byteLength: number;

        target?: number;
    }

    export interface IWDCameraParser extends IWDChildRootPropertyParser {
        type:"perspective"|"orthographic";
        perspective?:IWDCameraPerspectiveParser;
        orthographic?:IWDCameraOrthographicParser;
    }

    export interface IWDCameraOrthographicParser {
        xmag: number;
        ymag: number;
        zfar: number;
        znear: number;
    }

    export interface IWDCameraPerspectiveParser {
        aspectRatio?: number;
        yfov: number;
        zfar: number;
        znear: number;
    }

    export interface IWDImageParser extends IWDChildRootPropertyParser {
        uri: string;
    }

    export interface IWDTextureParser extends IWDChildRootPropertyParser {
        sampler: SamplerId;
        source: ImageId;

        format?: number;
        internalFormat?: number;
        target?: number;
        type?: number;
    }

    export interface IWDSamplerParser extends IWDChildRootPropertyParser {
        magFilter?: number;
        minFilter?: number;
        wrapS?: number;
        wrapT?: number;
        isPremultipliedAlpha?:boolean;

        repeatRegion?: Array<number>;
    }

    export interface IWDMaterialParser extends IWDChildRootPropertyParser {
        technique: "CONSTANT"|"BLINN"|"PHONG"|"LAMBERT";


        doubleSided?:boolean;
        transparent?:boolean;


        values?: IWDMaterialValueParser;
        // extensions?:Object;
    }

    export interface IWDMaterialValueParser{
        lightMap?:string;

        diffuse?:Array<number>|TextureId;
        specular?:Array<number>|TextureId;
        emission?:Array<number>|TextureId;
        shininess?:number;

        normalMap?:TextureId;

        transparency?:number;
    }

    export interface IWDAnimationParser extends IWDChildRootPropertyParser {
        channels?: IWDAnimationChannelParser[];
        parameters?: {
            [id:string]: AccessorId;
        };
        samplers?: {
            [id:string]: IWDAnimationSamplerParser
        };
    }

    export interface IWDAnimationSamplerParser{
        input:AnimationParameterId;
        interpolation:"LINEAR";
        output:AnimationParameterId;
    }

    export interface IWDAnimationChannelParser {
        sampler: AnimationSamplerId;
        target: IWDAnimationChannelTargetParser;
    }

    export interface IWDAnimationChannelTargetParser {
        id: NodeId;
        path: "translation"|"rotation"|"scale";
    }

    export interface IWDAssetParser {
        version:string;
        generator?:string;
        copyright?:string;

        // Specifies if the shaders were generated with premultiplied alpha.
        premultipliedAlpha?:boolean;
        profile?: {
            api? :string;
            version?:string;
        };
    }

    export interface IWDLightParser{
        type:"directional"|"point"|"spot"|"ambient";
        ambient?:{
            intensity?:number;
            color:Array<number>;
        };
        directional?:{
            intensity?:number;
            color:Array<number>;
        };
        point?:{
            intensity?:number;
            color:Array<number>;
            constantAttenuation?:number;
            linearAttenuation?:number;
            quadraticAttenuation?:number;
            range?:number;
        };
        //todo support spot light
        // spot?:{
        //     intensity?:number;
        //     color:Array<number>;
        //     range?:number;
        //     constantAttenuation?:number;
        //     linearAttenuation?:number;
        //     quadraticAttenuation?:number;
        //     range?:number;
        // };
    }

    export interface IWDSkinParser extends IWDChildRootPropertyParser{
        bindShapeMatrix?:Array<number>;
        inverseBindMatrices: AccessorId;
        jointNames:Array<JointName>;
    }
}

