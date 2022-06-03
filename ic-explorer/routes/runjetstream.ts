import { z } from 'zod';
import { exec as e } from 'child_process';
import util from 'util';
import { testNames } from '../lib/shapes';
import createRouter from '../utils/createRouter';

const exec = util.promisify(e);

const input = z.object({
  name: testNames,
});

const output = z.object({
  output: z.string(),
  error: z.string(),
});

const runjetstream = createRouter()
  .mutation('runjetstream', {
    input,
    output,
    async resolve({ input: i }) {
      if (
        !process.env.JETSTREAM_RUN_SH || !process.env.JETSTREAM_RUN_WD
      ) {
        throw new Error('JETSTREAM_RUN_SH and JETSTREAM_RUN_WD must be defined in the environment');
      }
      const { stdout, stderr } = await exec(`${process.env.JETSTREAM_RUN_SH} ${i.name}`, { cwd: process.env.JETSTREAM_RUN_WD });
      return {
        output: stdout,
        error: stderr,
      };
    },

  });

export default runjetstream;
export { input };
