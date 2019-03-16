import {fromEvent, interval, of,} from "rxjs";
import {map, mergeAll, take} from "rxjs/internal/operators";

const clickObservable = fromEvent(document, 'click').pipe(take(5));

const clockObservable = clickObservable.pipe(
    map(click => interval(1000)),
    mergeAll()
    //mergeAll(3)
    //can limit merging concurrent inner observables
);

//Flattening Observable<Observable<number>> --> Observable<number>

/*
-------+--------+-----------------
       \        \
       -0-1-2-3  -0-1-2-3-4-5-6
       mergeAll
--------0-1-2-3-405162738495....
 */

clockObservable.subscribe(console.log);