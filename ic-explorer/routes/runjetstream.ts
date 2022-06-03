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
        !process.env.RUN_SH || !process.env.RUN_WD
      ) {
        throw new Error('RUN_SH and RUN_WD must be defined in the environment');
      }
      const { stdout, stderr } = await exec(`${process.env.RUN_SH} jetstream ${i.name}`, { cwd: process.env.RUN_WD });
      return {
        output: stdout,
        error: stderr,
      };
    },

  });

export default runjetstream;
export { input };
