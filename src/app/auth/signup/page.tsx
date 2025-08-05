import SignupForm from './SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - HOLATAJA',
  description: 'HOLATAJA에 가입하셔서 회원 혜택을 누려보세요.',
  robots: 'noindex, nofollow',
};

export default function SignUp() {
  return (
    <div className="my-6 flex flex-col justify-center items-center px-20 sm:px-20 sm:max-w-2xl sm:mx-auto">
      <h2 className="title mb-6">회원 가입</h2>
      <SignupForm />
    </div>
  );
}
