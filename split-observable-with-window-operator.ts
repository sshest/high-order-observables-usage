import { fromEvent, interval } from "rxjs";
import { count, map, switchAll, window } from "rxjs/internal/operators";

const clickSource = fromEvent(document, 'click');
const clockSource = interval(1000);

const resultObservable = clockSource.pipe(
    window(clickSource),
    map(obs => obs.pipe(count())),
    switchAll()
);

/*
---0---1---2---3---4---5---6-- clock
         c           c   c     click


         window

splits into multiple and completes each child streams
---------+-----------+---+----
----------\-----------\---\---
---0---1--|2---3---4--|5--|6--

    map(obs => obs.pipe(count()))
---------+-----------+---+----
----------\-----------\---\---
---------2|----------3|--1|---

      switchAll

combine into single stream again
---------2-----------3---1----
 */

resultObservable.subscribe(console.log);