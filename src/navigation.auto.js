/**
 * navigation-loader处理约定
 */
import React, { useState, useEffect } from "react";
export default () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectKey, setSelectKey] = useState("");
  // 跳转
  useEffect(() => {
    location.hash = selectKey;
  }, [selectKey]);
  return <div className="app-navigation">{/* navigation */}</div>;
};
