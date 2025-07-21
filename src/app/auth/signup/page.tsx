'use client';

import Button from '@/components/Button';
import CheckboxButton from '@/components/CheckboxButton';
import Input from '@/components/Input';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import { useState } from 'react';

export default function SignUp() {
  const initInputState = { email: '', name: '', password: '', passwordCheck: '', phone: '', address: '' };
  const [formData, setFormData] = useState(initInputState);
  const [error, setError] = useState(initInputState);
  const [isChecked, setIsChecked] = useState(false);
  const axiosInstance = useAxiosInstance();

  // 유효성 검사 함수들
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return '이메일을 입력해주세요';
        if (!emailRegex.test(value)) return '올바른 이메일 형식이 아닙니다';
        return '';

      case 'name':
        if (!value) return '이름을 입력해주세요';
        // if (value.length < 2) return '이름은 2자 이상이어야 합니다';
        // if (value.length > 20) return '이름은 20자 이하여야 합니다';
        return '';

      case 'password':
        if (!value) return '비밀번호를 입력해주세요';
        // if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다';
        // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        //   return '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다';
        // }
        return '';

      case 'passwordCheck':
        if (!value) return '비밀번호를 확인해주세요';
        if (value !== formData.password) return '비밀번호가 일치하지 않습니다';
        return '';

      case 'phone':
        const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!value) return '휴대폰 번호를 입력해주세요';
        if (!phoneRegex.test(value)) return '올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)';
        return '';

      case 'address':
        if (!value) return '주소를 입력해주세요';
        // if (value.length < 5) return '주소는 5자 이상이어야 합니다';
        return '';

      default:
        return '';
    }
  };

  //입력값 받기
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value, // field가 여기서 객체의 키로 사용됨
    }));

    //유효성 검사
    const errorMessage = validateField(field, value);
    setError(prev => ({
      ...prev,
      [field]: errorMessage,
    }));
    if (field === 'password' && formData.passwordCheck) {
      const passwordCheckError = validateField('passwordCheck', formData.passwordCheck);
      setError(prev => ({
        ...prev,
        passwordCheck: passwordCheckError,
      }));
    }
  };

  //폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('폼 제출 시작');

    // 전체 유효성 검사
    const newError = {
      email: validateField('email', formData.email),
      name: validateField('name', formData.name),
      password: validateField('password', formData.password),
      passwordCheck: validateField('passwordCheck', formData.passwordCheck),
      phone: validateField('phone', formData.phone),
      address: validateField('address', formData.address),
    };

    setError(newError);

    // 에러가 있으면 제출하지 않음
    const hasErrors = Object.values(newError).some(error => error !== '');
    if (hasErrors || !isChecked) {
      if (!isChecked) alert('약관에 동의해주세요');
      return;
    }
    try {
      const signupData = {
        type: 'user',
        email: formData.email,
        name: formData.name,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      };

      const res = await axiosInstance.post('/users/', signupData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-52">
      <h2 className="title mb-6">회원 가입</h2>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        <Input
          id="email"
          label="이메일"
          type="email"
          gap="gap-4"
          placeholder="이메일"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={!!error.email}
          errorMessage={error.email}
        />
        <Input
          id="name"
          label="이름"
          type="text"
          gap="gap-4"
          placeholder="이름"
          value={formData.name}
          onChange={handleInputChange('name')}
          error={!!error.name}
          errorMessage={error.name}
        />
        <Input
          id="pw"
          label="비밀번호"
          type="password"
          gap="gap-4"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={!!error.password}
          errorMessage={error.password}
        />
        <Input
          id="pwCheck"
          label="비밀번호 확인"
          type="password"
          gap="gap-4"
          placeholder="비밀번호 확인"
          value={formData.passwordCheck}
          onChange={handleInputChange('passwordCheck')}
          error={!!error.passwordCheck}
          errorMessage={error.passwordCheck}
        />
        <Input
          id="phoneNum"
          label="휴대폰 번호"
          type="tel"
          gap="gap-4"
          placeholder="휴대폰 번호"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          error={!!error.phone}
          errorMessage={error.phone}
        />
        <Input
          id="address"
          label="주소"
          type="text"
          gap="gap-4"
          placeholder="주소"
          value={formData.address}
          onChange={handleInputChange('address')}
          error={!!error.address}
          errorMessage={error.address}
        />
        <div className="mx-auto">
          <CheckboxButton checked={isChecked} onCheck={() => setIsChecked(!isChecked)} />
        </div>
        <Button submit>가입하기</Button>
      </form>
    </div>
  );
}
