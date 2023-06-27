class CountEvent {
  count: number;
  time: number;

  constructor(count: number, time: number) {
    this.count = count;
    this.time = time;
  }
}

class MinuteHourCounter {
  private events: CountEvent[];

  constructor() {
    this.events = [];
  }

  public add(count: number): void {
    this.events.push(new CountEvent(count, Date.now()));
  }

  private countSince(cutoff: number): number {
    let count = 0;
    const now = Date.now();
    for (let i = this.events.length - 1; i >= 0; i--) {
      if (this.events[i].time <= cutoff) {
        break;
      }
      count += this.events[i].count;
    }
    return count;
  }

  public minuteCount(): number {
    return this.countSince(Date.now() - 60 * 1000);
  }

  public hourCount(): number {
    return this.countSince(Date.now() - 60 * 60 * 1000);
  }
}