/** Original educational summaries grounded in linked public sources.
 * Localities are NOT ethnic boundaries. Mangyan community cultural authority requires FPIC.
 * Public historical descriptions are explicitly distinguished from private/community knowledge.
 */
export type CultureQuestion={id:string;stage:'festival'|'lesson';prompt:string;options:[string,string,string,string];answer:number;explanation:string;sourceIds:string[]};
export type CultureTopic={id:string;title:string;text:string;sourceIds:string[];question:CultureQuestion};
export const localityCulture:Readonly<Record<string,readonly CultureTopic[]>>={
  "Baco": [
    {
      "id": "local-0",
      "title": "Mount Halcon and a landscape of memory",
      "text": "The provincial tourism identity connects Baco with Mount Halcon, a landmark that makes the island’s terrain part of local identity. Mountains are more than an adventure backdrop: they affect how maps are read and where travel, conservation and settlements meet. The official tourism portal also lists Mangyan Cubool among Baco’s historical and cultural places. That listing identifies a place; it does not establish the origin or ownership of individual cultural works. A responsible visitor checks local guidance and separates a documented location from assumptions about people.",
      "sourceIds": [
        "lakbay-home",
        "journey-museum-directory"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "A classmate says Mount Halcon is only relevant to hiking. Which response is best supported?",
        "options": [
          "Its landscape also helps explain how geography and cultural places shape local identity.",
          "Its only importance is trekking",
          "The tourism portal proves every Mangyan group lives in Baco",
          "All cultural practices in Baco are the same"
        ],
        "answer": 0,
        "explanation": "The official destination and province identity records offer mountain and heritage context, not just recreation.",
        "sourceIds": [
          "lakbay-home",
          "journey-museum-directory"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Livelihoods and community celebrations",
      "text": "Baco’s Banana Festival introduces banana production as a public livelihood theme, but a crop festival is one part of a much larger town. The provincial cultural-place directory identifies a separate Mangyan-related attraction in Baco, showing that livelihoods and cultural sites should not be collapsed into one slogan. During local research, ask who created a display, when it was documented and whether the material is intended for public sharing. A town’s identity also belongs to residents’ everyday memories, not simply to an annual competition.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-museum-directory",
        "journey-mhc-consent"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Which research approach best respects Baco's cultural records?",
        "options": [
          "Identify the author or community and confirm permission before reusing materials.",
          "Copy every exhibit without attribution",
          "Treat a festival theme as the whole town history",
          "Assume all displayed designs are public-domain"
        ],
        "answer": 0,
        "explanation": "Source and consent are separate from visitor curiosity.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-museum-directory",
          "journey-mhc-consent"
        ]
      }
    }
  ],
  "Bansud": [
    {
      "id": "local-0",
      "title": "A museum and the work of preserving memory",
      "text": "The official Oriental Mindoro tourism directory lists Bansud Museum as a historical and cultural destination. The listing gives a place to begin investigating local stories, objects, and the people who preserve them; it does not by itself give a full catalog of the museum’s holdings. Museums help visitors ask evidence-based questions: Who made an item? What date is documented? Which community explains its use? Answers should come from reviewed labels, the makers, or approved cultural sources rather than guesses based on appearance.",
      "sourceIds": [
        "journey-museum-directory"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "What does the official listing establish about Bansud Museum?",
        "options": [
          "That it is listed as a historical and cultural destination.",
          "That all its exhibits may be reproduced",
          "That it houses every Mangyan tradition",
          "That its displays are unchanged every year"
        ],
        "answer": 0,
        "explanation": "The directory verifies a place listing, not the contents or reproduction permissions of individual exhibits.",
        "sourceIds": [
          "journey-museum-directory"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Harvest and everyday community life",
      "text": "Basudani Festival is framed by the provincial tourism account as thanksgiving connected to agricultural abundance. Street dancing draws different community sectors into a public celebration, but a single festival cannot describe every household’s livelihood. Daily community life also includes choices about education, language, family histories, and local institutions. Study the difference between a public agricultural theme and specific testimony from residents; do not claim that all Bansud families farm or celebrate in the same way.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-provincial-history"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Which statement avoids oversimplifying Bansud life?",
        "options": [
          "Harvest-themed celebrations show an important public theme, not every resident's occupation.",
          "Every household must work in farming",
          "The museum only exists for the festival",
          "A street dance is proof of all residents' beliefs"
        ],
        "answer": 0,
        "explanation": "Festival descriptions are public representations, not complete accounts of every person's livelihood.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-provincial-history"
        ]
      }
    }
  ],
  "Bongabong": [
    {
      "id": "local-0",
      "title": "Banana, coconut and the meaning of a local festival",
      "text": "The official provincial explanation of Sulyog links its name with banana and coconut themes. That gives learners a concrete example of how crop production can become part of the language of civic celebration. It does not prove that every family grows the same crops or that the performance represents an unchanged ancient tradition. Learn to distinguish locally explained names from invented etymologies. When comparing Sulyog with another town's festival, ask how farming themes differ and which source actually documents them.",
      "sourceIds": [
        "lakbay-festivals"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "Which pair of crops does the Sulyog background connect?",
        "options": [
          "Banana and coconut.",
          "Rice and wheat",
          "Citrus and durian only",
          "Corn and tobacco"
        ],
        "answer": 0,
        "explanation": "The provincial festival background specifically links its public identity to banana and coconut.",
        "sourceIds": [
          "lakbay-festivals"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Cultural identity beyond a festival stage",
      "text": "Bongabong is one of 14 municipalities in Oriental Mindoro, a province with varied environments and communities. A festival offers a shared public moment, while community identities also live in language, family memories, work and the stories people choose to tell. The NCCA and Library of Congress caution against treating all Mangyan communities as a single culture. Use that broader Mindoro lesson when viewing Bongabong festivities: do not assume a costume or bamboo object represents every Indigenous group or the whole municipality.",
      "sourceIds": [
        "ppdo-general",
        "ncca-mangyan",
        "journey-loc-background"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Why should a festival costume not stand in for every Mangyan culture?",
        "options": [
          "Mindoro's Indigenous communities have distinct languages and cultural histories.",
          "Every group uses the same writing system",
          "Festivals are automatically historical records",
          "All communities follow one identity"
        ],
        "answer": 0,
        "explanation": "National cultural and Library of Congress sources explicitly distinguish Mangyan communities.",
        "sourceIds": [
          "ppdo-general",
          "ncca-mangyan",
          "journey-loc-background"
        ]
      }
    }
  ],
  "Bulalacao": [
    {
      "id": "local-0",
      "title": "Islands, coasts and maritime perspectives",
      "text": "The provincial tourism directory features Aslom Island, Buyayao Island, and Pocanil Rock Formation in Bulalacao. Their public place listings point to a municipality whose coastal environment is a useful part of local heritage learning. Maritime experiences can include work, travel, changing weather and the way families remember places, but the entries alone do not establish how every household lives. The local Biniray celebration provides a public connection to maritime life and Saints Peter and Paul. Treat coastline tourism descriptions and community testimony as different kinds of evidence.",
      "sourceIds": [
        "lakbay-home",
        "lakbay-festivals"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "What is a well-supported connection between Bulalacao's listed places and Biniray?",
        "options": [
          "Coastal environments and maritime themes are both part of its public heritage context.",
          "Every island resident shares the same occupation",
          "All protected sites are open for collection",
          "The festival is an ancient Mangyan ritual"
        ],
        "answer": 0,
        "explanation": "The tourism listings name coastal places and a maritime-related public festival, not household or ritual universals.",
        "sourceIds": [
          "lakbay-home",
          "lakbay-festivals"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Writing history linked with a Mindoro locality",
      "text": "The Library of Congress provenance guide reports that collector Fletcher Gardner was stationed at Bulalacao in 1904–1905. It also documents later collaboration with Mindoro residents Ildefonso and Eusebio Maliwanag on inscribed bamboo records. This historical connection does not mean that writing belonged only to Bulalacao: the collection reflects work by named Mangyan authors and a wider network of contributors. Readers should learn whose voices and writings are represented and recognize uncertainty in the dates of some materials.",
      "sourceIds": [
        "journey-loc-collection",
        "loc-provenance"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Why is the Library of Congress collection not solely 'a Bulalacao tradition'?",
        "options": [
          "It involved Mangyan authors and collaborators across a wider Mindoro network.",
          "Every item was authored by Fletcher Gardner",
          "All 77 items were made in Bulalacao in 1904",
          "The collection has no identified authors"
        ],
        "answer": 0,
        "explanation": "The historical guide distinguishes where one collector worked from authorship and provenance of items.",
        "sourceIds": [
          "journey-loc-collection",
          "loc-provenance"
        ]
      }
    }
  ],
  "Calapan City": [
    {
      "id": "local-0",
      "title": "The Heritage Museum and the old provincial capitol",
      "text": "The official tourism page locates the Oriental Mindoro Heritage Museum at the old Provincial Capitol in Barangay Ibaba East, Calapan City. It describes the museum’s design through the MAHAL TANA identity: Mangyan, Halcon, Tamaraw and Naujan Lake. These four elements are a contemporary presentation of selected provincial themes, not a definition of every culture in Mindoro. Museum learning should involve exhibit labels, makers, dates and permission, not just the attractive building. Check the institution’s actual visitor guidance before making a visit plan.",
      "sourceIds": [
        "journey-calapan-museum",
        "journey-museum-directory"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "What four references appear in the tourism description of MAHAL TANA?",
        "options": [
          "Mangyan, Halcon, Tamaraw and Naujan Lake.",
          "Only the province's four festivals",
          "Four different Mangyan languages",
          "Calapan's four original barangays"
        ],
        "answer": 0,
        "explanation": "The museum's official listing identifies these four symbols as its province-wide inspiration.",
        "sourceIds": [
          "journey-calapan-museum",
          "journey-museum-directory"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Provincial government and older cultural histories",
      "text": "Calapan serves as the capital of Oriental Mindoro. Republic Act No. 505, approved in June 1950, divided Mindoro into Oriental and Occidental Mindoro; the division became effective in November 1950. This is a change in modern provincial administration, not the beginning of Indigenous communities, writing or heritage on the island. The Library of Congress preserves inscribed bamboo materials collected decades earlier. Comparing these different historical records helps distinguish government dates from cultural continuity.",
      "sourceIds": [
        "ppdo-general",
        "journey-provincial-history",
        "journey-loc-collection",
        "ra505"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "A student claims Oriental Mindoro's culture began in 1950. What corrects this?",
        "options": [
          "The 1950 date concerns provincial administration, while Mindoro cultural traditions are much older.",
          "Every tradition began with a province law",
          "Indigenous writing was invented after 1950",
          "Calapan did not exist before its provincial status"
        ],
        "answer": 0,
        "explanation": "Administrative changes do not mark the origin of living communities and older written traditions.",
        "sourceIds": [
          "ppdo-general",
          "journey-provincial-history",
          "journey-loc-collection",
          "ra505"
        ]
      }
    }
  ],
  "Gloria": [
    {
      "id": "local-0",
      "title": "Pottery and material heritage",
      "text": "The official cultural-place directory includes M. Adriatico Pottery in Gloria. A listed pottery-related site invites questions about locally presented crafts, materials, tools and who makes or interprets the work. The directory confirms a named destination, but not the age of every technique or the ethnic identity of a maker. A good cultural record separates what a visitor observes from what a craftsperson or curator explains. Do not reproduce patterns or assign sacred meanings without an appropriate source and permission.",
      "sourceIds": [
        "journey-museum-directory"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "What can the cultural directory directly verify about Gloria's pottery?",
        "options": [
          "That M. Adriatico Pottery is a listed cultural destination.",
          "That all of its patterns are ancient",
          "That every object is made by one Indigenous group",
          "That it is free to copy makers' designs"
        ],
        "answer": 0,
        "explanation": "A place listing is not a verified history of each craft technique or design.",
        "sourceIds": [
          "journey-museum-directory"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Bamboo, agriculture and daily materials",
      "text": "Gloria’s Kawayanan Festival focuses on bamboo and the material’s uses, according to the provincial tourism background. It also connects the town with agricultural activities. Bamboo can be understood as a plant, a harvested resource and a material in daily products, but not every item made from bamboo has the same cultural function. The wider Library of Congress bamboo collection shows that historical writing can also be preserved on this material. That collection is island-wide context, not proof that every Gloria craft is a Mangyan inscription.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-loc-background",
        "journey-loc-collection"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Why distinguish Gloria's bamboo festival from the Mangyan bamboo manuscripts?",
        "options": [
          "The same material can have different uses and traditions with different sources.",
          "Every bamboo object is a manuscript",
          "The festival catalog establishes each object's original maker",
          "Bamboo is never used in daily life"
        ],
        "answer": 0,
        "explanation": "The local material theme and historical written bamboo items are related comparisons, not identical practices.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-loc-background",
          "journey-loc-collection"
        ]
      }
    }
  ],
  "Mansalay": [
    {
      "id": "local-0",
      "title": "Hanunuo communities, Panaytayan and consent",
      "text": "The provincial tourism portal places a Mangyan Villages listing in Barangay Panaytayan, Mansalay, and names the Hanunuo Mangyan context. The Mangyan Heritage Center explicitly says that community access, research, and direct collaboration require consent from the relevant Mangyan Peoples Organizations. A destination listing is not an open invitation to enter a living community, photograph people or copy cultural material. Start learning from approved public institutional sources, respect community authority, and recognize that a visitor's viewpoint cannot replace residents' accounts.",
      "sourceIds": [
        "journey-mansalay-villages",
        "journey-mhc-consent"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "A user sees Panaytayan listed as a cultural destination. What should they do before arranging community research?",
        "options": [
          "Seek proper community consent through the relevant Peoples Organization.",
          "Assume the tourism listing is permission",
          "Record private ceremonies for an app",
          "Treat entry fees as equivalent to consent"
        ],
        "answer": 0,
        "explanation": "The Mangyan Heritage Center states that tourism listings cannot grant consent for research or visits.",
        "sourceIds": [
          "journey-mansalay-villages",
          "journey-mhc-consent"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Ambahan, Ginaw Bilog and heritage preservation",
      "text": "The NCCA recognizes Ginaw Bilog, a Hanunuo Mangyan from Panaytayan, as a National Living Treasure in 1993 for his work with the ambahan tradition. Ambahan uses seven-syllable lines and transmits expression and advice through imagery. Bilog kept old and new pieces in bamboo and notebooks, showing that living heritage can be shared and renewed rather than treated only as ancient objects. The Oriental Mindoro Heritage and Cultural Center in Mansalay is also listed as an institution promoting appreciation of Mangyan works and culture.",
      "sourceIds": [
        "journey-ginaw",
        "journey-mansalay-center",
        "journey-loc-background"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Which action best reflects the cultural transmission described in Ginaw Bilog's story?",
        "options": [
          "Caring for older ambahan while supporting community sharing and new compositions.",
          "Replacing community voices with guessed translations",
          "Treating the poetic form as extinct after 1993",
          "Publishing entire poems without permission"
        ],
        "answer": 0,
        "explanation": "NCCA documents both preservation and sharing of the living ambahan tradition.",
        "sourceIds": [
          "journey-ginaw",
          "journey-mansalay-center",
          "journey-loc-background"
        ]
      }
    }
  ],
  "Naujan": [
    {
      "id": "local-0",
      "title": "A wetland supporting people and wildlife",
      "text": "Naujan Lake National Park is a Ramsar wetland of international importance. A Ramsar information sheet documents fish, waterbirds, lakeshore livelihoods and the relationship between wetlands and nearby communities. Water is not only scenery: fishing, farming, conservation and daily needs create different ways to value a lake. The historical sheet identifies Tadyawan Mangyan among communities associated with the lake region; it should not be treated as a current household-by-household map or a claim that all Tadyawan people fish.",
      "sourceIds": [
        "journey-naujan-ramsar",
        "travel-naujan"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "Which description recognizes Naujan Lake as a living heritage landscape?",
        "options": [
          "A wetland connected with habitats, livelihoods and local communities.",
          "Only a backdrop for souvenir photos",
          "Only a sea-facing resort",
          "A site with no recorded community uses"
        ],
        "answer": 0,
        "explanation": "Ramsar documents both ecological and social dimensions of this wetland.",
        "sourceIds": [
          "journey-naujan-ramsar",
          "travel-naujan"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "From fish festival to freshwater stewardship",
      "text": "Naujan’s DaBaLisTiHit Festival draws on the names of freshwater fish and related public performances. Learning becomes richer when readers compare this festival language with separate Ramsar evidence about the lake’s fish and waterbird habitats. A festival costume illustrates the organizer’s interpretation; it is not a scientific survey, and a historical wildlife list is not a real-time population count. Respect fishing communities and protected habitats, and follow local conservation rules rather than assuming every lakeshore spot is open to visitors.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-naujan-ramsar"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Why shouldn't a festival fish costume be used as proof of current lake populations?",
        "options": [
          "Festival themes and ecological population surveys provide different kinds of evidence.",
          "Every costume names a currently abundant species",
          "The wetland is entirely artificial",
          "All public events certify the latest ecological census"
        ],
        "answer": 0,
        "explanation": "The festival source explains public themes; ecological conditions require scientific evidence.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-naujan-ramsar"
        ]
      }
    }
  ],
  "Pinamalayan": [
    {
      "id": "local-0",
      "title": "Welcoming visitors and identifying a locality",
      "text": "The provincial list of historical and cultural sites names the Pinamalayan Welcome Arch as a local landmark. A public monument can be a starting point for exploring the town’s identity, but a directory entry does not establish when it was built or every symbol’s meaning. The Bahaghari Festival uses the rainbow as a published theme. Ask which details come from official statements and which require further local historical research instead of inventing legends for a visible landmark.",
      "sourceIds": [
        "journey-museum-directory",
        "lakbay-festivals"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "What does the tourism directory establish about the Pinamalayan Welcome Arch?",
        "options": [
          "It is listed as a local historical or cultural place.",
          "Its precise construction date and designer",
          "Its connection to every Mangyan group",
          "That visitors may edit its historical marker"
        ],
        "answer": 0,
        "explanation": "The directory identifies a place but not all the details of its origins.",
        "sourceIds": [
          "journey-museum-directory",
          "lakbay-festivals"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Celebration, storytelling and identity",
      "text": "Pinamalayan’s Bahaghari Festival is presented through the idea of a rainbow and community identity, with street dancing and cultural presentations. Different audiences may remember the town for family histories, education, work, language, or a festival experience. A meaningful heritage account gives people room to describe those experiences without insisting that one colorful festival represents every resident. Where a cultural story is undocumented, label it as an interview or personal memory and seek permission before sharing it publicly.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-provincial-history"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "What strengthens a community heritage story about Pinamalayan?",
        "options": [
          "Clear attribution separating official festival facts from an individual's memory.",
          "Presenting guessed folklore as documented history",
          "Claiming every resident shares one narrative",
          "Removing the storyteller's name and consent"
        ],
        "answer": 0,
        "explanation": "A festival overview and personal recollection are two distinct forms of cultural evidence.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-provincial-history"
        ]
      }
    }
  ],
  "Pola": [
    {
      "id": "local-0",
      "title": "Heritage houses and layers of history",
      "text": "The official Oriental Mindoro directory lists Pola Heritage Houses among its historical and cultural attractions. Architectural sites can connect visitors with different moments in town history, but a public listing alone does not date each house or name its builders. Observe verifiable features and seek archival or locally reviewed explanations. History is more than one building: an old house exists in a community whose family lives, civic changes and relationships with the land continue beyond the date of construction.",
      "sourceIds": [
        "journey-museum-directory"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "What is a responsible way to describe Pola Heritage Houses?",
        "options": [
          "Identify them as listed heritage places and verify details before making historical claims.",
          "Invent each house's age from its appearance",
          "Assume all houses were built in the same year",
          "Publish residents' private details without consent"
        ],
        "answer": 0,
        "explanation": "The official directory confirms a heritage-place listing but not each property's full history.",
        "sourceIds": [
          "journey-museum-directory"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Coast, faith and the neighboring lake",
      "text": "Pola’s Sab-Uyan Festival is tied in the provincial account to Saint John the Baptist and a sea-related procession. Pola is also among municipalities associated with the wider Naujan Lake landscape. These two environments remind learners that heritage can involve different bodies of water and distinct religious and livelihood contexts. A procession is not proof of every resident’s faith, and a wetland’s ecological status is not a description of a festival. Keep the sources and contexts separate when comparing them.",
      "sourceIds": [
        "lakbay-festivals",
        "travel-naujan",
        "journey-naujan-ramsar"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "What is the correct comparison of Pola's coastal celebration and Naujan Lake?",
        "options": [
          "They involve different water-related contexts that require separate explanations.",
          "Both are the same ritual",
          "All residents practice one belief",
          "The lake is a sea"
        ],
        "answer": 0,
        "explanation": "The coastal festival and the freshwater wetland are distinct cultural and environmental references.",
        "sourceIds": [
          "lakbay-festivals",
          "travel-naujan",
          "journey-naujan-ramsar"
        ]
      }
    }
  ],
  "Puerto Galera": [
    {
      "id": "local-0",
      "title": "A historic port and a cultural waterfront",
      "text": "The provincial tourism history notes Puerto Galera’s port significance during the American period and earlier maritime connections described in local historical accounts. Its cultural directory also lists Muelle Cultural Heritage Park. Ports can be studied through travel, trade, mobility and how communities describe waterfront change. Do not reduce these historical questions to a beach advertisement. A published tourism history is an overview and should be distinguished from archaeological or firsthand records when making detailed claims.",
      "sourceIds": [
        "journey-provincial-history",
        "journey-museum-directory"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "Why study Muelle alongside Puerto Galera's port history?",
        "options": [
          "Together they give a starting point for maritime travel, trade and waterfront heritage.",
          "Every port structure has the same age",
          "A beach brochure contains every historical fact",
          "Waterfronts have no cultural role"
        ],
        "answer": 0,
        "explanation": "Provincial history and the cultural-site listing both identify maritime public context.",
        "sourceIds": [
          "journey-provincial-history",
          "journey-museum-directory"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Iraya heritage and respectful cultural encounters",
      "text": "The Kaaldawan-Iraya Festival is described by provincial tourism organizers as a public event recognizing Iraya heritage through presented songs, games, storytelling and dances. The Library of Congress distinguishes Iraya from the island’s other Mangyan ethnolinguistic groups. Festival promotion does not grant rights to reproduce a song or document a community ritual. Respect the difference between an organizer's public summary and community-authored descriptions of values, beliefs, identities and living traditions.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-loc-background",
        "journey-mhc-consent"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "What is a respectful way to discuss Iraya culture in Puerto Galera?",
        "options": [
          "Identify the Iraya as distinct and seek consent for community cultural materials.",
          "Treat every Mangyan language as Iraya",
          "Copy any song shown at a festival",
          "Assume the festival represents every group identically"
        ],
        "answer": 0,
        "explanation": "Sources describe different communities and require community authority for cultural reuse.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-loc-background",
          "journey-mhc-consent"
        ]
      }
    }
  ],
  "Roxas": [
    {
      "id": "local-0",
      "title": "A cultural center and a municipality of connections",
      "text": "The provincial historical-and-cultural directory lists Clarendon Cultural Center in Roxas. The local SIPAG festival description also links Roxas with trade and the labor of agricultural producers in southern Oriental Mindoro. Taken together, they encourage learners to ask how civic spaces and economic life relate to local identity. The listed center's collections and history require their own verified descriptions; do not infer that every object or person there represents a single unchanged town tradition.",
      "sourceIds": [
        "journey-museum-directory",
        "lakbay-festivals"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "Which pairing is supported for Roxas?",
        "options": [
          "Clarendon Cultural Center as a listed cultural place and SIPAG as an agriculture-and-trade-themed festival.",
          "An official claim that every citizen trades rice",
          "Evidence the cultural center contains one exclusive script",
          "A complete history of every household"
        ],
        "answer": 0,
        "explanation": "These are two public records addressing different aspects of local heritage.",
        "sourceIds": [
          "journey-museum-directory",
          "lakbay-festivals"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Work, trade and the meaning of SIPAG",
      "text": "The provincial SIPAG account emphasizes the community’s industriousness and agricultural products such as rice and fruit. Describing local work is most accurate when a writer attributes it to the festival’s public theme, not to every resident’s personal identity. Different families have different histories, jobs and relationships with the locality. A good Journey activity can ask what the organizer documents, how trade relates to the province’s geography, and which claims still need interviews or archival records.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-provincial-history"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Which claim can responsibly be made from the SIPAG festival page?",
        "options": [
          "The organizers highlight agriculture, products and local industry as festival themes.",
          "Every Roxas resident shares one occupation",
          "The festival proves every historic trade route",
          "There are no other traditions in Roxas"
        ],
        "answer": 0,
        "explanation": "Public festival background is not a census of every resident's life.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-provincial-history"
        ]
      }
    }
  ],
  "San Teodoro": [
    {
      "id": "local-0",
      "title": "Punta Baluarte and place-based memory",
      "text": "The province’s public cultural directory names Punta Baluarte as a historical and cultural destination in San Teodoro. Like other listed sites, it deserves careful attribution: a tourist entry establishes the location in the directory but cannot alone explain the building period, material or all layers of meaning. Learners can compare documented labels, local histories and present community descriptions before creating a heritage caption. Do not add an invented origin story simply because the landmark has an evocative name.",
      "sourceIds": [
        "journey-museum-directory"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "What must be checked before assigning a detailed history to Punta Baluarte?",
        "options": [
          "A verified historical or local source beyond the directory listing.",
          "The landmark's name is sufficient proof",
          "A photograph proves its construction date",
          "Every traveler already knows its maker"
        ],
        "answer": 0,
        "explanation": "Public place listings do not establish precise construction histories or all interpretations.",
        "sourceIds": [
          "journey-museum-directory"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Faith, participation and distinct communities",
      "text": "San Teodoro’s MASAYAW Festival is framed in the provincial directory through local faith, culture and participation. Across Mindoro, people also belong to different linguistic and cultural communities; the NCCA and Library of Congress emphasize that Indigenous group names should not be merged. When describing local beliefs, distinguish a public festival theme from a named community’s account. The Mangyan Heritage Center points researchers toward community consent, not assumptions based on a map pin or annual event.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-loc-background",
        "journey-mhc-consent"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "How should a user interpret San Teodoro's MASAYAW festival?",
        "options": [
          "As a documented public celebration, not a complete account of every person's beliefs.",
          "As identical to all Mangyan customs",
          "As permission to recreate protected rituals",
          "As evidence every resident attends"
        ],
        "answer": 0,
        "explanation": "Sources support an organizer's account while distinct communities retain their own voices.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-loc-background",
          "journey-mhc-consent"
        ]
      }
    }
  ],
  "Socorro": [
    {
      "id": "local-0",
      "title": "Living around the Naujan Lake landscape",
      "text": "Socorro is one of the municipalities connected with Naujan Lake in provincial tourism descriptions. The Ramsar wetland record documents waterbirds, fish and livelihood connections, including fishing and agriculture around the lake. These records make local life more visible than a festival-only narrative. Socorro’s Pakapya-Agtike celebration links a public harvest-thanksgiving theme with community presentations, but the wetland's people and habitats have separate histories and evidence. Be careful not to treat protected-area recognition as permission to enter every shore.",
      "sourceIds": [
        "travel-naujan",
        "journey-naujan-ramsar",
        "lakbay-festivals"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "Which broader topic connects Socorro with Naujan Lake?",
        "options": [
          "Wetland habitats, fishing or farming livelihoods, and conservation.",
          "Only coastal sea diving",
          "Only highland ski tourism",
          "A lake that has no neighboring communities"
        ],
        "answer": 0,
        "explanation": "Tourism and Ramsar materials describe a freshwater landscape used by communities and wildlife.",
        "sourceIds": [
          "travel-naujan",
          "journey-naujan-ramsar",
          "lakbay-festivals"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "Harvest celebrations and community representation",
      "text": "Pakapya-Agtike is described by the provincial festival portal through harvest thanksgiving and public performances. Its background may mention Indigenous participation or identity, but a festival listing cannot speak on behalf of Tadyawan or other Mangyan community organizations. The historical Ramsar materials mention Tadyawan connections with the lake region. Do not generalize such a statement into a present-day census or a claim that all community members perform the same ritual. Seek properly authorized community explanations for sensitive traditions.",
      "sourceIds": [
        "lakbay-festivals",
        "journey-naujan-ramsar",
        "journey-mhc-consent"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Which statement best respects Tadyawan cultural identity near the lake?",
        "options": [
          "Historical reports need context, and direct community research requires consent.",
          "All households have one identical practice",
          "A festival listing grants automatic interview permission",
          "The past report establishes today's exact population"
        ],
        "answer": 0,
        "explanation": "Historical ecological sources and community consent are different requirements.",
        "sourceIds": [
          "lakbay-festivals",
          "journey-naujan-ramsar",
          "journey-mhc-consent"
        ]
      }
    }
  ],
  "Victoria": [
    {
      "id": "local-0",
      "title": "Fruits, farming and everyday work",
      "text": "The official Kapakyanan Festival account highlights citrus and other tropical fruits alongside rice and agricultural fairs. That presents work and produce as a public source of community identity, not proof that all Victoria residents farm. Comparing event displays with official agricultural reports would be a stronger way to understand present livelihoods. The festival directory lists recurring dates and program types, while individual farmers and traders may describe different experiences. Preserve the difference between public themes and personal accounts.",
      "sourceIds": [
        "lakbay-festivals"
      ],
      "question": {
        "id": "culture-0",
        "stage": "festival",
        "prompt": "Which claim about Victoria is supported by the Kapakyanan description?",
        "options": [
          "Fruit and agricultural production are prominent public festival themes.",
          "Every household produces only citrus",
          "The fair confirms current market prices",
          "Every resident has the same livelihood"
        ],
        "answer": 0,
        "explanation": "The provincial festival description names agricultural themes without describing every person's job.",
        "sourceIds": [
          "lakbay-festivals"
        ]
      }
    },
    {
      "id": "local-1",
      "title": "A lake shared with neighboring municipalities",
      "text": "Provincial tourism sources associate Victoria with the wider Naujan Lake wetland landscape, together with Naujan, Pola and Socorro. The Ramsar site illustrates how one ecological feature can connect several administrative boundaries and support people as well as wildlife. An annual citrus festival and a wetland report provide different lenses on the area. Read both: one explains a public celebration of farming, and the other describes ecological values and historical community uses.",
      "sourceIds": [
        "travel-naujan",
        "journey-naujan-ramsar",
        "lakbay-festivals"
      ],
      "question": {
        "id": "culture-1",
        "stage": "festival",
        "prompt": "Why is Naujan Lake relevant to a Victoria heritage chapter?",
        "options": [
          "The wetland spans a wider shared landscape with community and ecological connections.",
          "It belongs to Victoria alone",
          "It is the same thing as the Kapakyanan festival",
          "It has no association with nearby towns"
        ],
        "answer": 0,
        "explanation": "Provincial and Ramsar records put Victoria among localities tied to the lake environment.",
        "sourceIds": [
          "travel-naujan",
          "journey-naujan-ramsar",
          "lakbay-festivals"
        ]
      }
    }
  ]
};

export const commonCulture:readonly CultureTopic[]=[
 {id:'island-communities',title:'Many Mangyan communities, not a single culture',
 text:'The National Commission for Culture and the Arts calls Mangyan a general term for Indigenous peoples of Mindoro. The Library of Congress distinguishes Iraya, Alangan, Tadyawan, Tawbuid, Bangon, Buhid, Hanunuo and Ratagnon. These groups do not all speak the same language, follow the same traditions or have identical histories. The Hanunuo and Buhid writing systems are particularly well documented, but those scripts should not be assigned to every Mangyan community. Respectful learning begins by naming the specific community and the source instead of treating an island-wide label as a single cultural identity.',
 sourceIds:['ncca-mangyan','journey-loc-background'],
 question:{id:'common-identities',stage:'festival',prompt:'Why is it inaccurate to speak of one single Mangyan language and culture?',
 options:['Mangyan is an umbrella term for distinct communities with different languages and histories.','All Mindoro communities use identical writing systems.','One festival defines every Indigenous community.','Every group has the same settlement and beliefs.'],answer:0,
 explanation:'NCCA and the Library of Congress distinguish the communities, languages and scripts.',sourceIds:['ncca-mangyan','journey-loc-background']}},
 {id:'living-literature',title:'Literature, writing and living transmission',
 text:'The Library of Congress describes Hanunuo and Buhid writing as historical scripts that have survived into the present. It also documents ambahan as a poetic tradition whose seven-syllable lines carry metaphors and messages. Its collection contains 71 bamboo slats and six cylinders with inscriptions and accompanying research records. Ginaw Bilog, a Hanunuo Mangyan recognized by NCCA as a National Living Treasure in 1993, helped care for and share ambahan. Archival materials help us study the past; living community members remain the authorities on how their culture is understood, practiced and shared now.',
 sourceIds:['journey-loc-background','journey-loc-collection','journey-ginaw'],
 question:{id:'common-literature',stage:'festival',prompt:'What best describes the link between archived bamboo writings and living traditions?',
 options:['Archives preserve historical examples while community members continue interpreting and transmitting traditions.','Archived texts authorize copying all current performances.','A writing system belongs to every Mangyan group identically.','Recognition in 1993 means no new ambahan are created.'],answer:0,
 explanation:'Library and NCCA sources describe historical inscriptions and continuing cultural transmission.',sourceIds:['journey-loc-collection','journey-ginaw']}},
 {id:'heritage-and-consent',title:'Preserving heritage with community voices and consent',
 text:'Learning about beliefs, identity, family life, designs and ceremonies requires attention to who is speaking and what they choose to share. The Mangyan Heritage Center explains that it cannot grant blanket permission for visits, interviews, research or direct collaboration with Indigenous communities. The appropriate community Peoples Organizations must be consulted, and Free, Prior and Informed Consent is vital. Public festivals and museums can introduce cultural heritage without making all songs, designs, rituals or community knowledge available for unrestricted copying. A responsible app presents a public verified source, acknowledges limits, and makes space for future community-authored material when consent and rights are established.',
 sourceIds:['journey-mhc-consent','mhc-projects'],
 question:{id:'common-consent',stage:'festival',prompt:'Which step is essential before documenting a community-only tradition for publication?',
 options:['Ask the appropriate community authority and secure the necessary consent.','Assume a tourism website grants blanket permission.','Publish a guessed translation and correct it later.','Copy private recordings because they are educational.'],answer:0,
 explanation:'The Mangyan Heritage Center explicitly identifies the need for proper community consent.',sourceIds:['journey-mhc-consent','mhc-projects']}}
];
