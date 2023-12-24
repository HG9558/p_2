// import i18n from '@/locales';
// i18n.global.t('global.remark')
import i18n from '@/locales';

/**
 * 邮箱正则表达式
 */
export const email = /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export const email_prompt = i18n.global.t('routes.tips.email_prompt');
/**
 * 密码正则表达式
 */
export const password = /^[a-zA-Z0-9]{6,20}$/;
export const password2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
export const password2Msg = i18n.global.t('routes.tips.password2Msg');

/**
 * 会员名称正则表达式
 * 跟后端检验一致
 */
export const username_re = /^[\w]*$/; // 跟后端检验一致
export const username_tips = i18n.global.t('routes.tips.fourNumberMsg');

/**
 * 会员名称正则表达式
 */
export const user_name = /^[a-zA-Z0-9\s]{5,14}$/; // 前两位必须是字母，长度5-14位
export const user_name_prompt = i18n.global.t('routes.tips.fourNumberMsg');
// export const user_name_prompt = i18n.global.t('routes.tips.user_name_prompt');

/**
 * 正整数
 */
export const integers = /^[0-9]\d*$/;
export const un_prompt  = /^[a-zA-Z\s]{5,}$/;

/**
 * 时分秒
 */
export const time_prompt  = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

/**
 * 0-100正整数
 */
export const integer0_100 = /^([1-9][0-9]{0,1}|100|0)$/;
/**
 * 手机号验证
 */
// export const phone = /^1[345678]\d{9}$/;
export const phone = /^(0([0-9]{9})|(1[345678]\d{9}))$/; // 同时验证越南和中国手机号
export const phone_prompt = i18n.global.t('routes.tips.phone_prompt');
export const moneys = /^\+?[1-9]*\d$/;

/**
 * zalo
 */
export const zalo = /^(0([0-9]{9})|(1[345678]\d{9}))$/; // 同时验证越南和中国手机号
export const zalo_prompt = i18n.global.t('routes.tips.zalo_prompt');

// 越南手机号验证  ---别用
export const viPhone = /^0(8[1-5]|3[2-9]|7[0|6-9]|5[6|8|9])+([0-9]{7})$/g;

/**
 * 匹配url地址
 */
export const https = /^(http|https):\/\/([\w.]+\/?)\S*/;
export const https_o = /^\/([A-Za-z0-9\/])*/;
export const https_prompt = i18n.global.t('routes.tips.https_prompt');
export const https_o_prompt = i18n.global.t('routes.tips.https_o_prompt');

/**
 * 会员配置
 */
export const vip = /^[0-9]\d*$/;
/**
 * 长度为3
 */
export const threeLength = /^([1-9_-]){1,3}$/;
/**
 * 长度为10
 */
export const tenLength = /^([1-9_-]){1,10}$/;
/**
 * 银行卡
 */
export const backCard = /^([0-9]{1})(\d{5,19})$/;
export const backCardTips = i18n.global.t('routes.tips.backCardTips');
/**
 * 真实姓名
 */
export const realName = /^[\u4e00-\u9fa5_a-zA-Z]+$/;
export const titleReg = /^[\u4e00-\u9fa5\w]+$/;

/**
 * 设备号
 */
export const recNumber = /^[A-Za-z0-9\-]+$/;
/**
 * IP地址
 */
export const ipNumber = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))|(^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$)/;
export const ipTips = i18n.global.t('routes.agent.right_ip');

/**
 * 保留小数点后4位
 */
export const towNumber = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
export const fourNumber = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/;
export const fourNumberMsg = i18n.global.t('routes.tips.fourNumberMsg');

// 验证是否是图片
export const imgReg = /\.(jpeg|jpe|jpg|gif|png|webp|svg)$/;

// 版本号1-99,0-99,0-99
export const appNumber = /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/;
export const appErroMsg = i18n.global.t('routes.tips.appErroMsg');
// 保留4位小数
export const fixedNum = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/;
export const fixedNum3 = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/;
// 1-20位中文
export const chinaLength = /^[\u4e00-\u9fa5]{1,20}$/;

export const user_name2 = /^[^\u4e00-\u9fa5]{0,}$/;
export const less4 = /^[a-zA-Z]{4,}$/;
export const less5 = /^.{5,}$/;

// 中文
export const chinaLang = /[\u4e00-\u9fa5]/;

/**
 * 长度为20
 */
export const twentyLength = /^([1-9_-]){1,20}$/;

// 动态验证码
export const dynamic = /^[0-9]{6}$/;
export const dynamicMsg = i18n.global.t('routes.tips.dynamicMsg');

// 1-999正整数
export const one_nine = /^\+?[1-9]{1}[0-9]{0,2}\d{0,0}$/;
export const nine_tips = i18n.global.t('routes.tips.nine_tips');

// 0-999正整数
export const zero_nine = /^\+?[0-9]{1}[0-9]{0,2}\d{0,0}$/;
export const zero_nine_tips = i18n.global.t('routes.tips.zero_nine_tips');

// 1-1亿 ，保留4位小数
export const one_billion = /^(([1-9]{1}[0-9]{0,7})(\.(\d){0,4})?|(10{8})(\.0{0,4})?)$/;
export const one_billion_tips = i18n.global.t('routes.tips.one_billion_tips');

// 1-100
export const one_hundred = /^([1-9][0-9]{0,1}|100)$/;
export const one_hundred_tips = i18n.global.t('routes.tips.one_hundred_tips');

// 1-10亿
export const ten_billion = /^(?:(?!0)\d{1,9}|10{9})(\.\d{1,4})*$/;
export const ten_billion_tips = i18n.global.t('routes.tips.ten_billion_tips');

// 系统账号密码限制
export const syspsw = /^(?![0-9]+$)[0-9A-Za-z]{5,20}$/;
export const adminPassword = /^(?![0-9]+$)(?![A-Za-z]+$)[0-9A-Za-z]{5,20}$/;
export const syspswMsg = i18n.global.t('routes.tips.syspswMsg');
export const syspswUserNameMsg = i18n.global.t('routes.tips.syspswUserNameMsg');

// 0-10亿 ，保留4位小数
export const teny = /^(([0-9]{1}[0-9]{0,8})(\.(\d){0,4})?|(10{9})(\.0{0,4})?)$/;
export const teny_tips = i18n.global.t('routes.tips.teny_tips');

// 多个会员账号逗号隔开
export const usernames = /^([A-z0-9]{4,14},){0,19}[A-z0-9]{4,14}$/;
export const usernames_200 = /^([A-z0-9]{4,14},){0,199}[A-z0-9]{4,14}$/;
// export const usernames = /^([A-z0-9]{4,14},)*[A-z0-9]{4,14}$/;
// 验证数字
export const input_numbers = /^[0-9]*$/;
export const shiyi_tips = i18n.global.t('routes.tips.shiyi_tips');
// 0-9999正整数
export const reg_number = /^\+?[0-9]{1}[0-9]{0,3}\d{0,0}$/;
export const reg_number_tips = i18n.global.t('routes.tips.reg_number_tips');
// 越南文和英文
export const reg_word = /^[A-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/;
export const reg_word_tips = i18n.global.t('routes.tips.reg_word_tips');

// 手机号验证
// 0-9999正整数
export const phone_new = /^(?!0)\d{9}$/;
export const phone_new_tips = 'Vui Lòng Nhập 9 Chữ Số, Không Bắt Đầu Bằng Số 0';

