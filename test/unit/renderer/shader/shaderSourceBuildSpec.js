describe("shader source build", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;

    var gl;
    var state;

    var GPUDetector = wd.GPUDetector;
    var EGPUPrecision = wd.EGPUPrecision;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("build glsl source", function () {
        beforeEach(function () {
        });

        it("declare attribute variables", function () {
            directorTool.init(state);

            var vs = materialTool.getVsSource(gl);
            expect(glslTool.containSpecifyCount(vs, "attribute vec3 a_position;", 1)).toBeTruthy();
        });
        it("declare uniform variables", function () {
            directorTool.init(state);

            var vs = materialTool.getVsSource(gl);
            expect(glslTool.containSpecifyCount(vs, "uniform mat4 u_mMatrix;", 1)).toBeTruthy();
            expect(glslTool.containSpecifyCount(vs, "uniform mat4 u_vMatrix;", 1)).toBeTruthy();
            expect(glslTool.containSpecifyCount(vs, "uniform mat4 u_pMatrix;", 1)).toBeTruthy();
            expect(glslTool.notContain(vs, "uniform vec3 u_color;")).toBeTruthy();
            expect(glslTool.notContain(vs, "uniform float u_opacity;")).toBeTruthy();

            var fs = materialTool.getFsSource(gl);
            expect(glslTool.notContain(fs, "uniform mat4 u_mMatrix;")).toBeTruthy();
            expect(glslTool.notContain(fs, "uniform mat4 u_vMatrix;")).toBeTruthy();
            expect(glslTool.notContain(fs, "uniform mat4 u_pMatrix;")).toBeTruthy();
            expect(glslTool.containSpecifyCount(fs, "uniform vec3 u_color;", 1)).toBeTruthy();
            expect(glslTool.containSpecifyCount(fs, "uniform float u_opacity;", 1)).toBeTruthy();
        });

        describe("fs top define precision based on GPUDetector->precision", function () {
            it("test LOWP", function () {
                sandbox.stub(GPUDetector.getInstance(), "precision", EGPUPrecision.LOWP);

                directorTool.init(state);

                var fs = materialTool.getFsSource(gl);
                expect(glslTool.containSpecifyCount(fs, "precision lowp float;\nprecision lowp int;\n", 1)).toBeTruthy();
            });
            it("test MEDIUMP", function () {
                sandbox.stub(GPUDetector.getInstance(), "precision", EGPUPrecision.MEDIUMP);

                directorTool.init(state);

                var fs = materialTool.getFsSource(gl);
                expect(glslTool.containSpecifyCount(fs, "precision mediump float;\nprecision mediump int;\n", 1)).toBeTruthy();
            });
            it("test HIGHP", function () {
                sandbox.stub(GPUDetector.getInstance(), "precision", EGPUPrecision.HIGHP);

                directorTool.init(state);

                var fs = materialTool.getFsSource(gl);
                expect(glslTool.containSpecifyCount(fs, "precision highp float;\nprecision highp int;\n", 1)).toBeTruthy();
            });
        });
    });

    // describe("can change glsl source in runtime", function () {
    // });
});

