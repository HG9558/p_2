import { ref } from 'vue';
import { replayType } from '@/utils/selectOptions';

export default function useSearchPlaceholder() {
  const FormDataList = ref<any[]>([
    {
      label: '订单号',
      model: 'user_name',
      placeholder: '请输入订单号'
    }
  ]);
  return {
    FormDataList
  };
}
