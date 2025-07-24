import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center px-20 sm:px-20 sm:max-w-2xl sm:mx-auto">
      <h2 className="title mx-auto mb-6">로그인</h2>
      <LoginForm />
    </div>
  );
}
