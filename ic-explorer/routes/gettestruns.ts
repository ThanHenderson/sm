import { z } from 'zod';
import { testNames } from '../lib/shapes';
import createRouter from '../utils/createRouter';
import { getTestRuns } from '../controller';

const input = z.object({
  jetstreamTest: testNames,
});

const output = z.object({
  testRuns: z.array(z.string()),
});

export default createRouter()
  .query('gettestruns', {
    input,
    output,
    async resolve({ input: i }) {
      const { jetstreamTest } = i;
      return { testRuns: await getTestRuns(jetstreamTest) };
    },
  });
