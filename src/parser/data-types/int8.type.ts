import { DataType } from '../interfaces/data-type.interface';

export class Int8Type implements DataType<number> {
  size() {
    return 1;
  }

  parse(buffer: Buffer, offset: number): number {
    return buffer.readInt8(offset);
  }

  write(buffer: Buffer, value: number, offset: number): number {
    return buffer.writeInt8(value, offset);
  }
}

export const INT_8 = new Int8Type();
