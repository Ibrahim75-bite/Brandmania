export interface IClock {
  now(): Date;
  timestamp(): number;
}

export class SystemClock implements IClock {
  public now(): Date {
    return new Date();
  }

  public timestamp(): number {
    return Date.now();
  }
}
