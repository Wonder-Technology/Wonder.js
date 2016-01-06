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
                /*!url is relative to this file*/
                diffuseMapUrl?: string,
                specularMapUrl?: string,
                normalMapUrl?: string,
                shininess?: number,
                opacity?: number
            }
        },
        objects:Array<DYFileJsonObjectData>
    }

    export type DYFileJsonObjectData = {
        //todo support multi materials
        material:string,
        name:string,

        /*!for model geometry*/
        vertices?: Array<number>,
        morphTargets: Array<DYFileJsonFrameData>,
        normals?: Array<number>,
        colors?: Array<number>,
        uvs?: Array<number>,
        verticeIndices?: Array<number>,
        normalIndices?: Array<number>,
        uvIndices?: Array<number>,
        children: Array<DYFileParseObjectData>

        //todo /*!for other geometry*/
        //[otherParam:string]:any
    }

    export type DYFileJsonFrameData = {
        name:string,
        vertices:Array<number>,
        normals?:Array<number>
    }

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
        /*!url is relative to this file*/
        diffuseMapUrl?: string,
        specularMapUrl?: string,
        normalMapUrl?: string,
        shininess?: number,
        opacity?: number
    }

    export type DYFileParseObjectData = {
        //todo now only support ModelGeometry, should support other geometry
        //geometryType:string,

        //todo support multi materials
        material:string,
        name:string,
        isContainer:boolean,

        /*!for model geometry*/
        vertices: Array<number>,
        morphTargets: wdCb.Hash<wdCb.Collection<Array<number>>>,
        morphNormals:wdCb.Hash<wdCb.Collection<Array<number>>>,
        colors?: Array<number>,
        uvs?: Array<number>,
        faces:Array<Face3>,

        //todo /*!for other geometry*/
        //[otherParam:string]:any

        parent:DYFileParseObjectData,
        children: wdCb.Collection<DYFileParseObjectData>
    }

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
