import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  react: true,
  typescript: true,

  lessOpinionated: true,
  isInEditor: false,

  stylistic: {
    semi: false,
    indent: 2,
    quotes: 'single',
  },

  formatters: {
    css: true,
  },

  ignores: [
    'migrations/**/*',
    'next-env.d.ts',
  ],
}, ...tailwind.configs['flat/recommended'], jsxA11y.flatConfigs.recommended, {
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
  },
}, {
  rules: {
    'antfu/no-top-level-await': 'off', // Allow top-level await
    'style/brace-style': ['error', '1tbs'], // Use the default brace style
    'node/prefer-global/process': 'off', // Allow using `process.env`
    'react-hooks/exhaustive-deps': 'off',
    'no-console': 'off',
    'react-refresh/only-export-components': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
})
