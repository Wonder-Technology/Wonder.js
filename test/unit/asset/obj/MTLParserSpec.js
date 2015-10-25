describe("MTLParser", function () {
    var sandbox = null;
    var parser = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new dy.MTLParser();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("parse", function(){
        var newmtl1,newmtl2;
        var ka1,ka2;
        var kd1,kd2;
        var ks1,ks2;
        var ns1,ns2;
        var d1,d2;
        var map_Kd1,map_Kd2;
        var map_Ks1,map_Ks2;
        var map_bump1,map_bump2;
        var illum1,illum2;


        beforeEach(function(){
            newmtl1 = "newmtl material1\n";
            newmtl2 = "newmtl material2\n";

            ka1="Ka 0.000000 0.000000 0.000000\n";
            ka2="Ka 0.800000 0.000000 0.000000\n";

            kd1="Kd 0.000000 0.100000 0.200000\n";
            kd2="Kd 0.800000 0.000000 0.300000\n";

            ks1="Ks 0.000000 0.100000 0.200000\n";
            ks2="Ks 0.800000 0.000000 0.300000\n";

            ns1 = "Ns 154.901961\n";
            ns2 = "Ns 90.901961\n";

            d1 = "d 1.000000\n";
            d2 = "d 0.700000\n";

            map_Kd1 = "map_Kd 1.JPG\n";
            map_Kd2 = "map_Kd 2.JPG\n";

            map_Ks1 = "map_Ks 1.JPG\n";
            map_Ks2 = "map_Ks 2.JPG\n";

            map_bump1 = "map_bump 1.JPG\n";
            map_bump2 = "map_bump 2.JPG\n";

            illum1 = "illum 1\n";
            illum2 = "illum 2\n";
        });

        it("parse comment", function(){
            parser.parse("# Kd 0.800000 0.800000 0.800000");

            expect(parser.materials.getCount()).toEqual(0);
        });

        describe("whole test", function(){
            function getColor(r, g, b){
                return dy.Color.create("rgb(" + r + "," + g + "," + b + ")");
            }

            it("one newmtl", function(){
                var str = newmtl1 +
                        ns1 +
                        ka1 + kd1 + ks1 +
                        d1 +
                        illum1 +
                        map_Kd1;

                parser.parse(str);

                expect(parser.materials.getCount()).toEqual(1);
                var mtl = parser.materials.getChild(0);
                expect(mtl.name).toEqual("material1");
                expect(mtl.diffuseColor).toEqual(
                    getColor("0.0", "0.1", "0.2")
                );
                expect(mtl.specularColor).toEqual(
                    getColor("0.0", "0.1", "0.2")
                );

                expect(mtl.opacity).toEqual(1);
                expect(mtl.shininess).toEqual(154.901961);
                expect(mtl.diffuseMapUrl).toEqual("1.JPG");
                expect(mtl.specularMapUrl).toBeNull();
                expect(mtl.bumpMapUrl).toBeNull();
            });
            it("two newmtl", function(){
                var str = newmtl1 +
                    ns1 +
                    ka1 + kd1 + ks1 +
                    d1 +
                    illum1 +
                    map_Kd1 +
                    newmtl2 +
                    ns2 +
                    ka2 + kd2 + ks2 +
                    d2 +
                    illum2 +
                    map_Kd2 +
                    map_Ks2 +
                    map_bump2;

                parser.parse(str);

                expect(parser.materials.getCount()).toEqual(2);
                var mtl1 = parser.materials.getChild(0);
                expect(mtl1.name).toEqual("material1");
                expect(mtl1.diffuseColor).toEqual(
                    getColor("0.0", "0.1", "0.2")
                );
                expect(mtl1.specularColor).toEqual(
                    getColor("0.0", "0.1", "0.2")
                );

                expect(mtl1.opacity).toEqual(1);
                expect(mtl1.shininess).toEqual(154.901961);
                expect(mtl1.diffuseMapUrl).toEqual("1.JPG");
                expect(mtl1.specularMapUrl).toBeNull();
                expect(mtl1.bumpMapUrl).toBeNull();


                var mtl2 = parser.materials.getChild(1);
                expect(mtl2.name).toEqual("material2");
                expect(mtl2.diffuseColor).toEqual(
                    getColor("0.8", "0.0", "0.3")
                );
                expect(mtl2.specularColor).toEqual(
                    getColor("0.8", "0.0", "0.3")
                );

                expect(mtl2.opacity).toEqual(0.7);
                expect(mtl2.shininess).toEqual(90.901961);
                expect(mtl2.diffuseMapUrl).toEqual("2.JPG");
                expect(mtl2.specularMapUrl).toEqual("2.JPG");
                expect(mtl2.bumpMapUrl).toEqual("2.JPG");
            });
        });
    });
});
