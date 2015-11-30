/// <reference path="../../filePath.d.ts"/>
module wd {
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
            morphTargets: Array<DYFileJsonFrameData>,
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

    export type DYFileJsonFrameData = {
        name:string,
        vertices:Array<number>,
        normals?:Array<number>
    }
    //export type DYFileData = {
    //    scene: wdCb.Hash<DYFileSceneData>,
    //    models: wdCb.Collection<GameObject>
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
        materials:wdCb.Hash<DYFileParseMaterialData>,
        objects: wdCb.Collection<DYFileParseObjectData>
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
        vertices: Array<number>,
        //morphTargets: Array<{
        //    name:string,
        //    vertices:Array<number>
        //}>,
        morphTargets: wdCb.Hash<wdCb.Collection<Array<number>>>,
        morphNormals:wdCb.Hash<wdCb.Collection<Array<number>>>,
        //"morphColors": [],
        colors?: Array<number>,
        uvs?: Array<number>,
        faces:Array<Face3>,

        //todo /*!for other geometry*/
        //[otherParam:string]:any

        parent:DYFileParseObjectData,
        children: wdCb.Collection<DYFileParseObjectData>
    }

    //export type DYFileParseMorphTargetsData = wdCb.Collection<{
    //    vertices: Array<number>,
    //    normals?: Array<number>
    //}>
    export type DYFileParseMorphTargetsData = wdCb.Collection<Array<number>>

    export type DYFileResult = {
        metadata:wdCb.Hash<DYFileMetadata>,
        scene:wdCb.Hash<{
            ambientColor:Color
        }>,
        models:wdCb.Collection<GameObject>
    }

    export type DYFileMetadata = {
        formatVersion:number,
        description?:string,
        sourceFile:string,
        generatedBy:string
    }
}
