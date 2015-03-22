var Engine3D;
(function (Engine3D) {
    var Shader = (function () {
        function Shader() {
        }
        Shader.prototype.createShader = function (id) {
            // 用来保存着色器的变量
            var shader;
            // 根据id从HTML中获取指定的script标签
            var scriptElement = document.getElementById(id);
            // 如果指定的script标签不存在，则返回
            if (!scriptElement) {
                return;
            }
            switch (scriptElement.type) {
                case 'x-shader/x-vertex':
                    shader = gl.createShader(gl.VERTEX_SHADER);
                    break;
                case 'x-shader/x-fragment':
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                    break;
                default:
                    return;
            }
            // 将标签中的代码分配给生成的着色器
            gl.shaderSource(shader, scriptElement.text);
            // 编译着色器
            gl.compileShader(shader);
            // 判断一下着色器是否编译成功
            if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                // 编译成功，则返回着色器
                return shader;
            }
            else {
                // 编译失败，弹出错误消息
                alert(gl.getShaderInfoLog(shader));
            }
        };
        Shader.create = function () {
            var obj = new Shader();
            return obj;
        };
        return Shader;
    })();
    Engine3D.Shader = Shader;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Shader.js.map