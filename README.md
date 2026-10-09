# UNGMAN.SE – Digital Plattform för Unga Män (15–18 år)

> **Huvudbudskap:** *Du behöver inte ha alla svar.*

UNGMAN.SE är en komplett, modern och professionell digital plattform skapad för unga män i Sverige. Plattformen kombinerar livskunskap, fysisk och mental hälsa, praktisk AI & teknik, entreprenörskap samt interaktiva verktyg i en nordisk, minimalistisk och urban design.

---

## 🧭 Innehållsstruktur & Sidor

Plattformen består av flera fullt implementerade sidor och interaktiva moduler:

1. **[Startsida (index.html)](file:///Users/deniselopez/Ung%20Man%20/index.html)**
   - Hero med nordisk stadsmiljö, budskap och snabbknappar
   - Dagens perspektiv (interaktiv citatroterare)
   - De 5 huvudpelarna med fördjupningar
   - Snabbkoll: Interaktiv teaser för Livskollen
   - Utvalda guider med live-kategorifiltrering
   - Verkliga röster & intervjuer
   - Månadsbrevsregistrering (utan spam)
   - Omfattande sidfot med krislänkar och redaktionella principer

2. **[Livskunskap & Vardag (livskunskap.html)](file:///Users/deniselopez/Ung%20Man%20/livskunskap.html)**
   - Identitet och självkänsla utan stereotyper
   - Vänskap, relationer och att sätta gränser
   - Ekonomi för 15–18 år (CSN 1 250 kr, ränta-på-ränta, sommarjobb)
   - Vuxenlivets Startpaket: **Interaktiv checklista** med sparning i webbläsaren

3. **[Hälsa & Träning (halsa.html)](file:///Users/deniselopez/Ung%20Man%20/halsa.html)**
   - Styrketräning och basövningar utan myter och extrema tillskott
   - Sömnens superkraft & hur skärmtid sent på kvällen påverkar återhämtningen
   - Hantering av prestationsångest och inre krav
   - Integrerade direktknappar till BRIS (116 111), UMO, Mind och Killar.se

4. **[AI, Tech & Framtid (tech-framtid.html)](file:///Users/deniselopez/Ung%20Man%20/tech-framtid.html)**
   - AI som din personliga privatlärare (utan fusk)
   - **Interaktivt promptbibliotek** med ett-klicks-kopiering för matte, uppsatser och språk
   - Enkla vägar till att koda ditt första projekt (HTML/CSS, Python)
   - Framtidens arbetsmarknad 2026–2030

5. **[Skapa & Starta (skapa-starta.html)](file:///Users/deniselopez/Ung%20Man%20/skapa-starta.html)**
   - Komplett guide till UF-företag på gymnasiet
   - Portfoliobygge för design, musikproduktion och video
   - Hur man förhandlar och tar betalt för sina tjänster

6. **[Interaktiva Verktyg (verktyg.html)](file:///Users/deniselopez/Ung%20Man%20/verktyg.html)**
   - **Livshjulet (Ungdomshjulet):** 6 reglage och realtids Canvas Radar-diagram med personlig feedback
   - **Budgetkalkylator 15–18 år:** CSN + extrajobb vs. utgifter, månadsöversikt och körkortskasseprognos
   - **Fokusklockan (Pomodoro):** 25/5-minuters intervaller med ljudchime via Web Audio API

7. **[Artiklar & Guider (artiklar.html)](file:///Users/deniselopez/Ung%20Man%20/artiklar.html) & [Artikelsida (artikel-detalj.html)](file:///Users/deniselopez/Ung%20Man%20/artikel-detalj.html)**
   - Filterbart artikelarkiv
   - Fördjupningsartikel ("Konsten att inte stressa sönder gymnasiet") med dynamisk läsframstegsindikator

8. **[Stöd & Trygghet (stod-trygghet.html)](file:///Users/deniselopez/Ung%20Man%20/stod-trygghet.html)**
   - Snabbval till verifierade stödorganisationer: BRIS (116 111), Mind (90101), UMO, Killar.se, Maskrosbarn, Jourhavande Kompis
   - Guide: *Är du orolig för en kompis?*
   - Trygghetsfunktion: **"Lämna sidan snabbt"**-knapp och snabbkommando (tryck `Esc` 3 gånger)

9. **[Om UNG MAN (om-oss.html)](file:///Users/deniselopez/Ung%20Man%20/om-oss.html)**
   - Manifest med de sju grundprinciperna
   - Information för föräldrar, mentorer och gymnasieskolor
   - Kontaktformulär för feedback och samverkan

---

## 🎨 Design & Visuell Identitet

- **Färgpalett:** Nordisk minimalistisk bas (djupt kolfärgat `#0e1117`, varm off-white `#fbfbf9`, sandgrått `#f3f3ee`) med en distinkt, varm terrakotta-accent (`#e05326`) och teknisk kobolt (`#2563eb`).
- **Typografi:** Google Fonts *Plus Jakarta Sans* och *Space Grotesk* med *JetBrains Mono* för siffror och data.
- **Bilder:** Högkvalitativa dokumentära fotografier från moderna svenska miljöer i Stockholm och Göteborg (Kaffe & Bröd, SL-bussar, skola, träning, studio).
- **Funktioner:**
  - Snabb sökning med `Cmd+K` eller sökruta
  - Spara till bokmärken (persisteras i `localStorage`)
  - "Lämna sidan snabbt" (Quick Exit till SMHI/neutral sida)

---

## 🚀 Köra Plattformen Lokalt

Servern körs direkt via den inbyggda Ruby-servern:

```bash
ruby server.rb
```

Öppna sedan i din webbläsare:
👉 **[http://localhost:8080](http://localhost:8080)**

Alternativt kan samtliga `.html`-filer öppnas direkt i valfri webbläsare (Safari, Chrome, Firefox, Edge).
