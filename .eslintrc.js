module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "vue/multi-word-component-names": 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 1,
        'vue/no-unused-components': 1,
        'vue/no-mutating-props': 0,
        'vue/html-self-closing': ['error', {
            "html": {
                "void": 'never',
                "normal": 'never',
                "component": 'always'
            },
            "svg": 'always',
            "math": 'always'
        }]
    }
}
