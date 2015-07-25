/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class Entity{
        public static UID:number = 1;

        private _uid:string = null;
        get uid(){
            return this._uid;
        }
        set uid(uid:string){
            this._uid = uid;
        }

        constructor(uidPre:string){
            this._uid = uidPre + String(Entity.UID++);
        }
    }
}
