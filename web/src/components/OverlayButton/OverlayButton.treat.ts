import { style } from "treat";

export const overlayButton = style({
  overflow: "hidden",
  padding: "15px",
  backgroundColor: "#fff",
  borderRadius: "4px",
  boxShadow: "0 15px 35px rgba(50, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .07)",
  transition: "all .15s ease-in-out",
  color: "#6c6c71",
  cursor: "pointer",
  ":hover": {
    color: "#3bc9db",
  },
});
