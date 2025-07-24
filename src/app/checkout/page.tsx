import CheckOutForm from './CheckOutForm';

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white">
      {/* 페이지 제목 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">결제</h1>
      <CheckOutForm />
    </div>
  );
}
