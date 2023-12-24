import { Directive, DirectiveBinding } from 'vue';
import { ElMessage } from 'element-plus';
import i18n from '@/locales';

interface HTMLElements extends Element {
  clickHanlder: () => void;
  selectValue: string;
}

function copyText(text: string | undefined) {
  if (!text) return;
  const input: HTMLInputElement | null = document.getElementById('clipboard-ym') as HTMLInputElement;
  if (input) {
    input.value = text;
    input.select();
    if (document.execCommand('copy')) {
      ElMessage.success({
        message: i18n.global.t('global.copy_suc'),
        type: 'success'
      });
    } else {
      ElMessage.error(i18n.global.t('global.copy_fail'));
    }
  }
}

export const clipboard: Directive = {
  updated(el: HTMLElements, binding: DirectiveBinding) {
    el.selectValue = binding.value;
  },
  beforeMount(el: HTMLElements, binding: DirectiveBinding) {
    el.clickHanlder = () => {
      copyText(el.selectValue);
    };
  },
  mounted(el: HTMLElements, binding: DirectiveBinding) {
    el.selectValue = binding.value;
    el.addEventListener('click', el.clickHanlder);
  },
  unmounted(el: HTMLElements, binding: DirectiveBinding) {
    el.removeEventListener('click', el.clickHanlder);
  }
};
