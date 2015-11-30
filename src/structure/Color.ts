//reference to three.js->Color.js
module wd{
    declare var Math:any;

    export class Color {
        public static create(colorVal:string) {
            var obj = new this();

            obj.initWhenCreate(colorVal);

            return obj;
        }

        public r:number = null;
        public g:number = null;
        public b:number = null;
        public a:number = null;

        constructor() {
        }

        public initWhenCreate(colorVal:string) {
            this._setColor(colorVal);
        }

        public toVector3(){
            return Vector3.create(this.r, this.g, this.b);
        }

        public toVector4(){
            return Vector4.create(this.r, this.g, this.b, this.a);
        }

        private _setColor(colorVal:string) {
            var REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i,
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

            // rgba(255,0,0)

            if ( REGEX_RGB.test( colorVal ) ) {
                color = REGEX_RGB.exec( colorVal );

                this.r = this._getColorValue(color, 1) ;
                this.g = this._getColorValue(color, 2) ;
                this.b = this._getColorValue(color, 3) ;
                this.a = 1;

                return this;

            }

            /*!
             it will cause ambiguity: rgba(x,x,x)
             so the format should be:
             rgba(x.x,x.x,x.x)
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
    }
}