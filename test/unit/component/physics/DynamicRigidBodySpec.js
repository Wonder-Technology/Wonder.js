describe("DynamicRigidBody", function() {
    var sandbox = null;
    var body = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        body = new wd.DynamicRigidBody();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        describe("clone DynamicRigidBody data", function(){
            beforeEach(function(){
            });

            it("clone config data", function(){
                var linearDamping = 0.2,
                    angularDamping = 0.5,
                    velocity = wd.Vector3.create(1,2,3),
                    angularVelocity = wd.Vector3.create(1,2,3),
                    mass = 2,
                    impulse = wd.Vector3.create(1,2,3),
                    force = wd.Vector3.create(1,2,3),
                    hitPoint = wd.Vector3.create(10,10,20);



                cloneTool.extend(body, {
                    linearDamping: linearDamping,
                    angularDamping: angularDamping,
                    velocity: velocity,
                    angularVelocity: angularVelocity,
                    mass: mass,
                    impulse: impulse,
                    force: force,
                    hitPoint: hitPoint
                });

                var result = body.clone();

                expect(result === body).toBeFalsy();
                expect(result.linearDamping).toEqual(linearDamping);
                expect(result.angularDamping).toEqual(angularDamping);
                expect(result.velocity).toEqual(velocity);
                expect(result.angularVelocity).toEqual(angularVelocity);
                expect(result.mass).toEqual(mass);
                expect(result.impulse).toEqual(impulse);
                expect(result.force).toEqual(force);
                expect(result.hitPoint).toEqual(hitPoint);
            });
        });
    });
});

