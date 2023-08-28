export function useFetch(){

  return {
    get,
    post
  }
}

// 封装请求方式
const headers = {
  Accept: "applicetion/json", // 期望请求响应的数据是什么格式
  "Content-Type": "application/json", // 发送给服务器的格式是什么

};

const handleResponse = async (res, url) => {
  //条件 status === 200 才是正确数据
  if (res.status === 200) {
    // 正确
    return await res.json();
  } else {
    // 失败
    console.log("请求错误");
    return Promise.reject({ error: `请求失败:${url}` });
  }
};

// get 请求
const get = (url) => {
  return fetch(url, {
    method: "GET",
    headers,
    credentials: 'omit',
  })
    .then((res) => {
      // 处理数据格式是不是符合预期
      return handleResponse(res, url);
    })
    .catch((err) => {
      return Promise.reject({ error: `请求失败:${url}` });
    });
};

// post 请求
const post = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: data,
    headers,
  })
    .then((res) => {
      // 处理数据格式是不是符合预期
      return handleResponse(res, url);
    })
    .catch((err) => {
      return Promise.reject({ error: `请求失败:${url}` });
    });
};