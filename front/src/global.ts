import { reactive } from 'vue'

let logged: undefined
let registered: undefined

const reg = reactive({
   si: 0
})

function setReg (x:number){
   reg.si = x
}

function setLogged (x: any) {
   logged = x
}

function setRegistered (x: any) {
   registered = x
}

const loggedUser = reactive({
   token: undefined,
   email: undefined,
   id: undefined,
   self: undefined,
})

function setLoggedUser (data: any) {
   loggedUser.token = data.token
   loggedUser.id = data.id
   loggedUser.self = data.self
   loggedUser.email = data.email
}

function clearLoggedUser () {
   loggedUser.token = undefined
   loggedUser.id = undefined
   loggedUser.self = undefined
   loggedUser.email = undefined
}


export {logged, setLogged, registered, setRegistered, loggedUser, setLoggedUser, clearLoggedUser, reg, setReg}