import { reactive } from 'vue'

let logged: undefined

function setLogged (x: any) {
   logged = x
}


export {logged, setLogged}