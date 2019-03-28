# Observable Object
Observe a javascript object and react when property changes.

## Install  
`npm install reactiveobj`

## Usage  

```
import Observable from 'reactiveobj';  
var t = {
    score:0
}

const Rt = new Observable(t)
const handler = (newVal)=>{
    console.log(“I am reactive, the new value is:”, newVal)
}
Rt.observe(“score”, handler)
```

You can add multiple handler like:
```
Rt.observe(“score”, handler1)
Rt.observe(“score”, handler2)
```

## Access the observable object:  
`Rt.obj`

To change value, `Rt.obj.score = 500`  


NOTE: This doesn't observe nested properties
