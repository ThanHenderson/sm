export const jetstreamStatsPipeline = [
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

export const dummyPipeline = [];
