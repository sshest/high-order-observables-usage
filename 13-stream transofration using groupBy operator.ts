import {interval} from "rxjs/index";
import {count, groupBy, map, mergeAll, take} from "rxjs/internal/operators";


const numbersObservable = interval(1000).pipe(take(7));

numbersObservable.pipe(
    groupBy(x => x % 2),
    map(innerObs => innerObs.pipe(count())),
    mergeAll()
).subscribe(console.log);

/*
--0--1--2--3--4--5--6|

groupBy(x => x % 2)
---\--\--------------
---\   1---3----5----|
   0----2-----4-----6|

   map(innerObs => innerObs.pipe(count()))
---\--\--------------
---\   -------------3|
   -----------------4|

   mergeAll
----------------(3,4)|
 */