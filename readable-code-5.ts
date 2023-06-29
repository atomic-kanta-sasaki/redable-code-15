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

  public add(count: number): void {
    this.events.push(new CountEvent(count, new Date()));
  }

  public oneMinuteCountEnvet(nowSecs: number): number {
    // tsの仕様により時間を1000で割るとミリsecにすることができる
    const oneMinuteEventList = this.events.filter((event) => event.time.getTime() / 1000 > nowSecs - 60)
    const sumEvent = this.eventCount(oneMinuteEventList)
    return sumEvent;
  }

  public oneHourCountEvent(nowSecs: number): number {
    // tsの仕様により時間を1000で割るとミリsecにすることができる
    const oneHourEventList = this.events.filter((event) => event.time.getTime() / 1000 > nowSecs - 3600)
    const sumEvent = this.eventCount(oneHourEventList)
    return sumEvent;
  }

  private eventCount(targets: CountEvent[]): number {
    let sumEvent = 0;
    targets.forEach((target) => {
      sumEvent += target.count
    })
    return sumEvent
  }
}


// 可読性 / 計算量・メモリ量などアルゴリズム / 汎用性
//「リーダブルコード」なので今回は可読性にフォーカスしてた印象
// アルゴリズム観点なら固定サイズのキューっぽい実装とか
// 汎用性観点なら抽象度を上げてクラス化するとか
