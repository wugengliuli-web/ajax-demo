import React from "react";
import "./App.css";
import { Button, Toast } from "antd-mobile";

function loadingTimeOut(time = 300) {
  return new Promise((res) => {
    setTimeout(() => {
      res("showToast");
    }, time);
  });
}

function ajax(isSuccess, ajaxTimeout = 1500, time = 300) {
  return new Promise((res, rej) => {
    console.log("开始请求");
    let canAjax = true;
    setTimeout(() => {
      if (canAjax) {
        if (isSuccess) {
          res("success");
        } else {
          rej("error");
        }
      } else {
        rej("timeout");
      }
    }, time);
    setTimeout(() => {
      canAjax = false;
    }, ajaxTimeout);
  });
}

Promise.timeSend = async function (ajax, loadingTimeOut) {
  return new Promise((resove, reject) => {
    let isShowLoading = true;
    loadingTimeOut.promise(loadingTimeOut.timeout).then((res) => {
      if (isShowLoading) {
        Toast.loading(res, 0);
      }
    });

    ajax
      .promise(ajax.isSuccess, ajax.ajaxTimeout, ajax.timeout)
      .finally(() => {
        isShowLoading = false;
        Toast.hide();
      })
      .then((res) => {
        resove(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

function App() {
  const onClick = async function promiseTime() {
    try {
      const res = await Promise.timeSend(
        {
          promise: ajax,
          timeout: 200, //请求花费时间
          ajaxTimeout: 2500, //ajax超时时间
          isSuccess: true,
        },
        {
          promise: loadingTimeOut,
          timeout: 500, //loading出现的时间
        }
      );
      Toast.success(res);
    } catch (err) {
      Toast.fail(err);
    }
  };
  return (
    <div className="App">
      <Button type="primary" onClick={(e) => onClick(e)}>
        click me
      </Button>
    </div>
  );
}

export default App;
