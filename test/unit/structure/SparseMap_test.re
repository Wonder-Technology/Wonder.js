open Wonder_jest;

open SparseMapAPI;

let _ =
  describe("SparseMap", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("unsafeGetSparseMapValue", () =>
      test("test", () => {
        let map = createSparseMap() |> setSparseMapValue(1, "aaa");

        map |> unsafeGetSparseMapValue(1) |> expect == "aaa";
      })
    );

    describe("getSparseMap", () =>
      test("test", () => {
        let map = createSparseMap() |> setSparseMapValue(1, "aaa");

        (map |> getSparseMapValue(0), map |> getSparseMapValue(1))
        |> expect == (None, Some("aaa"));
      })
    );

    describe("mergeSparseMaps", () =>
      test("merge sparse map arr", () => {
        let map1 = createSparseMap() |> setSparseMapValue(1, "aaa");
        let map2 = createSparseMap() |> setSparseMapValue(3, "b");

        SparseMapAPI.mergeSparseMaps([|map1, map2|])
        |>
        expect == (
                    createSparseMap()
                    |> setSparseMapValue(1, "aaa")
                    |> setSparseMapValue(3, "b")
                  );
      })
    );
  });