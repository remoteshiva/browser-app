// babel-config-macros.config.js
module.exports = {
    tailwind: {
      plugins: ["macros"],
      config: "./src/tailwind.config.js",
      format: "auto",
      styled: "styled-components"
    }
  };