interface TrailingBucketCounter {
  add(count: number, now: number): void;
  trailingCount(now: number): number;
}

class RealTrailingBucketCounter implements TrailingBucketCounter {
  private buckets: ConveyorQueue;
  private secsPerBucket: number;
  private lastUpdatedTime: number;

  constructor(numBuckets: number, secsPerBucket: number) {
    this.buckets = new RealConveyorQueue(numBuckets);
    this.secsPerBucket = secsPerBucket;
    this.lastUpdatedTime = Math.floor(Date.now() / 1000);
  }

  add(count: number, now: number): void {
    this.update(now);
    this.buckets.addToBack(count);
  }

  trailingCount(now: number): number {
    this.update(now);
    return this.buckets.totalSum();
  }

  private update(now: number): void {
    const diffTime = now - this.lastUpdatedTime;
    const numShift = Math.floor(diffTime / this.secsPerBucket);

    this.buckets.shift(numShift);
    this.lastUpdatedTime = now;
  }
}

interface ConveyorQueue {
  addToBack(count: number): void;
  shift(numShift: number): void;
  totalSum(): number;
}

class RealConveyorQueue implements ConveyorQueue {
  private queue: number[];
  private maxItems: number;
  private _totalSum: number;

  constructor(numQueue: number) {
    this.queue = Array(numQueue).fill(0);
    this.maxItems = numQueue;
    this._totalSum = 0;
  }

  addToBack(count: number): void {
    if (this.queue.length < 1) {
      this.queue = [0];
    }
    this.queue[this.queue.length - 1] += count;
    this._totalSum += count;
  }

  shift(numShift: number): void {
    if (numShift >= this.maxItems) {
      this.queue = Array(this.queue.length).fill(0);
      this._totalSum = 0;
      return;
    }

    for (let i = 0; i < numShift; i++) {
      this._totalSum -= this.queue[0];
      this.queue.shift();
    }
    while (this.queue.length < this.maxItems) {
      this.queue.push(0);
    }
  }

  public totalSum(): number {
    return this._totalSum;
  }
}


class MinuteHourCounter3 {
  private minuteCounts: TrailingBucketCounter;
  private hourCounts: TrailingBucketCounter;

  constructor() {
    this.minuteCounts = new RealTrailingBucketCounter(60, 1);
    this.hourCounts = new RealTrailingBucketCounter(60, 60);
  }

  add(count: number): void {
    const now = Math.floor(Date.now() / 1000);
    this.minuteCounts.add(count, now);
    this.hourCounts.add(count, now);
  }

  minuteCount(): number {
    const now = Math.floor(Date.now() / 1000);
    return this.minuteCounts.trailingCount(now);
  }

  hourCount(): number {
    const now = Math.floor(Date.now() / 1000);
    return this.hourCounts.trailingCount(now);
  }
}


async function main() {
  // MinuteHourCounter3のインスタンスを作成します。
  const counter = new MinuteHourCounter3();

  // 10をカウンターに追加します。
  counter.add(10);

  // 現在の分と時間のカウントを取得して表示します。
  console.log(`Minute count: ${counter.minuteCount()}`);
  console.log(`Hour count: ${counter.hourCount()}`);
}

// main関数を呼び出します。
main();