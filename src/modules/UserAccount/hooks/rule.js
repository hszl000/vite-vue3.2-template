import { useLocale } from 'element-plus'

// 用户名校验
export const userValidator = (rule, value, callback) => {
  if (value.length > 3) {
    callback();
  } else {
    callback(new Error(useLocale().t('login.userRule')));
  }
};
// 密码校验
export const passValidator = (rule, value, callback) => {
  if (value.length > 4) {
    callback();
  } else {
    callback(new Error(useLocale().t('login.passRule')));
  }
};