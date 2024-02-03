export default function getTaipeiDate() {
  // https://noob.tw/js-timezone/
  const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' });
  return new Date(now);
}
