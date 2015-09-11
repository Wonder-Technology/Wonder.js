var testTool = (function(){
    return {
        resPath: "base/",

        buildFakeGl: function(sandbox){
            return {
                activeTexture: sandbox.stub(),
                bindTexture: sandbox.stub(),
                deleteShader: sandbox.stub(),
                bindAttribLocation : sandbox.stub(),
                linkProgram: sandbox.stub(),
                attachShader: sandbox.stub(),
                getProgramInfoLog: sandbox.stub(),
                getShaderParameter: sandbox.stub().returns(true),
                getProgramParameter:sandbox.stub().returns(true),
                compileShader: sandbox.stub(),
                shaderSource: sandbox.stub(),
                createShader: sandbox.stub(),
                createBuffer:sandbox.stub(),
                enable:sandbox.stub(),
                disable:sandbox.stub(),
                polygonOffset:sandbox.stub(),
                colorMask:sandbox.stub(),
                depthMask:sandbox.stub(),
                cullFace:sandbox.stub(),
                blendFunc:sandbox.stub(),
                blendEquation:sandbox.stub(),
                createProgram:sandbox.stub(),
                clearColor:sandbox.stub(),
                clear:sandbox.stub()
            };
        },
        extend: function(destination, source) {
            var property = "";

            for (property in source) {
                destination[property] = source[property];
            }
            return destination;
        },
        updateAction: function(time, gameObject){
            window.performance.now.returns(time);
            gameObject.actionManager.update(time);
        },
        getValues:function(values){
            if(values){
                if(mathTestUtils.isFloat32Array(values)){
                    return mathTestUtils.getValues(values);
                }
                else{
                    return mathTestUtils.getValues(values.values);
                }
            }

            return mathTestUtils.getValues(matrix.values);
        },
        stubGetterSetter: function(sinon, object, attri, getterFunc, setterFunc){
            /*!
            now sinonjs not support sandbox to stub getter/setter, so use sinon

            refer to https://github.com/cjohansen/Sinon.JS/issues/781


            getterFunc/setterFunc must be function, can't be stub
             */

            sinon.stub(object, attri,{
                get: getterFunc,
                set: setterFunc
            });
        },
        clearInstance: function(){
            dy.Director._instance = null;
            dy.GPUDetector._instance = null;
            dy.DeviceManager._instance = null;

            dy.render.CommonShaderLib._instance = null;
            dy.render.BasicShaderLib._instance = null;
            dy.render.BasicEnvMapShaderLib._instance = null;
            dy.render.FresnelShaderLib._instance = null;
            dy.render.ReflectionShaderLib._instance = null;
            dy.render.RefractionShaderLib._instance = null;
            dy.render.BasicMapShaderLib._instance = null;
            dy.render.MultiMapShaderLib._instance = null;
            dy.render.SkyboxShaderLib._instance = null;

            //todo add more
        }
    }
}());
