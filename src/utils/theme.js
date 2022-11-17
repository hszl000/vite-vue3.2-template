import { ref, watchEffect } from "vue";
import axios from "axios";

const modules = import.meta.glob("element-plus/package.json");
// ele 版本
export const version = ref("");
// ele style
export const eleStyle = ref("");

watchEffect(async () => {
  const [module] = Object.values(modules);
  const eleModule = await module();
  version.value = eleModule.version;
});

/**
 * 生成主题色以及主题色延伸出的请景色
 */
export const getThemeCluster = (theme) => {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(",");
    } else {
      red += Math.round(tint * (255 - red));
      green += Math.round(tint * (255 - green));
      blue += Math.round(tint * (255 - blue));

      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);

      return `#${red}${green}${blue}`;
    }
  };

  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);

    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    return `#${red}${green}${blue}`;
  };

  // 首先放入主题色以及情景色
  const clusters = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
};

// 发送请求 拿到ele当前版本 css 文件
export const getCSSString = (url) => {
  return new Promise(async (resolve) => {
    const res = await axios.get(url);
    eleStyle.value = res.data.replace(/@font-face{[^}]+}/, "");
    resolve();
  });
};

/**
 *
 * @param {String} style 请求得到的css样式
 * @param {Array} oldCluster 默认情景色
 * @param {Array} newCluster 新的情景色
 * @descrpition 用正则表达式 在 style 中 将 oldCluster 替换成 newCluster
 * @returns 生成新的 css
 */
export const updateStyle = (style, oldCluster, newCluster) => {
  let newStyle = style;
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
  });
  return newStyle;
};

/**
 *
 * @param {String} id 生成的style标签id
 * @param {String} originalCluster 得到默认情景色
 * @param {*} newStyle 计算出新的 css 样式
 * @param {*} updateStyle 计算函数
 * @param {*} styleTag 获取到手动添加的 style 样式
 * @description 用于替换 页面中的 css 样式
 */
export const getHandler = (id, defaultTheme, themeCluster) => {
  return () => {
    const originalCluster = getThemeCluster(defaultTheme.replace("#", ""));
    const newStyle = updateStyle(eleStyle.value, originalCluster, themeCluster);

    let styleTag = document.getElementById(id);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.setAttribute("id", id);
      document.head.appendChild(styleTag);
    }
    styleTag.innerText = newStyle;
  };
};
