import { loadFeature, defineFeature } from 'jest-cucumber';
import { createSandbox } from "sinon";
import { exec } from "../../src/jobs/RenderJob"
import { execJob } from '../tool/JobTool';
import { convertToStubType } from "../../../wonder-commonlib-ts/src/SinonUtils";

const feature = loadFeature('./test/features/render_job.feature');

defineFeature(feature, test => {
  let sandbox: any = null;

  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  test('Console info', ({
    when,
    then
  }) => {
    when('I exec job', () => {
      sandbox.stub(console, "log")

      return execJob(exec)
    });

    then(/^I should console "(.*)"$/, (info) => {
      expect(convertToStubType(console.log).getCall(0)).toCalledWith([info])
    });
  });
});
