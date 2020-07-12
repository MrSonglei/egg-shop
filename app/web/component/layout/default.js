import Vue from 'vue';
import '../../asset/css/global.css';
import createLayout from './layout';
const tpl = '<div id="app" data-server-rendered="true"><slot></slot></div>';
export default createLayout('Layout', { }, tpl);