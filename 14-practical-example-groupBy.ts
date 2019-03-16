import {merge, of} from "rxjs";
import {filter, groupBy, map, mergeMap, skip} from "rxjs/internal/operators";


const messagesObservable = of(
    {code: 'en-us', value: '-TEST-'},
    {code: 'en-us', value: 'hello'},
    {code: 'es', value: '-TEST-'},
    {code: 'en-us', value: 'amazing'},
    {code: 'pt-br', value: '-TEST-'},
    {code: 'es', value: 'hola'},
    {code: 'es', value: 'mundo'},
    {code: 'en-us', value: 'world'},
    {code: 'pt-br', value: 'mundo'},
    {code: 'es', value: 'asombroso'},
    {code: 'pt-br', value: 'maravilhoso'}
);

// const enUS = messagesObservable.pipe(
//     filter(message => message.code === 'en-us'),
//     skip(1)
// );
//
// const es = messagesObservable.pipe(
//     filter(message => message.code === 'es'),
//     skip(1)
// );
//
// const ptBr = messagesObservable.pipe(
//     filter(message => message.code === 'pt-br'),
//     skip(1)
// );
//
// const all = merge(enUS, es, ptBr).pipe(
//     map(obj => obj.value)
// );

const all = messagesObservable.pipe(
    // group into 3 observables
    groupBy(message => message.code),
    // skip first value and merge into single observable
    mergeMap(innerObs => innerObs.pipe(
        skip(1)
    )),
    //map observable to message value
    map(obj => obj.value)
);

all.subscribe(console.log);