class CountEvent {
  count: number;
  time: Date;

  constructor(count: number, time: Date) {
    this.count = count;
    this.time = time;
  }
}

class MinuteHourCounter {
  events: CountEvent[] = [];

  add(count: number): void {
    this.events.push(new CountEvent(count, new Date()));
  }

  minuteCount(): number {
    let count = 0;
    const nowSecs = Date.now() / 1000;
    for (let i = this.events.length - 1; i >= 0; i--) {
      const event = this.events[i];
      if (event.time.getTime() / 1000 > nowSecs - 60) {
        count += event.count;
      } else {
        break;
      }
    }
    return count;
  }

  hourCount(): number {
    let count = 0;
    const nowSecs = Date.now() / 1000;
    for (let i = this.events.length - 1; i >= 0; i--) {
      const event = this.events[i];
      if (event.time.getTime() / 1000 > nowSecs - 3600) {
        count += event.count;
      } else {
        break;
      }
    }
    return count;
  }
}
