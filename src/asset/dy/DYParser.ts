/// <reference path="../../definitions.d.ts"/>
module dy {
    export class DYParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _models:dyCb.Collection.create<GameObject> = dyCb.Collection.create<GameObject>();
        private _sceneData: DYFileSceneData = null;

        public parse(json:DYFileJsonData):DYFileData{
            this.parseScene(json).parseModel(json).parseAnimation(json);

            return {
                scene: DYFileSceneData,
                models: this._models
            }
        }

        public parseModel(json:DYFileJsonData){

            return this;
        }

        public parseScene(json:DYFileJsonData){

            return this;
        }

        public parseAnimation(json:DYFileJsonData){
            this._parseMorphTarget(json);

            return this;
        }

        private _parseMorphTarget(json:DYFileJsonData){

            return this;
        }
    }

    export type DYFileData = {
        scene: DYFileSceneData,
        models: dyCb.Collection.create<GameObject>
    }

    export type DYFileSceneData = {
        ambientColor: Color
    }
}

