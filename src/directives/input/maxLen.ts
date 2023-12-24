import { Directive } from "vue";

/**
 * @description: input输入框最大长度限制
 */
export const inputMaxlength: Directive = {
  mounted(el, binding) {
    const bindValue = binding.value.toString();
    const maxLength = Number(bindValue);
    if (isNaN(maxLength)) {
      throw new Error("inputMaxlength must be a number");
    }
    el.addEventListener("input", (e: any) => {
      const value = e.target.value;
      if (value.length > maxLength) {
        e.target.value = value.slice(0, maxLength);
      }
    });
  }
};
