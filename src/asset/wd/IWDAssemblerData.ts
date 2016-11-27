module wd {
    export interface IWDParseDataAssembler{
        metadata:IWDMetadataAssembler;
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

    export interface IWDLightAssembler extends IWDComponentAssembler{
        type:string;
        color:Color;
        intensity?:number;
    }

    export interface IWDAmbientLightAssembler extends IWDLightAssembler{
    }

    export interface IWDDirectionLightAssembler extends IWDLightAssembler{
        //direction?
    }

    export interface IWDPointLightAssembler extends IWDLightAssembler{
        range?:number;
        constantAttenuation:number;
        linearAttenuation:number;
        quadraticAttenuation:number;
    }

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



    export interface IWDMetadataAssembler {
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






    export interface IWDResultAssembler{
        metadata:wdCb.Hash<IWDMetadataAssembler>;
        models:wdCb.Collection<GameObject>
    }
}

