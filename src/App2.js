import React from "react";
import { Button, Toast } from "antd-mobile";

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

const App = () => {
  const click = async function (e) {
    Toast.loading("开始请求", 0);
    try {
      const res = await ajax(true, 1500, 200);
      Toast.success(res);
    } catch (err) {
      Toast.fail(err);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={(e) => click(e)}>
        click me
      </Button>
    </div>
  );
};

export default App;
