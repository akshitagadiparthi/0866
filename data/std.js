/* PIN → STD lookup. STD codes follow telephone exchange areas, not PIN codes,
   so results are a close guess (usually the district's main code). */

window.STD = {
  // exact 6-digit PINs
  exact: {
    "522201": ["tenali", "08644"], "522202": ["tenali", "08644"],
    "534201": ["bhimavaram", "08816"], "534202": ["bhimavaram", "08816"],
    "517501": ["tirupati", "0877"], "517502": ["tirupati", "0877"], "517507": ["tirupati", "0877"],
    "533101": ["rajahmundry", "0883"], "533103": ["rajahmundry", "0883"], "533104": ["rajahmundry", "0883"], "533105": ["rajahmundry", "0883"],
    "521001": ["machilipatnam", "08672"], "521002": ["machilipatnam", "08672"]
  },
  // first 4 digits
  prefix4: {
    "5220": ["guntur", "0863"], "5330": ["kakinada", "0884"], "5331": ["rajahmundry", "0883"],
    "5340": ["eluru", "08812"], "5342": ["bhimavaram", "08816"], "5175": ["tirupati", "0877"],
    "5210": ["machilipatnam", "08672"]
  },
  // first 3 digits
  prefix3: {
    "520": ["vijayawada", "0866"], "521": ["krishna district", "0866"],
    "522": ["guntur", "0863"], "523": ["ongole", "08592"], "524": ["nellore", "0861"],
    "515": ["anantapur", "08554"], "516": ["kadapa", "08562"], "517": ["chittoor", "08572"],
    "518": ["kurnool", "08518"], "530": ["visakhapatnam", "0891"], "531": ["visakhapatnam", "0891"],
    "532": ["srikakulam", "08942"], "535": ["vizianagaram", "08922"],
    "533": ["east godavari", "0884"], "534": ["west godavari", "08812"],
    "500": ["hyderabad", "040"], "501": ["hyderabad", "040"], "502": ["sangareddy", "08455"],
    "503": ["nizamabad", "08462"], "504": ["adilabad", "08732"], "505": ["karimnagar", "0878"],
    "506": ["warangal", "0870"], "507": ["khammam", "08742"], "508": ["nalgonda", "08682"],
    "509": ["mahbubnagar", "08542"],
    "110": ["delhi", "011"], "400": ["mumbai", "022"], "700": ["kolkata", "033"],
    "600": ["chennai", "044"], "560": ["bengaluru", "080"], "411": ["pune", "020"],
    "380": ["ahmedabad", "079"], "302": ["jaipur", "0141"], "226": ["lucknow", "0522"],
    "682": ["kochi", "0484"], "695": ["thiruvananthapuram", "0471"], "641": ["coimbatore", "0422"],
    "625": ["madurai", "0452"], "570": ["mysuru", "0821"], "160": ["chandigarh", "0172"],
    "395": ["surat", "0261"], "440": ["nagpur", "0712"], "452": ["indore", "0731"],
    "462": ["bhopal", "0755"], "800": ["patna", "0612"], "751": ["bhubaneswar", "0674"],
    "781": ["guwahati", "0361"], "403": ["goa", "0832"], "673": ["kozhikode", "0495"],
    "575": ["mangaluru", "0824"], "390": ["vadodara", "0265"], "422": ["nashik", "0253"],
    "208": ["kanpur", "0512"], "221": ["varanasi", "0542"], "282": ["agra", "0562"],
    "248": ["dehradun", "0135"], "834": ["ranchi", "0651"], "492": ["raipur", "0771"],
    "122": ["gurugram", "0124"], "201": ["noida / ghaziabad", "0120"], "121": ["faridabad", "0129"],
    "580": ["hubballi-dharwad", "0836"], "590": ["belagavi", "0831"], "620": ["tiruchirappalli", "0431"],
    "636": ["salem", "0427"], "605": ["puducherry", "0413"], "680": ["thrissur", "0487"],
    "686": ["kottayam", "0481"], "416": ["kolhapur", "0231"], "431": ["aurangabad", "0240"],
    "143": ["amritsar", "0183"], "141": ["ludhiana", "0161"], "144": ["jalandhar", "0181"],
    "342": ["jodhpur", "0291"], "313": ["udaipur", "0294"], "190": ["srinagar", "0194"],
    "180": ["jammu", "0191"], "171": ["shimla", "0177"], "734": ["siliguri", "0353"],
    "474": ["gwalior", "0751"], "482": ["jabalpur", "0761"], "211": ["prayagraj", "0532"],
    "250": ["meerut", "0121"], "360": ["rajkot", "0281"], "632": ["vellore", "0416"],
    "627": ["tirunelveli", "0462"]
  },
  // district names (as India Post returns them) for the online fallback
  district: {
    "krishna": "0866", "ntr": "0866", "guntur": "0863", "prakasam": "08592", "nellore": "0861",
    "anantapur": "08554", "anantapuramu": "08554", "cuddapah": "08562", "kadapa": "08562", "ysr": "08562",
    "chittoor": "08572", "tirupati": "0877", "kurnool": "08518", "visakhapatnam": "0891",
    "srikakulam": "08942", "vizianagaram": "08922", "east godavari": "0884", "west godavari": "08812",
    "hyderabad": "040", "rangareddy": "040", "ranga reddy": "040", "medchal": "040",
    "warangal": "0870", "karimnagar": "0878", "nizamabad": "08462", "khammam": "08742",
    "nalgonda": "08682", "mahabubnagar": "08542", "adilabad": "08732",
    "new delhi": "011", "central delhi": "011", "south delhi": "011", "north delhi": "011",
    "east delhi": "011", "west delhi": "011", "south west delhi": "011", "north west delhi": "011",
    "mumbai": "022", "thane": "022", "kolkata": "033", "chennai": "044",
    "bangalore": "080", "bengaluru": "080", "bengaluru urban": "080", "pune": "020",
    "ahmedabad": "079", "jaipur": "0141", "lucknow": "0522", "ernakulam": "0484",
    "thiruvananthapuram": "0471", "coimbatore": "0422", "madurai": "0452", "mysore": "0821", "mysuru": "0821",
    "chandigarh": "0172", "surat": "0261", "nagpur": "0712", "indore": "0731", "bhopal": "0755",
    "patna": "0612", "khordha": "0674", "khurda": "0674", "kamrup metro": "0361", "kamrup": "0361",
    "north goa": "0832", "south goa": "0832", "kozhikode": "0495", "dakshina kannada": "0824",
    "vadodara": "0265", "nashik": "0253", "kanpur nagar": "0512", "varanasi": "0542", "agra": "0562",
    "dehradun": "0135", "ranchi": "0651", "raipur": "0771", "gurgaon": "0124", "gurugram": "0124",
    "gautam buddha nagar": "0120", "ghaziabad": "0120", "faridabad": "0129", "dharwad": "0836",
    "belgaum": "0831", "belagavi": "0831", "tiruchirappalli": "0431", "salem": "0427",
    "pondicherry": "0413", "puducherry": "0413", "thrissur": "0487", "kottayam": "0481",
    "kolhapur": "0231", "aurangabad": "0240", "amritsar": "0183", "ludhiana": "0161", "jalandhar": "0181",
    "jodhpur": "0291", "udaipur": "0294", "srinagar": "0194", "jammu": "0191", "shimla": "0177",
    "darjeeling": "0353", "gwalior": "0751", "jabalpur": "0761", "allahabad": "0532", "prayagraj": "0532",
    "meerut": "0121", "rajkot": "0281", "vellore": "0416", "tirunelveli": "0462"
  }
};
