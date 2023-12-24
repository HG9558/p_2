import murmurHash3 from 'murmurhash3js';
import {
  uuid,
  getBrowser,
  getIosVersion,
  checkSystemFonts,
  getCanvasFingerprint,
  getTimeZone,
  getFontFamily
} from './deviceUtil';

export default function getDeviceInfo() {
  const browser = getBrowser();
  const info = {
    webrtcid: "",
    deviceType: "ios",
    isIos: browser.isIos,
    OS: "OS",
    iosVersion: getIosVersion(),
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
    colorDepth: window.screen.colorDepth,
    language: window.navigator.language,
    netWork: navigator.connection && navigator.connection.effectiveType,
    browser_version: browser.version,
    browser_type: browser.type,
    devicePixelRatio: window.devicePixelRatio,
    fingerprint: getCanvasFingerprint(),
    userAgent: window.navigator.userAgent,
    zone: getTimeZone(), // 时区
    font: getFontFamily(), // 当前默认字体
    allFonts: checkSystemFonts(), // 所有支持的字体
    date: new Date(),
    UUID: uuid()
  }

  const data = [
    info.font,
    info.allFonts,
    info.language,
    info.zone,
    info.screenWidth,
    info.screenHeight,
    // info.innerWidth,
    // info.innerHeight,
    info.colorDepth,
    info.iosVersion
  ];

  return new Promise((resolve, reject) => {
    let pc = new RTCPeerConnection({iceServers: []});
    pc.createDataChannel('xxx000xxxx'); //create a bogus data channel
    pc.createOffer().then(SDP => {
      pc.setLocalDescription(SDP, () => {}, () => {})
    });
    pc.onicecandidate = ice => {
      // console.log('ice===》》》》', ice)
      if (ice && ice.candidate && ice.candidate.candidate) {
        const rtcId = ice.candidate.candidate.split(' ')[0].split(':')[1];
        data.push(rtcId)
      }

      info.webrtcid = murmurHash3.x86.hash128(data.join('|'), 24);

      resolve(info);
    }
  })
}