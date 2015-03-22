module Engine3D{
    declare var gl:any;
    declare var document:any;

    export class Shader{
        constructor(){}

        createShader(id){
        // 用来保存着色器的变量
        var shader;

        // 根据id从HTML中获取指定的script标签
        var scriptElement = document.getElementById(id);

        // 如果指定的script标签不存在，则返回
        if(!scriptElement){return;}

        // 判断script标签的type属性
        switch(scriptElement.type){

            // 顶点着色器的时候
            case 'x-shader/x-vertex':
                shader = gl.createShader(gl.VERTEX_SHADER);
                break;

            // 片段着色器的时候
            case 'x-shader/x-fragment':
                shader = gl.createShader(gl.FRAGMENT_SHADER);
                break;
            default :
                return;
        }

        // 将标签中的代码分配给生成的着色器
        gl.shaderSource(shader, scriptElement.text);

        // 编译着色器
        gl.compileShader(shader);

        // 判断一下着色器是否编译成功
        if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){

            // 编译成功，则返回着色器
            return shader;
        }else{

            // 编译失败，弹出错误消息
            alert(gl.getShaderInfoLog(shader));

        }
    }

        public static create():Shader {
            var obj = new Shader();

            return obj;
        }
    }
}
