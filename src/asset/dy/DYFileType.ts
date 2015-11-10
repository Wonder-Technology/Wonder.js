/// <reference path="../../definitions.d.ts"/>
module dy {
    export type DYFileJsonData = {
        metadata:DYFileMetadata,
        scene:{
            ambientColor?:Array<number>
        },
        materials:{
            [name:string]:{
                type: string,
                diffuseColor?: Array<number>,
                specularColor?: Array<number>,
                //illumination?: number,
                //url is related to this file
                diffuseMapUrl?: string,
                specularMapUrl?: string,
                normalMapUrl?: string,
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
        objects:Array<DYFileJsonObjectData>
    }

    export type DYFileJsonObjectData = {
            //position: Array<number>,
            //rotation: Array<number>,
            //scale: Array<number>,
            //visible: boolean,


            //geometryType:string,
            //todo support multi materials
            material:string,
            //todo
            //smoothShading?: boolean,

        name:string,


            /*!for model geometry*/
            vertices?: Array<number>,
            morphTargets: Array<{
                name:string,
                vertices:Array<number>,
                normals?:Array<number>
            }>,
            //"morphColors": [],
            normals?: Array<number>,
            colors?: Array<number>,
            //"uvs": [[]],
            uvs?: Array<number>,
            //"faces": []
        verticeIndices?: Array<number>,
        normalIndices?: Array<number>,
        uvIndices?: Array<number>,

        //todo /*!for other geometry*/
        //[otherParam:string]:any


            children: Array<DYFileParseObjectData>
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
        metadata:DYFileMetadata,
        scene:{
            ambientColor?: Color
        },
        materials:dyCb.Hash<DYFileParseMaterialData>,
        objects: dyCb.Collection<DYFileParseObjectData>
    }

    export type DYFileParseMaterialData = {
        type: string,
        diffuseColor?: Color,
        specularColor?: Color,
        //illumination?: number,
        //url is related to this file
        diffuseMapUrl?: string,
        specularMapUrl?: string,
        normalMapUrl?: string,
        shininess?: number,
        opacity?: number
    }

    export type DYFileParseObjectData = {
        //position: Array<number>,
        //rotation: Array<number>,
        //scale: Array<number>,
        //visible: boolean,
        //todo now only support ModelGeometry, should support other geometry
        //geometryType:string,


        //todo support multi materials
        material:string,
        //todo
        //smoothShading?: boolean,

        name:string,

        isContainer:boolean,


        /*!for model geometry*/
        vertices: dyCb.Collection<number>,
        morphTargets: Array<{
            name:string,
            vertices:dyCb.Collection<number>,
            normals:dyCb.Collection<number>
        }>,
        //"morphColors": [],
        normals: dyCb.Collection<number>,
        colors?: dyCb.Collection<number>,
        //"uvs": [[]],
        uvs?: dyCb.Collection<number>,
        //"faces": []
        indices?: dyCb.Collection<number>,

        //todo /*!for other geometry*/
        //[otherParam:string]:any

        parent:DYFileParseObjectData,
        children: dyCb.Collection<DYFileParseObjectData>
    }

    export type DYFileResult = {
        metadata:dyCb.Hash<DYFileMetadata>,
        scene:dyCb.Hash<{
            ambientColor:Color
        }>,
        models:dyCb.Collection<GameObject>
    }

    export type DYFileMetadata = {
        formatVersion:number,
        description?:string,
        sourceFile:string,
        generatedBy:string
    }
}
