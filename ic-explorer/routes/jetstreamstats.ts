import { z } from 'zod';
import { getJetStreamStats } from '../controller';
import { countOfCacheIRTimeseries, timestampEntry } from '../lib/shapes';
import createRouter from '../utils/createRouter';

const input = timestampEntry;

const output = z.array(countOfCacheIRTimeseries);

export default createRouter()
  .query('jetstreamstats', {
    input,
    output,
    async resolve({ input: i }) {
      const stats = await getJetStreamStats(i);
      return stats;
    },
  });
