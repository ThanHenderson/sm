import createRouter from '../utils/createRouter';
import gettestruns from './gettestruns';
import jetstreamstats from './jetstreamstats';
import runjetstream from './runjetstream';

export const appRouter = createRouter()
  .merge(jetstreamstats)
  .merge(gettestruns)
  .merge(runjetstream);

export type AppRouter = typeof appRouter;
