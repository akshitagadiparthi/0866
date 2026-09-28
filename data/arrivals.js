/* ─────────────────────────────────────────────────────────────
   ARRIVALS. Update this every 15 days.
   On the board: origin up to 12 letters, type up to 9, status up to 8.
   colour: pick one of  tangerine, caramel, monsoon, mango, red, bronze
   ───────────────────────────────────────────────────────────── */

window.ARRIVALS = {
  drop: "001",                   // this set's number
  landed: "the first drop",      // when this set arrived, e.g. "1 november"
  next: "fifteen days later",    // when the next set is due, e.g. "15 november"

  beans: [
    {
      origin: "YIRGACHEFFE",
      type: "MICROLOT",
      status: "ON BAR",
      name: "ethiopia, yirgacheffe",
      colour: "mango",
      region: "yirgacheffe, southern ethiopia",
      process: "microlot",
      roast: "",
      altitude: "",
      tasting: "bright fruit, florals, a little spice, peeled mango",
      roaster: "toffee coffee roasters",
      link: "https://toffeecoffeeroasters.com/products/ethiopia-coffee-yirgacheffe-africa",
      note: "from the part of the world where coffee began. bright and floral, with spice and ripe mango underneath. the bag has an abyssinian roller on it, a bird that dives at anything that gets too close."
    },
    {
      origin: "KITHAGALALE",
      type: "FERMENTED",
      status: "ON BAR",
      name: "tangerine, orange fermented",
      colour: "tangerine",
      region: "kithagalale estate, karnataka",
      process: "washed, then fermented with orange pulp for 4–5 days",
      roast: "medium",
      altitude: "3,000 ft",
      tasting: "orange, citrus, bright acidity",
      roaster: "toffee coffee roasters",
      link: "https://toffeecoffeeroasters.com/products/tangerine-orange-fermented-coffee",
      note: "the beans sit with orange pulp for four to five days before they're roasted. it comes out bright and citrusy, and it holds up beautifully with milk. try it in a latte before you try it black."
    },
    {
      origin: "KARNATAKA",
      type: "BLEND",
      status: "LANDED",
      name: "blonde caramel",
      colour: "caramel",
      region: "the high hills of karnataka",
      process: "natural",
      roast: "medium",
      altitude: "",
      tasting: "stone fruit, caramel, a sweet finish",
      roaster: "toffee coffee roasters",
      link: "https://toffeecoffeeroasters.com/products/blonde-caramel-speciality-blend",
      note: "stone fruit up front, caramel underneath. no syrup involved, that's just the bean. it wants to be cold."
    },
    {
      origin: "MALABAR",
      type: "MONSOONED",
      status: "ON BAR",
      name: "monsooned malabar",
      colour: "monsoon",
      region: "the malabar coast",
      process: "monsooned",
      roast: "",
      altitude: "",
      tasting: "mellow, soft body, a light bitterness",
      roaster: "toffee coffee roasters",
      link: "https://toffeecoffeeroasters.com/products/monsooned-malabar-coffee",
      note: "the oldest story on the board. coffee once sailed to europe through the monsoon and arrived swollen, pale and mellow. now it's done on purpose. low acid, soft body. if you grew up on filter coffee, start here."
    }
  ]
};
