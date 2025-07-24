'use server';

import { User } from '@/types/userType';
import { ApiResPromise, ApiRes } from '@/types/apiType';
import { cookies } from 'next/headers';

//로그인 액션
export async function loginAction(prevState: ApiRes<User> | null, formData: FormData): ApiResPromise<User> {
  let response: Response;
  let data: ApiRes<User>;
  try {
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client-id': process.env.NEXT_PUBLIC_API_CLIENT_ID!,
      },
      body: JSON.stringify(loginData),
    });

    data = await response.json();
    console.log('위치 액션', data);
    if (data.ok === 1) {
      (await cookies()).set('accessToken', data.item.token?.accessToken as string, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      (await cookies()).set('refreshToken', data.item.token?.refreshToken as string, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      delete data.item.token;
    }
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '일시적인 네트워크 문제가 발생했습니다.',
    };
  }
  return data;
}

//회원가입 액션
export async function signupAction(prevState: ApiRes<User> | null, formData: FormData): ApiResPromise<User> {
  let response: Response;
  let data: ApiRes<User>;

  try {
    const signupData = {
      type: 'user',
      email: formData.get('email'),
      name: formData.get('name'),
      password: formData.get('password'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    };
    // 서버에서 API 호출
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client-id': process.env.NEXT_PUBLIC_API_CLIENT_ID!,
      },
      body: JSON.stringify(signupData),
    });

    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message: '일시적인 네트워크 문제가 발생했습니다.',
    };
  }
  return data;
}
