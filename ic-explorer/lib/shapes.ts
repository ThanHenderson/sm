import { z } from 'zod';
import getEnumError from '../utils/getenumerror';

export const testNames = z.enum([
  'default',
  'Air',
  'Basic',
  'ML',
  'Babylon',
  'cdjs',
  'first-inspector-code-load',
  'multi-inspector-code-load',
  'Box2D',
  'octane-code-load',
  'crypto',
  'delta-blue',
  'earley-boyer',
  'gbemu',
  'mandreel',
  'navier-stokes',
  'pdfjs',
  'raytrace',
  'regexp',
  'richards',
  'splay',
  'typescript',
  'octane-zlib',
  'FlightPlanner',
  'OfflineAssembler',
  'UniPoker',
  'async-fs',
  'float-mm.c',
  'hash-map',
  'ai-astar',
  'gaussian-blur',
  'stanford-crypto-aes',
  'stanford-crypto-pbkdf2',
  'stanford-crypto-sha256',
  'json-stringify-inspector',
  'json-parse-inspector',
  'HashSet-wasm',
  'tsf-wasm',
  'quicksort-wasm',
  'gcc-loops-wasm',
  'richards-wasm',
  'bomb-workers',
  'segmentation',
  'WSL',
  'hello_world-LJF',
  'list_search-LJF',
  'lists-LJF',
  'string_lists-LJF',
  '3d-cube-SP',
  '3d-raytrace-SP',
  'base64-SP',
  'crypto-aes-SP',
  'crypto-md5-SP',
  'crypto-sha1-SP',
  'date-format-tofte-SP',
  'date-format-xparb-SP',
  'n-body-SP',
  'regex-dna-SP',
  'string-unpack-code-SP',
  'tagcloud-SP',
  'acorn-wtb',
  'babylon-wtb',
  'chai-wtb',
  'coffeescript-wtb',
  'espree-wtb',
  'jshint-wtb',
  'lebab-wtb',
  'prepack-wtb',
  'uglify-js-wtb',
], { errorMap: getEnumError('Invalid test name') });
export const sample = 'ML';

export type CountOfOperations = {
  _id: string;
  count: number;
};

export type CountOfCacheIR = {
  _id: string;
  count: number;
};

export const countOfCacheIRTimeseries = z.object({
  group: z.number(),
  count0: z.number(),
  count1: z.number(),
  count2: z.number(),
});

export const timestampEntry = z.object({
  name: z.string(),
  timestamp: z.string(),
});

export type CountOfCacheIRTimeseries = z.infer<typeof countOfCacheIRTimeseries>;
export type TimestampEntry = z.infer<typeof timestampEntry>;
