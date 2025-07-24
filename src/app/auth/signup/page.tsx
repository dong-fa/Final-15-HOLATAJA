import SignupForm from './SignupForm';

export default function SignUp() {
  return (
    <div className="my-6 flex flex-col justify-center items-center px-20 sm:px-20 sm:max-w-2xl sm:mx-auto">
      <h2 className="title mb-6">회원 가입</h2>
      <SignupForm />
    </div>
  );
}
