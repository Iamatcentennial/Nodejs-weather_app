// var somePromise = new Promise((resolve, reject)=>{
//     //resolve('Task fulfilled');
//     reject('Task not fulfilled');
// });

// somePromise.then((message)=>{
//     console.log(message);
// }, (errorMessage)=>{
//     console.log(errorMessage);
// });

var addNumber = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(typeof a == 'number' && typeof b == 'number'){
                resolve(a+b);
            }
            else
            reject('Numbers should be of number type');
        }, 3000);
    });
}

addNumber(4,'9')
    .then((message)=>{
    console.log('Sum of two number is :', message);
    return addNumber(message,10);})
    .then((result)=>{
    console.log(result);
}, (errorMessage)=>{
    console.log(errorMessage);
}).catch((errorMessage)=>{
    console.log(errorMessage);
});
