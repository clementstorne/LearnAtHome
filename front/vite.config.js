import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    env: {
      IS_REACT_ACT_ENVIRONMENT: "true",
    },
    include: ["__tests__/**/*.[jt]s?(x)"],
  },
});
