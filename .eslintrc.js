module.exports = {
    'root': true,

    'plugins': [
        '@typescript-eslint'
    ],

    'env': {
        'es6': true,
        'commonjs': true
    },

    'parser': '@typescript-eslint/parser',

    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 2017
    },

    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],

    'rules': {
        '@typescript-eslint/indent': ['error', 4, {
            'flatTernaryExpressions': true,
            'MemberExpression': 0
        }],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'eqeqeq': ['error', 'smart'],
        'max-len': ['error', {
            'code': 100,
            'ignoreComments': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
            'ignoreRegExpLiterals': true,
        }],
        'eol-last': ['error', 'always'],
        '@typescript-eslint/no-unused-vars': 'off',
        'no-var': ['error'],
        'prefer-const': ['error'],
        'semi': ['error', 'always'],
        'curly': ['error'],
        'arrow-parens': ['error', 'always'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'arrow-spacing': ['error', { 'before': true, 'after': true }],
        'block-spacing': ['error', 'always'],
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'computed-property-spacing': ['error', 'always'],
        'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
        'keyword-spacing': ['error', { 'before': true, 'after': true }],
        'object-curly-spacing': ['error', 'always'],
        'semi-spacing': ['error', { 'before': false, 'after': true }],
        'space-before-blocks': ['error', 'always'],
        'space-infix-ops': ['error'],
        'space-unary-ops': ['error', { 'words': true, 'nonwords': false, 'overrides': { '++': true, '--': true } }],
        'spaced-comment': ['error', 'always'],
        'func-call-spacing': ['error', 'never'],
        'no-trailing-spaces': ['error'],
        'no-whitespace-before-property': ['error'],
        'space-before-function-paren': ['error', { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }],
        'no-eval': ['off'],
        'no-implied-eval': ['warn'],
        'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-inferrable-types': ['off'],
        '@typescript-eslint/no-non-null-assertion': ['off'],
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/explicit-member-accessibility': ['error']
    }
};
