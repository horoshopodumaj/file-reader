export default {
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "trailingComma": "all",
  "arrowParens": "avoid",
  "singleQuote": false,
  "printWidth": 120,
  "useTabs": false,
  "tabWidth": 2,
  "semi": true,
  "importOrder": [
    "^(\\.{1,2}/)+components(.*)$",
    "^\\.\\./(.*)[^(.scss)]$",
    "^\\./(.*)[^(.scss)]$",
    ".scss$"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
