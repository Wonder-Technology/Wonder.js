var deviceUtils = (function () {
    return {
        createGL: function () {
            var canvas = document.createElement("canvas"),
                gl = null;

            gl = canvas.getContext("webgl2");

             if(!gl){
                 gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

                 if(!gl){
                     throw new Error("should support webgl");
                 }
             }

             return gl;
        }
    }
}());

