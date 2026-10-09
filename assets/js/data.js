/* ==========================================================================
   UNG MAN (UNGMAN.SE) – DATA & CONTENT STORE
   Curated articles, daily perspectives, support services & AI prompts
   ========================================================================== */

const UNGMAN_DATA = {
  dailyPerspectives: [
    {
      text: "Du jämför ofta ditt eget vardagskaos med andras höjdpunkter på sociala medier. Ingen visar sina tvivel i sitt flöde.",
      author: "Dagens perspektiv"
    },
    {
      text: "Att inte veta vad du vill bli när du är 17 är inte ett misslyckande. Det är ett bevis på att världen är större än en enda gymnasielinje.",
      author: "Dagens perspektiv"
    },
    {
      text: "Självkänsla byggs inte av likes eller bekräftelse. Den växer varje gång du gör något du lovat dig själv, även när ingen ser på.",
      author: "Dagens perspektiv"
    },
    {
      text: "Att våga säga 'jag förstår inte' eller 'jag behöver hjälp' är det snabbaste sättet att faktiskt bli smartare.",
      author: "Dagens perspektiv"
    }
  ],

  articles: [
    {
      id: "konsten-att-inte-stressa-gymnasiet",
      title: "Konsten att inte stressa sönder gymnasiet: 5 strategier som fungerar",
      category: "livskunskap",
      categoryName: "Livskunskap",
      badgeClass: "badge-terracotta",
      readTime: "5 min läsning",
      date: "Oktober 2026",
      image: "assets/images/tech-student.jpg",
      excerpt: "Betygspress, prov och förväntningar. Så behåller du lugnet, pluggar effektivt utan att offra din sömn eller ditt sociala liv.",
      url: "artikel-detalj.html",
      featured: true
    },
    {
      id: "styrketraning-utan-skitsnack",
      title: "Styrketräning och gym för nybörjare: Grunderna utan myter",
      category: "halsa",
      categoryName: "Hälsa & Träning",
      badgeClass: "badge-emerald",
      readTime: "6 min läsning",
      date: "Oktober 2026",
      image: "assets/images/health-training.jpg",
      excerpt: "Glöm dyra kosttillskott och extrema scheman. Här är de 4 grundövningarna, sömnregeln och hur du bygger en stark kropp på lång sikt.",
      url: "halsa.html#gym-guide",
      featured: true
    },
    {
      id: "ai-som-privatlarare-skolan",
      title: "Så använder du AI som din personliga privatlärare (utan att fuska)",
      category: "tech",
      categoryName: "AI & Tech",
      badgeClass: "badge-cobalt",
      readTime: "7 min läsning",
      date: "Oktober 2026",
      image: "assets/images/tech-student.jpg",
      excerpt: "Lär dig prompta för att förstå svåra mattekalkyler, få feedback på uppsatser och öva inför nationella prov med AI som sparringpartner.",
      url: "tech-framtid.html#ai-studier",
      featured: true
    },
    {
      id: "starta-uf-foretag-gymnasiet",
      title: "Från idé till 50 000 kr i omsättning: Så lyckas du med UF-företaget",
      category: "skapa",
      categoryName: "Skapa & Starta",
      badgeClass: "badge-terracotta",
      readTime: "8 min läsning",
      date: "Oktober 2026",
      image: "assets/images/creators-studio.jpg",
      excerpt: "Hur du väljer rätt affärsidé, sätter samman ett dream team i klassen, förhandlar med leverantörer och säljer din första produkt.",
      url: "skapa-starta.html#uf-guide",
      featured: true
    },
    {
      id: "akta-vanner-granser",
      title: "Hur du känner igen äkta vänner och vågar sätta egna gränser",
      category: "livskunskap",
      categoryName: "Livskunskap",
      badgeClass: "badge-terracotta",
      readTime: "4 min läsning",
      date: "September 2026",
      image: "assets/images/friendship-talk.jpg",
      excerpt: "Alla du hänger med vill inte alltid ditt bästa. Så identifierar du lojalitet, hanterar grupptryck och hittar vänner som lyfter dig.",
      url: "livskunskap.html#relationer",
      featured: true
    },
    {
      id: "pengar-csn-sparande",
      title: "Ekonomi för 15–18 år: Studiebidrag, extrajobb och ränta-på-ränta",
      category: "livskunskap",
      categoryName: "Livskunskap",
      badgeClass: "badge-terracotta",
      readTime: "6 min läsning",
      date: "September 2026",
      image: "assets/images/hero-friends.jpg",
      excerpt: "Varför 300 kr i månaden på en indexfond när du är 16 kan förändra din framtid, och hur du maximerar lönen från ditt första sommarjobb.",
      url: "verktyg.html#budget-kalkylator",
      featured: false
    },
    {
      id: "somn-mobilberoende-fokus",
      title: "Sömnens superkraft: Varför du vaknar trött och hur du fixar det",
      category: "halsa",
      categoryName: "Hälsa & Träning",
      badgeClass: "badge-emerald",
      readTime: "5 min läsning",
      date: "September 2026",
      image: "assets/images/health-training.jpg",
      excerpt: "Dopaminkickar från TikTok kl 01:30 förstör mer än du tror. Smarta knep för att stänga av hjärnan och vakna med energi.",
      url: "halsa.html#somn",
      featured: false
    },
    {
      id: "framtidens-jobb-2030",
      title: "Framtidens arbetsmarknad: Vad företag letar efter år 2030",
      category: "tech",
      categoryName: "AI & Tech",
      badgeClass: "badge-cobalt",
      readTime: "7 min läsning",
      date: "Augusti 2026",
      image: "assets/images/creators-studio.jpg",
      excerpt: "Tekniska kunskaper i kombination med kommunikation och problemlösning. Här är utbildningarna och färdigheterna som ger försprång.",
      url: "tech-framtid.html#jobb",
      featured: false
    }
  ],

  supportHotlines: [
    {
      name: "BRIS",
      desc: "Barnens Rätt i Samhället. Prata med en kurator helt anonymt om vad som helst – relationer, ångest, skola eller hemma.",
      phone: "116 111",
      hours: "Öppet dygnet runt, alla dagar",
      web: "https://www.bris.se",
      badge: "Öppet dygnet runt",
      isEmergency: true
    },
    {
      name: "UMO – Ungdomsmottagningen på nätet",
      desc: "Sveriges officiella sajt för unga om sex, hälsa, relationer, kroppen och psykiskt mående. Hitta din lokala ungdomsmottagning.",
      phone: "Boka via 1177 / umo.se",
      hours: "Information & rådgivning dygnet runt",
      web: "https://www.umo.se",
      badge: "Gratis för unga",
      isEmergency: false
    },
    {
      name: "Mind Självmordslinjen",
      desc: "För dig som har tankar på att inte orka leva, eller för dig som är orolig för en kompis. Anonymt stöd via telefon och chatt.",
      phone: "90101",
      hours: "Öppet dygnet runt",
      web: "https://mind.se/hitta-hjalp/sjalvmordslinjen/",
      badge: "Öppet dygnet runt",
      isEmergency: true
    },
    {
      name: "Jourhavande Kompis",
      desc: "Röda Korsets Ungdomsförbund. Anonym chatt där du pratar med en annan ung person (upp till 25 år) som lyssnar och stöttar.",
      phone: "Chatt online",
      hours: "Mån–Fre 18:00–21:00, Sön 18:00–21:00",
      web: "https://rkuf.se/fa-hjalp/jourhavande-kompis/",
      badge: "Unga för unga",
      isEmergency: false
    },
    {
      name: "Killar.se (MÄN)",
      desc: "Sveriges största stödverksamhet riktad direkt till killar och unga män mellan 10 och 25 år. Gratis och anonym samtalschatt.",
      phone: "Stödchatt via webben",
      hours: "Sön–Tors 19:00–21:00",
      web: "https://killar.se",
      badge: "Fokus på killar",
      isEmergency: false
    },
    {
      name: "Maskrosbarn",
      desc: "Stöd till dig som har en förälder som dricker för mycket, mår psykiskt dåligt eller utsätter dig för våld. Chatt och helgläger.",
      phone: "Chatt & coachning",
      hours: "Sön–Tors 20:00–22:00",
      web: "https://maskrosbarn.org",
      badge: "Stöd i hemmet",
      isEmergency: false
    }
  ],

  aiPrompts: [
    {
      title: "Förklara svåra begrepp (Feynman-tekniken)",
      category: "Studier",
      prompt: "Förklara begreppet [FYLL I, t.ex. fotosyntesen / derivata / imperialismen] för en 16-åring. Använd en konkret vardagsliknelse, dela upp resonemanget i 3 enkla steg och avsluta med 2 kontrollfrågor som testar om jag verkligen förstått."
    },
    {
      title: "Granska min uppsats som en sträng svensklärare",
      category: "Skrivande",
      prompt: "Läs igenom min text nedan. Betygsätt den inte, utan ge mig konstruktiv kritik på: 1) Tydlighet i tesen, 2) Flyt och styckeindelning, 3) Källkritisk argumentation. Skriv inte om texten åt mig, peka bara ut var jag kan vässa språket. Här är texten: [KLISTRA IN]"
    },
    {
      title: "Öva glosor & språk genom rollspel",
      category: "Språk",
      prompt: "Agera som en barista på ett café i London. Jag ska beställa fika och prata med dig på engelska på B2-nivå. Rätta mina grammatiska misstag i en parentes efter varje svar och ställ sedan en ny naturlig följdfråga."
    },
    {
      title: "Hjälp mig bryta ner ett stort gymnasiearbete",
      category: "Planering",
      prompt: "Jag ska skriva ett gymnasiearbete om [ÄMNE] med deadline om 8 veckor. Skapa en realistisk tidsplan uppdelad i 4 faser med konkreta veckomål så att jag slipper panikplugga sista veckan."
    }
  ]
};
