describe("MirrorTexture", function () {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var gl;

    function setGeometry(texture, geometry) {
        texture.material = {
            geometry: geometry
        };
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.MirrorTexture;
        texture = new Texture();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        gl = dy.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("getPlane", function () {
        var Plane;

        beforeEach(function () {
            Plane = dy.Plane;
        });

        it("if geometry's transform not change and already create plane, return that plane", function () {
            texture._plane = Plane.create();
            setGeometry(texture, {
                gameObject: {
                    transform: {
                        dirtyLocal: false
                    }
                }
            });

            var plane = texture.getPlane();

            expect(plane).toEqual(texture._plane);
        });
        it("if geometry isn't PlaneGeometry, error", function () {
            setGeometry(texture, dy.BoxGeometry.create());

            expect(function () {
                texture.getPlane();
            }).toThrow();
        });
        it("create plane which is in world space and return it", function () {
            var geometry = dy.PlaneGeometry.create();
            geometry.width = 10;
            geometry.height = 10;
            geometry.material = {
                color: "#ffffff",

                init: sandbox.stub()
            };
            geometry.init();

            var mirror = dy.GameObject.create();
            mirror.addComponent(geometry);

            mirror.transform.rotateLocal(dy.Vector3.create(90, 0, 0));
            mirror.transform.translateLocal(dy.Vector3.create(0, 0, -10));

            setGeometry(texture, geometry);

            var plane = texture.getPlane();

            expect(testTool.getValues(plane.normal.values)).toEqual(
                [0, 0, 1]
            );
            expect(Math.round(plane.d)).toEqual(-0);
        });
    });

    describe("getPosition", function () {
        it("return plane'position in world space", function () {
            var geometry = dy.PlaneGeometry.create();
            geometry.width = 10;
            geometry.height = 10;
            geometry.material = {
                color: "#ffffff",

                init: sandbox.stub()
            };
            geometry.init();

            var mirror = dy.GameObject.create();
            mirror.addComponent(geometry);

            mirror.transform.rotateLocal(dy.Vector3.create(90, 0, 0));
            mirror.transform.translateLocal(dy.Vector3.create(0, 0, -10));

            setGeometry(texture, geometry);

            expect(testTool.getValues(texture.getPosition().values)).toEqual(
                [0, 10, 0]
            )
        });
    });

    describe("createEmptyTexture", function () {
        var glTexture;

        beforeEach(function () {
            glTexture = {};
            gl.createTexture.returns(glTexture);

            sandbox.stub(texture, "isSourcePowerOfTwo").returns(true);
            sandbox.stub(texture, "setTextureParameters");
        });

        it("bind texture", function () {
            texture.createEmptyTexture();

            expect(gl.bindTexture).toCalledOnce();
        });
        it("texImage2D with null source", function () {
            texture.width = 100;
            texture.height = 200;

            texture.createEmptyTexture();

            expect(gl.texImage2D).toCalledWith(gl.TEXTURE_2D, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        });
        it("set texture parameters", function () {
            texture.createEmptyTexture();

            expect(texture.setTextureParameters).toCalledWith(gl.TEXTURE_2D, true);
        });
        it("set glTexture", function(){
            var webGlTexture = {};
            gl.createTexture.returns(webGlTexture);

            texture.createEmptyTexture();

            expect(texture.glTexture).toEqual(webGlTexture);
        });
    });

    describe("sendData", function () {
        var program;

        beforeEach(function () {
            program = {
                sendUniformData: sandbox.stub(),
                getUniformLocation: sandbox.stub(),
                isUniformDataNotExistByLocation: sandbox.stub().returns(false)
            };
        });

        it("send mirror sampler", function () {
            var pos1 = 100;
            program.getUniformLocation.onCall(0).returns(pos1);
            var material = dy.MirrorMaterial.create();
            material.reflectionMap = texture;

            material.textureManager.sendData(program);

            expect(program.getUniformLocation).toCalledWith("u_mirrorSampler");
            expect(program.sendUniformData).toCalledWith(pos1, dy.VariableType.SAMPLER_2D, 0);
        });
    });
});

