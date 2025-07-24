import { Title } from "@/components/Typography";
import Link from "next/link";


const OrderInfoProps = {
    "_id": 6,
    "products": [
      {
        "_id": 25,
        "quantity": 1,
        "seller_id": 15,
        "name": "NUPHY [Magnetic White] Field75 HE 자석축 기계식키보드 화이트축 래피드 트리거 게이밍",
        "image": {
          "type": "detail",
          "originalname": "nuphy_field75_spacegray_white_detail_01.webp",
          "name": "5kVt5K0wC.webp",
          "path": "files/febc13-final15-emjf/5kVt5K0wC.webp"
        },
        "price": 259000,
        "extra": {
          "isNew": false,
          "category": "OTHER",
          "option": [
            "스페이스 그레이"
          ],
          "description": "75% 배열 83키 텐키리스 Field75 HE는 홀 이펙트 센서를 사용하는 기계식 키보드입니다. 마그네틱 스위치로 신속하고 정확한 피드백! 세밀한 작동 지점 설정, 다이나믹 키 스트로크, 래피드 트리거까지 지원하는 NUPHY Field75 HE로 게임 & 일상 생활에서 자유로운 타이핑을 즐겨보세요.",
          "function-tag": "",
          "soundfile-path": "files/febc13-final15-emjf/_YzMqZjVu.m4a"
        }
      },
      {
        "_id": 14,
        "quantity": 2,
        "seller_id": 15,
        "name": "NUPHY KICK75 기계식키보드 로우 하이 듀얼 프로파일 커스텀키보드",
        "image": {
          "type": "detail",
          "originalname": "nuphy_kick75_detail_01.webp",
          "name": "7xsPlo3aY.webp",
          "path": "files/febc13-final15-emjf/7xsPlo3aY.webp"
        },
        "price": 358000,
        "extra": {
          "isNew": false,
          "category": "OTHER",
          "option": [
            "레트로 그레이"
          ],
          "description": "하나의 키보드에 두 가지 프로파일! 교체용 키트만 있으면 언제든지 원하는 프로파일로 자유롭게 변경 가능한 75% 배열 80키 구성 듀얼 프로파일 기계식 키보드, KICK75! 로우 프로파일과 하이 프로파일을 모두 지원하는 KICK75로 이제 로우-하이 고민 없이 사용하세요.",
          "function-tag": "",
          "soundfile-path": "files/febc13-final15-emjf/_YzMqZjVu.m4a"
        }
      }
    ],
    "state": "OS020",
    "user_id": 21,
    "createdAt": "2025.07.23 00:28:47",
    "updatedAt": "2025.07.23 00:28:47",
    "cost": {
      "products": 617000,
      "shippingFees": 0,
      "discount": {
        "products": 0,
        "shippingFees": 0
      },
      "total": 617000
    }
  }


export default function OrderInfo() {
  return (
    <>    
    <nav className="text-sm text-gray-500 mb-2 flex flex-row">
      <Link href={`/my`} className="text-secondary hover:underline">Orders /
        </Link>
        <p className="mx-1 text-text">Order Details</p>
    </nav>
      <Title className="title">구매 내역 상세</Title>
{/*       
          <p className="text-secondary label-s">Order #{id}</p>
          <p className="text-xs">주문일: {date}</p> */}
    </>
  );
}
