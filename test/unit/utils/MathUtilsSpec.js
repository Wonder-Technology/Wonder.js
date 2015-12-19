describe("MathUtils", function() {
    var sandbox = null;
    var Utils = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Utils = wd.MathUtils;
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
});

