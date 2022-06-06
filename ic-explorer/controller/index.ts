import {
  CountOfOperations, CountOfCacheIR, CountOfCacheIRTimeseries, TimestampEntry,
} from '../lib/shapes';
import clientPromise from '../utils/mongodb';
import { jetstreamStatsPipeline } from './pipelines';

const getDb = async () => {
  const client = await clientPromise;
  const db = client.db('ir');
  return db;
};

export const getTestLists = async () => {
  const db = await getDb();
  const collections = await db.listCollections({ name: { $regex: '^jetstream' } }).toArray();
  // FIXME unsafe code
  const dupNames = collections.map(({ name }) => name.split('.')[1]);
  const names = [...new Set(dupNames)];
  return names;
};

export const getTestRuns = async (jetstreamTest: string) => {
  const db = await getDb();
  const collections = await db.listCollections({ name: { $regex: `^jetstream.${jetstreamTest}.` } }).toArray();
  // FIXME unsafe code
  const testRuns = collections.map(({ name }) => name.split('.')[2]);
  return testRuns;
};

export const getCountOfOperations = async () => {
  const db = await getDb();
  const collection = db.collection<CountOfOperations>('countOfOperations');
  const operations = (await collection
    .find({})
    .toArray()) as CountOfOperations[];

  return operations;
};

export const getCountOfCacheIR = async () => {
  const db = await getDb();
  const cacheIR = (await db
    .collection<CountOfCacheIR>('countOfCacheIR')
    .find({})
    .toArray()) as CountOfCacheIR[];

  return cacheIR;
};

export const getCountOfCacheIRTimeseries = async () => {
  const db = await getDb();
  const cacheIRTimeseries = (await db
    .collection<CountOfCacheIRTimeseries>('220527-timeseries-using-when')
    .find({})
    .toArray()) as CountOfCacheIRTimeseries[];

  return cacheIRTimeseries;
};

export const getJetStreamStats = async (input: TimestampEntry) => {
  const pipeline = jetstreamStatsPipeline;
  const db = await getDb();
  const collection = db.collection(`jetstream.${input.name}.${input.timestamp}`);
  const aggregation = await collection.aggregate<CountOfCacheIRTimeseries>(pipeline);
  const result = await aggregation.toArray();

  return result;
};
