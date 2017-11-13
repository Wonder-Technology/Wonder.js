open Transform;

open Wonder_jest;

let _ =
  describe(
    "Transform",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      let _judgeOneToOne =
          ((parent, child), (parentLocalPos, parentPos), (childLocalPos, childPos), state) =>
        (
          state |> getTransformLocalPosition(parent),
          state |> getTransformPosition(parent),
          state |> getTransformLocalPosition(child),
          state |> getTransformPosition(child)
        )
        |> expect == (parentLocalPos, parentPos, childLocalPos, childPos);
      let _judgeOneToTwo =
          (
            (parent, child1, child2),
            (parentLocalPos, parentPos),
            (child1LocalPos, child1Pos),
            (child2LocalPos, child2Pos),
            state
          ) =>
        (
          state |> getTransformLocalPosition(parent),
          state |> getTransformPosition(parent),
          state |> getTransformLocalPosition(child1),
          state |> getTransformPosition(child1),
          state |> getTransformLocalPosition(child2),
          state |> getTransformPosition(child2)
        )
        |>
        expect == (parentLocalPos, parentPos, child1LocalPos, child1Pos, child2LocalPos, child2Pos);
      let _prepareOne = () => {
        let (state, transform) = createTransform(state^);
        let pos1 = (1., 2., 3.);
        let pos2 = (5., 10., 30.);
        let state = setTransformPosition(transform, pos1, state);
        (state, transform, pos1, pos2)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "createTransform",
        () => {
          test(
            "create a new transform which is just index(int)",
            () => {
              let (_, transform) = createTransform(state^);
              expect(transform) == 0
            }
          );
          describe(
            "contract check",
            () => {
              let _buildState = (index) =>
                StateDataType.{
                  ...state^,
                  transformData: Some({...Js.Option.getExn(state^.transformData), index})
                };
              beforeEach(
                () => BufferTool.setBufferSize(~transformDataBufferCount=2, state^) |> ignore
              );
              test(
                "index should <= maxCount",
                () => {
                  state := _buildState(2);
                  expect(() => createTransform(state^))
                  |> toThrowMessage("index should <= maxCount")
                }
              )
            }
          );
          describe(
            "change state",
            () =>
              test(
                "state->index + 1",
                () => {
                  let (state, _) = createTransform(state^);
                  TransformTool.getData(state) |> ((data) => expect(data.index) == 1)
                }
              )
          )
        }
      );
      describe(
        "TransformTool.init",
        () =>
          test(
            "update transform",
            () => {
              let (state, parent) = createTransform(state^);
              let (state, child) = createTransform(state);
              let pos = (1., 2., 3.);
              let state =
                state
                |> setTransformLocalPosition(parent, pos)
                |> setTransformParent(Js.Nullable.return(parent), child);
              let state = state |> TransformTool.init;
              state |> getTransformPosition(child) |> expect == pos
            }
          )
      );
      describe(
        "getTransformParent",
        () =>
          test(
            "default value should be Js.Nullable.empty",
            () => {
              let (state, transform) = createTransform(state^);
              getTransformParent(transform, state) |> expect == Js.Nullable.undefined
            }
          )
      );
      describe(
        "setTransformParent",
        () => {
          describe(
            "the change of parent before setted as parent will affect child",
            () => {
              test(
                "test one(parent)-one(child)",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child) = createTransform(state);
                  let pos = (1., 2., 3.);
                  let state =
                    state
                    |> setTransformLocalPosition(parent, pos)
                    |> setTransformParent(Js.Nullable.return(parent), child)
                    |> TransformTool.update;
                  state |> _judgeOneToOne((parent, child), (pos, pos), (TransformTool.getDefaultPosition(), pos))
                }
              );
              test(
                "test one(parent)-two(child)",
                () => {
                  open Vector3System;
                  open Vector3Type;
                  let (state, parent) = createTransform(state^);
                  let (state, child1) = createTransform(state);
                  let (state, child2) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (10., 20., 30.);
                  let state =
                    state
                    |> setTransformLocalPosition(parent, pos1)
                    |> setTransformParent(Js.Nullable.return(parent), child1);
                  let state =
                    state
                    |> setTransformLocalPosition(child2, pos2)
                    |> setTransformParent(Js.Nullable.return(parent), child2);
                  let state = TransformTool.update(state);
                  state
                  |> _judgeOneToTwo(
                       (parent, child1, child2),
                       (pos1, pos1),
                       (TransformTool.getDefaultPosition(), pos1),
                       (pos2, add(Float, pos1, pos2))
                     )
                }
              )
            }
          );
          describe(
            "if set parent to be null, remove its current parent",
            () => {
              describe(
                "test one(parent)-one(child)",
                () => {
                  let exec = () => {
                    let (state, parent) = createTransform(state^);
                    let (state, child) = createTransform(state);
                    let pos = (1., 2., 3.);
                    let state =
                      state
                      |> setTransformLocalPosition(parent, pos)
                      |> setTransformParent(Js.Nullable.return(parent), child);
                    let state =
                      state |> TransformTool.update |> setTransformParent(Js.Nullable.null, child) |> TransformTool.update;
                    (state, parent, child, pos)
                  };
                  test(
                    "test remove its current parent",
                    () => {
                      let (state, _, child, _) = exec();
                      state |> getTransformParent(child) |> expect == Js.Nullable.undefined
                    }
                  );
                  test(
                    "test position and local position",
                    () => {
                      let (state, parent, child, pos) = exec();
                      state
                      |> _judgeOneToOne(
                           (parent, child),
                           (pos, pos),
                           (TransformTool.getDefaultPosition(), TransformTool.getDefaultPosition())
                         )
                    }
                  )
                }
              );
              test(
                "test one(parent)-two(child)",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child1) = createTransform(state);
                  let (state, child2) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (10., 20., 30.);
                  let state =
                    state
                    |> setTransformLocalPosition(parent, pos1)
                    |> setTransformParent(Js.Nullable.return(parent), child1);
                  let state =
                    state
                    |> setTransformLocalPosition(child2, pos2)
                    |> setTransformParent(Js.Nullable.return(parent), child2);
                  let state =
                    state |> TransformTool.update |> setTransformParent(Js.Nullable.null, child2) |> TransformTool.update;
                  state
                  |> _judgeOneToTwo(
                       (parent, child1, child2),
                       (pos1, pos1),
                       (TransformTool.getDefaultPosition(), pos1),
                       (pos2, pos2)
                     )
                }
              )
            }
          );
          describe(
            "if child already has parent",
            () => {
              test(
                "can set the same parent",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child) = createTransform(state);
                  let pos = (1., 2., 3.);
                  let state =
                    setTransformLocalPosition(parent, pos, state)
                    |> setTransformParent(Js.Nullable.return(parent), child);
                  let state =
                    state
                    |> TransformTool.update
                    |> setTransformParent(Js.Nullable.return(parent), child)
                    |> TransformTool.update;
                  state |> getTransformParent(child) |> expect == Js.Nullable.return(parent)
                  /* state |> _judgeOneToOne (parent, child) (pos, pos) (TransformTool.getDefaultPosition (), pos) */
                }
              );
              test(
                "can set different parent",
                () => {
                  let (state, parent1) = createTransform(state^);
                  let (state, parent2) = createTransform(state);
                  let (state, child) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (300., 20., 30.);
                  let state =
                    setTransformLocalPosition(parent1, pos1, state)
                    |> setTransformParent(Js.Nullable.return(parent1), child);
                  let state = state |> TransformTool.update;
                  let state =
                    setTransformLocalPosition(parent2, pos2, state)
                    |> setTransformParent(Js.Nullable.return(parent2), child);
                  state |> getTransformParent(child) |> expect == Js.Nullable.return(parent2)
                }
              )
            }
          )
        }
      );
      describe(
        "getTransformChildren",
        () =>
          test(
            "get parent's all children",
            () => {
              let (state, parent) = createTransform(state^);
              let (state, child1) = createTransform(state);
              let (state, child2) = createTransform(state);
              let state = setTransformParent(Js.Nullable.return(parent), child1, state);
              let state = setTransformParent(Js.Nullable.return(parent), child2, state);
              state |> getTransformChildren(parent) |> expect == [|child1, child2|]
            }
          )
      );
      describe(
        "setTransformLocalPosition",
        () => {
          open Vector3System;
          open Vector3Type;
          let prepare = () => {
            let (state, parent) = createTransform(state^);
            let (state, child) = createTransform(state);
            let pos1 = (1., 2., 3.);
            let pos2 = (5., 10., 30.);
            let state = setTransformParent(Js.Nullable.return(parent), child, state);
            let state =
              state
              |> setTransformLocalPosition(parent, pos1)
              |> setTransformLocalPosition(child, pos2);
            let state = state |> TransformTool.update;
            (state, parent, child, pos1, pos2)
          };
          test(
            "change parent's localPosition should affect children",
            () => {
              let (state, parent, child, _, pos2) = prepare();
              let state = setTransformLocalPosition(parent, pos2, state);
              let state = state |> TransformTool.update;
              state
              |> _judgeOneToOne((parent, child), (pos2, pos2), (pos2, add(Float, pos2, pos2)))
            }
          );
          test(
            "change child's localPosition shouldn't affect parent",
            () => {
              let (state, parent, child, pos1, _) = prepare();
              let state = setTransformLocalPosition(child, pos1, state);
              let state = state |> TransformTool.update;
              state
              |> _judgeOneToOne((parent, child), (pos1, pos1), (pos1, add(Float, pos1, pos1)))
            }
          )
        }
      );
      describe(
        "getTransformPosition",
        () =>
          test(
            "default value should be (0.,0.,0.)",
            () => {
              let (state, transform) = createTransform(state^);
              state |> getTransformPosition(transform) |> expect == TransformTool.getDefaultPosition()
            }
          )
      );
      describe(
        "setTransformPosition",
        () =>
          describe(
            "set position in world coordinate system",
            () => {
              test(
                "change parent's position should affect children",
                () => {
                  open Vector3System;
                  open Vector3Type;
                  let (state, parent) = createTransform(state^);
                  let (state, child) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let state = setTransformParent(Js.Nullable.return(parent), child, state);
                  let state = setTransformLocalPosition(parent, pos1, state);
                  let state = setTransformLocalPosition(child, pos2, state);
                  let state = state |> TransformTool.update;
                  let state = state |> setTransformPosition(parent, pos2);
                  let state = state |> TransformTool.update;
                  state
                  |> _judgeOneToOne((parent, child), (pos2, pos2), (pos2, add(Float, pos2, pos2)))
                }
              );
              test(
                "change child's position shouldn't affect parent",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let pos3 = (2., 3., 4.);
                  let state = setTransformParent(Js.Nullable.return(parent), child, state);
                  let state = setTransformLocalPosition(parent, pos1, state);
                  let state = setTransformLocalPosition(child, pos2, state);
                  let state = state |> TransformTool.update;
                  let state = state |> setTransformPosition(child, pos3);
                  let state = state |> TransformTool.update;
                  state |> _judgeOneToOne((parent, child), (pos1, pos1), ((1., 1., 1.), pos3))
                }
              )
            }
          )
      );
      describe(
        "test before TransformTool.update",
        () => {
          describe(
            "should get the last TransformTool.updated transform data",
            () =>
              test(
                "test get position",
                () => {
                  let (state, transform, pos1, pos2) = _prepareOne();
                  let state = state |> TransformTool.update;
                  let state = setTransformPosition(transform, pos2, state);
                  state |> getTransformPosition(transform) |> expect == pos1
                }
              )
          );
          describe(
            "should get the newest local transform data",
            () =>
              test(
                "test get local position",
                () => {
                  let (state, transform, _, pos2) = _prepareOne();
                  let state = state |> TransformTool.update;
                  let state = setTransformLocalPosition(transform, pos2, state);
                  state |> getTransformLocalPosition(transform) |> expect == pos2
                }
              )
          )
        }
      );
      describe(
        "update",
        () =>{
          test
          ("sort dirtyArray, make parent before child", 
          (
          () => {
              let (state, child) = createTransform(state^);
              let (state, parent) = createTransform(state);
              let pos = (1., 2., 3.);
              let state =
                state
                |> setTransformLocalPosition(child, pos);
              let state =
                state
                |> setTransformLocalPosition(parent, pos)
                |> setTransformParent(Js.Nullable.return(parent), child);
                
              /* let state = state |> TransformTool.init; */
              let state = state |> TransformTool.update;
              (getTransformPosition(child, state), getTransformPosition(parent, state)) |> expect == (Vector3System.add(Float, pos, pos), pos)
 
          })
          );
          test(
            "clean dirty array after compute transform data",
            () => {
              let (state, _, _, _) = _prepareOne();
              let len1 =
                state |> TransformTool.getData |> ((transformData) => Js.Array.length(transformData.dirtyArray));
              let state = state |> TransformTool.update;
              let len2 =
                state |> TransformTool.getData |> ((transformData) => Js.Array.length(transformData.dirtyArray));
              (len1, len2) |> expect == (1, 0)
            }
          )
          }
      );
      describe(
        "getTransformGameObject",
        () =>
          test(
            "get transform's gameObject",
            () => {
              open GameObject;
              let (state, gameObject) = createGameObject(state^);
              let transform = state |> getGameObjectTransformComponent(gameObject);
              state |> getTransformGameObject(transform) |> expect == gameObject
            }
          )
      );
      describe(
        "fix bug",
        () =>
          test(
            "the second transform's default localToWorldMatrix should be identity matrix4 when create two transforms",
            () => {
              open GameObject;
              let (state, transform1) = createTransform(state^);
              let (state, transform2) = createTransform(state);

              TransformTool.getLocalToWorldMatrix(transform2, state)
              |> expect == TransformTool.getDefaultLocalToWorldMatrix()
            }
          )
      )
    }
  );