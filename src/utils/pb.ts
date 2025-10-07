import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './pocketbase-types';

const pb = new PocketBase('URL') as TypedPocketBase;
export default pb;