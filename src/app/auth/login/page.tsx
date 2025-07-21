'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import { useState } from 'react';

export default function Login() {
  const initInputState = { email: '', password: '' };
  const [formData, setFormData] = useState(initInputState);
  const [error, setError] = useState(initInputState);
  const axiosInstance = useAxiosInstance();

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return '이메일을 입력해주세요';
        if (!emailRegex.test(value)) return '올바른 이메일 형식이 아닙니다';
        return '';

      case 'password':
        if (!value) return '비밀번호를 입력해주세요';
        // if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다';
        // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        //   return '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다';
        // }
        return '';

      default:
        return '';
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value, // field가 여기서 객체의 키로 사용됨
    }));

    const errorMessage = validateField(field, value);
    setError(prev => ({
      ...prev,
      [field]: errorMessage,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('폼 제출 시작');

    // 전체 유효성 검사
    const newError = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };

    setError(newError);

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      const res = await axiosInstance.post('/users/login/', loginData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-center mt-52 px-52">
      <h2 className="title mx-auto mb-6">로그인</h2>
      <form className="w-full flex flex-col gap-6 mb-6" onSubmit={handleSubmit} noValidate>
        <Input
          id="id"
          type="email"
          placeholder="이메일"
          gap="gap-4"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={!!error.email}
          errorMessage={error.email}
        />
        <Input
          id="pw"
          type="password"
          placeholder="비밀번호"
          gap="gap-4"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={!!error.password}
          errorMessage={error.password}
        />
        <Button submit>로그인</Button>
      </form>
      <div>
        <button className="">회원가입</button>
      </div>
    </div>
  );
}
