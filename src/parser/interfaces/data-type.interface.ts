export interface DataType<T> {
  parse(buffer: Buffer, offset: number, instance: unknown): T;

  write(buffer: Buffer, value: T, offset: number): number;

  size(value: T): number;
}
