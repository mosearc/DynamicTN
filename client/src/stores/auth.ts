import {defineStore} from "pinia"
import {useApi, useApiPrivate} from "../composables/useApi"


export interface User{
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  full_name?: string
}

export interface State{
  user: User,
  accessToken: string,
  authReady: boolean
}

export interface LoginData {
  email: string,
  password: string
}

export interface RegisterData {
  username: string,
  email: string,
  first_name: string,
  last_name: string
  password: string,
  password_confirm: string,
}


export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {} as User,
      accessToken: "" as string,
      authReady: false as boolean
    }
  },

  getters: {
    userDetail: (state: State) => state.user,
    isAuthenticated: (state: State) => state.accessToken ? true : false
  },

  actions:{
    async attempt(){
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },


    async login(payload: LoginData){
      try {
        const {data} = await useApi().post(import.meta.env.VITE_API_ADDR+`/api/auth/login`, payload);
        this.accessToken = data.access_token
        await this.getUser()
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async register(payload: RegisterData){
      try {
        const {data} = await useApi().post(import.meta.env.VITE_API_ADDR+`/api/auth/register`, payload);
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getUser(){
      try {

        const {data} = await useApiPrivate().get(import.meta.env.VITE_API_ADDR+`/api/auth/user`);
        this.user = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async logout(){
      try {
        const {data} = await useApiPrivate().post(import.meta.env.VITE_API_ADDR+`/api/auth/logout`);
        this.accessToken = ""
        this.user = {} as User
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async refresh(){
      try {
		if(this.isAuthenticated()){
        	const {data} = await useApi().post(import.meta.env.VITE_API_ADDR+`/api/auth/refresh`);
        	this.accessToken = data.access_token
        	return data
		}
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})
