describe("OBJParser", function () {
    var sandbox = null;
    var parser = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new dy.OBJParser();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("parse", function(){
        var Vector3, Vector2;
        var v,vn,vt;
        var v1,v2,v3,v4,v5;
        var vn1,vn2,vn3,vn4,vn5;
        var vt1, vt2, vt3,vt4,vt5;
        var usemtl1,usemtl2;
        var o1,o2;
        var g1,g2;

        function getV2(x, y){
            return Vector2.create(x, y);
        }
        function getV3(x, y, z){
            return Vector3.create(x, y, z);
        }

        beforeEach(function(){
            Vector3 = dy.Vector3;
            Vector2 = dy.Vector2;

            o1 = "o model1\n";
            o2 = "o model2\n";
            g1 = "g group1\n";
            g2 = "g group2\n";

            v = "v 1.0 2.0 3.0\n" +
                "v 2.0 3.0 4.0\n" +
                "v 3.0 4.0 -5.0\n" +
                "v 6.0 8.0 10.0\n" +
                "v 5.0 6.0 7.0\n";

            v1 = getV3(1, 2, 3);
            v2 = getV3(2, 3, 4);
            v3 = getV3(3, 4, -5);
            v4 = getV3(6, 8, 10);
            v5 = getV3(5, 6, 7);

            vn = "vn -1.0 2.0 3.0\n" +
                "vn -2.0 3.0 4.0\n" +
                "vn -3.0 4.0 5.0\n" +
                "vn -4.0 5.0 6.0\n" +
                "vn -5.0 6.0 7.0\n";

            vn1 = getV3(-1, 2, 3);
            vn2 = getV3(-2, 3, 4);
            vn3 = getV3(-3, 4, 5);
            vn4 = getV3(-4, 5, 6);
            vn5 = getV3(-5, 6, 7);


            vt = "vt 0.1 0.2\n" +
                "vt 0.2 0.3\n" +
                "vt 0.3 0.4\n" +
                "vt 0.4 0.5\n" +
                "vt 0.5 0.6\n";

            vt1 = getV2(0.1, 0.2);
            vt2 = getV2(0.2, 0.3);
            vt3 = getV2(0.3, 0.4);
            vt4 = getV2(0.4, 0.5);
            vt5 = getV2(0.5, 0.6);


            usemtl1 = "usemtl material1\n";
            usemtl2 = "usemtl material2\n";
        });

        it("parse comment", function(){
            parser.parse("# mtllib WIDGT_Root");

            expect(parser.mtlFilePath).toBeNull();
        });
        it("parse vertex", function(){
            parser.parse("v 1.0 2.0 3.0\nv 2.0 3.0 4.0");

            expect(parser._vertices.getChildren()).toEqual(
                [
                    getV3(1.0, 2.0, 3.0),
                    getV3(2.0, 3.0, 4.0)
                ]
            );
        });
        it("parse normal", function(){
            parser.parse("vn 1.0 2.0 3.0\nvn 2.0 3.0 4.0");

            expect(parser._normals.getChildren()).toEqual(
                [
                    getV3(1.0, 2.0, 3.0),
                    getV3(2.0, 3.0, 4.0)
                ]
            );
        });
        it("parse texCoord", function(){
            parser.parse("vt 1.0 2.0\nvt 2.0 3.0");

            expect(parser._texCoords.getChildren()).toEqual(
                [
                    getV2(1.0, 2.0),
                    getV2(2.0, 3.0)
                ]
            );
        });

        describe("parse faces", function(){
            var f1,f2,f3,f4;

            beforeEach(function(){
                f1 = o1 +
                    v + vn + vt +
                    usemtl1 +
                    "f 1 2 3 4\n";
                //"f 2 3 4 5\n";

                f2 = o1 +
                    v + vn + vt +
                    g1 +
                    usemtl1 +
                    "f 1/2 2/1 3/4 4/3\n";
                //"f 2/3 3/4 4/3 5/2\n";

                f3 = v + vn + vt +
                    g1 +
                    usemtl1 +
                    "f 1/2/1 3/1/3 4/3/4 2/4/2\n";
                //"f 2/5/5 3/4/4 4/3/3 5/2/2\n";

                f4 = v + vn + vt +
                    usemtl1 +
                    "f 1//2 2//1 3//4 4//3\n";
                //"f 2//5 3//4 4//3 5//2\n";
            });

            it("if f->data's count < 3, skip", function(){
                var f = o1 +
                    v + vn + vt +
                    usemtl1 +
                    "f 1 2\n";

                parser.parse(f);

                expect(parser.objects.getChild(0).faces.getCount()).toEqual(0);
            });
            it("if not meet usemtl before, skip", function(){
                var f = o1 +
                    v + vn + vt +
                    "f 1/1 2/2 3/3\n";

                parser.parse(f);

                expect(parser.objects.getCount()).toEqual(0);
            });
            it("parse 'f x x x x'", function(){
                parser.parse(f1);

                expect(parser.objects.getCount()).toEqual(1);

                var obj = parser.objects.getChild(0);
                expect(obj.vertices.getChildren()).toEqual(
                    [
                        v1, v2, v3, v1, v3, v4
                ]
                );

                var normals = obj.normals.getChildren();
                var normal1 = getV3(-0.7071067690849304,0.7071067690849304,0);
                var normal2 = getV3(0.7538585662841797,-0.6565865278244019,0.024318018928170204);
                expect(normals.length).toEqual(6);
                for(var i = 0; i <= 2; i++){
                    expect(normals[i]).toEqual( normal1 );
                }
                for(var i = 3; i <= 5; i++){
                    expect(normals[i]).toEqual( normal2 );
                }

                expect(obj.texCoords.getCount()).toEqual(0);

                expect(obj.indices.getChildren()).toEqual(
                    [
                        0, 1, 2, 3, 4, 5
                    ]
                );
            });
            it("parse 'f x/x x/x x/x x/x'", function(){
                parser.parse(f2);

                expect(parser.objects.getCount()).toEqual(1);

                var obj = parser.objects.getChild(0);
                expect(obj.vertices.getChildren()).toEqual(
                    [
                        v1, v2, v3, v1, v3, v4
                    ]
                );

                var normals = obj.normals.getChildren();
                expect(normals.length).toEqual(6)
                var normal1 = getV3(-0.7071067690849304,0.7071067690849304,0);
                var normal2 = getV3(0.7538585662841797,-0.6565865278244019,0.024318018928170204);
                expect(normals.length).toEqual(6);
                for(var i = 0; i <= 2; i++){
                    expect(normals[i]).toEqual( normal1 );
                }
                for(var i = 3; i <= 5; i++){
                    expect(normals[i]).toEqual( normal2 );
                }

                expect(obj.texCoords.getChildren()).toEqual(
                    [
                        vt2, vt1, vt4, vt2, vt4, vt3
                    ]
                );

                expect(obj.indices.getChildren()).toEqual(
                    [
                        0, 1, 2, 3, 4, 5
                    ]
                );
            });
            it("parse 'f x/x/x x/x/x x/x/x x/x/x'", function(){
                parser.parse(f3);

                expect(parser.objects.getCount()).toEqual(1);

                var obj = parser.objects.getChild(0);
                expect(obj.vertices.getChildren()).toEqual(
                    [
                        v1, v3, v4, v1, v4, v2
                    ]
                );

                expect(obj.normals.getChildren()).toEqual(
                    [
                        vn1, vn3, vn4, vn1, vn4, vn2
                    ]
                );

                expect(obj.texCoords.getChildren()).toEqual(
                    [
                        vt2, vt1, vt3,vt2, vt3, vt4
                    ]
                );

                expect(obj.indices.getChildren()).toEqual(
                    [
                        0, 1, 2, 3, 4, 5
                    ]
                );
            });
            it("parse 'f x//x x//x x//x x//x'", function(){
                parser.parse(f4);

                expect(parser.objects.getCount()).toEqual(1);

                var obj = parser.objects.getChild(0);
                expect(obj.vertices.getChildren()).toEqual(
                    [
                        v1, v2, v3, v1, v3, v4
                    ]
                );

                expect(obj.normals.getChildren()).toEqual(
                    [
                        vn2, vn1, vn4, vn2, vn4, vn3
                    ]
                );

                expect(obj.texCoords.getCount()).toEqual(0)

                expect(obj.indices.getChildren()).toEqual(
                    [
                        0, 1, 2, 3, 4, 5
                    ]
                );
            });

            describe("bug test", function(){
                it("test when face's indiceIndex >= 100", function(){
                    var vStr = "";
                    var vnStr = "";
                    for (var i = 0; i < 5 * 21; i++ ){
                        vStr += v;
                        vnStr += vn;
                    }
                    var f = o1 +
                        vStr + vnStr +
                        usemtl1 +
                        "f 102//1 103//101 104//102 105//103\n";

                    parser.parse(f);

                    expect(parser.objects.getCount()).toEqual(1);

                    var obj = parser.objects.getChild(0);
                    expect(obj.vertices.getChildren()).toEqual(
                        [
                            v2, v3, v4, v2, v4, v5
                        ]
                    );

                    expect(obj.normals.getChildren()).toEqual(
                        [
                            vn1, vn1, vn2, vn1, vn2, vn3
                        ]
                    );

                    expect(obj.texCoords.getCount()).toEqual(0);

                    expect(obj.indices.getChildren()).toEqual(
                        [
                            0, 1, 2, 3, 4, 5
                        ]
                    );
                });

                describe("test handle three component", function(){
                    it("test handle f x x x", function(){
                        var f = o1 +
                            v +
                            usemtl1 +
                            "f 1 2 3";

                            parser.parse(f);

                            expect(parser.objects.getCount()).toEqual(1);

                            var obj = parser.objects.getChild(0);
                            expect(obj.vertices.getChildren()).toEqual(
                                [
                                    v1, v2, v3
                            ]
                            );

                        var normals = obj.normals.getChildren();
                        var normal = getV3(-0.7071067690849304,0.7071067690849304,0);
                        expect(normals.length).toEqual(3);
                        expect(normals[0]).toEqual( normal );
                        expect(normals[1]).toEqual( normal );
                        expect(normals[2]).toEqual( normal );

                        expect(obj.texCoords.getCount()).toEqual(0);

                        expect(obj.indices.getChildren()).toEqual(
                            [
                                0, 1, 2
                            ]
                        );
                    });
                    it("test handle f x/x x/x x/x", function(){
                        var f = o1 +
                            v + vt +
                            usemtl1 +
                            "f 1/2 2/3 3/4";

                        parser.parse(f);

                        expect(parser.objects.getCount()).toEqual(1);

                        var obj = parser.objects.getChild(0);
                        expect(obj.vertices.getChildren()).toEqual(
                            [
                                v1, v2, v3
                            ]
                        );

                        var normals = obj.normals.getChildren();
                        var normal = getV3(-0.7071067690849304,0.7071067690849304,0);
                        expect(normals.length).toEqual(3);
                        expect(normals[0]).toEqual( normal );
                        expect(normals[1]).toEqual( normal );
                        expect(normals[2]).toEqual( normal );
                            expect(obj.texCoords.getChildren()).toEqual(
                                [
                                    vt2, vt3, vt4
                                ]
                            );

                        expect(obj.indices.getChildren()).toEqual(
                            [
                                0, 1, 2
                            ]
                        );
                    });
                });

                describe("test handle five component", function(){
                    it("test handle f x/x x/x x/x x/x x/x", function(){
                        var f = o1 +
                            v + vt +
                            usemtl1 +
                            "f 1/2 2/3 3/4 4/5 5/1";

                        parser.parse(f);

                        expect(parser.objects.getCount()).toEqual(1);
                        var obj = parser.objects.getChild(0);

                        expect(obj.vertices.getChildren()).toEqual(
                            [
                                v1, v2, v3, v1, v3, v4, v1, v4, v5
                            ]
                        );

                        expect(obj.texCoords.getChildren()).toEqual(
                            [
                                vt2, vt3, vt4, vt2, vt4, vt5, vt2, vt5, vt1
                            ]
                        );

                        expect(obj.indices.getChildren()).toEqual(
                            [
                                0, 1, 2, 3, 4, 5, 6, 7, 8
                            ]
                        );

                        var normals = obj.normals.getChildren();
                        var normal1 = getV3(-0.7071067690849304,0.7071067690849304,0);
                        var normal2 = getV3(0.7538585662841797,-0.6565865278244019,0.024318018928170204);
                        var normal3 = getV3(-0.40824830532073975,0.8164966106414795,-0.40824830532073975);
                        expect(normals.length).toEqual(9);
                        for(var i = 0; i <= 2; i++){
                            expect(normals[i]).toEqual( normal1 );
                        }
                        for(var i = 3; i <= 5; i++){
                            expect(normals[i]).toEqual( normal2 );
                        }
                        for(var i = 6; i <= 8; i++){
                            expect(normals[i]).toEqual( normal3 );
                        }
                    });
                });
            });
        });

        describe("parse o,g,usemtl", function(){
            beforeEach(function(){

            });

            describe("parse o,g", function(){
                it("o->g->usemtl", function(){
                    var str = o1 +
                        v + vn + vt +
                        g1 +
                        usemtl1;

                    parser.parse(str);

                    expect(parser.objects.getCount()).toEqual(1);

                    var obj = parser.objects.getChild(0);
                    expect(obj.name).toEqual("group1");
                    expect(obj.materialName).toEqual("material1");
                });
                it("o->usemtl", function(){
                    var str = o1 +
                        v + vn + vt +
                        usemtl1;

                    parser.parse(str);

                    expect(parser.objects.getCount()).toEqual(1);

                    var obj = parser.objects.getChild(0);
                    expect(obj.name).toEqual("model1");
                    expect(obj.materialName).toEqual("material1");
                });
                it("g->usemtl", function(){
                    var str = v + vn + vt +
                        g1 +
                        usemtl1;

                    parser.parse(str);

                    expect(parser.objects.getCount()).toEqual(1);

                    var obj = parser.objects.getChild(0);
                    expect(obj.name).toEqual("group1");
                    expect(obj.materialName).toEqual("material1");
                });
                it("o->g->usemtl->g->usemtl", function(){
                    var str = o1 +
                        v + vn + vt +
                        g1 +
                        usemtl1 +
                        "f 1 2 3 4\n" +
                        g2 +
                        usemtl2 +
                        "f 2 3 4 5\n";


                    parser.parse(str);

                    expect(parser.objects.getCount()).toEqual(2);

                    var obj1 = parser.objects.getChild(0);
                    expect(obj1.name).toEqual("group1");
                    expect(obj1.materialName).toEqual("material1");
                    expect(obj1.indices.getChildren()).toEqual(
                        [
                            0, 1, 2, 3, 4, 5
                        ]
                    );
                    var obj2 = parser.objects.getChild(1);
                    expect(obj2.name).toEqual("group2");
                    expect(obj2.materialName).toEqual("material2");
                    expect(obj2.indices.getChildren()).toEqual(
                        [
                            0, 1, 2, 3, 4, 5
                        ]
                    );
                });
                it("usemtl->g->usemtl", function(){
                    var str = v + vn + vt +
                        usemtl1 +
                        "f 1 2 3 4\n" +
                            g1 +
                            usemtl2 +
                        "f 2 3 4 5\n";

                    parser.parse(str);

                    expect(parser.objects.getCount()).toEqual(2);

                    var obj1 = parser.objects.getChild(0);
                    expect(obj1.name).toEqual(obj1.materialName);
                    expect(obj1.materialName).toEqual("material1");
                    var obj2 = parser.objects.getChild(1);
                    expect(obj2.name).toEqual("group1");
                    expect(obj2.materialName).toEqual("material2");
                });
            });
        });
    });
});

