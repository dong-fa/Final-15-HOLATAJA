import Input from '@/components/Input';

export default function SearchBar({ searchValue, setSearchValue }: { searchValue: string; setSearchValue: (value: string) => void }) {
  return (
    <div className="w-full flex flex-row">
      <span className="w-full sm:w-80 ml-auto">
        <Input
          id="search"
          type="text"
          placeholder="검색어를 입력해주세요."
          size="small"
          className="pl-10 pr-3 py-1.5 mb-3 !bg-accent outline-transparent focus:outline-primary focus:ring-0
    bg-[url('/icon/search.svg')] bg-no-repeat bg-[length:1rem_1rem] bg-[position:1rem_center] placeholder:text-[14px]"
          value={searchValue}
          onChange={e => setSearchValue(e.currentTarget.value)}
        />
      </span>
    </div>
  );
}
