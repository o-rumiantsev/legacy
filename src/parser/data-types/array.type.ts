import { DataType } from '../interfaces/data-type.interface';
import { Schema } from '../schema';

export class ArrayType<T> implements DataType<T[]> {
  constructor(private countProp: string, private schema: Schema<T>) {}

  parse(
    buffer: Buffer,
    offset: number,
    instance: Record<string, unknown>
  ): T[] {
    const array: T[] = [];
    const count = instance[this.countProp];
    if (typeof count !== 'number') {
      throw new Error('`countProp` references to non-number value');
    }
    for (let i = 0; i < count; ++i) {
      const value = this.schema.parse(buffer, offset);
      offset += this.schema.size(value);
      array.push(value);
    }
    return array;
  }

  write(buffer: Buffer, value: T[], offset: number): number {
    return value.reduce(
      (bytesWritten: number, item) =>
        bytesWritten + this.schema.write(buffer, item, offset + bytesWritten),
      0
    );
  }

  size(value: T[]): number {
    return value.reduce((acc: number, item) => acc + this.schema.size(item), 0);
  }
}
