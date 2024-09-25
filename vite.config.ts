import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

const resolvePath = (dir: string) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/api": resolvePath("./src/api"),
      "@/assets": resolvePath("./src/assets"),
      "@/components": resolvePath("./src/components"),
      "@/store": resolvePath("./src/store"),
      "@/utils": resolvePath("./src/utils"),
      "@/pages": resolvePath("./src/pages"),
      "@/helpers": resolvePath("./src/helpers"),
      "@/": resolvePath("./src"),
    },
  },
});
