import { interval, of,} from "rxjs";
import { map, take } from "rxjs/internal/operators";

const numObservable = interval(1000).pipe(take(5));
//high order observable return another observable
const highOrderObservable = numObservable.pipe(
    map(x => of(1, 2))
);

highOrderObservable.subscribe(
    obs => obs
        // to get a value from inner observable we need to subscribe twice
        // which is not an appropriate solution
        .subscribe(
            innerValue => console.log(innerValue))

);