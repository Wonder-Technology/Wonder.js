module wd {
    export interface IWDJsonData {
        asset: IWDAsset;
        scene: string;
        scenes: {
            [id:string]: IWDScene
        };
        nodes: {
            [id:string]: IWDNode
        };
        meshes: {
            [id:string]: IWDMesh
        };
        accessors: {
            [id:string]: IWDAccessor
        };
        buffers: {
            [id:string]: IWDBuffer
        };
        bufferViews: {
            [id:string]: IWDBufferView
        };
        cameras?: {
            [id:string]: IWDCamera
        };
        images?: {
            [id:string]: IWDImage
        };
        textures?: {
            [id:string]: IWDTexture
        };
        samplers: {
            [id:string]: IWDSampler
        };
        materials: {
            [id:string]: IWDMaterial
        };
        animations: {
            [id:string]: IWDAnimation
        };
        lights: {
            [id:string]: IWDLight
        }
    }

    export interface IWDChildRootProperty {
        name?: string;
    }

    export interface IWDScene extends IWDChildRootProperty {
        // ambientColor?:Array<number>;
        nodes: Array<string>;
    }



    export interface IWDNode extends IWDChildRootProperty {
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

    export interface IWDMesh extends IWDChildRootProperty {
        primitives: Array<IWDMeshPrimitive>;
    }

    export interface IWDMeshPrimitive {
        attributes: IWDAttribute;

        morphTargets?: Array<IWDMorphTarget>;

        indices?: string;
        material: string;
        mode: number;
    }

    export interface IWDMorphTarget {
        name:string;
        vertices:string;
        normals?:string;
    }

    export interface IWDAttribute {
        POSITION:string;
        NORMAL?:string;
        // todo support multi TexCoords
        TEXCOORD?:string;
        COLOR?:string;

        // JOINT?:string;
        // WEIGH?:string;
    }

    export interface IWDAccessor extends IWDChildRootProperty {
        bufferView: string;
        byteOffset: number;
        // byteStride: number;
        count: number;
        type: string;
        componentType: number;

        max?: Array<number>;
        min?: Array<number>;
    }

    export interface IWDBuffer extends IWDChildRootProperty {
        uri: string;

        byteLength: number;
        type: string;
    }

    export interface IWDBufferView extends IWDChildRootProperty {
        buffer: string;
        byteOffset: number;
        byteLength: number;

        target?: number;
    }

    export interface IWDCamera extends IWDChildRootProperty {
        type:"perspective"|"orthographic";
        perspective?:IWDCameraPerspective;
        orthographic?:IWDCameraOrthographic;
    }

    export interface IWDCameraOrthographic {
        xmag: number;
        ymag: number;
        zfar: number;
        znear: number;
    }

    export interface IWDCameraPerspective {
        aspectRatio?: number;
        yfov: number;
        zfar: number;
        znear: number;
    }

    export interface IWDImage extends IWDChildRootProperty {
        uri: string;
    }

    export interface IWDTexture extends IWDChildRootProperty {
        sampler: string;
        source: string;

        format?: number;
        internalFormat?: number;
        target?: number;
        type?: number;
    }

    export interface IWDSampler extends IWDChildRootProperty {
        magFilter?: number;
        minFilter?: number;
        wrapS?: number;
        wrapT?: number;

        //todo parse
        repeatRegion?: Array<number>;
    }

    export interface IWDMaterial extends IWDChildRootProperty {
        technique: string;


        doubleSided?:boolean;
        transparent?:boolean;
        transparency?:number;


        values?: IWDMaterialValue;
        // extensions?:Object;
    }

    // export interface IWDMaterialValue{
    //     diffuse?:Array<number>;
    //     specular?:Array<number>;
    //     emission?:Array<number>;
    //     shininess?:number;
    // }
    //
    export interface IWDMaterialValue{
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

    export interface IWDAnimation extends IWDChildRootProperty {
        channels?: IWDAnimationChannel[];
        parameters?: Object;
        samplers?: {
            [id:string]: IWDAnimationSampler
        };
    }

    export interface IWDAnimationSampler{
        input:string;
        interpolation:"LINEAR";
        output:string;
    }

    export interface IWDAnimationChannel {
        sampler: string;
        target: IWDAnimationChannelTarget;
    }

    export interface IWDAnimationChannelTarget {
        id: string;
        path: "translation"|"rotation"|"scale";
    }

    export interface IWDAsset {
        version:string;
        source:string;

        genertor?:string;
        premultipliedAlpha?:boolean;
        profile?: {
            api? :string;
            version?:string;
        };
    }

    export interface IWDLight{
        type:string;
        color:Array<number>;
        constantAttenuation?:number;
        linearAttenuation?:number;
        quadraticAttenuation?:number;
        distance?:number;
    }















    export interface IWDParseDataAssembler{
        // metadata:IWDMetadataAssembler;
        objects: wdCb.Collection<IWDObjectDataAssembler>;
    }


    export interface IWDObjectDataAssembler {
        name?:string;
        id:string;

        isContainer:boolean;

        components: wdCb.Collection<IWDComponentAssembler>;

        children: wdCb.Collection<IWDObjectDataAssembler>;
    }


    export interface IWDComponentAssembler{
    }

    export interface IWDArticulatedAnimationAssembler extends IWDComponentAssembler{
        [animName:string]: wdCb.Collection<IWDKeyFrameDataAssembler>
    }

    export interface IWDKeyFrameDataAssembler{
        time:number,
        //interpolationMethod:EKeyFrameInterpolation,

        targets:wdCb.Collection<IWDKeyFrameTargetDataAssembler>
    }

    export interface IWDKeyFrameTargetDataAssembler{
        interpolationMethod:EKeyFrameInterpolation,
        target:EArticulatedAnimationTarget,
        data:any
    }

    export interface IWDTransformAssembler extends IWDComponentAssembler{
        matrix?:Matrix4;
        position?:Vector3;
        scale?:Vector3;
        rotation?:Quaternion;
    }

    export interface IWDCameraAssembler extends IWDComponentAssembler{
        camera:Camera;
    }
    //
    // export interface IWDLightAssembler extends IWDComponentAssembler{
    //     type:string;
    //     lightColor:Color;
    // }
    //
    // export interface IWDAmbientLightAssembler extends IWDLightAssembler{
    // }
    //
    // export interface IWDDirectionLightAssembler extends IWDLightAssembler{
    //     //direction?
    // }
    //
    // export interface IWDPointLightAssembler extends IWDLightAssembler{
    //     constantAttenuation:number;
    //     linearAttenuation:number;
    //     quadraticAttenuation:number;
    //
    //     //todo need distance?
    //     distance?:number;
    // }

    export interface IWDGeometryAssembler extends IWDComponentAssembler{
        material:IWDMaterialAssembler;

        vertices: Array<number>;
        colors?: Array<number>;
        texCoords?: Array<number>;
        faces:Array<Face3>;

        morphVertices: wdCb.Hash<MorphTargetsData>;
        morphNormals:wdCb.Hash<MorphTargetsData>;

        drawMode:EDrawMode;
    }

    export interface IWDMaterialAssembler{
        type:string;

        doubleSided?:boolean;
    }


    // export interface IWDBasicMaterialAssembler extends IWDMaterialAssembler{
    // }

    export interface IWDLightMaterialAssembler extends IWDMaterialAssembler{
        transparent?:boolean;
        opacity?: number

        lightModel:ELightModel;

        //todo add ambient

        // ambientColor?: Color;
        diffuseColor?: Color;
        specularColor?: Color;
        emissionColor?:Color;

        //todo add lightMap
        lightMap?:ImageTexture;
        diffuseMap?:ImageTexture;
        specularMap?:ImageTexture;
        emissionMap?:ImageTexture;

        //todo support normalMap
        normalMap?:ImageTexture;

        shininess?: number;
    }



    // export interface IWDMetadataAssembler {
    //     version:string;
    //     genertor?:string;
    //     premultipliedAlpha?:boolean;
    //     profile?: {
    //         api :string;
    //         version:string
    //         extras:Object
    //     }
    // }






    export interface IWDResultAssembler{
        // metadata:wdCb.Hash<IWDMetadataAssembler>;
        models:wdCb.Collection<GameObject>
    }
}
