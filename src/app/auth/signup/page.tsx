import { Title } from '@/components/Typography';
import SignupForm from './SignupForm';

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center px-20 sm:px-20 sm:max-w-2xl sm:mx-auto">
      <Title className="mb-6">회원 가입</Title>
      <SignupForm />
    </div>
  );
}
