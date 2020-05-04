import React from "react";
import * as classes from "./SearchHereToast.treat";

interface ISearchHereProps {
  isVisible?: boolean;
  onClick: () => void;
}

export default function SearchHereToast(props: ISearchHereProps) {
  if (props.isVisible) {
    return (
      <div className={classes.SearchHereToastWrapper} onClick={props.onClick}>
        <div className={classes.SearchHereToast}>Cerca in questa zona</div>
      </div>
    );
  }
  return null;
}
