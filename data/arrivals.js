/* ─────────────────────────────────────────────────────────────
   ARRIVALS. Update this every 15 days.
   Keep exactly three beans. Origin up to 12 letters,
   process up to 9, status up to 8 (the board has that many tiles).
   Everything below is SAMPLE text — replace it with the real beans.
   ───────────────────────────────────────────────────────────── */

window.ARRIVALS = {
  landed: "1 november",          // when this set arrived
  next: "15 november",           // when the next set is due

  beans: [
    {
      origin: "ARAKU",
      process: "NATURAL",
      status: "ON BAR",
      region: "araku valley, andhra pradesh",
      roaster: "",
      farm: "",
      altitude: "",
      tasting: "sample: jaggery, ripe fruit, a little spice",
      note: "sample note. write a line or two in your own words about why this one is on the board."
    },
    {
      origin: "CHIKMAGALUR",
      process: "WASHED",
      status: "LANDED",
      region: "chikmagalur, karnataka",
      roaster: "",
      farm: "",
      altitude: "",
      tasting: "sample: cocoa, orange peel, clean finish",
      note: "sample note. what it tastes like cold, who you'd give it to, what happened the week it arrived."
    },
    {
      origin: "MALABAR",
      process: "MONSOONED",
      status: "ON BAR",
      region: "malabar coast, kerala",
      roaster: "",
      farm: "",
      altitude: "",
      tasting: "sample: earthy, low acid, heavy body",
      note: "sample note. the filter-coffee people usually start here."
    }
  ]
};
