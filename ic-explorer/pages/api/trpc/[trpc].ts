import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from '../../../utils/context';
import { appRouter } from '../../../routes/_app';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
});
