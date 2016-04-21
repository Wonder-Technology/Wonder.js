describe("Face3", function() {
    var sandbox = null;
    var face;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        face = wd.Face3.create();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        describe("deep clone faceNormal", function(){
            it("if source->faceNormal === null, the result->hasFaceNormal should return false", function () {
                var result = face.clone();

                expect(result.hasFaceNormal()).toBeFalsy();
            });
            it("else", function () {
                var faceNormal = wd.Vector3.create(1,1,2),
                    vertexNormals = wdCb.Collection.create([wd.Vector3.create(2,3,4)]);

                cloneTool.extend(face, {
                    faceNormal: faceNormal,
                    vertexNormals: vertexNormals
                });

                var result = face.clone();

                expect(result.faceNormal === face.faceNormal).toBeFalsy();
                expect(result.faceNormal).toEqual(face.faceNormal);

                expect(result.vertexNormals === face.vertexNormals).toBeFalsy();

                result.vertexNormals.getChild(0).x = 10;

                expect(face.vertexNormals.getChild(0).x).toEqual(2);
            });
        });
        it("deep clone vertexNormals", function(){
                var vertexNormals = wdCb.Collection.create([wd.Vector3.create(2,3,4)]);

            cloneTool.extend(face, {
                vertexNormals: vertexNormals
            });

            var result = face.clone();

            expect(result.vertexNormals === face.vertexNormals).toBeFalsy();

            result.vertexNormals.getChild(0).x = 10;

            expect(face.vertexNormals.getChild(0).x).toEqual(2);
        });
        it("clone geometry data", function(){
            var aIndex = 1,
                bIndex = 2,
                cIndex = 4;

            cloneTool.extend(face, {
                aIndex: aIndex,
                bIndex: bIndex,
                cIndex: cIndex
            })

            var result = face.clone();

            expect(result.aIndex).toEqual(aIndex);
            expect(result.bIndex).toEqual(bIndex);
            expect(result.cIndex).toEqual(cIndex);
        });
    });
});

