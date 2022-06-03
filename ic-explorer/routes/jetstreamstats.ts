import { z } from 'zod';
import clientPromise from '../lib/mongodb';
import createRouter from '../utils/createRouter';

const input = z.object({
  name: z.string(),
  timestamp: z.string(),
});

const entry = z.object({
  group: z.number(),
  count0: z.number(),
  count1: z.number(),
  count2: z.number(),
});

const output = z.array(entry);

const pipeline = [
  {
    $set: {
      whenGroup: {
        $floor: {
          $divide: [
            '$when', 100000,
          ],
        },
      },
    },
  }, {
    $project: {
      _id: 1,
      when: 1,
      whenGroup: 1,
      isCount0: {
        $cond: {
          if: {
            $eq: [
              '$mode', 0,
            ],
          },
          then: 1,
          else: 0,
        },
      },
      isCount1: {
        $cond: {
          if: {
            $eq: [
              '$mode', 1,
            ],
          },
          then: 1,
          else: 0,
        },
      },
      isCount2: {
        $cond: {
          if: {
            $eq: [
              '$mode', 2,
            ],
          },
          then: 1,
          else: 0,
        },
      },
    },
  }, {
    $group: {
      _id: '$whenGroup',
      group: {
        $first: '$whenGroup',
      },
      count0: {
        $sum: '$isCount0',
      },
      count1: {
        $sum: '$isCount1',
      },
      count2: {
        $sum: '$isCount2',
      },
    },
  }, {
    $sort: {
      _id: 1,
    },
  },
];

type OutputType = z.infer<typeof entry>;

const jetstreamstats = createRouter()
  .query('jetstreamstats', {
    input,
    output,
    async resolve({ input: i }) {
      const client = await clientPromise;
      const db = client.db('ir');
      const collection = db.collection(`jetstream.${i.name}.${i.timestamp}`);
      const aggregation = await collection.aggregate<OutputType>(pipeline);
      const result = await aggregation.toArray();

      return result;
    },
  });

export default jetstreamstats;
