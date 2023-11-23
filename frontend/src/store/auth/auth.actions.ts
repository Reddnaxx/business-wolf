import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthResponse } from '../../models/responce/IAuthResponse'
import AuthService from '../../services/AuthService'
import TokenService from '../../services/TokenService'
import UserService from '../../services/UserService'
import { AxiosError } from 'axios'

interface IAuthData {
	username: string
	password: string
}

export const login = createAsyncThunk<IAuthResponse, IAuthData>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			const response = await AuthService.login(data.username, data.password)
			return response.data
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.clear()
})

export const checkAuth = createAsyncThunk(
	'auth/check-auth',
	async (_, thunkAPI) => {
		try {
			const token = localStorage.getItem('access_token') || ''
			await AuthService.checkAuth(token)
			const userID = TokenService.decodeToken(token).user_id
			const response = await UserService.fetchUser(userID)
			return response.data
		} catch (e) {
			thunkAPI.dispatch(logout())
			return thunkAPI.rejectWithValue(e as AxiosError)
		}
	}
)
