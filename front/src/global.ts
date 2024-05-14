import { reactive } from 'vue'

let logged: undefined
let registered: undefined

function setLogged (x: any) {
   logged = x
}

function setRegistered (x: any) {
   registered = x
}


export {logged, setLogged, registered, setRegistered}