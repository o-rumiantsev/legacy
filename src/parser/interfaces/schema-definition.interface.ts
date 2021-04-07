import { DataType } from './data-type.interface';

export type SchemaDefinition<T> = Record<keyof T, DataType<unknown>>;
