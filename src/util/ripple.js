export default (e) => {
    let target = e.target;
    let rect = target.getBoundingClientRect();
    let ripple = target.querySelector('.ripple');
    if (!ripple) { // 首次添加水波纹
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple); // 添加水波纹子节点
    }
    ripple.classList.remove('show'); // 移除类 show
    let top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    let left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show'); // 添加类 show
}