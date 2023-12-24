import { ElNotification } from 'element-plus';
import bus from '@/utils/bus';
import { events } from '@/http/socket';

// 待处理任务弹出任务, 系统
export function getPermission(msg: string) {
  const message = JSON.parse(msg)[getLocal()];
  // const message = {
  //   url: '/risk/withdrawalReview',
  //   title: 'aaa',
  //   content: 'adfasdfasdfsd'
  // };
  if (Notification.permission == 'granted') {
    popNotice(message);
  } else if (Notification.permission == 'default') {
    Notification.requestPermission(function (permission) {
      if (permission === 'denied') {
        console.log('拒绝显示通知，请在设置中修改设置\nGoogle浏览器：设置-网站设置-权限-打开此网站通知');
      } else {
        popNotice(message);
      }
    });
  } else if (Notification.permission == 'denied') {
    console.log('您曾级拒绝显示通知，请在设置中修改设置\nGoogle浏览器：设置-网站设置-权限-打开此网站通知');
  }
}

function getLocal(lang: string = localStorage.getItem('language') || 'zh-CN') {
 if (lang === 'zh-CN') {
    return 'cn';
  } else {
    return 'en';
  }
}

export function popNotice(message: any) {
  let notification: any = '';

  if (Notification.permission == 'granted') {
    if (notification) {
      notification.close();
    }
    notification = new Notification(message.title || 'title', {
      body: message.content || 'no content',
      icon: '/img/p3.ico',
      tag: message.content,
      silent: true, // 是否播声音
      requireInteraction: true
    });

    notification.onclick = function(event: any) {
      // console.error('event', event);
      // console.error(event);
      
      // event.preventDefault();
      window.focus();
      // this.cancel();
      setTimeout(() => {
        bus.$emit(events.NOTICE_CLICK_EVENT, message.url);
        notification.close();
      }, 1000);
    };
  }
}

// 待处理任务弹出任务, Element
function taskHanlder(message: string) {
  ElNotification({
    title: '提示',
    message: message,
    offset: 200
  });
}
