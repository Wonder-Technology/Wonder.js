/// <reference path="../../definitions.d.ts"/>
module dy {
    export class DYLoader extends Loader {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _dyParser:DYParser = DYParser.create();


        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        @In(function (...args) {
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):dyRt.Stream {
            var url = args[0],
                self = this;

            return AjaxLoader.load(url, "json")
                .map((json:DYFileJsonData) => {
                    return self._dyParser.parse(json);
                });
        }
    }

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
                diffuseMapName?: string,
                specularMapName?: string,
                normalMapName?: string,
                shininess?: number,
                opacity?: number
            }
        },
        geometrys:{
            [name:string]:{
                type:string,
                //todo support multi materials
                material:string,
                //todo
                //smoothShading?: boolean,


                /*!for model geometry*/
                vertices?: Array<number>,
                morphTargets?: Array<{
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
                indices?: Array<number>,

                /*!for other geometry*/
                [otherParam:string]:any
            }
        },
        textures:{
            [name:string]:{
                //url is related to this file
                url:string
            }
        }
        objects:DYFileJsonObjectData
    }

    export type DYFileJsonObjectData = {
        [name: string]: {
            //position: Array<number>,
            //rotation: Array<number>,
            //scale: Array<number>,
            //visible: boolean,
            geometry:string,
            children: DYFileJsonObjectData
        }
    }
}
