import { z } from 'zod';
import clientPromise from '../lib/mongodb';
import { testNames } from '../lib/shapes';
import createRouter from '../utils/createRouter';

const input = z.object({
  jetstreamTest: testNames,
});

const output = z.object({
  testRuns: z.array(z.string()),
});

const gettestruns = createRouter()
  .query('gettestruns', {
    input,
    output,
    async resolve({ input: i }) {
      const { jetstreamTest } = i;
      const client = await clientPromise;
      const db = client.db('ir');
      const collections = await db.listCollections({ name: { $regex: `^jetstream.${jetstreamTest}.` } }).toArray();
      // FIXME unsafe code
      const testRuns = collections.map(({ name }) => name.split('.')[2]);
      return { testRuns };
    },
  });

export default gettestruns;
