// Flattens an High order Observable by ignoring the next inner Observables while the current inner is still executing

import {fromEvent, interval, of} from "rxjs";
import {exhaust, exhaustMap, map, mergeMap, take} from "rxjs/internal/operators";

const clickSource = fromEvent(document, 'click');
const sourceObservable = clickSource.pipe(
    map(() => interval(1000).pipe(take(3)))
);

const resultObservable = sourceObservable.pipe(

    exhaust()
);
/*
----0----1----2----3----4-
----+----+----+----+----+-
     \    \    \    \    \
      0-1-2|\   0-1-2|\   0-1-2|
             0-1-2|    0-1-2|
----- 0-1-2-----0-1-2-----0-1-2-
 */

//map + exhaust === exhaustMap

// const resultObservable = sourceObservable.pipe(
//     exhaustMap(value => interval(1000).pipe(take(3)))
// );

resultObservable.subscribe(console.log);