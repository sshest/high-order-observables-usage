import { fromEvent, } from "rxjs";
import { map, mergeMap, take } from "rxjs/internal/operators";

const clickObservable = fromEvent(document, 'click').pipe(take(5));

function request() {
    return fetch('http://jsonplaceholder.typicode.com/users/5')
        .then(res => res.json());
}

//Observable<Observable<number>> --> Observable<Response>
const emailObservable = clickObservable.pipe(

    //all responses will be handled
    mergeMap(click => request(),
        //no more then 3 requests will be launched simultaneously
        3),
    map(res => res.email)
);



emailObservable.subscribe(console.log);