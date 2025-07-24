'use server';

import { User } from '@/types/userType';
import { ApiResPromise, ApiRes } from '@/types/apiType';

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
