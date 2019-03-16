import { interval, of } from "rxjs";
import { map, mergeMap, take } from "rxjs/internal/operators";

const sourceObservable = interval(1000).pipe(take(5));

const resultObservable = sourceObservable.pipe(

    //all responses will be handled
    mergeMap(x => {
        if (x % 2 === 0) {
            return of(x)
        }
        return of (x + 1, x + 2)
    })
);
/*
----0----1----2----3----4-
----+----+----+----+----+-
     \    \    \    \    \
     0|   23|   2|   45|  4|
-----0----23----2----45---4|
 */


resultObservable.subscribe(console.log);