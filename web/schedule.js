(function (root) {
  'use strict';
  var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  function pad(value) { return value < 10 ? '0' + value : String(value); }
  function schedule(now) {
    // Shift to Moscow and use UTC getters so the visitor's timezone has no effect.
    var date = new Date(now + 180 * 60000);
    if (date.getUTCHours() * 60 + date.getUTCMinutes() >= 1075) date.setUTCDate(date.getUTCDate() + 1);
    var day = date.getUTCDate();
    return {
      label: day + ' ' + months[date.getUTCMonth()],
      day: String(day),
      datetime: date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(day) + 'T19:00:00+03:00'
    };
  }
  if (typeof module === 'object' && module.exports) module.exports = schedule;
  if (!root.document) return;
  function refresh() {
    var value = schedule(Date.now());
    var dates = root.document.querySelectorAll('[data-webinar-date]');
    var labels = root.document.querySelectorAll('[data-webinar-schedule]');
    for (var i = 0; i < dates.length; i++) {
      dates[i].textContent = value.label;
      dates[i].setAttribute('datetime', value.datetime);
    }
    for (var j = 0; j < labels.length; j++) labels[j].textContent = value.label + ' · 19:00 МСК · онлайн';
    root.document.getElementById('registration').setAttribute('data-day', value.day);
  }
  refresh();
  root.setInterval(refresh, 1000);
  root.document.addEventListener('visibilitychange', refresh);
}(typeof window !== 'undefined' ? window : this));
