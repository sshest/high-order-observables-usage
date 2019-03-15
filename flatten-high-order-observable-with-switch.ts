import {fromEvent, interval, of,} from "rxjs";
import {map, switchAll, take} from "rxjs/internal/operators";

const clickObservable = fromEvent(document, 'click').pipe(take(5));

const clockObservable = clickObservable.pipe(
    map(click => interval(1000)),
    switchAll()
);

//Flattening Observable<Observable<number>> --> Observable<number>

/*
-------+--------+-----------------
       \        \
       -0-1-2-3  -0-1-2-3-4-5-6
       switch
--------0-1-2-3--0-1-2-3-4-5-6
 */

clockObservable.subscribe(console.log);