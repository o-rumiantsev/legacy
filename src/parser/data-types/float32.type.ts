import { DataType } from '../interfaces/data-type.interface';

export class Float32Type implements DataType<number> {
  size() {
    return 4;
  }

  parse(buffer: Buffer, offset: number): number {
    return buffer.readFloatLE(offset);
  }

  write(buffer: Buffer, value: number, offset: number): number {
    return buffer.writeFloatLE(value, offset);
  }
}

export const FLOAT_32 = new Float32Type();
