describe("KinematicRigidBody", function() {
    var sandbox = null;
    var body = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        body = new wd.KinematicRigidBody();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        describe("clone KinematicRigidBody data", function(){
            beforeEach(function(){
            });

            it("clone config data", function(){
                var velocity = wd.Vector3.create(1,2,3),
                    angularVelocity = wd.Vector3.create(1,2,3),
                    mass = 2;



                cloneTool.extend(body, {
                    velocity: velocity,
                    angularVelocity: angularVelocity,
                    mass: mass
                });

                var result = body.clone();

                expect(result === body).toBeFalsy();
                expect(result.velocity).toEqual(velocity);
                expect(result.angularVelocity).toEqual(angularVelocity);
                expect(result.mass).toEqual(mass);
            });
        });
    });
});

