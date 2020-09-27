let create = () => {
  (
    [|0.0, 0.5, 0., (-0.5), (-0.5), 0., 0.5, (-0.5), 0.|],
    [|0.5, 1., 0., 0., 1., 0.|],
    [|0., 0., 1., 0., 0., 1., 0., 0., 1.|],
    [|0, 1, 2|],
  )
  ->ComputePointsGeometryDoService.addTangents
  ->CreateDefaultGeometryDoService.create;
};
