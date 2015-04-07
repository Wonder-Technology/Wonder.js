/// <reference path="Shader.ts"/>
module Engine3D{
    declare var gl:any;

    export enum DataType{
        FLOAT_VEC3,
        FLOAT,
        FLOAT_3,
        FLOAT_MAT4,
            INT,
        TEXTURE_2D,
        TEXTURE_CUBE,
        TEXTURE_ARR,
        STRUCT
    }

    export class Program{
        constructor(vs: Shader, fs: Shader){
            this._program = gl.createProgram();
            this._vs = vs;
            this._fs = fs;
        }

        private _program = null;
        private _vs:Shader = null;
        private _fs:Shader = null;

        use(){
            gl.useProgram(this._program);
        }

        setUniformData(name, type, data){
            var pos = null;

            //todo bad smell
            if(type !== DataType.STRUCT){
                pos= gl.getUniformLocation(this._program, name);
            }

            switch (type){
                case DataType.FLOAT_VEC3:
                //todo 验证data，必须为Float32Array数组
                //gl.uniform3f.apply(gl, [pos].concat(data));
                //    gl.uniform3f(pos, data[0], data[1], data[2]);
                    gl.uniform3fv(pos, data);
                    break;
                case DataType.FLOAT:
                    gl.uniform1f(pos, data);
                    break;
                case DataType.FLOAT_3:
                    gl.uniform3f(pos, data[0], data[1], data[2]);
                    break;
                case DataType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos,false, data);
                    break;
                case DataType.INT:
                    gl.uniform1i(pos, data);
                    break;
                case DataType.TEXTURE_2D:
                case DataType.TEXTURE_CUBE:
                case DataType.TEXTURE_ARR:
                        gl.uniform1i(pos, data);
                    break;
                case DataType.STRUCT:
                    //var i = null;
                    //var attrName = null;


                    var self = this;

                    data.member.forEach(function(arr){
                        self.setUniformData(name + "." + arr[1], DataType[arr[0]],  data.val[arr[1]]);
                    });
                    //for(i in data.member){
                    //    if(data.member.hasOwnProperty(i)){
                    //        attrName = data.member[i];
                    //        this.setUniformData(name + "." + attrName, DataType[i],  data.val[attrName]);
                    //    }
                    //}

                    break;
                default :
                    throw new Error("数据类型错误");
                    break;
            }
            //if (type == gl.FLOAT)
            //    return function(v) { gl.uniform1f(loc, v); };
            //if (type == gl.FLOAT_VEC2)
            //    return function(v) { gl.uniform2fv(loc, v); };
            //if (type == gl.FLOAT_VEC3)
            //    return function(v) { gl.uniform3fv(loc, v); };
            //if (type == gl.FLOAT_VEC4)
            //    return function(v) { gl.uniform4fv(loc, v); };
            //if (type == gl.INT)
            //    return function(v) { gl.uniform1i(loc, v); };
            //if (type == gl.INT_VEC2)
            //    return function(v) { gl.uniform2iv(loc, v); };
            //if (type == gl.INT_VEC3)
            //    return function(v) { gl.uniform3iv(loc, v); };
            //if (type == gl.INT_VEC4)
            //    return function(v) { gl.uniform4iv(loc, v); };
            //if (type == gl.BOOL)
            //    return function(v) { gl.uniform1i(loc, v); };
            //if (type == gl.BOOL_VEC2)
            //    return function(v) { gl.uniform2iv(loc, v); };
            //if (type == gl.BOOL_VEC3)
            //    return function(v) { gl.uniform3iv(loc, v); };
            //if (type == gl.BOOL_VEC4)
            //    return function(v) { gl.uniform4iv(loc, v); };
            //if (type == gl.FLOAT_MAT2)
            //    return function(v) { gl.uniformMatrix2fv(loc, false, v); };
            //if (type == gl.FLOAT_MAT3)
            //    return function(v) { gl.uniformMatrix3fv(loc, false, v); };
            //if (type == gl.FLOAT_MAT4)
            //    return function(v) { gl.uniformMatrix4fv(loc, false, v); };
            //if (type == gl.SAMPLER_2D || type == gl.SAMPLER_CUBE) {
            //    return function(unit) {
            //        return function(v) {
            //            gl.uniform1i(loc, unit);
            //            v.bindToUnit(unit);
            //        };
            //    }(textureUnit++);
            //}

        }

        //todo buffer为什么不能申明为:ArrayBuffer类型？
        setAttributeData(name, buffer){
            var pos = gl.getAttribLocation(this._program, name);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
            gl.vertexAttribPointer(pos, buffer.num, buffer.type, false, 0, 0);
            gl.enableVertexAttribArray(pos);
            //switch (type){
            //    case DataType.FLOAT_VEC4:
            //        gl.uniform3fv(pos, data);
            //        break;
            //    case DataType.FLOAT_MAT4:
            //        gl.uniformMatrix4fv(pos, data);
            //        break;
            //    case DataType.SAMPLER_2D:
            //    case DataType.SAMPLER_CUBE:
            //        gl.uniform1i(pos, data);
            //        break;
            //    default :
            //        throw new Error("数据类型错误");
            //        break;
            //}

        }

        initWhenCreate(){
        // 向程序对象里分配着色器
        gl.attachShader(this._program, this._vs);
        gl.attachShader(this._program, this._fs);

        // 将着色器连接
        gl.linkProgram(this._program);

        // 判断着色器的连接是否成功
        if(gl.getProgramParameter(this._program, gl.LINK_STATUS)){

            // 返回程序对象
            return this._program;
        }else{

            // 如果失败，弹出错误信息
            alert(gl.getProgramInfoLog(this._program));

            return null;
        }
    }



        public static create(vs: Shader, fs: Shader):Program {
            var obj = new Program(vs, fs);

            obj.initWhenCreate();

            return obj;
        }
    }
}
