const toastNotificationIcons = {
    primary: 'info-circle',
    success: 'check2-circle',
    neutral: 'gear',
    warning: 'exclamation-triangle',
    danger: 'exclamation-octagon'
};

export function toastNotification(title: string, description: string, type: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' = 'primary') {
    const alert = document.createElement('sl-alert');
    (alert as any).variant = type;
    (alert as any).duration = '3000';
    (alert as any).closable = true;

    const icon = document.createElement('sl-icon');
    icon.slot = 'icon';
    (icon as any).name = toastNotificationIcons[type] || 'info-circle';

    const strong = document.createElement('strong');
    strong.textContent = title;

    const br = document.createElement('br');

    const text = document.createTextNode(description);

    alert.appendChild(icon);
    alert.appendChild(strong);
    alert.appendChild(br);
    alert.appendChild(text);

    document.body.appendChild(alert);

    // Need to do this cause the first toast usually errors :/
    try { (alert as any).toast() }
    catch (error) { setTimeout(() => (alert as any).toast(), 500) }
}