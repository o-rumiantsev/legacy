import { DataType } from '../interfaces/data-type.interface';

export class Uint32Type implements DataType<number> {
  size() {
    return 4;
  }

  parse(buffer: Buffer, offset: number): number {
    return buffer.readUInt32LE(offset);
  }

  write(buffer: Buffer, value: number, offset: number): number {
    return buffer.writeUInt32LE(value, offset);
  }
}

export const UINT_32 = new Uint32Type();
