module Engine3D {
    export class Material {
        public static create(params) {
            var obj = new this(params);

            return obj;
        }

        private _color:Color = null;
        get color(){
            return this._color;
        }
        set color(color:Color){
            this._color = color;
        }

        constructor(params) {
            this._color = Color.create(params.color || "0xffffff");
        }
    }
}
