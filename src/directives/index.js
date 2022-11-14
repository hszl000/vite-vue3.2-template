// 页面按钮权限
import drag from "@/directives/drag";
import permission from "@/directives/permission";
import copy from "@/directives/copy";
import longpress from "@/directives/longpress";
import debounce from "@/directives/debounce";

export default {
  install: (app) => {
    app.directive("showPermission", permission);
    app.directive("drag", drag);
    app.directive("copy", copy);
    app.directive("longpress", longpress);
    app.directive("debounce", debounce);
  },
};
