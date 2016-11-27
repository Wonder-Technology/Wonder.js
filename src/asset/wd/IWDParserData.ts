module wd {
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
        }
    }

    export interface IWDChildRootPropertyParser {
        name?: string;
    }

    export interface IWDSceneParser extends IWDChildRootPropertyParser {
        // ambientColor?:Array<number>;
        nodes: Array<string>;
    }



    export interface IWDNodeParser extends IWDChildRootPropertyParser {
        children: Array<string>;
        camera?: string;
        // skin?: string;
        // jointName?: string;
        matrix?: Array<number>;
        mesh?: string;
        // meshes?: Array<string>;
        rotation?: Array<number>;
        scale?: Array<number>;
        translation?: Array<number>;

        light?:string;

        // extensions?:Object;
    }

    export interface IWDMeshParser extends IWDChildRootPropertyParser {
        primitives: Array<IWDMeshPrimitiveParser>;
    }

    export interface IWDMeshPrimitiveParser {
        attributes: IWDAttributeParser;

        morphTargets?: Array<IWDMorphTargetParser>;

        indices?: string;
        material: string;
        mode: number;
    }

    export interface IWDMorphTargetParser {
        name:string;
        vertices:string;
        normals?:string;
    }

    export interface IWDAttributeParser {
        POSITION:string;
        NORMAL?:string;
        // todo support multi TexCoords
        TEXCOORD?:string;
        COLOR?:string;

        // JOINT?:string;
        // WEIGH?:string;
    }

    export interface IWDAcccessorParser extends IWDChildRootPropertyParser {
        bufferView: string;
        byteOffset: number;
        // byteStride: number;
        count: number;
        type: string;
        componentType: number;

        max?: Array<number>;
        min?: Array<number>;
    }

    export interface IWDBufferParser extends IWDChildRootPropertyParser {
        uri: string;

        byteLength: number;
        type: string;
    }

    export interface IWDBufferViewParser extends IWDChildRootPropertyParser {
        buffer: string;
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
        sampler: string;
        source: string;

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

        //todo parse
        repeatRegion?: Array<number>;
    }

    export interface IWDMaterialParser extends IWDChildRootPropertyParser {
        technique: "CONSTANT"|"BLINN"|"PHONG"|"LAMBERT";


        doubleSided?:boolean;
        transparent?:boolean;
        transparency?:number;


        values?: IWDMaterialValueParser;
        // extensions?:Object;
    }

    // export interface IWDMaterialValueParser{
    //     diffuse?:Array<number>;
    //     specular?:Array<number>;
    //     emission?:Array<number>;
    //     shininess?:number;
    // }
    //
    export interface IWDMaterialValueParser{
        // ambient?:{
        //     type:number;
        //     value:Array<number>|string;
        // };
        // diffuse?:{
        //     type:number;
        //     value:Array<number>|string;
        // };
        // specular?:{
        //     type:number;
        //     value:Array<number>|string;
        // };
        // normal?:{
        //     type:number;
        //     value:Array<number>|string;
        // };
        // emission?:{
        //     type:number;
        //     value:Array<number>|string;
        // };
        // shininess?:{
        //     type:number;
        //     value:Array<number>|string;
        // };

        //todo add it/light map
        lightMap?:string;

        diffuse?:Array<number>|string;
        specular?:Array<number>|string;
        emission?:Array<number>|string;
        shininess?:string;

        // reflective?:Array<number>|string;
        //todo consider normal map!
        normalMap?:string;
    }

    export interface IWDAnimationParser extends IWDChildRootPropertyParser {
        channels?: IWDAnimationChannelParser[];
        parameters?: Object;
        samplers?: {
            [id:string]: IWDAnimationSamplerParser
        };
    }

    export interface IWDAnimationSamplerParser{
        input:string;
        interpolation:"LINEAR";
        output:string;
    }

    export interface IWDAnimationChannelParser {
        sampler: string;
        target: IWDAnimationChannelTargetParser;
    }

    export interface IWDAnimationChannelTargetParser {
        id: string;
        path: "translation"|"rotation"|"scale";
    }

    export interface IWDAssetParser {
        version:string;
        source:string;

        genertor?:string;
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
}

