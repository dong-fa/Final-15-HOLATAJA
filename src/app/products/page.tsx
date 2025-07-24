import Carousel from '@/components/Carousel';
import Tab, { TabItem } from '@/components/Tab';
import SearchBar from '@/app/products/SearchBar';
import CategoryToggle from '@/app/products/CategoryToggle';
import ProductCard from '@/components/ProductCard';
import { Title } from '@/components/Typography';
// import useAxiosInstance from '@/hooks/useAxiosInstance';
import { Product } from '@/types/product';
import { getProductList } from '@/data/functions/product';

export default async function ProductPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await getProductList();

  let productList: Product[] = [];

  if (res.ok) {
    const dataList = res.item;

    productList = dataList.map(item => {
      return {
        _id: item._id,
        imgSrc: item.mainImages[0].path ? `${API_URL}/${item.mainImages[0].path}` : '/product_images/holataja_circle.webp',
        name: item.name,
        price: item.price,
        category: item.extra.category,
        quantity: item.quantity,
        createdAt: item.createdAt,
      };
    });
  } else {
    // 에러 처리
    console.error('상품 목록을 가져오지 못했습니다.');
  }

  // Tab category에 맞게 content 만들어주는 함수
  function getTabContent(category: Product['category'] | 'ALL') {
    const filtered = category === 'ALL' ? productList : productList.filter(productList => productList.category === category);

    return (
      <>
        <SearchBar />
        <CategoryToggle />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {filtered.map((product, index) => (
            <ProductCard key={index} _id={product._id} imageSrc={product.imgSrc} title={product.name} price={product.price} />
          ))}
        </div>
      </>
    );
  }

  const tabItems: TabItem[] = [
    { id: 'ALL', title: '전체 보기', content: getTabContent('ALL') },
    { id: 'BLUE', title: '청축(Click Tactile)', content: getTabContent('BLUE') },
    { id: 'BROWN', title: '갈축(Soft Tactile)', content: getTabContent('BROWN') },
    { id: 'RED', title: '적축(Linear)', content: getTabContent('RED') },
    { id: 'OTHER', title: '기타', content: getTabContent('OTHER') },
  ];

  return (
    <>
      <section className="py-2">
        <Carousel />
      </section>

      <section className="max-w-5xl py-3 mx-auto">
        <Title>상품 목록</Title>

        <Tab tabItems={tabItems} />
      </section>
    </>
  );
}
