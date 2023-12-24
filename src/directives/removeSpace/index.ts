import Vue, { Directive } from 'vue';

// 将nbsp替换成空格
export const removeSpace: Directive = {
  mounted(el: any, binding) {
    const { modifiers, arg } = binding;
    // 默认是element表单元素
    // 获取input元素,默认取textarea元素
    let input: any = el.querySelector(arg ? arg : 'textarea');
    try {
      // 如果不是el输入框 那么直接返回
      if (!input) {
        return false;
      }

      input.addEventListener('input', (e: any) => {
        console.log(binding.value);
        let txt = e.target.value;
      });

      input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'));
    } catch (e) {
      console.log(e);
    }
  },
  // mounted(el, binding) {
  //   el.style.position = 'fixed'
  //   const s = binding.arg || 'top'
  //   el.style[s] = binding.value + 'px'
  // },
  updated(el, binding) {
    console.log(binding.value);
    binding.value;
  }
};
