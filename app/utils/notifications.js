export function ensurePermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

export function notifyUser(title, options) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, options);
  }
}