import React from "react";
import Router from "@/router.auto.js";
import GithubIcon from '@/assets/image/github.png'
export default () => {
  return (
    <div className="app-layout">
      <div className="app-header">
        进阶2021
        <div className='app-header-github'>
          Github<img src={GithubIcon} />
        </div>
      </div>
      <div className="app-main">
        <div className="app-main-left">Left</div>
        <div className="app-main-right">
          <Router />
        </div>
      </div>
    </div>
  );
};
