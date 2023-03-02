export function getDeviceWidthSizeName(): 'mobile' | 'small' | 'reg' {
    // size align by _scss-var.scss
    if(window.innerWidth < 900) return "mobile"
    if(window.innerWidth < 1200) return "small"
    return "reg"
}