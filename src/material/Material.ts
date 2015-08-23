/// <reference path="../definitions.d.ts"/>
module dy {
    //todo add more attribute refer to unity

    export class Material {
        public static create() {
            var obj = new this();

            return obj;
        }

        /**
         * main color
         * @type {Color|dy.Color}
         * @private
         */
        private _color:Color = Color.create("0xffffff");
        get color(){
            return this._color;
        }
        set color(color:Color){
            this._color = color;
        }

        //todo add default shader
        private _shader:render.Shader = null;
        get shader(){
            return this._shader;
        }
        set shader(shader:render.Shader){
            this._shader = shader;
        }

        //public depthTest:boolean = true;
        //public depthWrite:boolean = true;
        public redWrite:boolean = true;
        public greenWrite:boolean = true;
        public blueWrite:boolean = true;
        public alphaWrite:boolean = true;
        public polygonOffsetMode:PolygonOffsetMode = PolygonOffsetMode.NONE;
        public cullMode:CullMode = CullMode.BACK;
        public blend:boolean = false;
        public blendSrc:BlendFunction = BlendFunction.SRC_COLOR;
        public blendDst:BlendFunction = BlendFunction.DST_COLOR;
        public blendEquation:BlendEquation = BlendEquation.FUNC_ADD;
    }
}
