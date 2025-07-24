'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Star, ThumbsDown, ThumbsUp, User } from 'lucide-react';

import Button from '@/components/Button';
import CheckboxButton from '@/components/CheckboxButton';
import SoundToggle from '@/components/SoundToggle';
import Select from '@/components/Select';
import Tab, { TabItem } from '@/components/Tab';
import { Contents, ContentsTitle, SubTitle, Title } from '@/components/Typography';
// import PaymentRadio from '@/components/PaymentRadio';
import Image from 'next/image';
import Textarea from '@/components/Textarea';
import Input from '@/components/Input';
import Pagination from '@/components/Pagination';
import QuantityCount from '@/components/QuantityCount';
import PurchaseModal from '@/components/PurchaseModal';
import OrderedCard from '@/components/OrderdCard';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';

// Button Component Options
const sizes = ['full', 'large', 'medium', 'small'] as const;
const options = [
  { label: '기본', props: {} },
  { label: 'Outlined', props: { outlined: true } },
  { label: 'Select', props: { select: true } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Outlined + Disabled', props: { outlined: true, disabled: true } },
  { label: 'Submit', props: { submit: true } },
];

// Select Component Options
const selectOptions = ['Option A', 'Option B', 'Option C'];
// Radio Component Options
// const radioOptions = [
//   {
//     id: 'A',
//     label: 'Option A',
//   },
//   {
//     id: 'B',
//     label: 'Option B',
//   },
//   {
//     id: 'C',
//     label: 'Option C',
//   },
// ];

// 탭 콘텐츠별 컴포넌트 정의
function BaseElementsTab() {
  return (
    <section className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-3">Icons</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col gap-3 items-center">
        {/* <Icons /> */}
        <div>
          <ShoppingCart className="inline mr-3" />
          <ShoppingCart className="text-primary inline" />
        </div>
        <div>
          <User className="inline mr-3" />
          <User className="text-primary inline" />
        </div>
        <div>
          <Search className="inline mr-3" />
          <Search className="text-primary inline" />
        </div>
        <div>
          <ThumbsUp className="inline mr-3" />
          <ThumbsUp className="text-primary inline" />
        </div>
        <div>
          <ThumbsDown className="inline mr-3" />
          <ThumbsDown className="text-primary inline" />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">Typo</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl mx-auto p-4 space-y-10">
          <div>
            <h4 className="text-md font-semibold mb-4">Components</h4>
            <div className="max-w-5xl mx-auto p-4 space-y-10 bg-accent">
              <Title>Title Component</Title>
              <SubTitle>SubTitle Component</SubTitle>
              <ContentsTitle>ContentsTitle Component</ContentsTitle>
              <Contents>Contents Component</Contents>
            </div>
          </div>
          <h4 className="text-md font-semibold mb-4">CSS styles</h4>
          <div className="max-w-5xl mx-auto p-4 space-y-10 bg-accent">
            <p className="title">title Class</p>
            <p className="sub-title">sub-title Class</p>
            <p className="contents-title">contents-title Class</p>
            <p className="label-l">label-l Class</p>
            <p className="label-m">label-m Class</p>
            <p className="label-s">label-s Class</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">Color theme</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* 컬러칩 + 이름 */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-primary" />
            <p>primary</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-secondary" />
            <p>secondary</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-accent" />
            <p>accent</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-negative" />
            <p>negative</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-darkgray" />
            <p>darkgray</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-gray" />
            <p>gray</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-lightgray" />
            <p>lightgray</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-disabled" />
            <p>disabled</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-hover" />
            <p>hover</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-text" />
            <p>text</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-background border border-gray" />
            <p>background</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ButtonElementsTab() {
  const [liked, setLiked] = useState(false);
  const buttonBg = liked ? 'bg-[#FFCC00]' : 'bg-darkgray';

  return (
    <section className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-3">기본 버튼</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl mx-auto p-4 space-y-10">
          {sizes.map(size => (
            <div key={size}>
              <h4 className="text-md font-semibold mb-4">{`Size: ${size}`}</h4>
              <div
                className={`grid gap-4 ${
                  size === 'full' ? 'grid-cols-1' : size === 'large' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
                }`}
              >
                {options.map(option => (
                  <Button key={option.label} size={size} {...option.props}>
                    {`${option.label}`}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">찜하기 버튼</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col items-center">
        <button
          className={`${buttonBg} rounded-full w-6 h-6 text-white flex justify-center items-center cursor-pointer`}
          onClick={() => setLiked(!liked)}
        >
          <Star fill="#fff" size={16} />
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-3">사운드 토글 버튼</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <SoundToggle />
      </div>
    </section>
  );
}

function InputElementsTab() {
  // select component용
  const [selectedValues, setSelectedValues] = useState({
    default: '',
    small: '',
    disabled: '',
    hiddenLabel: '',
    withPlaceholder: '',
  });
  const handleChange = (key: keyof typeof selectedValues) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // input component용
  const [inputValues, setInputValues] = useState({
    text: '',
    password: '',
    email: '',
    number: '',
    date: '',
    disabled: '',
    error: '',
    small: '',
    medium: '',
  });

  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-3">Input</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <Input
            className="mb-3"
            label="텍스트"
            id="text"
            type="text"
            placeholder="텍스트 입력"
            value={inputValues.text}
            onChange={inputHandleChange}
          />

          <Input
            className="mb-3"
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호 입력"
            value={inputValues.password}
            onChange={inputHandleChange}
          />

          <Input
            className="mb-3"
            label="이메일"
            id="email"
            type="email"
            placeholder="example@email.com"
            value={inputValues.email}
            onChange={inputHandleChange}
          />

          <Input
            className="mb-3"
            label="숫자"
            id="number"
            type="number"
            placeholder="숫자 입력"
            value={inputValues.number}
            onChange={inputHandleChange}
          />

          <Input className="mb-3" label="날짜" id="date" type="date" value={inputValues.date} onChange={inputHandleChange} />

          <Input
            className="mb-3"
            label="작은 사이즈"
            id="small"
            type="text"
            placeholder="Small input"
            value={inputValues.small}
            onChange={inputHandleChange}
            size="small"
          />

          <Input
            className="mb-3"
            label="중간 사이즈"
            id="medium"
            type="text"
            placeholder="Medium input"
            value={inputValues.medium}
            onChange={inputHandleChange}
            size="medium"
          />

          <Input
            className="mb-3"
            label="에러 상태"
            id="error"
            type="text"
            placeholder="에러 입력"
            value={inputValues.error}
            onChange={inputHandleChange}
            error
            errorMessage="입력 오류가 있습니다"
          />

          <Input
            className="mb-3"
            label="비활성화 상태"
            id="disabled"
            type="text"
            placeholder="입력 불가"
            value={inputValues.disabled}
            onChange={inputHandleChange}
            disabled
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">셀렉트 버튼</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Size: Medium</h2>
            <Select
              id="default"
              name="default"
              label="기본 선택"
              size="medium"
              selectedValue={selectedValues.default}
              onChange={handleChange('default')}
              options={selectOptions}
            />
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Size: Small</h2>
            <Select
              id="small"
              name="small"
              label="스몰 셀렉트"
              size="small"
              selectedValue={selectedValues.small}
              onChange={handleChange('small')}
              options={selectOptions}
            />
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Disabled</h2>
            <Select
              id="disabled"
              name="disabled"
              label="비활성화 셀렉트"
              disabled
              selectedValue={selectedValues.disabled}
              onChange={handleChange('disabled')}
              options={selectOptions}
            />
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Label 숨김 (showLabel=false)</h2>
            <Select
              id="hiddenLabel"
              name="hiddenLabel"
              label="숨김 라벨"
              showLabel={false}
              selectedValue={selectedValues.hiddenLabel}
              onChange={handleChange('hiddenLabel')}
              options={selectOptions}
            />
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Placeholder 포함</h2>
            <Select
              id="withPlaceholder"
              name="withPlaceholder"
              label="플레이스홀더"
              placeholder="선택하세요"
              selectedValue={selectedValues.withPlaceholder}
              onChange={handleChange('withPlaceholder')}
              options={selectOptions}
            />
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">체크박스 버튼</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <CheckboxButton className="mb-2"></CheckboxButton>
          <CheckboxButton checked></CheckboxButton>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">라디오 버튼</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <div className="payment-option mb-3 p-2 sm:p-3 cursor-pointer">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="simplePayment" value="toss" checked={true} onChange={() => {}} className="mr-2 sm:mr-3" />
              <div className="flex items-center">
                <Image
                  src="/toss-logo.png"
                  alt="토스페이"
                  width={123.88}
                  height={24}
                  className="w-[80px] sm:w-[123.88px] h-[16px] sm:h-[24px] object-contain"
                />
                <span className="text-sm sm:text-base font-medium px-2 sm:px-[15.12px] pt-1.5 text-[var(--color-primary)]">토스페이</span>
              </div>
            </label>
          </div>
          <div className="payment-option mb-3 p-2 sm:p-3 cursor-pointer">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="simplePayment" value="naver" checked={false} onChange={() => {}} className="mr-2 sm:mr-3" />
              <div className="flex items-center">
                <Image
                  src="/npay-logo.png"
                  alt="네이버페이"
                  width={82.08}
                  height={28}
                  className="w-[55px] sm:w-[82.08px] h-[19px] sm:h-[28px] object-contain"
                />
                <span className="text-sm sm:text-base font-medium px-4 sm:px-[55.92px] pt-1.5 text-[var(--color-primary)]">네이버페이</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">Textarea</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <Textarea id="textarea" name="textarea">
            AI 코딩 도구를 활용하면 코드 생성 및 자동화, 개발 워크플로우와의 통합 등이 가능하며 기존 개발 환경 대비 생산성을 높일 수 있습니다. 그러나
            개발자를 꿈꾸며 학습을하는 예비 개발자에게 AI 코딩 도구는 양날의 검이 될 수 있습니다. AI 코딩 도구에만 의존하는 주니어 개발자는 경쟁력을
            갖출 수 없기 때문입니다. 오히려 더 깊이 있게 언어를 학습하고 좋은 질문을 할 수 있도록 문해력(Literacy)을 기르는 것이 필요합니다. 다만 AI
            도구를 완전히 배제하는 것이 아닌 학습을 위한 파트너로서 활용할 것을 추천합니다.
          </Textarea>
        </div>
      </div>
    </section>
  );
}

function InteractionElementsTab() {
  // QuantityCount용
  const [quantity, setQuantity] = useState(1); // 초기 수량 1
  const handleCountQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  // Modal용
  const [isOpen, setIsOpen] = useState(false); // 모달 상태
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    alert('삭제 완료 되었습니다!');
    setIsOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-3">Pagination</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <Pagination totalPages={10} currentPage={1} />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">QuantityCounter</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <QuantityCount quantity={quantity} handleCountQuantity={handleCountQuantity} />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">Tab</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <Tab
            tabItems={[
              { id: 'A', title: 'tab A', content: <h1>Tab A contents</h1> },
              { id: 'B', title: 'tab B', content: <h1>Tab B contents</h1> },
              { id: 'C', title: 'tab C', content: <h1>Tab C contents</h1> },
            ]}
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">Modal</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <p className="label-m text-darkgray mb-3">▼ 버튼을 눌러보세요!</p>
          <Button onClick={handleOpen}>삭제하기</Button>

          <PurchaseModal
            isOpen={isOpen}
            handleClose={handleClose}
            handleConfirm={handleConfirm}
            title="삭제하기"
            description="정말 삭제하시겠습니까?"
          />
        </div>
      </div>
    </div>
  );
}

function CardElementsTab() {
  const productProps = {
    _id: 1,
    src: '/product_images/nuphy_kick75/nuphy_kick75_detail_08.webp',
    name: 'NUPHY KICK75 기계식키보드 로우 하이 듀얼 프로파일 커스텀키보드',
    price: 179000,
    quantity: 1,
    option: '레트로 그레이',
  };
  const reviewProps = {
    name: '김보드',
    createdAt: '2025/07/07',
    rating: 4,
    content: "Hul lyung han Keyboard! Ha ji man Hangul doesn't work! So I byeol jeon ggak um...",
  };
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-3">OrderCard</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <OrderedCard
            src={productProps.src}
            name={productProps.name}
            price={productProps.price}
            quantity={productProps.quantity}
            option={productProps.option}
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">ProductCard</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4">
          <div className="w-44">
            <ProductCard _id={productProps._id} imageSrc={[productProps.src]} title={productProps.name} price={productProps.price} />
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">ReviewCard</h3>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-evenly">
        <div className="max-w-5xl p-4 rounded-lg  border border-lightgray">
          <ReviewCard name={reviewProps.name} createdAt={reviewProps.createdAt} rating={reviewProps.rating} content={reviewProps.content} />
        </div>
        <div className="max-w-5xl p-4 rounded-lg  border border-lightgray">
          <ReviewCard name={reviewProps.name} createdAt={reviewProps.createdAt} rating={reviewProps.rating} content={reviewProps.content} />
        </div>
      </div>
    </div>
  );
}

export default function ComponentPage() {
  const tabItems: TabItem[] = [
    { id: 'base', title: '기본 컴포넌트', content: <BaseElementsTab /> },
    { id: 'button', title: '버튼 컴포넌트', content: <ButtonElementsTab /> },
    { id: 'input', title: '입력 컴포넌트', content: <InputElementsTab /> },
    { id: 'interact', title: '인터랙션 컴포넌트', content: <InteractionElementsTab /> },
    { id: 'card', title: '카드 컴포넌트', content: <CardElementsTab /> },
  ];

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">컴포넌트 프리뷰</h1>
        <p className="text-gray-600 text-center">Hola!TAJA의 다양한 UI 컴포넌트들을 한눈에 확인해보세요!</p>
      </div>
      <div className="container mx-auto px-4 py-8 space-y-12">
        <Tab tabItems={tabItems} defaultActiveTabId="card" />
      </div>
    </div>
  );
}
