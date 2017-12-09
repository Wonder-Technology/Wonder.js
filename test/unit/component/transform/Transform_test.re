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
          state |> getTransformLocalPositionTuple(parent),
          state |> getTransformPositionTuple(parent),
          state |> getTransformLocalPositionTuple(child),
          state |> getTransformPositionTuple(child)
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
          state |> getTransformLocalPositionTuple(parent),
          state |> getTransformPositionTuple(parent),
          state |> getTransformLocalPositionTuple(child1),
          state |> getTransformPositionTuple(child1),
          state |> getTransformLocalPositionTuple(child2),
          state |> getTransformPositionTuple(child2)
        )
        |>
        expect == (parentLocalPos, parentPos, child1LocalPos, child1Pos, child2LocalPos, child2Pos);
      let _prepareOne = () => {
        let (state, transform) = createTransform(state^);
        let pos1 = (1., 2., 3.);
        let pos2 = (5., 10., 30.);
        let state = setTransformPositionByTuple(transform, pos1, state);
        (state, transform, pos1, pos2)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
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
          /* describe(
               "contract check",
               () => {
                 let _buildState = (index) =>
                   StateDataType.{
                     ...state^,
                     transformData: Some({...Js.Option.getExn(state^.transformData), index})
                   };
                 beforeEach(
                   () =>
                     state := BufferConfigTool.setBufferSize(state^, ~transformDataBufferCount=2, ())
                 );
                 test(
                   "have create too many components(the count of transforms shouldn't exceed maxCount",
                   () => {
                     state := _buildState(2);
                     expect(() => createTransform(state^))
                     |> toThrowMessage(
                          "have create too many components(the count of transforms shouldn't exceed 2"
                        )
                   }
                 )
               }
             ); */
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
      /* describe(
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
                   |> setTransformLocalPositionByTuple(parent, pos)
                   |> setTransformParent(Js.Nullable.return(parent), child);
                 let state = state |> TransformTool.init;
                 state |> getTransformPositionTuple(child) |> expect == pos
               }
             )
         ); */
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
                    |> setTransformLocalPositionByTuple(parent, pos)
                    |> setTransformParent(Js.Nullable.return(parent), child);
                  state
                  |> _judgeOneToOne(
                       (parent, child),
                       (pos, pos),
                       (TransformTool.getDefaultPosition(), pos)
                     )
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
                    |> setTransformLocalPositionByTuple(parent, pos1)
                    |> setTransformParent(Js.Nullable.return(parent), child1);
                  let state =
                    state
                    |> setTransformLocalPositionByTuple(child2, pos2)
                    |> setTransformParent(Js.Nullable.return(parent), child2);
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
                      |> setTransformLocalPositionByTuple(parent, pos)
                      |> setTransformParent(Js.Nullable.return(parent), child);
                    let state = state |> setTransformParent(Js.Nullable.null, child);
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
                    |> setTransformLocalPositionByTuple(parent, pos1)
                    |> setTransformParent(Js.Nullable.return(parent), child1);
                  let state =
                    state
                    |> setTransformLocalPositionByTuple(child2, pos2)
                    |> setTransformParent(Js.Nullable.return(parent), child2);
                  let state = state |> setTransformParent(Js.Nullable.null, child2);
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
                    setTransformLocalPositionByTuple(parent, pos, state)
                    |> setTransformParent(Js.Nullable.return(parent), child);
                  let state = state |> setTransformParent(Js.Nullable.return(parent), child);
                  state |> getTransformParent(child) |> expect == Js.Nullable.return(parent)
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
                    setTransformLocalPositionByTuple(parent1, pos1, state)
                    |> setTransformParent(Js.Nullable.return(parent1), child);
                  let state =
                    setTransformLocalPositionByTuple(parent2, pos2, state)
                    |> setTransformParent(Js.Nullable.return(parent2), child);
                  state |> getTransformParent(child) |> expect == Js.Nullable.return(parent2)
                }
              )
            }
          );
          describe(
            "fix bug",
            () =>
              test(
                "test two(parent)-two(child)",
                () => {
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
                  let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
                  let (state, gameObject4, transform4) = GameObjectTool.createGameObject(state);
                  let state =
                    state
                    |> Transform.setTransformParent(Js.Nullable.return(transform1), transform3)
                    |> Transform.setTransformParent(Js.Nullable.return(transform2), transform4);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (2., 3., 4.);
                  let pos3 = (4., 3., 4.);
                  let pos4 = (7., 3., 4.);
                  let data = TransformTool.getData(state);
                  let state =
                    state
                    |> Transform.setTransformLocalPositionByTuple(transform1, pos1)
                    |> Transform.setTransformLocalPositionByTuple(transform2, pos2)
                    |> Transform.setTransformLocalPositionByTuple(transform3, pos3)
                    |> Transform.setTransformLocalPositionByTuple(transform4, pos4);
                  (
                    state |> Transform.getTransformPositionTuple(transform1),
                    state |> Transform.getTransformPositionTuple(transform2),
                    state |> Transform.getTransformPositionTuple(transform3),
                    state |> Transform.getTransformPositionTuple(transform4)
                  )
                  |>
                  expect == (
                              pos1,
                              pos2,
                              Vector3System.add(Vector3Type.Float, pos3, pos1),
                              Vector3System.add(Vector3Type.Float, pos4, pos2)
                            )
                }
              )
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
        "setTransformLocalPositionByTuple",
        () => {
          open Vector3System;
          open Vector3Type;
          let _prepare = () => {
            let (state, parent) = createTransform(state^);
            let (state, child) = createTransform(state);
            let pos1 = (1., 2., 3.);
            let pos2 = (5., 10., 30.);
            let state = setTransformParent(Js.Nullable.return(parent), child, state);
            let state =
              state
              |> setTransformLocalPositionByTuple(parent, pos1)
              |> setTransformLocalPositionByTuple(child, pos2);
            (state, parent, child, pos1, pos2)
          };
          test(
            "change parent's localPosition should affect children",
            () => {
              let (state, parent, child, _, pos2) = _prepare();
              let state = setTransformLocalPositionByTuple(parent, pos2, state);
              state
              |> _judgeOneToOne((parent, child), (pos2, pos2), (pos2, add(Float, pos2, pos2)))
            }
          );
          test(
            "change child's localPosition shouldn't affect parent",
            () => {
              let (state, parent, child, pos1, _) = _prepare();
              let state = setTransformLocalPositionByTuple(child, pos1, state);
              state
              |> _judgeOneToOne((parent, child), (pos1, pos1), (pos1, add(Float, pos1, pos1)))
            }
          )
        }
      );
      describe(
        "setTransformLocalPositionByTypeArray",
        () => {
          open Vector3System;
          open Vector3Type;
          open Js.Typed_array;
          let _prepare = () => {
            let (state, parent) = createTransform(state^);
            let (state, child) = createTransform(state);
            let pos1Tuple = (1., 2., 3.);
            let pos2Tuple = (5., 10., 30.);
            let pos1 = Float32Array.make([|1., 2., 3.|]);
            let pos2 = Float32Array.make([|5., 10., 30.|]);
            let state = setTransformParent(Js.Nullable.return(parent), child, state);
            let state =
              state
              |> setTransformLocalPositionByTypeArray(parent, pos1)
              |> setTransformLocalPositionByTypeArray(child, pos2);
            (state, parent, child, pos1, pos1Tuple, pos2, pos2Tuple)
          };
          let _changeTupleToTypeArray = ((x, y, z)) => Float32Array.make([|x, y, z|]);
          test(
            "change parent's localPosition should affect children",
            () => {
              let (state, parent, child, pos1, pos1Tuple, pos2, pos2Tuple) = _prepare();
              let state = setTransformLocalPositionByTypeArray(parent, pos2, state);
              (
                state |> getTransformLocalPositionTypeArray(parent),
                state |> getTransformPositionTypeArray(parent),
                state |> getTransformLocalPositionTypeArray(child),
                state |> getTransformPositionTypeArray(child)
              )
              |>
              expect == (
                          pos2,
                          pos2,
                          pos2,
                          add(Float, pos2Tuple, pos2Tuple) |> _changeTupleToTypeArray
                        )
            }
          )
        }
      );
      describe(
        "getTransformPositionTuple",
        () => {
          test(
            "default value should be (0.,0.,0.)",
            () => {
              let (state, transform) = createTransform(state^);
              state
              |> getTransformPositionTuple(transform)
              |> expect == TransformTool.getDefaultPosition()
            }
          );
          test(
            "can get the newest position",
            () => {
              let (state, parent) = createTransform(state^);
              let (state, child) = createTransform(state);
              let pos = (1., 2., 3.);
              let state =
                state
                |> setTransformLocalPositionByTuple(parent, pos)
                |> setTransformParent(Js.Nullable.return(parent), child);
              state |> getTransformPositionTuple(child) |> expect == pos
            }
          )
        }
      );
      describe(
        "setTransformPositionByTuple",
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
                  let state = setTransformLocalPositionByTuple(parent, pos1, state);
                  let state = setTransformLocalPositionByTuple(child, pos2, state);
                  let state = state |> setTransformPositionByTuple(parent, pos2);
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
                  let state = setTransformLocalPositionByTuple(parent, pos1, state);
                  let state = setTransformLocalPositionByTuple(child, pos2, state);
                  let state = state |> setTransformPositionByTuple(child, pos3);
                  state |> _judgeOneToOne((parent, child), (pos1, pos1), ((1., 1., 1.), pos3))
                }
              )
            }
          )
      );
      /* describe(
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
                     let state = setTransformPositionByTuple(transform, pos2, state);
                     state |> getTransformPositionTuple(transform) |> expect == pos1
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
                     let state = setTransformLocalPositionByTuple(transform, pos2, state);
                     state |> getTransformLocalPositionTuple(transform) |> expect == pos2
                   }
                 )
             )
           }
         ); */
      /* describe(
           "immediately update",
           () => {
             test(
               "sort dirtyArray, make parent before child",
               () => {
                 let (state, child) = createTransform(state^);
                 let (state, parent) = createTransform(state);
                 let pos = (1., 2., 3.);
                 let state = state |> setTransformLocalPositionByTuple(child, pos);
                 let state =
                   state
                   |> setTransformLocalPositionByTuple(parent, pos)
                   |> setTransformParent(Js.Nullable.return(parent), child);
                 /* let state = state |> TransformTool.init; */
                 let state = state |> TransformTool.update;
                 (getTransformPositionTuple(child, state), getTransformPositionTuple(parent, state))
                 |> expect == (Vector3System.add(Float, pos, pos), pos)
               }
             );
             test(
               "clean dirty array after compute transform data",
               () => {
                 let (state, _, _, _) = _prepareOne();
                 let len1 =
                   state
                   |> TransformTool.getData
                   |> ((transformData) => Js.Array.length(transformData.dirtyArray));
                 let state = state |> TransformTool.update;
                 let len2 =
                   state
                   |> TransformTool.getData
                   |> ((transformData) => Js.Array.length(transformData.dirtyArray));
                 (len1, len2) |> expect == (1, 0)
               }
             )
           }
         ); */
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
      /* describe(
           "getLocalToWorldMatrixTypeArray",
           () =>
             describe(
               "test cache",
               () => {
                 test(
                   "cache data after first get",
                   () => {
                     open GameObject;
                     let (state, transform1) = createTransform(state^);
                     let pos1 = (1., 2., 3.);
                     let state = state |> setTransformLocalPositionByTuple(transform1, pos1);
                     let mat1 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                     let mat2 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                     mat1 |> expect == mat2
                   }
                 );
                 describe(
                   "test cache invalid",
                   () => {
                     let _prepare = (state) => {
                       open GameObject;
                       let (state, transform1) = createTransform(state^);
                       let pos1 = (1., 2., 3.);
                       let state = state |> setTransformLocalPositionByTuple(transform1, pos1);
                       let mat1 =
                         TransformTool.getLocalToWorldMatrixTypeArray(transform1, state)
                         |> Js.Typed_array.Float32Array.copy;
                       (state, transform1, mat1)
                     };
                     test(
                       "invalid after change local position",
                       () => {
                         let (state, transform1, mat1) = _prepare(state);
                         let pos2 = (2., 2., 3.);
                         let state = state |> setTransformLocalPositionByTuple(transform1, pos2);
                         let mat2 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                         mat1 |> expect |> not_ |> toEqual(mat2)
                       }
                     );
                     test(
                       "invalid after change position",
                       () => {
                         let (state, transform1, mat1) = _prepare(state);
                         let pos2 = (2., 2., 3.);
                         let state = state |> setTransformPositionByTuple(transform1, pos2);
                         let mat2 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                         mat1 |> expect |> not_ |> toEqual(mat2)
                       }
                     );
                     test(
                       "test get position after change local position",
                       () => {
                         let (state, transform1, mat1) = _prepare(state);
                         let pos2 = (2., 2., 3.);
                         let state = state |> setTransformLocalPositionByTuple(transform1, pos2);
                         let _ = state |> getTransformPositionTuple(transform1);
                         let mat2 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                         mat1 |> expect |> not_ |> toEqual(mat2)
                       }
                     )
                   }
                 )
               }
             )
         ); */
      describe(
        "dispose component",
        () => {
          let dispose = (transform, state) => TransformTool.dispose(transform, state);
          let _prepare = () => {
            let (state, transform1) = createTransform(state^);
            let (state, transform2) = createTransform(state);
            let state = state |> setTransformParent(Js.Nullable.return(transform1), transform2);
            (state, transform1, transform2)
          };
          describe(
            "test if dirty",
            () =>
              test(
                "the disposed transform shouldn't affect other alive ones' data",
                () => {
                  let (state, transform1) = createTransform(state^);
                  let (state, transform2) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let state =
                    state
                    |> setTransformLocalPositionByTuple(transform1, pos1)
                    |> setTransformLocalPositionByTuple(transform2, pos2);
                  let state = state |> dispose(transform1);
                  state |> getTransformLocalPositionTuple(transform2) |> expect == pos2
                }
              )
          );
          describe(
            "test if not dirty",
            () =>
              test(
                "the disposed transform shouldn't affect other alive ones' data",
                () => {
                  let (state, transform1) = createTransform(state^);
                  let (state, transform2) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let state =
                    state
                    |> setTransformLocalPositionByTuple(transform1, pos1)
                    |> setTransformLocalPositionByTuple(transform2, pos2);
                  let state = state |> dispose(transform1);
                  state |> getTransformLocalPositionTuple(transform2) |> expect == pos2
                }
              )
          );
          describe(
            "if child is disposed",
            () => {
              test(
                "should remove it from childMap",
                () => {
                  let (state, transform1) = createTransform(state^);
                  let (state, transform2) = createTransform(state);
                  let state =
                    state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                  let state = state |> dispose(transform2);
                  state |> getTransformChildren(transform1) |> expect == [||]
                }
              );
              describe(
                "shouldn't affect parent",
                () => {
                  test(
                    "test disposed one has no parent",
                    () => {
                      let (state, transform1, transform2) = _prepare();
                      let pos1 = (1., 2., 3.);
                      let pos2 = (5., 10., 30.);
                      let state =
                        state
                        |> setTransformLocalPositionByTuple(transform1, pos1)
                        |> setTransformLocalPositionByTuple(transform2, pos2);
                      let state = state |> dispose(transform1);
                      state |> getTransformPositionTuple(transform2) |> expect == pos2
                    }
                  );
                  test(
                    "test disposed one has parent",
                    () => {
                      open Vector3System;
                      open Vector3Type;
                      let (state, transform1, transform2) = _prepare();
                      let (state, transform0) = createTransform(state);
                      let state =
                        state |> setTransformParent(Js.Nullable.return(transform0), transform1);
                      let pos0 = (2., 4., 6.);
                      let pos1 = (1., 2., 3.);
                      let pos2 = (5., 10., 30.);
                      let state =
                        state
                        |> setTransformLocalPositionByTuple(transform0, pos0)
                        |> setTransformLocalPositionByTuple(transform1, pos1)
                        |> setTransformLocalPositionByTuple(transform2, pos2);
                      let state = state |> dispose(transform2);
                      (
                        state |> getTransformPositionTuple(transform0),
                        state |> getTransformPositionTuple(transform1)
                      )
                      |> expect == (pos0, add(Float, pos0, pos1))
                    }
                  )
                }
              )
            }
          );
          describe(
            "if parent is disposed",
            () => {
              test(
                "should remove it from parentMap",
                () => {
                  let (state, transform1, transform2) = _prepare();
                  let state = state |> dispose(transform1);
                  state |> getTransformParent(transform2) |> expect == Js.Nullable.undefined
                }
              );
              test(
                "should affect children",
                () => {
                  open Vector3System;
                  open Vector3Type;
                  let (state, transform1, transform2) = _prepare();
                  let (state, transform0) = createTransform(state);
                  let state =
                    state |> setTransformParent(Js.Nullable.return(transform0), transform1);
                  let pos0 = (2., 4., 6.);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let state =
                    state
                    |> setTransformLocalPositionByTuple(transform0, pos0)
                    |> setTransformLocalPositionByTuple(transform1, pos1)
                    |> setTransformLocalPositionByTuple(transform2, pos2);
                  let state = state |> dispose(transform0);
                  (
                    state |> getTransformPositionTuple(transform1),
                    state |> getTransformPositionTuple(transform2)
                  )
                  |> expect == (pos1, add(Float, pos1, pos2))
                }
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              /* beforeEach(
                   () =>
                     state := BufferConfigTool.setBufferSize(state^, ~transformDataBufferCount=2, ())
                 ); */
              test(
                "if has disposed one, use disposed index(transform) as new index",
                () => {
                  let (state, transform1, transform2) = _prepare();
                  let state = state |> dispose(transform1);
                  let state = state |> dispose(transform2);
                  let (state, transform3) = createTransform(state);
                  let (state, transform4) = createTransform(state);
                  (transform3, transform4) |> expect == (transform2, transform1)
                }
              );
              test(
                "else, increase transformData.index",
                () => {
                  let (state, transform1, transform2) = _prepare();
                  let (state, transform3) = createTransform(state);
                  transform3 |> expect == transform2 + 1
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose the component which isn't alive",
                () => {
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let state =
                    state
                    |> GameObject.disposeGameObjectTransformComponent(gameObject1, transform1);
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObject.disposeGameObjectTransformComponent(gameObject1, transform1);
                      ()
                    }
                  )
                  |> toThrowMessage("shouldn't dispose the component which isn't alive")
                }
              )
          )
        }
      );
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if transform is disposed",
            () => {
              let _testGetFunc = (getFunc) => {
                let (state, transform1) = createTransform(state^);
                let state = state |> TransformTool.dispose(transform1);
                expect(() => getFunc(transform1, state))
                |> toThrowMessage("component should alive")
              };
              let _testSetFunc = (setFunc) => {
                let (state, transform1) = createTransform(state^);
                let state = state |> TransformTool.dispose(transform1);
                expect(() => setFunc(Obj.magic(transform1), Obj.magic(1), state))
                |> toThrowMessage("component should alive")
              };
              test(
                "getTransformPositionTypeArray should error",
                () => _testGetFunc(getTransformPositionTypeArray)
              );
              test(
                "getTransformPositionTuple should error",
                () => _testGetFunc(getTransformPositionTuple)
              );
              test(
                "getTransformLocalPositionTypeArray should error",
                () => _testGetFunc(getTransformLocalPositionTypeArray)
              );
              test(
                "getTransformLocalPositionTuple should error",
                () => _testGetFunc(getTransformLocalPositionTuple)
              );
              test("getTransformParent should error", () => _testGetFunc(getTransformParent));
              test("getTransformChildren should error", () => _testGetFunc(getTransformChildren));
              test(
                "getTransformGameObject should error",
                () => _testGetFunc(getTransformGameObject)
              );
              test(
                "setTransformPositionByTypeArray should error",
                () => _testSetFunc(setTransformPositionByTypeArray)
              );
              test(
                "setTransformPositionByTuple should error",
                () => _testSetFunc(setTransformPositionByTuple)
              );
              test(
                "setTransformLocalPositionByTypeArray should error",
                () => _testSetFunc(setTransformLocalPositionByTypeArray)
              );
              test(
                "setTransformLocalPositionByTuple should error",
                () => _testSetFunc(setTransformLocalPositionByTuple)
              );
              test("setTransformParent should error", () => _testSetFunc(setTransformParent))
            }
          )
      );
      describe(
        "fix bug",
        () => {
          test(
            "the second transform's default localToWorldMatrix should be identity matrix4 when create two transforms",
            () => {
              open GameObject;
              let (state, transform1) = createTransform(state^);
              let (state, transform2) = createTransform(state);
              TransformTool.getLocalToWorldMatrixTypeArray(transform2, state)
              |> expect == TransformTool.getDefaultLocalToWorldMatrix()
            }
          );
          test(
            "get the data from Float32Array may not equal to the value which is setted",
            () => {
              let (state, transform0) = createTransform(state^);
              let pos0 = (0.1, 0., 0.);
              let state = state |> setTransformLocalPositionByTuple(transform0, pos0);
              state
              |> getTransformLocalPositionTuple(transform0)
              |> expect == (0.10000000149011612, 0., 0.)
            }
          )
        }
      )
    }
  );