import { useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Children } from "../../util";

type Props = {
  /**
   * Content of the portal
   */
  children: Children;
};

export function ModalPortal(props: Props) {
  const domNode = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.appendChild(domNode);

    // When opening a Modal, the content below it should never scroll
    // See https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/#article-header-id-3

    // On Modal open, save current body scroll and make it fixed
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    return () => {
      // On Modal close, restore old body scroll and allow to scroll it again
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);

      if (document.body.contains(domNode)) {
        document.body.removeChild(domNode);
      }
    };
  }, [domNode]);

  return createPortal(props.children, domNode);
}
