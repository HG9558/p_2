import { connect, StringCodec } from 'nats.ws';
import event from '@/utils/bus';
import { store } from '@/store';

// 全局 mitt 事件名称
export const events = {
  NOTICE_REPLY: `${store.getters['user/getPrefix']}:merchant_notify`, // 后台推送事件名称
  NOTICE_CLICK_EVENT: 'notice_click_event' // 弹框事件点击名称
};

// 链接scoket服务器
export async function natsConnect(url: string, user: string, pass: string) {
  events.NOTICE_REPLY = `${store.getters['user/getPrefix']}:merchant_notify`;
  // to create a connection to a nats-server:
  const nc = await connect({
    servers: url,
    user,
    pass,
    pingInterval: 10000
  });

  event.$on('logoutFn', async () => {
    const done = nc.closed();
    // do something with the connection

    // close the connection
    await nc.close();
    // check if the close was OK
    const err = await done;
    if (err) {
      console.log(`error closing:`, err);
    }
  });

  // create a codec
  const sc = StringCodec();
  // create a simple subscriber and iterate over messages
  // matching the subscription
  const sub = nc.subscribe(events.NOTICE_REPLY);

  console.log('监听事件: ', events.NOTICE_REPLY);

  (async () => {
    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);

      event.$emit(events.NOTICE_REPLY, sc.decode(m.data));
    }
  })();
}
