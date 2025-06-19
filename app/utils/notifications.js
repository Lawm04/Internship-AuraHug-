export function ensurePermission() {
  if (typeof Notification === "undefined") return;

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

export function notifyUser(title, options) {
  if (typeof Notification === "undefined") return;
  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
}

    