import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      //타입 관련
      '@typescript-eslint/no-explicit-any': 'error', //any 사용하지 않음
      '@typescript-eslint/consistent-generic-constructors': 'error', // 제네릭 일관성 있게 사용
      '@typescript-eslint/array-type': 'error', //배열 타입은 T[]으로
      '@typescript-eslint/no-duplicate-enum-values': 'error', //enum 사용시 중복값 사용 불가

      //네이밍 컨벤션 관련
      '@typescript-eslint/naming-convention': [
        'error',
        {
          //변수에 __ 사용시 거르지 않음
          selector: 'variableLike',
          format: ['camelCase'],
          filter: {
            regex: '[__]',
            match: false,
          },
        },
        {
          //함수네임 카멜케이스 사용, 컴포넌트 예외
          selector: 'function',
          format: ['camelCase'],
          filter: {
            regex: '^[A-Z]',
            match: false,
          },
        },
        {
          //함수형 컴포넌트 네이밍 파스칼케이스 사용
          selector: 'function',
          format: ['PascalCase'],
          filter: {
            regex: '^[A-Z]',
            match: true,
          },
        },
        //인터페이스 파스칼케이스 사용
        { selector: 'interface', format: ['PascalCase'] },
      ],
      // 'no-var': '2', // var 키워드 사용 가능
      // 'prefer-const': 'warn', // 변수가 재할당 되지 않는다면 let 대신 const 사용하도록 경고
      // 'no-redeclare': 1, // 변수 중복 선언시 경고
      // // 기타 룰 추가
    },
  },
  {
    ignores: ['dist'],
  },
];

export default eslintConfig;
