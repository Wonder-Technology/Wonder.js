/// <reference path="../../definitions.d.ts"/>
module dy {
    export type DYFileJsonData = {
        metadata:{
            formatVersion:number,
            description?:string,
            sourceFile:string,
            generatedBy:string
            //verticeCount: number,
            //faceCount: number,
            //normalCount: number,
            //colorCount: number,
            //uvCount: number,
            //materialCount: number,
            //morphTargetCount: number
        },
        scene:{
            ambientColor?:Array<number>
        },
        materials:{
            [name:string]:{
                type: string,
                diffuseColor?: Array<number>,
                specularColor?: Array<number>,
                illumination?: number,
                //url is related to this file
                diffuseMap?: string,
                specularMap?: string,
                normalMap?: string,
                shininess?: number,
                opacity?: number
            }
        },
        //geometrys:{
        //    [name:string]:{
        //        type:string,
        //        //todo support multi materials
        //        material:string,
        //        //todo
        //        //smoothShading?: boolean,
        //
        //
        //        /*!for model geometry*/
        //        vertices: Array<number>,
        //        morphTargets?: Array<{
        //            name:string,
        //            vertices:Array<number>,
        //            normals?:Array<number>
        //        }>,
        //        //"morphColors": [],
        //        normals?: Array<number>,
        //        colors?: Array<number>,
        //        //"uvs": [[]],
        //        uvs?: Array<number>,
        //        //"faces": []
        //        indices: Array<number>,
        //
        //        /*!for other geometry*/
        //        [otherParam:string]:any
        //    }
        //},
        //textures:{
        //    [name:string]:{
        //        //url is related to this file
        //        url:string
        //    }
        //}
        objects:{
            [name: string]: DYFileJsonObjectData
        }
    }

    export type DYFileJsonObjectData = {
            //position: Array<number>,
            //rotation: Array<number>,
            //scale: Array<number>,
            //visible: boolean,


            geometryType:string,
            //todo support multi materials
            material:string,
            //todo
            //smoothShading?: boolean,


            /*!for model geometry*/
            vertices: Array<number>,
            morphTargets: Array<{
                name:string,
                vertices:Array<number>,
                normals?:Array<number>
            }>,
            //"morphColors": [],
            normals: Array<number>,
            colors: Array<number>,
            //"uvs": [[]],
            uvs?: Array<number>,
            //"faces": []
            indices?: Array<number>,

            /*!for other geometry*/
            [otherParam:string]:any


            children: {
                [name: string]: DYFileParseObjectData
            }
    }
    //export type DYFileData = {
    //    scene: dyCb.Hash<DYFileSceneData>,
    //    models: dyCb.Collection<GameObject>
    //}
    //
    //export type DYFileSceneData = {
    //    ambientColor: Color
    //}

    export type DYFileParseData = {
        metadata:{
            formatVersion:number,
            description?:string,
            sourceFile:string,
            generatedBy:string
        },
        scene:{
            ambientColor?: Color
        },
        materials:{
            [name:string]:{
                type: string,
                diffuseColor?: Color,
                specularColor?: Color,
                illumination?: number,
                //url is related to this file
                diffuseMap?: string,
                specularMap?: string,
                normalMap?: string,
                shininess?: number,
                opacity?: number
            }
        },
        objects:{
            [name: string]: DYFileParseObjectData
        }
    }

    export type DYFileParseObjectData = {
        //position: Array<number>,
        //rotation: Array<number>,
        //scale: Array<number>,
        //visible: boolean,
        geometryType:string,


        type:string,
        //todo support multi materials
        material:string,
        //todo
        //smoothShading?: boolean,


        /*!for model geometry*/
        vertices: dyCb.Collection<number>,
        morphTargets: Array<{
            name:string,
            vertices:dyCb.Collection<number>,
            normals:dyCb.Collection<number>
        }>,
        //"morphColors": [],
        normals: dyCb.Collection<number>,
        colors: dyCb.Collection<number>,
        //"uvs": [[]],
        uvs: dyCb.Collection<number>,
        //"faces": []
        indices: dyCb.Collection<number>,

        /*!for other geometry*/
        [otherParam:string]:any

        parent:DYFileParseObjectData,
        children:{
            [name: string]: DYFileParseObjectData
        }
    }
}
