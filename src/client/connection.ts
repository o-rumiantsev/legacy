import EventEmitter from 'events';
import { Transport } from './transport';
import { Struct, HeaderReader, StructReader } from '../parser';
import { HEADER_SIZE } from '../parser/constants';
import { StructType } from '../parser/enums/struct-type.enum';
import { Subject } from 'rxjs';

export class Connection extends EventEmitter {
  private reader: StructReader;
  structs = new Subject<{ structType: StructType; buffer: Buffer }>();

  constructor(private transport: Transport) {
    super();
    this.reader = new HeaderReader(this.headerOnRead.bind(this));
    this.transport.on('data', (data) => this.processData(data));
  }

  private headerOnRead(header: Buffer) {
    const structSize = Connection.headerGetSize(header);
    this.reader = new StructReader(
      structSize,
      this.structOnRead.bind(this, header)
    );
  }

  private structOnRead(header: Buffer, struct: Buffer) {
    const structType = Connection.headerGetType(header);
    const buffer = Buffer.concat([header, struct]);
    this.structs.next({ structType, buffer });
  }

  private static headerGetSize(header: Buffer): number {
    return header.readUInt32LE(2) - HEADER_SIZE;
  }

  private static headerGetType(header: Buffer): StructType {
    return header.readUInt16LE(6);
  }

  private processData(data: Buffer) {
    if (!this.reader || this.reader.isEnded) {
      this.reader = new HeaderReader(this.headerOnRead.bind(this));
    }
    if (this.reader) {
      const offset = this.reader.take(data);
      if (data.length > offset) this.processData(data.slice(offset));
    }
  }

  async connect(): Promise<void> {
    await this.transport.connect();
  }

  async close(): Promise<void> {
    await this.transport.close();
  }

  async send(struct: Struct) {
    const data = struct.toBuffer();
    await this.transport.write(data, 'hex');
  }
}
