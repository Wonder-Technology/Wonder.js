//export class PointLight{
//    constructor(position, color,  intensity, attenuation) {
//        this._position = position;
//        this._color = color;
//        this._intensity = intensity;
//        this._attenuation = attenuation;
//    }
//
//    private _attenuation:Attenuation = null;
//
//
//    private _position:number[] = null;
//    get position(){
//        return this._position;
//    }
//    set position(position:number[]){
//        this._position = position;
//    }
//
//    private _color:number[] = null;
//    get color(){
//        return this._color;
//    }
//    set color(color:number[]){
//        this._color = color;
//    }
//    private _intensity:number = null;
//    get intensity(){
//        return this._intensity;
//    }
//    set intensity(intensity:number){
//        this._intensity = intensity;
//    }
//
//
//
//    get range(){
//        return this._attenuation.range;
//    }
//
//    get constant(){
//        return this._attenuation.constant;
//    }
//
//    get linear(){
//        return this._attenuation.linear;
//    }
//
//    get quadratic(){
//        return this._attenuation.quadratic;
//    }
//
//
//    initWhenCreate() {
//    }
//
//    public static create(position, color,  intensity, attenuation) {
//        var obj = new this(position, color,  intensity, attenuation);
//
//        obj.initWhenCreate();
//
//        return obj;
//    }
//}

