//reference to three.js->Color.js
module dy{
    export class Color {
        public static create(colorVal:string) {
            var obj = new this();

            obj.initWhenCreate(colorVal);

            return obj;
        }

        private _r:number = null;
        get r(){
            return this._r;
        }
        set r(r:number){
            this._r = r;
        }

        private _g:number = null;
        get g(){
            return this._g;
        }
        set g(g:number){
            this._g = g;
        }

        private _b:number = null;
        get b(){
            return this._b;
        }
        set b(b:number){
            this._b = b;
        }

        constructor() {
        }

        public initWhenCreate(colorVal:string) {
            this._setColor(colorVal);
        }


        private _setColor(colorVal:string) {
            //
            //// rgb(255,0,0)
            ////
            ////将我们平常习惯的颜色值表达形式rgb(255,0,0)-数值型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0-255换算成0.0-1.0.
            //
            //if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为数值型rgb(255,0,0)
            //
            //    var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.r
            //    this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.g
            //    this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            //
            //// rgb(100%,0%,0%)
            ////将我们平常习惯的颜色值表达形式rgb(100%,0%,0%)-百分比型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0%-100%换算成0.0-1.0.
            //
            //if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为百分比型rgb(100%,0%,0%)
            //
            //    var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.r
            //    this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.g
            //    this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}

            // #ff0000
            //将我们平常习惯的颜色值表达形式#ff0000-6位16进制型，转换成THREE.JS认识的形式0.0-1.0，
            //这里将取值范围从00-ff换算成0.0-1.0.

            if (/^\#([0-9a-f]{6})$/i.test(colorVal)) {		//用正则表达式检查当前传递的颜色值表达样式是否为6位16进制型 #ff0000

                var color = /^\#([0-9a-f]{6})$/i.exec(colorVal);		//将字符串中的数值赋值给color，color是一个数组。

                this._setHex(parseInt(color[1], 16));	//将数组中的第2个元素转换成16进制int类型整数.调用setHex 方法，将16进制数值赋值给Color.r,Color.g,Color.b

                return this; //返回颜色对象。

            }
            //
            //// #f00
            ////将我们平常习惯的颜色值表达形式#f00-3位16进制型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0-f换算成0.0-1.0.
            //
            //if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为3位16进制型 #f00
            //
            //    var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );	//将数组中的第2，3,4个元素*2，转换成16进制int类型整数.调用setHex 方法，将16进制数值赋值给Color.r,Color.g,Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            //
            //// red
            ////将我们平常习惯的颜色值表达形式red颜色名，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将颜色名换算成0.0-1.0.
            //
            //if ( /^(\w+)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为颜色名，即参数style中是否只是字符串没有数字。
            //
            //    this.setHex( THREE.ColorKeywords[ style ] );	//将字符串作为THREE.ColorKeywords对象的属性名，取出与该属性名相对应的16进制的属性值.调用setHex 方法，将16进制的属性值赋值给Color.r,Color.g,Color.b
            //
            //    return this;	//返回颜色对象。
            //
            //}
        }
        /*setHex方法
         ///setHex方法用于设置16进制颜色值给当前实例
         ///更多关于hex颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
         */
        ///<summary>setHex</summary>
        ///<param name ="hex" type="number(16进制颜色值0xffddff）">16进制数值0xffddff</param>
        ///<returns type="Color">返回颜色对象</returns>
        private _setHex(hex) {
            hex = Math.floor(hex);

            this._r = ( hex >> 16 & 255 ) / 255; //将左边两位16进制数值变换成rgb颜色值对应的red，并赋值给属性Color.r。
            this._g = ( hex >> 8 & 255 ) / 255;  //将中间两位16进制数值变换成rgb颜色值对应的green，并赋值给属性Color.g。
            this._b = ( hex & 255 ) / 255;	    //将右边两位16进制数值变换成rgb颜色值对应的blue，并赋值给属性Color.b。

            return this;	//返回颜色对象
        }
    }
}