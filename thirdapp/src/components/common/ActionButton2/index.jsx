
import React from "react";
import './../../../assets/css/App.css';

/**
 * 共通で利用するActionButtonコンポーネント(引数がある場合)
 */
const ActionButton2 = (props) => {
    // propsからボタンの色と実行する関数の要素を取り出す。
    const { buttonName, color, clickAction} = props;

    // 描画する内容
    return (
      <button></button>
    );
};

export default ActionButton2;
