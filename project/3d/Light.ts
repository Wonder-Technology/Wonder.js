module Engine3D.Light{
    export class Attenuation{
        constructor(rangeLevel) {
            this._rangeLevel = rangeLevel;
        }

        private _range:number = null;
        get range(){
            return this._range;
        }
        set range(range:number){
            this._range = range;
        }

        private _constant:number = null;
        get constant(){
            return this._constant;
        }
        set constant(constant:number){
            this._constant = constant;
        }

        private _linear:number = null;
        get linear(){
            return this._linear;
        }
        set linear(linear:number){
            this._linear = linear;
        }

        private _quadratic:number = null;
        get quadratic(){
            return this._quadratic;
        }
        set quadratic(quadratic:number){
            this._quadratic = quadratic;
        }

        private _rangeLevel:number = null;
        get rangeLevel(){
            return this._rangeLevel;
        }
        set rangeLevel(rangeLevel:number){
            this._rangeLevel = rangeLevel;
        }
        initWhenCreate() {
            this._constant = 1.0;

            switch (this._rangeLevel){
                case 0:
                    this._range = 7;
                    this._linear = 0.7;
                    this._quadratic = 1.8;
                    break;
                case 1:
                    this._range = 13;
                    this._linear = 0.35;
                    this._quadratic = 0.44;
                    break;
                case 2:
                    this._range = 20;
                    this._linear = 0.22;
                    this._quadratic = 0.20;
                    break;
                case 3:
                    this._range = 32;
                    this._linear = 0.14;
                    this._quadratic = 0.07;
                    break;
                case 4:
                    this._range = 50;
                    this._linear = 0.09;
                    this._quadratic = 0.032;
                    break;
                case 5:
                    this._range = 65;
                    this._linear = 0.07;
                    this._quadratic = 0.017;
                    break;
                case 6:
                    this._range = 100;
                    this._linear = 0.045;
                    this._quadratic = 0.0075;
                    break;
                case 7:
                    this._range = 160;
                    this._linear = 0.027;
                    this._quadratic = 0.0028;
                    break;
                case 8:
                    this._range = 200;
                    this._linear = 0.022;
                    this._quadratic = 0.0019;
                    break;
                case 9:
                    this._range = 325;
                    this._linear = 0.014;
                    this._quadratic = 0.0007;
                    break;
                case 10:
                    this._range = 600;
                    this._linear = 0.007;
                    this._quadratic = 0.0002;
                    break;
                case 11:
                    this._range = 3250;
                    this._linear = 0.0014;
                    this._quadratic = 0.000007;
                    break;
                default :
                    throw new Error("超出范围");
                    break;
            }
        }

        public static create(rangeLevel) {
            var obj = new this(rangeLevel);

            obj.initWhenCreate();

            return obj;
        }
    }

    //export class BaseLight{
    //
    //}
    //
    export class PointLight{
        constructor(position, color,  intensity, attenuation) {
            this._position = position;
            this._color = color;
            this._intensity = intensity;
            this._attenuation = attenuation;
        }

        private _attenuation:Attenuation = null;


        private _position:number[] = null;
        get position(){
            return this._position;
        }
        set position(position:number[]){
            this._position = position;
        }

        private _color:number[] = null;
        get color(){
            return this._color;
        }
        set color(color:number[]){
            this._color = color;
        }
        private _intensity:number = null;
        get intensity(){
            return this._intensity;
        }
        set intensity(intensity:number){
            this._intensity = intensity;
        }



        get range(){
            return this._attenuation.range;
        }

        get constant(){
            return this._attenuation.constant;
        }

        get linear(){
            return this._attenuation.linear;
        }

        get quadratic(){
            return this._attenuation.quadratic;
        }


        initWhenCreate() {
        }

        public static create(position, color,  intensity, attenuation) {
            var obj = new this(position, color,  intensity, attenuation);

            obj.initWhenCreate();

            return obj;
        }
    }

        export class DirectionLight {
            constructor(direction, color, intensity) {
                this._direction = direction;
                this._color = color;
                this._intensity = intensity;
            }

            private _direction:number = null;
            get direction(){
                return this._direction;
            }
            set direction(direction:number){
                this._direction = direction;
            }

            private _color:number[] = null;
            get color(){
                return this._color;
            }
            set color(color:number[]){
                this._color = color;
            }

            private _intensity:number = null;
            get intensity(){
                return this._intensity;
            }
            set intensity(intensity:number){
                this._intensity = intensity;
            }

            initWhenCreate() {
            }

            public static create(direction, color, intensity) {
                var obj = new this(direction, color, intensity);

                obj.initWhenCreate();

                return obj;
            }
        }
    }
