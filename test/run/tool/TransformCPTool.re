open Js.Typed_array;

let buildRepoWithTwoTransforms = sandbox => {
  let transform1 = 1->Obj.magic;
  let transform2 = (-2)->Obj.magic;

  let pos1 = (0., 1., 0.);
  let pos2 = (2., 1., 0.);
  let scale1 = (1., 2., 3.);
  let scale2 = (5., 10., 30.);
  let eulerAngles1 = (1., 2., 3.);
  let eulerAngles2 = (5.5, 10., 30.);
  let rotation1 = (0.5, 1.5, 2., 3.5);
  let rotation2 = (1.5, 5.5, (-2.), 4.5);

  let normalMatrix1 =
    Float32Array.make([|
      0.9980211853981018,
      0.05230407789349556,
      (-0.03489949554204941),
      (-0.02585987187922001),
      0.49925467371940613,
      0.008720887824892998,
      0.011919915676116943,
      (-0.005200756248086691),
      0.3330795168876648,
    |]);
  let normalMatrix2 =
    Float32Array.make([|
      0.17057371139526367,
      0.09848077595233917,
      (-0.03472963720560074),
      (-0.04832844436168671),
      0.08703601360321045,
      0.009438963606953621,
      0.006587142590433359,
      0.00011398360948078334,
      0.03267579525709152,
    |]);

  let localToWorldMatrix1 =
    Float32Array.make([|
      0.9980211853981018,
      0.05230407789349556,
      (-0.03489949554204941),
      0.,
      (-0.10343948006629944),
      1.997018575668335,
      0.03488355129957199,
      0.,
      0.10727924853563309,
      (-0.046806808561086655),
      2.997715950012207,
      0.,
      0.,
      1.,
      0.,
      1.,
    |]);
  let localToWorldMatrix2 =
    Float32Array.make([|
      4.264342784881592,
      2.462019205093384,
      (-0.8682408928871155),
      0.,
      (-4.832844257354736),
      8.703600883483887,
      0.9438963532447815,
      0.,
      5.9284281730651855,
      0.10258530080318451,
      29.40821647644043,
      0.,
      2.,
      1.,
      0.,
      1.,
    |]);

  (
    SceneGraphRepoDependencyTool.buildTransformRepo(
      ~sandbox,
      ~getLocalPosition=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => pos1
          | transform when transform == transform2 => pos2
          },
      ~getLocalRotation=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => rotation1
          | transform when transform == transform2 => rotation2
          },
      ~getLocalEulerAngles=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => eulerAngles1
          | transform when transform == transform2 => eulerAngles2
          },
      ~getLocalScale=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => scale1
          | transform when transform == transform2 => scale2
          },
      ~getPosition=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => pos1
          | transform when transform == transform2 => pos2
          },
      ~getRotation=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => rotation1
          | transform when transform == transform2 => rotation2
          },
      ~getScale=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => scale1
          | transform when transform == transform2 => scale2
          },
      ~getLocalToWorldMatrix=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => localToWorldMatrix1
          | transform when transform == transform2 => localToWorldMatrix2
          },
      ~getNormalMatrix=
        transform =>
          switch (transform) {
          | transform when transform == transform1 => normalMatrix1
          | transform when transform == transform2 => normalMatrix2
          },
      (),
    ),
    (transform1, transform2),
  );
};
