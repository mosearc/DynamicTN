import { reactive } from 'vue'

let logged: undefined
let registered: undefined

const reg = reactive({
   si: undefined
})

function setReg (x: any){
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

function isLogged(){
	return loggedUser.token !== undefined
}

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

function showErrMessage(err:any){
	switch(err.response.status){
		case 409:
			alert("ERROR: you already voted")
			break;
		case 404:
			alert("ERROR: entity does not exists")
			break;
		case 401:
			alert("ERROR: you must log in if you want to vote")
			break;
		default:
			alert("Error from the server:"+err.response.status)
			break;
    }

    console.error('Error :', err);
}


export {logged,
	setLogged, 
	isLogged,
	registered, 
	setRegistered, 
	loggedUser, 
	setLoggedUser, 
	clearLoggedUser, 
	reg, 
	setReg,
	showErrMessage
}
