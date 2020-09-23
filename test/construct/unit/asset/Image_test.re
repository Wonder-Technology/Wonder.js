open Wonder_jest;

open ImagePOType;

open WonderBsMost.Most;

open Js.Promise;

let _ =
  describe("Image", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("loadImages", () => {
      testPromise("read all image files and set their data", () => {
        let readImageFile = createEmptyStub(refJsObjToSandbox(sandbox^));
        let id1 = "i1";
        let id2 = "i2";
        let path1 = "p1";
        let path2 = "p2";
        let imageData1 = {
          width: 10,
          height: 10,
          data: Js.Typed_array.Uint8Array.make([|1|]),
        };
        let imageData2 = {
          width: 15,
          height: 20,
          data: Js.Typed_array.Uint8Array.make([|1, 2|]),
        };
        readImageFile
        ->onCall(0, _)
        ->SinonTool.returns(imageData1->just->Result.succeed);
        readImageFile
        ->onCall(1, _)
        ->SinonTool.returns(imageData2->just->Result.succeed);
        DependencyTool.injectNetworkDp(~sandbox, ~readImageFile, ());

        AssetRunAPI.loadImages([(id1, path1), (id2, path2)])
        ->ResultTool.getExnSuccessValue
        ->drain
        ->then_(
            () => {
              (
                (ImageTool.getData(id1), ImageTool.getData(id2))->expect
                == (Some(imageData1), Some(imageData2))
              )
              ->resolve
            },
            _,
          );
      });
      test(
        "if read one image file fail, not really read all image files and directly fail",
        () => {
          let failMessage = "fail";
          let readImageFile = createEmptyStub(refJsObjToSandbox(sandbox^));
          let id1 = "i1";
          let id2 = "i2";
          let id3 = "i3";
          let path1 = "p1";
          let path2 = "p2";
          let path3 = "p3";
          let imageData1 = {
            width: 10,
            height: 10,
            data: Js.Typed_array.Uint8Array.make([|1|]),
          };
          let imageData2 = {
            width: 15,
            height: 20,
            data: Js.Typed_array.Uint8Array.make([|1, 2|]),
          };
          let imageData3 = {
            width: 33,
            height: 30,
            data: Js.Typed_array.Uint8Array.make([|2, 2|]),
          };
          readImageFile
          ->onCall(0, _)
          ->SinonTool.returns(imageData1->just->Result.succeed);
          readImageFile
          ->onCall(1, _)
          ->SinonTool.returns(Result.failWith(failMessage));
          readImageFile
          ->onCall(2, _)
          ->SinonTool.returns(imageData3->just->Result.succeed);
          DependencyTool.injectNetworkDp(~sandbox, ~readImageFile, ());

          AssetRunAPI.loadImages([
            (id1, path1),
            (id2, path2),
            (id3, path3),
          ])
          ->ExpectTool.toFail(failMessage);
        },
      );
    });
  });
