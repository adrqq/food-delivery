/* eslint-disable max-len */
import axios, { AxiosResponse } from 'axios';
import $api from '../../http';
import { AuthResponse } from '../../models/response/AuthResponse';
import { API_URL } from '../../utils/constants';

export default class AuthService {
  static async login(email: string, password: string, remember: boolean): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', {
      email,
      password,
      remember,
    });
  }

  static async registration(name: string, role: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', {
      name,
      role,
      email,
      password,
    });
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

    return response;
  }

  static async sendActivationEmail(email: string): Promise<AxiosResponse<string>> {
    return $api.post<string>('/send-activation-link', {
      email,
    });
  }

  static async changeUserData(
    oldEmail: string,
    oldPassword: string,
    name: string,
    role: string,
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/change-user-data', {
      oldEmail,
      oldPassword,
      name,
      role,
      email,
      password,
    });
  }
}
