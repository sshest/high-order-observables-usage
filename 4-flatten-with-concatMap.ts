import { fromEvent, } from "rxjs";
import {concatMap, map, take} from "rxjs/internal/operators";

const clickObservable = fromEvent(document, 'click').pipe(take(5));

function request() {
    return fetch('http://jsonplaceholder.typicode.com/users/5')
        .then(res => res.json());
}

//Observable<Observable<number>> --> Observable<Response>
const emailObservable = clickObservable.pipe(

    //all responses will be handled one by one
    concatMap(click => request()), //map + concatAll
    map(res => res.email)
);



emailObservable.subscribe(console.log);