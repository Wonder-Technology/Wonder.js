module wd {
    export type WDFileJsonData = {
        metadata:WDFileMetadata,
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
        objects:Array<WDFileJsonObjectData>
    }

    export type WDFileJsonObjectData = {
        //todo support multi materials
        material:string,
        name:string,

        /*!for model geometry*/
        vertices?: Array<number>,
        morphTargets: Array<WDFileJsonFrameData>,
        normals?: Array<number>,
        colors?: Array<number>,
        uvs?: Array<number>,
        verticeIndices?: Array<number>,
        normalIndices?: Array<number>,
        uvIndices?: Array<number>,
        children: Array<WDFileParseObjectData>

        //todo /*!for other geometry*/
        //[otherParam:string]:any
    }

    export type WDFileJsonFrameData = {
        name:string,
        vertices:Array<number>,
        normals?:Array<number>
    }

    export type WDFileParseData = {
        metadata:WDFileMetadata,
        scene:{
            ambientColor?: Color
        },
        materials:wdCb.Hash<WDFileParseMaterialData>,
        objects: wdCb.Collection<WDFileParseObjectData>
    }

    export type WDFileParseMaterialData = {
        type: string,
        diffuseColor?: Color,
        specularColor?: Color,
        /*!url is relative to this file*/
        diffuseMapUrl?: string,
        specularMapUrl?: string,
        normalMapUrl?: string,

        diffuseMap?:Texture,
        specularMap?:Texture,
        normalMap?:Texture,

        shininess?: number,
        opacity?: number
    }

    export type WDFileParseObjectData = {
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

        parent:WDFileParseObjectData,
        children: wdCb.Collection<WDFileParseObjectData>
    }

    export type WDFileParseMorphTargetsData = wdCb.Collection<Array<number>>

    export type WDFileResult = {
        metadata:wdCb.Hash<WDFileMetadata>,
        scene:wdCb.Hash<{
            ambientColor:Color
        }>,
        models:wdCb.Collection<GameObject>
    }

    export type WDFileMetadata = {
        formatVersion:number,
        description?:string,
        sourceFile:string,
        generatedBy:string
    }
}
