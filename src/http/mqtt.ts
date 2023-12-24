// @ts-ignore
import mqtt from 'precompiled-mqtt';
import { store } from '@/store';
import event from '@/utils/bus';
import Local from '@/utils/storage';
// 订阅的事件
export const events = {
  NOTICE_REPLY: `${store.getters['user/getPrefix']}/merchant`, // 订阅存款取款消息
  NOTICE_CLICK_EVENT: 'notice_click_event' // 弹框事件点击名称
};
// 事件的种类
type topicType = keyof typeof events;
let client: any = null;

export const mqttConnect = (url: string, username: string, password: string) => {
  if (url.length === 1) return store.dispatch('user/logout', 2);
  if (client) {
    return client.end(true, null, () => {
      console.error(`mqtt连接已存在，即将关闭连接，并重新连接！！！`);
      mqttConnect(Local.get('socketUrl')[0], username, password);
    });
  }
  // 创建链接
  let aa = Local.get('socketUrl');
  client = mqtt.connect(aa[0], {
    username: username,
    password: password,
    keepalive: 6 // 心跳时间
  });

  client.on('connect', () => {
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥 成功链接到' + url);
  });
  // 订阅存款取款消息
  client.subscribe(
    events.NOTICE_REPLY,
    {
      qos: 1
    },
    () => {
      console.log(`订阅存款取款:${events.NOTICE_REPLY}成功 😽😽😽😽😽😽😽😽😽😽`);
    }
  );

  client.on('message', (topic: topicType, message: any, packet: any) => {
    console.log(topic, message.toString(), packet);
    // 根据不同的topic处理业务逻辑
    switch (topic) {
      case events.NOTICE_REPLY:
        handleNoticeReply(topic, message, packet);
        break;
      default:
        break;
    }
  });
  client.on('error', (error: any) => {
    console.log('😞😞😞😞😞😞😞 链接错误', error);
  });
  client.on('close', () => {
    if (url == aa[0]) {
      let bb = [aa[0], aa[1]] = [aa[1],aa[0]];
      Local.set('socketUrl', bb);
    } else {
      console.log('切换链接 🔗🔗🔗🔗🔗🔗');
      mqttConnect(aa[0], username, password);
      // 清空对象
      client = null;
    }
    console.log(url + '🔐🔐🔐🔐🔐🔐🔐🔐 链接关闭');
  });
  // 用户登出时，关闭链接
  event.$on('logoutFn', async () => {
    client?.end();
    client = null;
  });
};

/**
 * @description 处理存款取款业务逻辑
 * @param {topicType} topic
 * @param {*} message
 * @param {*} packet
 */
const handleNoticeReply = (topic: topicType, message: any, packet: any) => {
  event.$emit(events.NOTICE_REPLY, message.toString());
};
