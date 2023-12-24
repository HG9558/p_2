export interface NoticeMessage<T, U> {
  title: string;
  details: T;
  id?: U;
}
