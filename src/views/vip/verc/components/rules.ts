import { reactive } from 'vue';
import { phone, user_name, phone_prompt } from '@/utils/expressions';
import i18n from '@/locales';
export const rules = reactive({
  username: [
    {
      required: false,
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: false,
      pattern: phone,
      message: phone_prompt,
      trigger: 'blur'
    }
  ]
});
