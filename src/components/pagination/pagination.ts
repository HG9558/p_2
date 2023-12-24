import { ref } from 'vue';

export default function usePaginationHanlder({ pageQuery, hander }: any) {
  const total = ref<number>(0);
  pageQuery.page = pageQuery.page || 1;
  pageQuery.page_size = pageQuery.page_size || 10;

  const pagination = async (obj: any) => {
    pageQuery.page = obj.page;
    pageQuery.page_size = obj.limit;
    await hander(pageQuery);
  };

  return {
    total,
    pagination
  };
}
