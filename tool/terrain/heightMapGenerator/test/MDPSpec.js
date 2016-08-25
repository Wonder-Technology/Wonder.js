var MDP = require("../dist/terrain/heightMapGenerator/src/MDP").MDP,
    TestTool = require("../dist/ts/test/TestTool"),
    sinon = require("sinon");

describe("MDP", function () {
    var sandbox = null;
    var computer = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        computer = MDP.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("generateHeightData", function(){
        beforeEach(function(){
        });

        it("data.length should === width * height", function(){
            var data = computer.generateHeightData(3, 5);

            expect(data.length).toEqual(3 * 5);
        });

        describe("test algorithm", function(){
            function setRandom(randomVal){
                Math.random.returns(randomVal);
            }

            beforeEach(function(){
                sandbox.stub(Math, "random");

                setRandom(1);
            });

            it("test width=1, height=1", function(){
                var data = computer.generateHeightData(1, 1, 5, 1);

                expect(data).toEqual([0]);
            });
            it("test width=3, height=1", function(){
                var data = computer.generateHeightData(3, 1, 5, 1);

                expect(TestTool.getValues(data)).toEqual([6.7, 6.7, 6.7]);
            });
            it("test width=1, height=3", function(){
                var data = computer.generateHeightData(1, 3, 5, 1);

                expect(TestTool.getValues(data)).toEqual([6.7, 6.7, 6.7 ]);
            });
            it("test width=3, height=5", function(){
                var data = computer.generateHeightData(3, 5, 5, 1);

                expect(TestTool.getValues(data)).toEqual([ 4.9, 4.3, 0, 5.6, 6.7, 4.3, 8, 6.7, 6.7, 7.1, 7.1, 5.4, 7.1, 5.4, 0 ]);
            });
            it("test width=5, height=3", function(){
                var data = computer.generateHeightData(5, 3, 5, 1);

                expect(TestTool.getValues(data)).toEqual([ 5.1, 4.9, 7.7, 4.9, 4.2, 7.1, 7.9, 8.6, 7.1, 5.7, 0, 7.1, 6.7, 5.7, 0 ]);
            });
            it("test width=5, height=5", function(){
                var data = computer.generateHeightData(5, 5, 5, 1);

                expect(TestTool.getValues(data)).toEqual([
                    0, 4.6, 6.7, 4.2, 0, 4.6, 5.2, 5.8, 4.9, 4.2, 6.7, 6.3, 5, 5.8, 6.7, 7.1, 7.1, 7.1, 5.8, 5.4, 0, 7.1, 6.7, 5.4, 0
                ]);
            });

            describe("test special case", function () {
                describe("test width or height is even number", function () {
                    beforeEach(function(){
                        setRandom(0.8);
                    });

                    it("test width=2, height=2", function(){
                        var data = computer.generateHeightData(2, 2, 5, 1);

                        expect(TestTool.getValues(data)).toEqual([0,0,0,0]);
                    });
                    it("test width=2, height=3", function(){
                        setRandom(0.8);

                        var data = computer.generateHeightData(2, 3, 5, 1);

                        expect(TestTool.getValues(data)).toEqual([4, 0, 4, 4, 4, 0 ]);
                    });
                    it("test width=3, height=2", function(){
                        var data = computer.generateHeightData(3, 2, 5, 1);

                        expect(TestTool.getValues(data)).toEqual([ 4, 4, 4, 0, 4, 0 ]);
                    });
                    it("test width=4, height=4", function(){
                        var data = computer.generateHeightData(4, 4, 5, 1);

                        expect(TestTool.getValues(data)).toEqual([0, 3.8, 2.8, 2.8, 5.3, 3, 3.8, 4, 4.3, 4.3, 3.5, 3.3, 4.3, 4, 3.3, 0 ]);
                    });
                    it("test width=4, height=5", function(){
                        var data = computer.generateHeightData(4, 5, 5, 1);

                        expect(TestTool.getValues(data)).toEqual([2.9, 4, 2.5, 0, 3.3, 3.5, 2.9, 2.5, 4.3, 3, 3.5, 4, 4.3, 4.3, 3.5, 3.3, 4.3, 4, 3.3, 0 ]);
                    });
                });
            });
        });
    });
});

