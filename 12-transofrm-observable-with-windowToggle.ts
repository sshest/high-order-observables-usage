import {fromEvent, interval} from "rxjs/index";
import {count, map, mergeAll, windowToggle} from "rxjs/internal/operators";


const clockObservable = interval(1000);
const downObservable = fromEvent(document, 'mousedown');
const upObservable = fromEvent(document, 'mouseup');

const resulObservable = clockObservable.pipe(
    windowToggle(downObservable, () => upObservable),
    // map(obs => obs.pipe(count())),
    mergeAll()
);

/*
-0---1---2---3---4---5---6---7--
-----------D--------------D----- downObservable emission
--------------------U----------- upObservable

        windowToggle
-----------+--------+-----+-----
            \3---4--|      \-7--

        mergeAll
-------------3---4-----------7--
 */
resulObservable.subscribe(console.log);