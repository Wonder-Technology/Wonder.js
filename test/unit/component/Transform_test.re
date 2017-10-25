open Transform;

open TransformTool;

open Jest;

let _ =
  describe
    "Transform"
    (
      fun () => {
        open Expect;
        open! Expect.Operators;
        open Sinon;
        let sandbox = getSandboxDefaultVal ();
        let state = ref (StateSystem.createState ());
        let _judgeOneToOne
            (parent, child)
            (parentLocalPos, parentPos)
            (childLocalPos, childPos)
            state =>
          (
            state |> getTransformLocalPosition parent,
            state |> getTransformPosition parent,
            state |> getTransformLocalPosition child,
            state |> getTransformPosition child
          )
          |> expect
          == (parentLocalPos, parentPos, childLocalPos, childPos);
        let _judgeOneToTwo
            (parent, child1, child2)
            (parentLocalPos, parentPos)
            (child1LocalPos, child1Pos)
            (child2LocalPos, child2Pos)
            state =>
          (
            state |> getTransformLocalPosition parent,
            state |> getTransformPosition parent,
            state |> getTransformLocalPosition child1,
            state |> getTransformPosition child1,
            state |> getTransformLocalPosition child2,
            state |> getTransformPosition child2
          )
          |> expect
          == (parentLocalPos, parentPos, child1LocalPos, child1Pos, child2LocalPos, child2Pos);
        let _prepareOne () => {
          let (state, transform) = createTransform !state;
          let pos1 = (1., 2., 3.);
          let pos2 = (5., 10., 30.);
          let state = setTransformPosition transform pos1 state;
          (state, transform, pos1, pos2)
        };
        beforeEach (
          fun () => {
            sandbox := createSandbox ();
            state := TestTool.init ()
          }
        );
        afterEach (fun () => restoreSandbox (refJsObjToSandbox !sandbox));
        describe
          "create"
          (
            fun () => {
              test
                "create a new transform which is just index(int)"
                (
                  fun () => {
                    let (_, transform) = createTransform !state;
                    expect transform == 0
                  }
                );
              describe
                "ensure check"
                (
                  fun () => {
                    let _buildState index count =>
                      StateDataType.{
                        ...!state,
                        transformData:
                          Some {...Js.Option.getExn (!state).transformData, index, count}
                      };
                    beforeEach (
                      fun () =>
                        BufferTool.setBufferSize transformDataBufferCount::2 !state |> ignore
                    );
                    test
                      "index should <= maxCount"
                      (
                        fun () => {
                          state := _buildState 2 0;
                          expect (
                            fun () => {
                              createTransform !state;
                            }
                          )
                          |> toThrowMessage "index should <= maxCount"
                        }
                      );
                    test
                      "count should <= maxCount"
                      (
                        fun () => {
                          state := _buildState 0 2;
                          expect (
                            fun () => {
                              createTransform !state;
                            }
                          )
                          |> toThrowMessage "count should <= maxCount"
                        }
                      )
                  }
                );
              describe
                "change state"
                (
                  fun () => {
                    test
                      "state->index + 1"
                      (
                        fun () => {
                          let (state, _) = createTransform !state;
                          getData state |> (fun data => expect data.index == 1)
                        }
                      );
                    test
                      "state->count + 1"
                      (
                        fun () => {
                          let (state, _) = createTransform !state;
                          getData state |> (fun data => expect data.count == 1)
                        }
                      )
                  }
                )
            }
          );
        describe
          "getTransformParent"
          (
            fun () =>
              test
                "default value should be Js.Nullable.empty"
                (
                  fun () => {
                    let (state, transform) = createTransform !state;
                    getTransformParent transform state |> expect == Js.Nullable.undefined
                  }
                )
          );
        describe
          "setTransformParent"
          (
            fun () => {
              describe
                "the change of parent before setted as parent will affect child"
                (
                  fun () => {
                    test
                      "test one(parent)-one(child)"
                      (
                        fun () => {
                          let (state, parent) = createTransform !state;
                          let (state, child) = createTransform state;
                          let pos = (1., 2., 3.);
                          let state =
                            state
                            |> setTransformLocalPosition parent pos
                            |> setTransformParent (Js.Nullable.return parent) child
                            |> update;
                          state
                          |> _judgeOneToOne (parent, child) (pos, pos) (getDefaultPosition (), pos)
                        }
                      );
                    test
                      "test one(parent)-two(child)"
                      (
                        fun () => {
                          open Vector3System;
                          open Vector3Type;
                          let (state, parent) = createTransform !state;
                          let (state, child1) = createTransform state;
                          let (state, child2) = createTransform state;
                          let pos1 = (1., 2., 3.);
                          let pos2 = (10., 20., 30.);
                          let state =
                            state
                            |> setTransformLocalPosition parent pos1
                            |> setTransformParent (Js.Nullable.return parent) child1;
                          let state =
                            state
                            |> setTransformLocalPosition child2 pos2
                            |> setTransformParent (Js.Nullable.return parent) child2;
                          let state = update state;
                          state
                          |> _judgeOneToTwo
                               (parent, child1, child2)
                               (pos1, pos1)
                               (getDefaultPosition (), pos1)
                               (pos2, add Float pos1 pos2)
                        }
                      )
                  }
                );
              describe
                "if set parent to be null, remove its current parent"
                (
                  fun () => {
                    describe
                      "test one(parent)-one(child)"
                      (
                        fun () => {
                          let exec () => {
                            let (state, parent) = createTransform !state;
                            let (state, child) = createTransform state;
                            let pos = (1., 2., 3.);
                            let state =
                              state
                              |> setTransformLocalPosition parent pos
                              |> setTransformParent (Js.Nullable.return parent) child;
                            let state =
                              state
                              |> update
                              |> setTransformParent Js.Nullable.null child
                              |> update;
                            (state, parent, child, pos)
                          };
                          test
                            "test remove its current parent"
                            (
                              fun () => {
                                let (state, _, child, _) = exec ();
                                state
                                |> getTransformParent child
                                |> expect
                                == Js.Nullable.undefined
                              }
                            );
                          test
                            "test position and local position"
                            (
                              fun () => {
                                let (state, parent, child, pos) = exec ();
                                state
                                |> _judgeOneToOne
                                     (parent, child)
                                     (pos, pos)
                                     (getDefaultPosition (), getDefaultPosition ())
                              }
                            )
                        }
                      );
                    test
                      "test one(parent)-two(child)"
                      (
                        fun () => {
                          let (state, parent) = createTransform !state;
                          let (state, child1) = createTransform state;
                          let (state, child2) = createTransform state;
                          let pos1 = (1., 2., 3.);
                          let pos2 = (10., 20., 30.);
                          let state =
                            state
                            |> setTransformLocalPosition parent pos1
                            |> setTransformParent (Js.Nullable.return parent) child1;
                          let state =
                            state
                            |> setTransformLocalPosition child2 pos2
                            |> setTransformParent (Js.Nullable.return parent) child2;
                          let state =
                            state |> update |> setTransformParent Js.Nullable.null child2 |> update;
                          state
                          |> _judgeOneToTwo
                               (parent, child1, child2)
                               (pos1, pos1)
                               (getDefaultPosition (), pos1)
                               (pos2, pos2)
                        }
                      )
                  }
                );
              describe
                "if child already has parent"
                (
                  fun () => {
                    test
                      "can set the same parent"
                      (
                        fun () => {
                          let (state, parent) = createTransform !state;
                          let (state, child) = createTransform state;
                          let pos = (1., 2., 3.);
                          let state =
                            setTransformLocalPosition parent pos state
                            |> setTransformParent (Js.Nullable.return parent) child;
                          let state =
                            state
                            |> update
                            |> setTransformParent (Js.Nullable.return parent) child
                            |> update;
                          state |> getTransformParent child |> expect == Js.Nullable.return parent
                          /* state |> _judgeOneToOne (parent, child) (pos, pos) (getDefaultPosition (), pos) */
                        }
                      );
                    test
                      "can set different parent"
                      (
                        fun () => {
                          let (state, parent1) = createTransform !state;
                          let (state, parent2) = createTransform state;
                          let (state, child) = createTransform state;
                          let pos1 = (1., 2., 3.);
                          let pos2 = (300., 20., 30.);
                          let state =
                            setTransformLocalPosition parent1 pos1 state
                            |> setTransformParent (Js.Nullable.return parent1) child;
                          let state = state |> update;
                          let state =
                            setTransformLocalPosition parent2 pos2 state
                            |> setTransformParent (Js.Nullable.return parent2) child;
                          state |> getTransformParent child |> expect == Js.Nullable.return parent2
                        }
                      )
                  }
                )
            }
          );
        describe
          "getTransformChildren"
          (
            fun () =>
              test
                "get parent's all children"
                (
                  fun () => {
                    let (state, parent) = createTransform !state;
                    let (state, child1) = createTransform state;
                    let (state, child2) = createTransform state;
                    let state = setTransformParent (Js.Nullable.return parent) child1 state;
                    let state = setTransformParent (Js.Nullable.return parent) child2 state;
                    state |> getTransformChildren parent |> expect == [|child1, child2|]
                  }
                )
          );
        describe
          "setTransformLocalPosition"
          (
            fun () => {
              open Vector3System;
              open Vector3Type;
              let prepare () => {
                let (state, parent) = createTransform !state;
                let (state, child) = createTransform state;
                let pos1 = (1., 2., 3.);
                let pos2 = (5., 10., 30.);
                let state = setTransformParent (Js.Nullable.return parent) child state;
                let state =
                  state
                  |> setTransformLocalPosition parent pos1
                  |> setTransformLocalPosition child pos2;
                let state = state |> update;
                (state, parent, child, pos1, pos2)
              };
              test
                "change parent's localPosition should affect children"
                (
                  fun () => {
                    let (state, parent, child, _, pos2) = prepare ();
                    let state = setTransformLocalPosition parent pos2 state;
                    let state = state |> update;
                    state
                    |> _judgeOneToOne (parent, child) (pos2, pos2) (pos2, add Float pos2 pos2)
                  }
                );
              test
                "change child's localPosition shouldn't affect parent"
                (
                  fun () => {
                    let (state, parent, child, pos1, _) = prepare ();
                    let state = setTransformLocalPosition child pos1 state;
                    let state = state |> update;
                    state
                    |> _judgeOneToOne (parent, child) (pos1, pos1) (pos1, add Float pos1 pos1)
                  }
                )
            }
          );
        describe
          "getTransformPosition"
          (
            fun () =>
              test
                "default value should be (0.,0.,0.)"
                (
                  fun () => {
                    let (state, transform) = createTransform !state;
                    state |> getTransformPosition transform |> expect == getDefaultPosition ()
                  }
                )
          );
        describe
          "setTransformPosition"
          (
            fun () =>
              describe
                "set position in world coordinate system"
                (
                  fun () => {
                    test
                      "change parent's position should affect children"
                      (
                        fun () => {
                          open Vector3System;
                          open Vector3Type;
                          let (state, parent) = createTransform !state;
                          let (state, child) = createTransform state;
                          let pos1 = (1., 2., 3.);
                          let pos2 = (5., 10., 30.);
                          let state = setTransformParent (Js.Nullable.return parent) child state;
                          let state = setTransformLocalPosition parent pos1 state;
                          let state = setTransformLocalPosition child pos2 state;
                          let state = state |> update;
                          let state = state |> setTransformPosition parent pos2;
                          let state = state |> update;
                          state
                          |> _judgeOneToOne
                               (parent, child) (pos2, pos2) (pos2, add Float pos2 pos2)
                        }
                      );
                    test
                      "change child's position shouldn't affect parent"
                      (
                        fun () => {
                          open Vector3System;
                          open Vector3Type;
                          let (state, parent) = createTransform !state;
                          let (state, child) = createTransform state;
                          let pos1 = (1., 2., 3.);
                          let pos2 = (5., 10., 30.);
                          let pos3 = (2., 3., 4.);
                          let state = setTransformParent (Js.Nullable.return parent) child state;
                          let state = setTransformLocalPosition parent pos1 state;
                          let state = setTransformLocalPosition child pos2 state;
                          let state = state |> update;
                          let state = state |> setTransformPosition child pos3;
                          let state = state |> update;
                          state
                          |> _judgeOneToOne
                               (parent, child)
                               (pos1, pos1)
                               (add Float pos3 pos1, add Float (add Float pos3 pos1) pos1)
                        }
                      )
                  }
                )
          );
        describe
          "test before update"
          (
            fun () => {
              describe
                "should get the last updated transform data"
                (
                  fun () =>
                    test
                      "test get position"
                      (
                        fun () => {
                          let (state, transform, pos1, pos2) = _prepareOne ();
                          let state = state |> update;
                          let state = setTransformPosition transform pos2 state;
                          state |> getTransformPosition transform |> expect == pos1
                        }
                      )
                );
              describe
                "should get the newest local transform data"
                (
                  fun () =>
                    test
                      "test get local position"
                      (
                        fun () => {
                          let (state, transform, _, pos2) = _prepareOne ();
                          let state = state |> update;
                          let state = setTransformLocalPosition transform pos2 state;
                          state |> getTransformLocalPosition transform |> expect == pos2
                        }
                      )
                )
            }
          );
        describe
          "update"
          (
            fun () =>
              test
                "clean dirty list after compute transform data"
                (
                  fun () => {
                    let (state, _,_,_) = _prepareOne ();
                    let len1 =
                      state
                      |> getData
                      |> (fun transformData => ArraySystem.length transformData.dirtyList);
                    let state = state |> update;
                    let len2 =
                      state
                      |> getData
                      |> (fun transformData => ArraySystem.length transformData.dirtyList);
                    (len1, len2) |> expect == (1, 0)
                  }
                )
          )
      }
    );