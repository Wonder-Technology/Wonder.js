/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class BoundingRegion{
        constructor(gameObject:GameObject){
            this.gameObject = gameObject;
        }

        protected gameObject:GameObject = null;
    }
}

