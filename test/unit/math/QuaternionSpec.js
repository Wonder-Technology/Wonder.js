describe("Quaternion", function() {
    var sandbox = null;
    var Quaternion = dy.Quaternion;
    var Vector3 = dy.Vector3;

    function getValues(values) {
        var digit = 5;

        if (values) {
            if (mathTestUtils.isFloat32Array(values)) {
                return mathTestUtils.getValues(values, digit);
            }
            else {
                return mathTestUtils.getValues(values.values, digit);
            }
        }

        return mathTestUtils.getValues(matrix.values, digit);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("sub", function(){
        it("get the rotation from this to target", function(){
            var self = Quaternion.create().setFromEulerAngles(Vector3.create(30, 0, 0));
            var target = Quaternion.create().setFromEulerAngles(Vector3.create(40, 0, 0));

            target.sub(self);

            expect(getValues(target.getEulerAngles())).toEqual([10, 0, 0]);

            self = Quaternion.create().setFromEulerAngles(Vector3.create(0, 30, 0));
            target = Quaternion.create().setFromEulerAngles(Vector3.create(0, 40, 0));

            expect(getValues(target.sub(self).getEulerAngles())).toEqual([0, 10, 0]);

            self = Quaternion.create().setFromEulerAngles(Vector3.create(0, 0, 30));
            target = Quaternion.create().setFromEulerAngles(Vector3.create(0, 0, 40));

            expect(getValues(target.sub(self).getEulerAngles())).toEqual([0, 0, 10]);
        });
    });
});
