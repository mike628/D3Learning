function a() {

    console.log('A!');

    return function b(){
        console.log('B!');
    }


}

var s = a();
s();