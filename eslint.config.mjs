// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/html-self-closing": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "vue/no-parsing-error": "off"
  }
});
