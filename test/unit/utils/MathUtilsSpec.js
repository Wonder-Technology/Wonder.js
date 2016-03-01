describe("MathUtils", function() {
    var sandbox = null;
    var Utils = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Utils = wd.MathUtils;

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("generateZeroToOne", function(){
        it("generate num in (0,1)", function(){
            var num = Utils.generateZeroToOne();

            expect(num).toEqual(jasmine.any(Number));
            expect(num < 1).toBeTruthy();
            expect(num > 0).toBeTruthy();
        });
    });

    describe("generateInteger", function(){
        it("generate num in range", function(){
            var num1 = Utils.generateInteger(2, 3);
            var num2 = Utils.generateInteger(2, 3);

            expect(num1).toEqual(jasmine.any(Number));
            expect(num1 <= 3).toBeTruthy();
            expect(num1 >= 2).toBeTruthy();

            expect(num2).toEqual(jasmine.any(Number));
            expect(num2 <= 3).toBeTruthy();
            expect(num2 >= 2).toBeTruthy();
        });
    });
    
    describe("mod", function(){
        it("gives the positive remainder obtained when dividing a by b", function(){
            expect(Utils.mod(10,2)).toEqual(0);
            expect(Utils.mod(10,3)).toEqual(1);
            expect(Utils.mod(2,3)).toEqual(2);

            expect(Utils.mod(-2,3)).toEqual(1);
            expect(Utils.mod(-5,3)).toEqual(1);
        });
    });

    describe("maxFloorIntegralMultiple", function(){
        it("gives the max number which is times of b and <= a", function(){
            expect(Utils.maxFloorIntegralMultiple(10,2)).toEqual(10);
            expect(Utils.maxFloorIntegralMultiple(10,3)).toEqual(9);

            expect(Utils.maxFloorIntegralMultiple(2,3)).toEqual(0);

            expect(function(){Utils.maxFloorIntegralMultiple(-2,3)}).toThrow();
            expect(function(){Utils.maxFloorIntegralMultiple(2,-3)}).toThrow();
        });
    });
});

