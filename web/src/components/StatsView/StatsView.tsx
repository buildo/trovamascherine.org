import * as React from "react";
import { Box } from "../Box/Box";
import { config } from "../../config";
import { StatsHeader } from "./StatsHeader";
import { Footer } from "../Footer/Footer";

export function StatsView() {
  return (
    <Box column style={{ height: "100vh" }}>
      <StatsHeader />
      <iframe
        title="Statistics"
        width="100%"
        height="100%"
        src={config.dataStudioUrl}
        frameBorder="0"
        style={{
          border: 0,
        }}
        allowFullScreen
      ></iframe>
      <Footer />
    </Box>
  );
}
