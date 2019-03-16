import {fromEvent, interval} from "rxjs";
import {mapTo, mergeScan, take, tap} from "rxjs/internal/operators";

const click = fromEvent(document, 'click');

const one = click.pipe(mapTo(1));
const interval = interval(500).pipe(take(2));

let seed = 0;

const count$ = one.pipe(
    mergeScan(
        (acc, one) => {
            let res = acc + one;
            return interval.pipe(
                tap(i => console.log(`${i}: ${res}`)),
                mapTo(res)
            );
        },
        seed
    )
);

count$.subscribe(console.log);