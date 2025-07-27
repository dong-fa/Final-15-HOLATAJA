'use client';

import Input from '@/components/Input';
import useAuthStore from '@/store/authStore';
import { User } from '@/types/user';
import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userPatchAction } from '@/data/actions/auth';
import Button from '@/components/Button';

type UserDataType = Pick<User, '_id' | 'name' | 'email' | 'phone' | 'address'>;

export default function UserInfo() {
  const { user, setUser } = useAuthStore(); //유저 값 불러오기
  const [userData, setUserData] = useState<UserDataType>(
    user || {
      _id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  );
  const [isdisabled, setIsdisabled] = useState(true);
  const [actionState, formAction] = useActionState(userPatchAction, null);
  const router = useRouter();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (userData) {
      setUserData(prev => ({
        ...prev!,
        [field]: value,
      }));
    }
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsdisabled(false);
  };
  const handlesubmit = async (userData: FormData) => {
    if (isdisabled) {
      // console.log('❌ 읽기 모드에서는 제출 무시');
      return;
    }

    // for (const [key, value] of userData.entries()) {
    //   console.log(`  ${key}: ${value}`);
    // }

    formAction(userData);
  };

  useEffect(() => {
    if (user === null) {
      alert('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.');
      router.push('/auth/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (actionState?.ok === 1) {
      setUserData(actionState.item);
      const updatedUser = {
        ...user,
        ...actionState.item,
      };
      setUser(updatedUser); // 직접 값 전달
      alert('회원 정보가 수정되었습니다.');
      setIsdisabled(true);
    }
  }, [actionState]);

  return (
    <div>
      <form className="flex flex-col gap-4 w-[80%] px-20" action={handlesubmit}>
        <Input id="id" type="text" name="_id" value={userData._id} readOnly hidden />
        <Input id="name" label="이름" name="name" type="text" value={userData.name} onChange={handleInputChange('name')} disabled={isdisabled} />
        <Input
          id="email"
          label="이메일"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleInputChange('email')}
          disabled={isdisabled}
        />
        <Input id="phone" label="연락처" name="phone" type="tel" value={userData.phone} onChange={handleInputChange('phone')} disabled={isdisabled} />
        <Input
          id="address"
          label="주소"
          name="address"
          type="text"
          value={userData.address}
          onChange={handleInputChange('address')}
          disabled={isdisabled}
        />
        <div className="flex justify-end">{isdisabled ? <Button onClick={handleEditClick}>수정하기</Button> : <Button submit>수정완료</Button>}</div>
      </form>
    </div>
  );
}
