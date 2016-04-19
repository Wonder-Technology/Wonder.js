describe("StaticRigidBody", function() {
    var sandbox = null;
    var body = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        body = new wd.StaticRigidBody();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
            
        });

        describe("clone RigidBody data", function(){
            it("clone config data", function () {
                var friction = 0.2,
                    restitution = 0.5;


                cloneTool.extend(body, {
                    friction: friction,
                    restitution: restitution
                });

                var result = body.clone();

                expect(result === body).toBeFalsy();
                expect(result.friction).toEqual(friction);
                expect(result.restitution).toEqual(restitution);
            });
            it("shallow clone children", function () {
                var gameObject1 = {
                    addTag:sandbox.stub()
                };
                var children = [gameObject1];


                cloneTool.extend(body, {
                    children:children
                });

                var result = body.clone();

                expect(result === body).toBeFalsy();
                expect(result.children.getChildren()).toEqual([gameObject1]);
            });

            describe("clone constraint", function () {
                describe("clone LockConstraint", function () {
                    it("share connectBody", function () {
                        var connectedBody = {};

                        cloneTool.extend(body.lockConstraint, {
                            connectedBody: connectedBody
                        });

                        var result = body.clone();

                        expect(result.lockConstraint.connectedBody).toEqual(connectedBody);
                        expect(result.lockConstraint.rigidBody === result).toBeTruthy();
                    });
                    it("clone maxForce", function () {
                        var maxForce = 1.1;

                        cloneTool.extend(body.lockConstraint, {
                            maxForce: maxForce
                        });

                        var result = body.clone();

                        expect(result.lockConstraint.maxForce).toEqual(maxForce);
                    });
                });

                describe("clone DistanceConstraint", function () {
                    it("share connectBody", function () {
                        var connectedBody = {};

                        cloneTool.extend(body.distanceConstraint, {
                            connectedBody: connectedBody
                        });

                        var result = body.clone();

                        expect(result.distanceConstraint.connectedBody).toEqual(connectedBody);
                        expect(result.distanceConstraint.rigidBody === result).toBeTruthy();
                    });
                    it("clone maxForce", function () {
                        var maxForce = 1.1;

                        cloneTool.extend(body.distanceConstraint, {
                            maxForce: maxForce
                        });

                        var result = body.clone();

                        expect(result.distanceConstraint.maxForce).toEqual(maxForce);
                    });
                    it("clone distance", function () {
                        var distance = 1.1;

                        cloneTool.extend(body.distanceConstraint, {
                            distance: distance
                        });

                        var result = body.clone();

                        expect(result.distanceConstraint.distance).toEqual(distance);
                    });
                });

                describe("clone HingeConstraint", function () {
                    it("share connectBody", function () {
                        var connectedBody = {};

                        cloneTool.extend(body.hingeConstraint, {
                            connectedBody: connectedBody
                        });

                        var result = body.clone();

                        expect(result.hingeConstraint.connectedBody).toEqual(connectedBody);
                        expect(result.hingeConstraint.rigidBody === result).toBeTruthy();
                    });
                    it("clone maxForce", function () {
                        var maxForce = 1.1;

                        cloneTool.extend(body.hingeConstraint, {
                            maxForce: maxForce
                        });

                        var result = body.clone();

                        expect(result.hingeConstraint.maxForce).toEqual(maxForce);
                    });
                    it("clone pivot,axis", function () {
                        var pivotA = wd.Vector3.create(1,2,3),
                            pivotB = wd.Vector3.create(2,2,3),
                            axisA = wd.Vector3.create(2,3,3),
                            axisB = wd.Vector3.create(2,2,4);

                        cloneTool.extend(body.hingeConstraint, {
                                pivotA: pivotA,
                                pivotB: pivotB,
                            axisA: axisA,
                            axisB: axisB
                        });

                        var result = body.clone();

                        expect(result.hingeConstraint.pivotA).toEqual(pivotA);
                        expect(result.hingeConstraint.pivotA === pivotA).toBeFalsy();

                        expect(result.hingeConstraint.pivotB).toEqual(pivotB);
                        expect(result.hingeConstraint.pivotB === pivotB).toBeFalsy();

                        expect(result.hingeConstraint.axisA).toEqual(axisA);
                        expect(result.hingeConstraint.axisA === axisA).toBeFalsy();

                        expect(result.hingeConstraint.axisB).toEqual(axisB);
                        expect(result.hingeConstraint.axisB === axisB).toBeFalsy();
                    });
                });
            });

            describe("clone PointToPointConstraintList", function () {
                it("share connectBody", function () {
                    var constraint = wd.PointToPointConstraint.create();

                    var connectedBody = {};

                    cloneTool.extend(constraint, {
                        connectedBody: connectedBody
                    });

                    body.pointToPointConstraintList.addChild(constraint);

                    var result = body.clone();

                    expect(result.pointToPointConstraintList.getCount()).toEqual(1);
                    expect(result.pointToPointConstraintList.getChild(0).connectedBody).toEqual(connectedBody);
                });
                it("clone maxForce", function () {
                    var constraint = wd.PointToPointConstraint.create();

                    var maxForce = 0.5;

                    cloneTool.extend(constraint, {
                        maxForce:maxForce
                    });

                    body.pointToPointConstraintList.addChild(constraint);

                    var result = body.clone();

                    expect(result.pointToPointConstraintList.getCount()).toEqual(1);
                    expect(result.pointToPointConstraintList.getChild(0).maxForce).toEqual(maxForce);
                });
                it("clone pivot,axis", function () {
                    var constraint = wd.PointToPointConstraint.create();

                    var pivotA = wd.Vector3.create(1,2,3),
                        pivotB = wd.Vector3.create(2,2,3);

                    cloneTool.extend(constraint, {
                        pivotA: pivotA,
                        pivotB: pivotB
                    });

                    body.pointToPointConstraintList.addChild(constraint);

                    var result = body.clone();

                    expect(result.pointToPointConstraintList.getCount()).toEqual(1);

                    var targetConstraint = result.pointToPointConstraintList.getChild(0);
                    expect(targetConstraint.pivotA).toEqual(pivotA);
                    expect(targetConstraint.pivotA === pivotA).toBeFalsy();

                    expect(targetConstraint.pivotB).toEqual(pivotB);
                    expect(targetConstraint.pivotB === pivotB).toBeFalsy();
                });
            });
        });
    });
});

