import { StructType } from './enums/struct-type.enum';
import { HEADER_SIZE } from './constants';

export class Struct {
  constructor(private type: StructType, private payload: Buffer) {}

  getType() {
    return this.type;
  }

  toBuffer(): Buffer {
    const size = HEADER_SIZE + this.payload.length;
    const buffer = Buffer.alloc(size);
    buffer.writeUInt16LE(0xab);
    buffer.writeUInt32LE(size, 2);
    buffer.writeUInt16LE(this.type, 6);
    buffer.writeUInt16LE(0xba, 8);
    this.payload.copy(buffer, 10);
    return buffer;
  }
}
