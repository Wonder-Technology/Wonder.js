module wd {
    //todo change array format to "Array<xxx>"
    export interface IGLTFChildRootProperty {
        name?: string;
    }

    export interface IGLTFJsonData {
        asset: IGLTFAsset;
        accessors: {
            [id:string]: IGLTFAccessor
        };
        buffers: {
            [id:string]: IGLTFBuffer
        };
        bufferViews: {
            [id:string]: IGLTFBufferView
        };
        meshes: {
            [id:string]: IGLTFMesh
        };
        cameras?: Object;
        nodes: {
            [id:string]: IGLTFNode
        };
        images?: Object;
        textures?: Object;
        shaders: Object;
        programs: Object;
        samplers: Object;
        techniques: Object;
        materials: Object;
        animations: Object;
        skins: Object;
        scene: string;
        scenes: {
            [id:string]: IGLTFScene
        };
    }


    export interface IGLTFScene extends IGLTFChildRootProperty {
        nodes: Array<string>;
    }

    export interface IGLTFNode extends IGLTFChildRootProperty {
        children: Array<string>;
        camera?: string;
        skin?: string;
        jointName?: string;
        matrix?: Array<number>;
        mesh?: string;
        meshes?: Array<string>;
        rotation?: Array<number>;
        scale?: Array<number>;
        translation?: Array<number>;
    }

    export interface IGLTFAsset {
        version:string;

        genertor?:string;
        premultipliedAlpha?:boolean;
        profile?: {
            api :string;
            version:string
            extras:Object
        }
    }

    export interface IGLTFAccessor extends IGLTFChildRootProperty {
        bufferView: string;
        byteOffset: number;
        byteStride: number;
        count: number;
        type: string;
        componentType: number;

        max?: Array<number>;
        min?: Array<number>;
    }

    export interface IGLTFBufferView extends IGLTFChildRootProperty {
        buffer: string;
        byteOffset: number;
        byteLength: number;

        target?: number;
    }

    export interface IGLTFBuffer extends IGLTFChildRootProperty {
        uri: string;

        byteLength?: number;
        type?: string;
    }

    export interface IGLTFMeshPrimitive {
        attributes: Object;
        indices?: string;
        material: string;
        mode: number;
    }

    export interface IGLTFMesh extends IGLTFChildRootProperty {
        primitives: Array<IGLTFMeshPrimitive>;
    }









    export interface IGLTFParseData{
        metadata:DYFileMetadata,
        scene:{
            ambientColor?: Color
        },
        objects: wdCb.Collection<IGLTFObjectData>;
    }


    export interface IGLTFObjectData {
        name?:string,
        isContainer:boolean,

        components: wdCb.Collection<IGLTFComponent>;


        //parent:IGLTFParseData,
        children: wdCb.Collection<IGLTFObjectData>;

        //currentScene: Object;
    }


    export interface IGLTFComponent{
    }

    export interface IGLTFGeometry extends IGLTFComponent{
        material:IGLTFMaterial,

        vertices: Array<number>,
        colors?: Array<number>,
        texCoords?: Array<number>,
        faces:Array<Face3>,

        //todo add this
        drawMode:DrawMode;

        //morphTargets: wdCb.Hash<wdCb.Collection<Array<number>>>,
        //morphNormals:wdCb.Hash<wdCb.Collection<Array<number>>>,
    }

    export interface IGLTFMaterial{
        type:string;
    }

    //export interface IGLTFShaderMaterial extends IGLTFMaterial{
    //}

    export interface IGLTFLightPhongMaterial extends IGLTFMaterial{
        diffuseColor: Color,
        specularColor: Color,
        ///*!url is relative to this file*/
        //diffuseMapUrl: string,
        //specularMapUrl?: string,
        //normalMapUrl?: string,

        diffuseMap:Texture,
        specularMap:Texture,
        normalMap:Texture,

        shininess: number,
        opacity: number
    }

    //export interface IGLTFBasicMaterial extends IGLTFMaterial{
    //}



    export interface IGLTFMetadata {
        version:string;
        genertor?:string;
        premultipliedAlpha?:boolean;
        profile?: {
            api :string;
            version:string
            extras:Object
        }
    }






    export interface IGLTFResult{
        metadata:wdCb.Hash<IGLTFMetadata>;
        scene:{
            ambientColor?: Color
        },
        models:wdCb.Collection<GameObject>
    }
}
