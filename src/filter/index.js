import time from './time.js'

export default function init(vue) {
    vue.filter('time', time);
}