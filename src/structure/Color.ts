module wd{
    declare var Math:any;

    export class Color {
        public static create(colorVal?:string) {
            var obj = new this();

            obj.initWhenCreate(colorVal);

            return obj;
        }

        set dirty(dirty:boolean){
            if(dirty){
                this._clearCache();
            }
        }

        private _r:number = null;
        @ensureGetter(function(r:number){
            assert(r >= 0, Log.info.FUNC_SHOULD("r", `>= 0, but actual is ${r}`));
        })
        get r(){
            return this._r;
        }
        set r(r:number){
            if(this._r !== r){
                this.dirty = true;

                this._r = r;
            }
        }

        private _g:number = null;
        @ensureGetter(function(g:number){
            assert(g >= 0, Log.info.FUNC_SHOULD("g", `>= 0, but actual is ${g}`));
        })
        get g(){
            return this._g;
        }
        set g(g:number){
            if(this._g !== g){
                this.dirty = true;

                this._g = g;
            }
        }

        private _b:number = null;
        @ensureGetter(function(b:number){
            assert(b >= 0, Log.info.FUNC_SHOULD("b", `>= 0, but actual is ${b}`));
        })
        get b(){
            return this._b;
        }
        set b(b:number){
            if(this._b !== b){
                this.dirty = true;

                this._b = b;
            }
        }

        private _a:number = null;
        @ensureGetter(function(a:number){
            assert(a >= 0, Log.info.FUNC_SHOULD("a", `>= 0, but actual is ${a}`));
        })
        get a(){
            return this._a;
        }
        set a(a:number){
            if(this._a !== a){
                this.dirty = true;

                this._a = a;
            }
        }

        private _colorString:string = null;
        private _colorVec3Cache:Vector3 = null;
        private _colorVec4Cache:Vector4 = null;

        public initWhenCreate(colorVal?:string) {
            if(!colorVal){
                return;
            }

            this._colorString = colorVal;
            this._setColor(colorVal);
        }

        @cache(function(){
            return this._colorVec3Cache !== null;
        }, function(){
            return this._colorVec3Cache;
        }, function(result){
            this._colorVec3Cache = result;
        })
        public toVector3(){
            return Vector3.create(this.r, this.g, this.b);
        }

        @cache(function(){
            return this._colorVec4Cache !== null;
        }, function(){
            return this._colorVec4Cache;
        }, function(result){
            this._colorVec4Cache = result;
        })
        public toVector4(){
            return Vector4.create(this.r, this.g, this.b, this.a);
        }

        public toString(){
            return this._colorString;
        }

        public clone(){
            return Color.create(this._colorString);
        }

        private _setColor(colorVal:string) {
            const REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i,
                REGEX_RGBA_2 = /^rgba\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+),\s*([^\)]+)\)$/i,
                REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i,
                REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i,
                REGEX_NUM = /^\#([0-9a-f]{6})$/i;
            var color = null;

            // rgba(255,0,0,0)

            if ( REGEX_RGBA.test( colorVal ) ) {
                color = REGEX_RGBA.exec( colorVal );

                this.r = this._getColorValue(color, 1) ;
                this.g = this._getColorValue(color, 2) ;
                this.b = this._getColorValue(color, 3) ;
                this.a = Number(color[4]);

                return this;

            }

            // rgba(0.1,0.0,0.3,0.2)

            if ( REGEX_RGBA_2.test( colorVal ) ) {
                color = REGEX_RGBA_2.exec( colorVal );

                this.r = parseFloat(color[1]);
                this.g = parseFloat(color[2]);
                this.b = parseFloat(color[3]);
                this.a = Number(color[4]);

                return this;

            }

            // rgb(255,0,0)

            if ( REGEX_RGB.test( colorVal ) ) {
                color = REGEX_RGB.exec( colorVal );

                this.r = this._getColorValue(color, 1) ;
                this.g = this._getColorValue(color, 2) ;
                this.b = this._getColorValue(color, 3) ;
                this.a = 1;

                return this;

            }

            /*!
             it will cause ambiguity: rgb(x,x,x)
             so the format should be:
             rgb(x.x,x.x,x.x)
             */
            if ( REGEX_RGB_2.test( colorVal ) ) {
                color = REGEX_RGB_2.exec( colorVal );

                this.r = parseFloat(color[1]);
                this.g = parseFloat(color[2]);
                this.b = parseFloat(color[3]);
                this.a = 1;

                return this;

            }


            // #ffffff

            if (REGEX_NUM.test(colorVal)) {
                color = REGEX_NUM.exec(colorVal);

                this._setHex(parseInt(color[1], 16));

                return this;

            }
        }

        private _getColorValue(color, index, num=255){
            return Math.min( num, parseInt( color[ index ], 10 ) ) / num;
        }

        private _setHex(hex) {
            hex = Math.floor(hex);

            this.r = ( hex >> 16 & 255 ) / 255;
            this.g = ( hex >> 8 & 255 ) / 255;
            this.b = ( hex & 255 ) / 255;
            this.a = 1;

            return this;
        }

        private _clearCache(){
            this._colorVec3Cache = null;
            this._colorVec4Cache = null;
        }
    }
}