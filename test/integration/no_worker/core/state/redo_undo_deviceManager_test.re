open Wonder_jest;

open Js.Typed_array;

open AllDeviceManagerType;

let _ =
  describe("test redo,undo deviceManager record", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _prepareDeviceManagerData = state => {
      open AllDeviceManagerType;
      let record = DeviceManagerTool.getDeviceManagerRecord(state);
      let gl = Obj.magic(RandomTool.getRandomFloat(10.));
      let depthWrite = Some(true);
      let colorWrite = Some((true, true, true, false));
      let clearColor = Some((1., 0.1, 0.2, 1.));
      let side = Some(BOTH);
      let depthTest = Some(true);
      let scissorTest = Some(true);
      let viewport = Some((1, 3, 10, 20));
      let scissor = Some((2, 4, 11, 21));
      (
        {
          ...state,
          deviceManagerRecord: {
            gl: Some(gl),
            depthWrite,
            colorWrite,
            clearColor,
            side,
            depthTest,
            scissorTest,
            viewport,
            scissor,
          },
        },
        Some(gl),
        (
          depthWrite,
          colorWrite,
          clearColor,
          side,
          depthTest,
          scissorTest,
          viewport,
          scissor,
        ),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("deep copy deviceManager record", () => {
      test("gl not changed", () => {
        let (state, oldGl, _) = _prepareDeviceManagerData(state^);

        let copiedState = MainStateTool.deepCopyForRestore(state);

        DeviceManagerTool.getGl(copiedState) |> expect == oldGl;
      });
      test("directly use readonly data", () => {
        let (
          state,
          gl,
          (
            depthWrite,
            colorWrite,
            clearColor,
            side,
            depthTest,
            scissorTest,
            viewport,
            scissor,
          ),
        ) =
          _prepareDeviceManagerData(state^);
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let targetData = DeviceManagerTool.getDeviceManagerRecord(state);
        let copiedData =
          DeviceManagerTool.getDeviceManagerRecord(copiedState);
        (
          copiedData.depthWrite,
          copiedData.colorWrite,
          copiedData.clearColor,
          copiedData.side,
          copiedData.depthTest,
          copiedData.scissorTest,
          copiedData.viewport,
          copiedData.scissor,
        )
        |>
        expect == (
                    targetData.depthWrite,
                    targetData.colorWrite,
                    targetData.clearColor,
                    targetData.side,
                    targetData.depthTest,
                    targetData.scissorTest,
                    targetData.viewport,
                    targetData.scissor,
                  );
      });
    });

    describe("restore deviceManager record", () => {
      test("use current state->gl", () => {
        let (state, _, _) = _prepareDeviceManagerData(state^);
        let (currentState, gl, _) =
          _prepareDeviceManagerData(
            MainStateTool.createNewCompleteState(sandbox),
          );

        let newState = MainStateTool.restore(currentState, state);

        DeviceManagerTool.getGl(newState) |> expect == gl;
      });
      test("use current state->data", () => {
        let (state, _, _) = _prepareDeviceManagerData(state^);
        let (currentState, _, _) =
          _prepareDeviceManagerData(
            MainStateTool.createNewCompleteState(sandbox),
          );
        let targetData = DeviceManagerTool.getDeviceManagerRecord(state);
        let currentData = DeviceManagerTool.getDeviceManagerRecord(state);

        let newState = MainStateTool.restore(currentState, state);

        let newData = DeviceManagerTool.getDeviceManagerRecord(newState);
        (
          newData.depthWrite,
          newData.colorWrite,
          newData.clearColor,
          newData.side,
          newData.depthTest,
          newData.scissorTest,
          newData.viewport,
          newData.scissor,
        )
        |>
        expect == (
                    currentData.depthWrite,
                    currentData.colorWrite,
                    currentData.clearColor,
                    currentData.side,
                    currentData.depthTest,
                    currentData.scissorTest,
                    currentData.viewport,
                    currentData.scissor,
                  );
      });
    });
  });