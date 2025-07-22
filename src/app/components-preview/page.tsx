'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Star, ThumbsDown, ThumbsUp, User } from 'lucide-react';

import Button from '@/components/Button';
import CheckboxButton from '@/components/CheckboxButton';
import SoundToggle from '@/components/SoundToggle';
import Select from '@/components/Select';
import Tab, { TabItem } from '@/components/Tab';
import { Contents, ContentsTitle, SubTitle, Title } from '@/components/Typography';

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

// 탭 콘텐츠별 컴포넌트 정의
function BaseElementsTab() {
  return (
    <section className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-3">아이콘 컴포넌트</h3>
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

      <h3 className="text-lg font-semibold mb-3">Typo 컴포넌트</h3>
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

      <h3 className="text-lg font-semibold mb-3">Color 정의</h3>
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
      <h3 className="text-lg font-semibold mb-3">기본 버튼 컴포넌트</h3>
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

  return (
    <section className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-3">셀렉트 버튼</h3>
      {/* 컴포넌트 입력: Input */}
      {/* 컴포넌트 입력: Radio */}
      {/* 컴포넌트 입력: Textarea */}
      <div>
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
        <div>
          <h3 className="text-xl font-semibold mb-4">체크박스 버튼</h3>
          <CheckboxButton className="mb-2"></CheckboxButton>
          <CheckboxButton checked></CheckboxButton>
        </div>
      </div>
    </section>
  );
}

function InteractionElementsTab() {
  return (
    <div className="p-6 space-y-6">
      {/* 컴포넌트 입력: Pagination */}
      {/* 컴포넌트 입력: QtyCounter */}
      {/* 컴포넌트 입력: Tab */}
    </div>
  );
}

function PageElementsTab() {
  return (
    <div className="p-6 space-y-6">
      {/* 컴포넌트 입력: ProductCard */}
      {/* 컴포넌트 입력: OrderCard */}
      {/* 컴포넌트 입력: ReviewCard */}
    </div>
  );
}

export default function ComponentPage() {
  const tabItems: TabItem[] = [
    { id: 'base', title: '기본 컴포넌트', content: <BaseElementsTab /> },
    { id: 'button', title: '버튼 컴포넌트', content: <ButtonElementsTab /> },
    { id: 'input', title: '입력 컴포넌트', content: <InputElementsTab /> },
    { id: 'interact', title: '인터랙션 컴포넌트', content: <InteractionElementsTab /> },
    { id: 'page', title: '페이지 컴포넌트', content: <PageElementsTab /> },
  ];

  return (
    <div className="min-h-screen border-b bg-white py-10">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">컴포넌트 프리뷰</h1>
        <p className="text-gray-600 text-center">Hola!TAJA의 다양한 UI 컴포넌트들을 한눈에 확인해보세요!</p>
      </div>
      <div className="container mx-auto px-4 py-8 space-y-12">
        <Tab tabItems={tabItems} />
      </div>
    </div>
  );
}
