import { Observable, interval, of, take, retry, fromEvent } from 'rxjs';
import { map, filter, findIndex, reduce } from 'rxjs/operators';

// 观察者模式
const observable = new Observable((subscribe) => {
  subscribe.next(1);
  subscribe.next(2);
  subscribe.next(3);
  subscribe.next(4);

  setTimeout(() => {
    subscribe.next(5);
    subscribe.complete();
  }, 3000);
});

observable.subscribe({
  next: (num) => {
    console.log(num);
  },
});

// interval(500)
//   .pipe(take(5))
//   .subscribe((e) => console.log(e));

// 使用rxjs处理一个无限循环
const subsc = interval(500)
  .pipe(
    map((v) => ({
      num: v,
    })),
    filter((v) => v.num % 2 === 0),
    // findIndex((v) => v.num === 5),
    // reduce((acc, cur) => acc + cur.num, 0),
  )
  .subscribe((e) => {
    console.log(e);
    if (e.num === 6) {
      subsc.unsubscribe();
    }
  });

// 使用rxjs处理一个数组
const subs = of(1, 2, 3, 4, 6, 5, 7, 8, 9, 8, 9)
  .pipe(
    map((v) => ({
      num: v,
    })),
    filter((v) => v.num % 2 === 0),
    // findIndex((v) => v.num === 5),
    // reduce((acc, cur) => acc + cur.num, 0),
  )
  .subscribe((e) => {
    console.log(e);
  });

//使用rxjs处理一个点击事件
const click$ = fromEvent(document, 'click').pipe(map((v) => v.target));

click$.subscribe((e) => {
  console.log(e);
});
