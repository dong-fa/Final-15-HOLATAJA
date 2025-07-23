'use server';

import { User } from '@/types/userType';
import { ApiResPromise, ApiRes } from '@/types/apiType';

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
