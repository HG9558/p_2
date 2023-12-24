import { Directive } from "vue";

/**
 * @description: 符合正则表达式的输入
 */
export const inputRegexp: Directive = {
  mounted(el, binding) {
    const regexp = binding.value;
    if (!regexp) {
      throw new Error("inputRegexp must be a regexp");
    }
    el.addEventListener("input", (e: any) => {
      const value = e.target.value;
      if (!regexp.test(value)) {
        e.target.value = value.slice(0, value.length - 1);
      }
    });
  }
};
