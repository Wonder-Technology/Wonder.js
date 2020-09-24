open Wonder_jest;

open TransformRunAPI;

let _ =
  describe("Transform", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _judgeOneToOne =
        (
          (parent, child),
          (parentLocalPos, parentPos),
          (childLocalPos, childPos),
        ) =>
      (
        getLocalPosition(parent),
        getPosition(parent),
        getLocalPosition(child),
        getPosition(child),
      )
      ->expect
      == (parentLocalPos, parentPos, childLocalPos, childPos);

    let _judgeRotationOneToOne =
        (
          (parent, child),
          (parentLocalRotation, parentRotation),
          (childLocalRotation, childRotation),
        ) =>
      (
        getLocalRotation(parent),
        getRotation(parent),
        getLocalRotation(child),
        getRotation(child),
      )
      ->expect
      == (
           parentLocalRotation,
           parentRotation,
           childLocalRotation,
           childRotation,
         );

    let _judgeScaleOneToOne =
        (
          (parent, child),
          (parentLocalScale, parentScale),
          (childLocalScale, childScale),
        ) =>
      (
        getLocalScale(parent),
        getScale(parent),
        getLocalScale(child),
        getScale(child),
      )
      ->expect
      == (parentLocalScale, parentScale, childLocalScale, childScale);

    let _judgeOneToTwo =
        (
          (parent, child1, child2),
          (parentLocalPos, parentPos),
          (child1LocalPos, child1Pos),
          (child2LocalPos, child2Pos),
        ) =>
      (
        getLocalPosition(parent),
        getPosition(parent),
        getLocalPosition(child1),
        getPosition(child1),
        getLocalPosition(child2),
        getPosition(child2),
      )
      ->expect
      == (
           parentLocalPos,
           parentPos,
           child1LocalPos,
           child1Pos,
           child2LocalPos,
           child2Pos,
         );

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("create", () => {
      test("create a new transform", () => {
        let transform = create()->ResultTool.getExnSuccessValue;

        expect(transform) == 0->TransformEntity.create;
      });

      describe("change po", () =>
        test("po->index + 1", () => {
          let _ = create()->ResultTool.getExnSuccessValue;

          TransformTool.getMaxIndex()->expect == 1;
        })
      );

      test("mark new transform dirty", () => {
        let transform = create()->ResultTool.getExnSuccessValue;

        TransformTool.isDirty(transform)->expect == true;
      });
    });

    describe("setParent", () => {
      describe(
        "the change of parent before setted as parent will affect child", () => {
        test("test one(parent)-one(child)", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let pos = (1., 2., 3.)->PositionTool.create;
          setLocalPosition(parent, pos)->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          _judgeOneToOne(
            (parent, child),
            (pos, pos),
            (TransformTool.getDefaultPosition(), pos),
          );
        });
        test("test one(parent)-two(child)", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child1 = create()->ResultTool.getExnSuccessValue;
          let child2 = create()->ResultTool.getExnSuccessValue;
          let pos1 = (1., 2., 3.)->PositionTool.create;
          let pos2 = (10., 20., 30.)->PositionTool.create;
          setLocalPosition(parent, pos1)->ResultTool.getExnSuccessValue;
          setParent(parent, child1)->ResultTool.getExnSuccessValue;
          setLocalPosition(child2, pos2)->ResultTool.getExnSuccessValue;
          setParent(parent, child2)->ResultTool.getExnSuccessValue;

          _judgeOneToTwo(
            (parent, child1, child2),
            (pos1, pos1),
            (TransformTool.getDefaultPosition(), pos1),
            (pos2, PositionTool.add(pos1, pos2)),
          );
        });
      });

      describe("if child already has parent", () => {
        test("can set the same parent", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let pos = (1., 2., 3.)->PositionTool.create;
          setLocalPosition(parent, pos)->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          setParent(parent, child)->ResultTool.getExnSuccessValue;

          getParent(child)->OptionSt.getExn->expect == parent;
        });
        test("can set different parent", () => {
          let parent1 = create()->ResultTool.getExnSuccessValue;
          let parent2 = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let pos1 = (1., 2., 3.)->PositionTool.create;
          let pos2 = (300., 20., 30.)->PositionTool.create;
          setLocalPosition(parent1, pos1)->ResultTool.getExnSuccessValue;
          setParent(parent1, child)->ResultTool.getExnSuccessValue;
          setLocalPosition(parent2, pos2)->ResultTool.getExnSuccessValue;
          setParent(parent2, child)->ResultTool.getExnSuccessValue;

          getParent(child)->OptionSt.getExn->expect == parent2;
        });
        test("change its current parent's children order", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child1 = create()->ResultTool.getExnSuccessValue;
          let child2 = create()->ResultTool.getExnSuccessValue;
          let child3 = create()->ResultTool.getExnSuccessValue;
          setParent(parent, child1)->ResultTool.getExnSuccessValue;
          setParent(parent, child2)->ResultTool.getExnSuccessValue;
          setParent(parent, child3)->ResultTool.getExnSuccessValue;

          setParent(child3, child1)->ResultTool.getExnSuccessValue;

          getChildren(parent)->OptionSt.getExn->expect == [child3, child2];
        });
      });

      describe("fix bug", () =>
        test("test two(parent)-two(child)", () => {
          let (gameObject1, transform1) = GameObjectTool.createGameObject();
          let (gameObject2, transform2) = GameObjectTool.createGameObject();
          let (gameObject3, transform3) = GameObjectTool.createGameObject();
          let (gameObject4, transform4) = GameObjectTool.createGameObject();
          setParent(transform1, transform3)->ResultTool.getExnSuccessValue;
          setParent(transform2, transform4)->ResultTool.getExnSuccessValue;
          let pos1 = (1., 2., 3.)->PositionTool.create;
          let pos2 = (2., 3., 4.)->PositionTool.create;
          let pos3 = (4., 3., 4.)->PositionTool.create;
          let pos4 = (7., 3., 4.)->PositionTool.create;
          setLocalPosition(transform1, pos1)->ResultTool.getExnSuccessValue;
          setLocalPosition(transform2, pos2)->ResultTool.getExnSuccessValue;
          setLocalPosition(transform3, pos3)->ResultTool.getExnSuccessValue;
          setLocalPosition(transform4, pos4)->ResultTool.getExnSuccessValue;

          (
            getPosition(transform1),
            getPosition(transform2),
            getPosition(transform3),
            getPosition(transform4),
          )
          ->expect
          == (
               pos1,
               pos2,
               PositionTool.add(pos3, pos1),
               PositionTool.add(pos4, pos2),
             );
        })
      );
    });

    describe("removeParent", () => {
      describe("test one(parent)-one(child)", () => {
        let exec = () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let pos = (1., 2., 3.)->PositionTool.create;
          setLocalPosition(parent, pos)->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          removeParent(child);

          (parent, child, pos);
        };

        test("test remove its current parent", () => {
          let (_, child, _) = exec();

          hasParent(child)->expect == false;
        });
        test("test position and local position", () => {
          let (parent, child, pos) = exec();

          _judgeOneToOne(
            (parent, child),
            (pos, pos),
            (
              TransformTool.getDefaultPosition(),
              TransformTool.getDefaultPosition(),
            ),
          );
        });
      });

      test("test one(parent)-two(child)", () => {
        let parent = create()->ResultTool.getExnSuccessValue;
        let child1 = create()->ResultTool.getExnSuccessValue;
        let child2 = create()->ResultTool.getExnSuccessValue;
        let pos1 = (1., 2., 3.)->PositionTool.create;
        let pos2 = (10., 20., 30.)->PositionTool.create;
        setLocalPosition(parent, pos1)->ResultTool.getExnSuccessValue;
        setParent(parent, child1)->ResultTool.getExnSuccessValue;
        setLocalPosition(child2, pos2)->ResultTool.getExnSuccessValue;
        setParent(parent, child2)->ResultTool.getExnSuccessValue;

        removeParent(child2);

        _judgeOneToTwo(
          (parent, child1, child2),
          (pos1, pos1),
          (TransformTool.getDefaultPosition(), pos1),
          (pos2, pos2),
        );
      });
    });

    describe("hasParent", () => {
      test("if has no parent, return false", () => {
        let transform = create()->ResultTool.getExnSuccessValue;

        hasParent(transform)->expect == false;
      });
      test("else, return true", () => {
        let parent = create()->ResultTool.getExnSuccessValue;
        let child = create()->ResultTool.getExnSuccessValue;
        setParent(parent, child)->ResultTool.getExnSuccessValue;

        hasParent(child)->expect == true;
      });
    });

    describe("getChildren", () =>
      test("get parent's all children", () => {
        let parent = create()->ResultTool.getExnSuccessValue;
        let child1 = create()->ResultTool.getExnSuccessValue;
        let child2 = create()->ResultTool.getExnSuccessValue;
        setParent(parent, child1)->ResultTool.getExnSuccessValue;
        setParent(parent, child2)->ResultTool.getExnSuccessValue;

        getChildren(parent)->OptionSt.getExn->expect == [child2, child1];
      })
    );

    describe("setLocalPosition", () => {
      let _prepare = () => {
        let parent = create()->ResultTool.getExnSuccessValue;
        let child = create()->ResultTool.getExnSuccessValue;
        let pos1 = (1., 2., 3.)->PositionTool.create;
        let pos2 = (5., 10., 30.)->PositionTool.create;
        setParent(parent, child)->ResultTool.getExnSuccessValue;

        setLocalPosition(parent, pos1)->ResultTool.getExnSuccessValue;
        setLocalPosition(child, pos2)->ResultTool.getExnSuccessValue;

        (parent, child, pos1, pos2);
      };

      test("change parent's localPosition should affect children", () => {
        let (parent, child, _, pos2) = _prepare();
        setLocalPosition(parent, pos2)->ResultTool.getExnSuccessValue;

        _judgeOneToOne(
          (parent, child),
          (pos2, pos2),
          (pos2, PositionTool.add(pos2, pos2)),
        );
      });
      test("change child's localPosition shouldn't affect parent", () => {
        let (parent, child, pos1, _) = _prepare();
        setLocalPosition(child, pos1)->ResultTool.getExnSuccessValue;

        _judgeOneToOne(
          (parent, child),
          (pos1, pos1),
          (pos1, PositionTool.add(pos1, pos1)),
        );
      });
    });

    describe("getPosition", () => {
      test("default value should be (0.,0.,0.)", () => {
        let transform = create()->ResultTool.getExnSuccessValue;

        getPosition(transform)->expect == TransformTool.getDefaultPosition();
      });
      test("get the position in world coordinate system", () => {
        let parent = create()->ResultTool.getExnSuccessValue;
        let child = create()->ResultTool.getExnSuccessValue;
        let pos = (1., 2., 3.)->PositionTool.create;

        setLocalPosition(parent, pos)->ResultTool.getExnSuccessValue;
        setParent(parent, child)->ResultTool.getExnSuccessValue;

        getPosition(child)->expect == pos;
      });
    });

    describe("setPosition", () =>
      describe("set position in world coordinate system", () => {
        test("change parent's position should affect children", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let pos1 = (1., 2., 3.)->PositionTool.create;
          let pos2 = (5., 10., 30.)->PositionTool.create;
          setParent(parent, child)->ResultTool.getExnSuccessValue;
          setLocalPosition(parent, pos1)->ResultTool.getExnSuccessValue;
          setLocalPosition(child, pos2)->ResultTool.getExnSuccessValue;

          setPosition(parent, pos2)->ResultTool.getExnSuccessValue;

          _judgeOneToOne(
            (parent, child),
            (pos2, pos2),
            (pos2, PositionTool.add(pos2, pos2)),
          );
        });
        test("change child's position shouldn't affect parent", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let pos1 = (1., 2., 3.)->PositionTool.create;
          let pos2 = (5., 10., 30.)->PositionTool.create;
          let pos3 = (2., 3., 4.)->PositionTool.create;
          setParent(parent, child)->ResultTool.getExnSuccessValue;
          setLocalPosition(parent, pos1)->ResultTool.getExnSuccessValue;
          setLocalPosition(child, pos2)->ResultTool.getExnSuccessValue;

          setPosition(child, pos3)->ResultTool.getExnSuccessValue;

          _judgeOneToOne(
            (parent, child),
            (pos1, pos1),
            ((1., 1., 1.)->PositionTool.create, pos3),
          );
        });
      })
    );

    describe("getRotation", () => {
      test("default value should be (0.,0.,0.,1.)", () => {
        let transform = create()->ResultTool.getExnSuccessValue;

        getRotation(transform)->expect == TransformTool.getDefaultRotation();
      });
      test("get the rotation in world coordinate system", () => {
        let parent = create()->ResultTool.getExnSuccessValue;
        let child = create()->ResultTool.getExnSuccessValue;
        let rotation = (1., 2., 3., 2.5)->RotationTool.create;
        setLocalRotation(parent, rotation)->ResultTool.getExnSuccessValue;
        setParent(parent, child)->ResultTool.getExnSuccessValue;

        getRotation(child)->expect == rotation;
      });
    });

    describe("setRotation", () =>
      describe("set rotation in world coordinate system", () => {
        test("change parent's rotation should affect children", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let rotation1 = (1., 2., 3., 2.5)->RotationTool.create;
          let rotation2 = (5., 10.5, 30., 1.)->RotationTool.create;
          setLocalRotation(parent, rotation1)->ResultTool.getExnSuccessValue;
          setLocalRotation(child, rotation2)->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          setRotation(parent, rotation2)->ResultTool.getExnSuccessValue;

          _judgeRotationOneToOne(
            (parent, child),
            (rotation2, rotation2),
            (
              rotation2,
              (
                (-14.148975834432052),
                (-29.71284925230731),
                (-84.89385500659232),
                1462.650035039141,
              )
              ->RotationTool.create,
            ),
          );
        });
        test("change child's rotation shouldn't affect parent", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let rotation1 = (1., 2., 3., 1.)->RotationTool.create;
          let rotation2 = (5.5, 10., 30., 2.)->RotationTool.create;
          let rotation3 = (2.5, 3.5, 4.5, 1.)->RotationTool.create;
          setLocalRotation(parent, rotation1)->ResultTool.getExnSuccessValue;
          setLocalRotation(child, rotation2)->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          setRotation(child, rotation3)->ResultTool.getExnSuccessValue;

          _judgeRotationOneToOne(
            (parent, child),
            (rotation1, rotation1),
            (
              (
                0.7745966911315918,
                (-0.3872983455657959),
                0.7745966911315918,
                6.196773529052734,
              )
              ->RotationTool.create,
              (
                6.826419538772125,
                8.489076950779234,
                6.460195134263704,
                (-10.027219687210458),
              )
              ->RotationTool.create,
            ),
          );
        });
      })
    );

    describe("getEulerAngles", () => {
      test("default value should be (0.,0.,0.)", () => {
        let transform = create()->ResultTool.getExnSuccessValue;

        getEulerAngles(transform)->expect
        == (0., (-0.), 0.)->EulerAnglesTool.createFromPrimitive;
      });
      test("get the eulerAngles in world coordinate system", () => {
        let parent = create()->ResultTool.getExnSuccessValue;
        let child = create()->ResultTool.getExnSuccessValue;
        let eulerAngles =
          (45., 45., 90.)->EulerAnglesTool.createFromPrimitive;
        setLocalEulerAngles(parent, eulerAngles)
        ->ResultTool.getExnSuccessValue;
        setParent(parent, child)->ResultTool.getExnSuccessValue;

        getEulerAngles(child)->expect
        == (45., 44.99999999999999, 90.)->EulerAnglesTool.createFromPrimitive;
      });
    });

    describe("setEulerAngles", () =>
      describe("set eulerAngles in world coordinate system", () => {
        let _judgeEulerAnglesOneToOne =
            (
              (parent, child),
              (parentLocalEulerAngles, parentEulerAngles),
              (childLocalEulerAngles, childEulerAngles),
            ) =>
          (
            getLocalEulerAngles(parent),
            getEulerAngles(parent),
            getLocalEulerAngles(child),
            getEulerAngles(child),
          )
          ->expect
          == (
               parentLocalEulerAngles,
               parentEulerAngles,
               childLocalEulerAngles,
               childEulerAngles,
             );

        test("change parent's eulerAngles should affect children", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let eulerAngles1 =
            (1., 2., 3.5)->EulerAnglesTool.createFromPrimitive;
          let eulerAngles2 =
            (5., 10.5, 30.)->EulerAnglesTool.createFromPrimitive;
          setLocalEulerAngles(parent, eulerAngles1)
          ->ResultTool.getExnSuccessValue;
          setLocalEulerAngles(child, eulerAngles2)
          ->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          setEulerAngles(parent, eulerAngles2)->ResultTool.getExnSuccessValue;

          _judgeEulerAnglesOneToOne(
            (parent, child),
            (
              (4.999999720522246, 10.499999504808965, 29.99999866105677)
              ->EulerAnglesTool.createFromPrimitive,
              (4.9999999860374675, 10.499999810789854, 29.99999771097897)
              ->EulerAnglesTool.createFromPrimitive,
            ),
            (
              (4.999999720522246, 10.499999504808965, 29.99999866105677)
              ->EulerAnglesTool.createFromPrimitive,
              (14.953095317535913, 16.95073623912726, 61.91119956447435)
              ->EulerAnglesTool.createFromPrimitive,
            ),
          );
        });
        test("change child's eulerAngles shouldn't affect parent", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let eulerAngles1 =
            (1., 2., 3.)->EulerAnglesTool.createFromPrimitive;
          let eulerAngles2 =
            (5.5, 10., 30.)->EulerAnglesTool.createFromPrimitive;
          let eulerAngles3 =
            (2.5, 3.5, 4.5)->EulerAnglesTool.createFromPrimitive;
          setLocalEulerAngles(parent, eulerAngles1)
          ->ResultTool.getExnSuccessValue;
          setLocalEulerAngles(child, eulerAngles2)
          ->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          setEulerAngles(child, eulerAngles3)->ResultTool.getExnSuccessValue;

          _judgeEulerAnglesOneToOne(
            (parent, child),
            (
              (1.0000000541275584, 2.0000000390849397, 3.000000082590928)
              ->EulerAnglesTool.createFromPrimitive,
              (1.000000070447814, 1.9999999556226822, 3.0000002226737443)
              ->EulerAnglesTool.createFromPrimitive,
            ),
            (
              (1.447625368958481, 1.5265914288412556, 1.471299291762878)
              ->EulerAnglesTool.createFromPrimitive,
              (2.4999999977068192, 3.4999998866913646, 4.500000058177029)
              ->EulerAnglesTool.createFromPrimitive,
            ),
          );
        });
      })
    );

    describe("getScale", () => {
      test("default value should be (1.,1.,1.)", () => {
        let transform = create()->ResultTool.getExnSuccessValue;

        getScale(transform)->expect == TransformTool.getDefaultScale();
      });
      test("get the scale in world coordinate system", () => {
        let parent = create()->ResultTool.getExnSuccessValue;
        let child = create()->ResultTool.getExnSuccessValue;
        let scale = (1., 2., 3.5)->ScaleTool.create;
        setLocalScale(parent, scale)->ResultTool.getExnSuccessValue;
        setParent(parent, child)->ResultTool.getExnSuccessValue;

        getScale(child)->expect == scale;
      });
    });

    describe("setScale", () =>
      describe("set scale in world coordinate system", () => {
        test("change parent's scale should affect children", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let scale1 = (1., 2., 3.5)->ScaleTool.create;
          let scale2 = (5., 10., 30.)->ScaleTool.create;
          setLocalScale(parent, scale1)->ResultTool.getExnSuccessValue;
          setLocalScale(child, scale2)->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          setScale(parent, scale2)->ResultTool.getExnSuccessValue;

          _judgeScaleOneToOne(
            (parent, child),
            (scale2, scale2),
            (scale2, ScaleTool.multiply(scale2, scale2)),
          );
        });
        test("change child's scale shouldn't affect parent", () => {
          let parent = create()->ResultTool.getExnSuccessValue;
          let child = create()->ResultTool.getExnSuccessValue;
          let scale1 = (1., 2., 3.)->ScaleTool.create;
          let scale2 = (5., 10., 30.)->ScaleTool.create;
          let scale3 = (2., 3., 4.)->ScaleTool.create;
          setLocalScale(parent, scale1)->ResultTool.getExnSuccessValue;
          setLocalScale(child, scale2)->ResultTool.getExnSuccessValue;
          setParent(parent, child)->ResultTool.getExnSuccessValue;

          setScale(child, scale3)->ResultTool.getExnSuccessValue;

          _judgeScaleOneToOne(
            (parent, child),
            (scale1, scale1),
            ((2., 1.5, 1.3333333730697632)->ScaleTool.create, scale3),
          );
        });
      })
    );

    describe("getGameObject", () =>
      test("get transform's gameObject", () => {
        let gameObject =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

        let transform =
          GameObjectRunAPI.getTransform(gameObject)->OptionSt.getExn;

        getGameObject(transform)->OptionSt.getExn->expect == gameObject;
      })
    );

    describe("rotateLocalOnAxis", () =>
      test("rotate on local axis in the local coordinate system", () => {
        let tra1 = create()->ResultTool.getExnSuccessValue;
        let pos1 = (0., 1., 0.)->PositionTool.create;
        let xAxis = (1., 0., 0.)->AxisTool.create;
        let yAxis = (0., 1., 0.)->AxisTool.create;
        setLocalPosition(tra1, pos1)->ResultTool.getExnSuccessValue;

        rotateLocalOnAxis(tra1, (45.->AngleTool.create, yAxis))
        ->ResultTool.getExnSuccessValue;
        rotateLocalOnAxis(tra1, (45.->AngleTool.create, xAxis))
        ->ResultTool.getExnSuccessValue;
        rotateLocalOnAxis(tra1, (10.->AngleTool.create, yAxis))
        ->ResultTool.getExnSuccessValue;

        getLocalEulerAngles(tra1)->expect
        == (53.52699620225938, 51.55342957783367, 11.389428193681704)
           ->EulerAnglesTool.createFromPrimitive;
      })
    );

    describe("rotateWorldOnAxis", () =>
      test("rotate on world axis in the world coordinate system", () => {
        let tra1 = create()->ResultTool.getExnSuccessValue;
        let pos1 = (0., 1., 0.)->PositionTool.create;
        let xAxis = (1., 0., 0.)->AxisTool.create;
        let yAxis = (0., 1., 0.)->AxisTool.create;
        setLocalPosition(tra1, pos1)->ResultTool.getExnSuccessValue;

        rotateWorldOnAxis(tra1, (45.->AngleTool.create, yAxis))
        ->ResultTool.getExnSuccessValue;
        rotateWorldOnAxis(tra1, (45.->AngleTool.create, xAxis))
        ->ResultTool.getExnSuccessValue;
        rotateWorldOnAxis(tra1, (10.->AngleTool.create, yAxis))
        ->ResultTool.getExnSuccessValue;

        getLocalEulerAngles(tra1)->expect
        == (62.04153935036139, 37.965850368256476, 39.36170307898388)
           ->EulerAnglesTool.createFromPrimitive;
      })
    );

    describe("fix bug", () => {
      test(
        "the second transform's default localToWorldMatrix should be identity matrix4 when create two transforms",
        () => {
          let transform1 = create()->ResultTool.getExnSuccessValue;
          let transform2 = create()->ResultTool.getExnSuccessValue;

          TransformTool.getLocalToWorldMatrixTypeArray(transform2)->expect
          == TransformTool.getDefaultLocalToWorldMatrixTypeArray();
        },
      );
      test(
        "get the data from Float32Array may not equal to the value which is setted",
        () => {
        let transform0 = create()->ResultTool.getExnSuccessValue;
        let pos0 = (0.1, 0., 0.)->PositionTool.create;
        setLocalPosition(transform0, pos0)->ResultTool.getExnSuccessValue;

        getLocalPosition(transform0)->expect
        == (0.10000000149011612, 0., 0.)->PositionTool.create;
      });

      describe("fix rotate on axis", () => {
        let _test = (expectedLocalEulerAngles, toFixFunc) => {
          let transform = create()->ResultTool.getExnSuccessValue;

          let localRotation =
            ((-0.02508343756198883), 0., 0., 0.5063101649284363)
            ->RotationTool.create;

          setLocalRotation(transform, localRotation)
          ->ResultTool.getExnSuccessValue;

          toFixFunc(transform);

          rotateWorldOnAxis(
            transform,
            (45.->AngleTool.create, (1., 0., 0.)->AxisVO.create),
          )
          ->ResultTool.getExnSuccessValue;

          getLocalEulerAngles(transform)
          ->EulerAnglesTool.getPrimitiveValue
          ->Vector3Tool.truncate(3)
          ->expect
          == expectedLocalEulerAngles;
        };

        test("the euler angle after rotate on axis is wrong", () =>
          _test((9.811, 0., 0.), _ => ())
        );

        test("should set euler angle before rotate on axis", () =>
          _test((43.543, 0., 0.), transform =>
            setLocalEulerAngles(transform, getLocalEulerAngles(transform))
            ->ResultTool.getExnSuccessValue
          )
        );
      });
    });

    describe("lookAt", () => {
      test("set lookAt will change localToWorld matrix", () => {
        let transform = create()->ResultTool.getExnSuccessValue;

        let target = (0., 0., 1.);

        transform -> lookAt(target) -> ResultTool.getExnSuccessValue;

        getEulerAngles(transform) -> expect
        == (180., -0., 180.) -> EulerAnglesTool.createFromPrimitive;
      })
    })
  });
