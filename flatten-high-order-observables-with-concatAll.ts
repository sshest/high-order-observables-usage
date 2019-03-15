import {fromEvent, interval, of,} from "rxjs";
import {concatAll, map, take} from "rxjs/internal/operators";

const clickObservable = fromEvent(document, 'click').pipe(take(5));

const clockObservable = clickObservable.pipe(
    map(click => interval(1000).pipe(take(4))),
    //it's an alias for mergeAll(1)
    concatAll()
);

//Flattening Observable<Observable<number>> --> Observable<number>

/*
-------+-----------+--+-------------
       \
       -0-1-2-3
       concatAll
--------0-1-2-3----0-1-2-3-0-1-2-3--
 */

clockObservable.subscribe(console.log);