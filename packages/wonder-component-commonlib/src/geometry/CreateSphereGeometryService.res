let create = (data, radius, bands) =>
  CreateDefaultGeometryService.create(data, ComputeSpherePointsGeometryService.compute(radius, bands))
