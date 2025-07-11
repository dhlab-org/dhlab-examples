type StreamCallbacks = {
  [event: string | 'error']: (data?: unknown | StreamHandlerError) => void;
};

export class StreamHandlerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StreamHandlerError';
  }
}

export class ReadableStreamHandler {
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private decoder = new TextDecoder();
  private buffer = '';
  private callbacks: StreamCallbacks = {};

  constructor(response: Response, callbacks?: StreamCallbacks) {
    this.reader = response.body?.getReader() ?? null;
    this.callbacks = callbacks ?? {};

    if (this.reader) {
      this.processStream().catch(this.handleError);
    } else {
      this.handleError(new StreamHandlerError('응답에 body가 없습니다.'));
    }
  }

  private async processStream() {
    while (this.reader) {
      const { done, value } = await this.reader.read();
      if (done) break;

      this.buffer += this.decoder.decode(value, { stream: true });
      this.processBuffer();
    }
  }

  private processBuffer() {
    const events = this.buffer.split('\n\n');
    this.buffer = events.pop() || '';

    for (const event of events) {
      if (!event.trim()) continue;

      const { eventType, dataLine } = this.parseEvent(event);
      if (!eventType || !dataLine) continue;

      this.dispatchEvent(eventType, dataLine);
    }
  }

  private parseEvent(event: string) {
    const lines = event.split('\n');
    const eventType = lines
      .find((line) => line.startsWith('event:'))
      ?.replace('event:', '')
      .trim();
    const dataLine = lines
      .find((line) => line.startsWith('data:'))
      ?.replace('data:', '')
      .trim();
    return { eventType, dataLine: dataLine || '{}' };
  }

  private dispatchEvent(eventType: string, dataLine: string) {
    try {
      const parsedData = JSON.parse(dataLine);
      this.callbacks[eventType]?.(parsedData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown error';
      this.handleError(new StreamHandlerError(errorMessage));
    }
  }

  private handleError = (error: StreamHandlerError) => {
    console.error('스트림 처리 중 오류 발생:', error);
    this.callbacks.error?.(error);
  };

  public cancel() {
    this.reader?.cancel();
  }
}
