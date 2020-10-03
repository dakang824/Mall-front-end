/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-02 21:24:48
 * @LastEditTime: 2020-10-03 20:40:39
 */
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "mixin",
          "extend",
          "content",
          "include",
          "for",
          "function",
          "return",
        ],
      },
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["export"],
      },
    ],
    indentation: 2,
    "no-descending-specificity": null,
    "declaration-colon-newline-after": null,
  },
  ignoreFiles: ["**/*.js", "dist/*.*", "node_modules", "**/*.ts", "**/*.md"],
};
