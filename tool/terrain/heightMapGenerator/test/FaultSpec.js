var Fault = require("../dist/terrain/heightMapGenerator/src/Fault").Fault,
    sinon = require("sinon");

describe("Fault", function () {
    var sandbox = null;
    var computer = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        computer = Fault.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("generateHeightData", function(){
        beforeEach(function(){
        });

        it("data.length should === width * height", function(){
            var data = computer.generateHeightData(2, 4);

            expect(data.length).toEqual(2 * 4);
        });

        describe("test algorithm", function(){
            function setRandomInOneIteration(iterationIndex, randomVal){
                Math.random.onCall(iterationIndex * 2).returns(randomVal);
                Math.random.onCall(iterationIndex * 2 + 1).returns(randomVal);
            }

            beforeEach(function(){
                sandbox.stub(Math, "random");
            });

            it("test iterationCount===1", function(){
                setRandomInOneIteration(0, 0.5);

                var data = computer.generateHeightData(2, 4, 1, 0);

                expect(data).toEqual([-1, 1, 1, 1, 1, 1, 1, 1]);
            });
            it("test iterationCount===2", function(){
                setRandomInOneIteration(0, 0.5);
                setRandomInOneIteration(1, 0.1);

                var data = computer.generateHeightData(2, 4, 2, 0);

                expect(data).toEqual([0, 2, 2, 2, 2, 2, 2, 2 ]);
            });
        });
    });
});

