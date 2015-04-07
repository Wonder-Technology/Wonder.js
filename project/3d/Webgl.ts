module Engine3D{
    declare var window:any;
    //todo 将gl和c作为公有成员
    export class Webgl{
        constructor(){}

        init(){
// canvas对象获取
            window.c = document.getElementById('canvas');

// webgl的context获取
            window.gl = window.c.getContext('webgl') || window.c.getContext('experimental-webgl');

            window.gl.canvas = window.c;
        }

        initWhenCreate(){
        }

        public static create():Webgl {
            var obj = new Webgl();

            obj.initWhenCreate();

            return obj;
        }
    }
}
