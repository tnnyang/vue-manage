module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'never'], // 是否允许对象中出现结尾逗号
    'no-cond-assign': 2, // 条件语句的条件中不允许出现赋值运算符
    'no-extra-boolean-cast': 2, // 不允许出现不必要的布尔值转换
    'no-extra-parens': 0, // 不允许出现不必要的圆括号
    'no-extra-semi': 2, // 不允许出现不必要的分号
    'use-isnan': 2, // 要求检查NaN的时候使用isNaN()
    'no-new': 2, // 不允许new一个实例后不赋值或者不比较
    'no-return-assign': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
