/**
 * @property {name} Tab名称
 * @property {detail} 路由组件path地址
 * @property {componentName} 缓存所需组件name属性
 * @interface ToolData
 */
export interface ToolData {
  name: string;
  detail: string;
  componentName: string;
  wallet_id?: string;
}
