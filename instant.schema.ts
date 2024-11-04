import { i } from "@instantdb/core";

export default i.graph(
  {
    locations: i.entity({
      iframeUrl: i.string(),
      state: i.string(),
      order: i.number(),
    }),
  },
  {}
);
