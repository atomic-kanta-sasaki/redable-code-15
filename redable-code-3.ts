class CountEvent {
  count: number;
  time: number;

  constructor(count: number, time: number) {
    this.count = count;
    this.time = time;
  }
}

class MinuteHourCounter {
  private minuteEvents: CountEvent[];
  private hourEvents: CountEvent[];
  private minuteCount: number;
  private hourCount: number;

  constructor() {
    this.minuteEvents = [];
    this.hourEvents = [];
    this.minuteCount = 0;
    this.hourCount = 0;
  }

  public shiftOldEvent(now: number): void {

    const minuteAgo = now - 60 * 1000;
    const hourAgo = now - 60 * 60 * 1000;

    // Move events older than 1 minute from 'minuteEvents' to 'hourEvents'
    // (Old events older than 1 hour will be removed in the next loop)
    while (this.minuteEvents.length > 0 && this.minuteEvents[0].time <= minuteAgo) {
      this.hourEvents.push(this.minuteEvents[0]);
      this.minuteCount -= this.minuteEvents[0].count;
      this.minuteEvents.shift();
    }

    // Remove events older than 1 hour from 'hourEvents'
    while (this.hourEvents.length > 0 && this.hourEvents[0].time <= hourAgo) {
      this.hourCount -= this.hourEvents[0].count;
      this.hourEvents.shift();
    }
  }
}