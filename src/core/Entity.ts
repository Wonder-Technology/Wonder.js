module dy{
    export class Entity{
        private static _count:number = 1;

        constructor(){
            this._uid = Entity._count;
            Entity._count += 1;
        }

        private _uid:number = null;
        get uid() {
            return this._uid;
        }
    }
}
