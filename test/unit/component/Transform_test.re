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
                    let (state, transform) = createTransform !state;
                    expect transform == 0
                  }
                );
              describe
                "ensure check"
                (
                  fun () => {
                    let buildState index count =>
                      StateDataType.{
                        ...!state,
                        transformData: {...(!state).transformData, index, count}
                      };
                    beforeEach (
                      fun () => BufferTool.setBufferSize transformDataBufferCount::2 () |> ignore
                    );
                    test
                      "index should <= maxCount"
                      (
                        fun () => {
                          state := buildState 2 0;
                          expect (
                            fun () => {
                              let (state, transform) = createTransform !state;
                              ()
                            }
                          )
                          |> toThrowMessage "index should <= maxCount"
                        }
                      );
                    test
                      "count should <= maxCount"
                      (
                        fun () => {
                          state := buildState 0 2;
                          expect (
                            fun () => {
                              let (state, transform) = createTransform !state;
                              ()
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
                          let (state, transform) = createTransform !state;
                          getData state |> (fun data => expect data.index == 1)
                        }
                      );
                    test
                      "state->count + 1"
                      (
                        fun () => {
                          let (state, transform) = createTransform !state;
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
                    getTransformParent transform state |> expect == Js.Nullable.empty
                  }
                )
          );
        describe
          "setTransformParent"
          (
            fun () =>
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
                            setTransformLocalPosition parent pos state
                            |> setTransformParent (Js.Nullable.return parent) child
                            |> update;
                          state |> getTransformLocalPosition parent |> expect == pos |> ignore;
                          state
                          |> getTransformLocalPosition child
                          |> expect
                          == getDefaultPosition ()
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
                            setTransformLocalPosition parent pos1 state
                            |> setTransformParent (Js.Nullable.return parent) child1;
                          let state =
                            setTransformLocalPosition child2 pos2 state
                            |> setTransformParent (Js.Nullable.return parent) child2;
                          let state = update state;
                          state |> getTransformLocalPosition parent |> expect == pos1 |> ignore;
                          state
                          |> getTransformLocalPosition child1
                          |> expect
                          == getDefaultPosition ()
                          |> ignore;
                          state |> getTransformLocalPosition child2 |> expect == pos2 |> ignore;
                          state |> getTransformLocalPosition parent |> expect == pos1 |> ignore;
                          state
                          |> getTransformPosition parent
                          |> expect
                          == pos1;
                          state
                          |> getTransformPosition child1
                          |> expect
                          == getDefaultPosition();
                          state |> getTransformLocalPosition child2 |> expect == pos2 |> ignore;
                          state
                          |> getTransformPosition child2
                          |> expect
                          == add Float pos1 pos2 (ArraySystem.createEmpty ())
                        }
                      )
                  }
                )
          )
      }
    );