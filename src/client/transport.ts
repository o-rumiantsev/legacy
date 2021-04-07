import EventEmitter from 'events';
import { Socket, SocketConnectOpts } from 'net';

export class Transport extends EventEmitter {
  private socket = new Socket();
  private shouldReconnect = true;

  constructor(private tcpOptions: SocketConnectOpts) {
    super();
    this.socket.on('error', (error) => this.handleSocketError(error));
    this.socket.on('close', () => this.handleSocketClose());
    this.socket.on('data', (data) => this.handleSocketData(data));
  }

  private handleSocketError(error: Error) {
    this.emit('error', error);
  }

  private async handleSocketClose() {
    if (!this.shouldReconnect) {
      return;
    }
    this.emit('reconnecting');
    await this.connect();
  }

  private handleSocketData(data: unknown) {
    this.emit('data', data);
  }

  connect(): Promise<void> {
    return new Promise((resolve) =>
      this.socket.connect(this.tcpOptions, () => {
        this.emit('connect');
        resolve();
      })
    );
  }

  close(): Promise<void> {
    this.shouldReconnect = false;
    return new Promise((resolve) =>
      this.socket.end(() => {
        this.emit('close');
        resolve();
      })
    );
  }

  write(
    data: string | Buffer | Uint8Array,
    encoding: BufferEncoding
  ): Promise<void> {
    return new Promise((resolve) =>
      this.socket.write(data, encoding, () => {
        this.emit('write', data);
        resolve();
      })
    );
  }
}
