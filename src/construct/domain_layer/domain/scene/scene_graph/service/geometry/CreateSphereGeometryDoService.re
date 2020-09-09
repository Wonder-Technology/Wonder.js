let create = (radius, bands) => {
  CreateDefaultGeometryDoService.create(
    ComputeSpherePointsGeometryDoService.compute(radius, bands),
  );
};
