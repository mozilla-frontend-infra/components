const fs = require('fs-extra');
const { join } = require('path');

require('@babel/register')({
  presets: [require.resolve('@babel/preset-env')],
  cache: false,
});

const theme = require('./src/theme').default;

module.exports = {
  use: [
    ['@neutrinojs/airbnb', {
      eslint: {
        parserOptions: {
          ecmaFeatures: {
            legacyDecorators: true
          }
        },
        emitWarning: process.env.NODE_ENV === 'development',
        baseConfig: {
          extends: ['plugin:react/recommended', 'eslint-config-prettier'],
        },
        plugins: ['prettier'],
        rules: {
          'react/jsx-wrap-multilines': 'off',
          'react/prop-types': 'off',
          'react/jsx-one-expression-per-line': 'off',
          'react/forbid-prop-types': 'off',
          'react/prefer-stateless-function': 'off',
          'react/no-access-state-in-setstate': 'off',
          'react/destructuring-assignment': 'off',
          'babel/no-unused-expressions': 'off',
          'import/no-extraneous-dependencies': 'off',
          // Specify the maximum length of a line in your program
          'max-len': [
            'error',
            80,
            2,
            {
              ignoreUrls: true,
              ignoreComments: false,
              ignoreStrings: true,
              ignoreTemplateLiterals: true,
            },
          ],
          // Allow using class methods with static/non-instance functionality
          // React lifecycle methods commonly do not use an instance context for
          // anything
          'class-methods-use-this': 'off',
          // Allow console during development, otherwise throw an error
          'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
          'prettier/prettier': [
            'error',
            {
              singleQuote: true,
              trailingComma: 'es5',
              bracketSpacing: true,
              jsxBracketSameLine: false,
            },
          ],
          'consistent-return': 'off',
          'no-shadow': 'off',
          'no-return-assign': 'off',
          'babel/new-cap': 'off',
          'no-mixed-operators': 'off',
        },
      },
    }],
    ['@neutrinojs/react-components', {
      babel: {
        plugins: [
          [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
          require.resolve('@babel/plugin-proposal-class-properties'),
        ],
      },
    }],
    (neutrino) => {
      neutrino.register('styleguide', () => ({
        webpackConfig: neutrino.config.toConfig(),
        components: 'src/components/**/index.jsx',
        skipComponentsWithoutExample: true,
        theme: theme.styleguide,
        styles: {
          StyleGuide: theme.styleguide.StyleGuide,
        },
        usageMode: 'expand',
        styleguideComponents: {
          Wrapper: join(__dirname, 'src/styleguide/ThemeWrapper.jsx'),
          StyleGuideRenderer: join(__dirname, 'src/styleguide/StyleGuideRenderer.jsx'),
        },
      }));
    },
    (neutrino) => {
      if (process.env.NODE_ENV === 'development') {
        neutrino.config.module.rules.delete('lint');
      }

      if (process.env.NODE_ENV === 'production' && fs.existsSync('build')) {
        ['package.json', 'logo.png', 'LICENSE', 'README.md', 'AUTHORS'].map(file => {
          fs.copyFileSync(file, join(__dirname, `build/${file}`));
        })
      }
    },
  ],
};
