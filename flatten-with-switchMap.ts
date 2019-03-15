import {fromEvent, interval, of,} from "rxjs";
import {concatAll, map, switchMap, take} from "rxjs/internal/operators";

const clickObservable = fromEvent(document, 'click').pipe(take(5));

function request() {
    return fetch('http://jsonplaceholder.typicode.com/users/5')
        .then(res => res.json());
}

//Observable<Observable<number>> --> Observable<Response>
const responseObservable = clickObservable.pipe(

    //switchMap === map + switchAll
    switchMap(click => request())
);



responseObservable.subscribe(console.log);