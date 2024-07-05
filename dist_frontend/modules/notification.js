var toastNotificationIcons = {
    primary: 'info-circle',
    success: 'check2-circle',
    neutral: 'gear',
    warning: 'exclamation-triangle',
    danger: 'exclamation-octagon'
};
export function toastNotification(title, description, type) {
    if (type === void 0) { type = 'primary'; }
    var alert = document.createElement('sl-alert');
    alert.variant = type;
    alert.duration = '3000';
    alert.closable = true;
    var icon = document.createElement('sl-icon');
    icon.slot = 'icon';
    icon.name = toastNotificationIcons[type] || 'info-circle';
    var strong = document.createElement('strong');
    strong.textContent = title;
    var br = document.createElement('br');
    var text = document.createTextNode(description);
    alert.appendChild(icon);
    alert.appendChild(strong);
    alert.appendChild(br);
    alert.appendChild(text);
    document.body.appendChild(alert);
    // Need to do this cause the first toast usually errors :/
    try {
        alert.toast();
    }
    catch (error) {
        setTimeout(function () { return alert.toast(); }, 500);
    }
}
