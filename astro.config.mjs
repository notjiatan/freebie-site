import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  base: "/",
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true
  },
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), AutoImport({
    imports: ["@components/common/Button.astro"]
  }), mdx()],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    shikiConfig: {
      themes: { // https://shiki.style/themes
        light: "light-plus",
        dark: "dark-plus",
      } 
    },
    extendDefaultPlugins: true
  },
});
