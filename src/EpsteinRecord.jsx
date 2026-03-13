import { useState, useRef, useEffect } from "react";

// ─── ACCENT COLOR: deep forest green — civic, grounded, hopeful ──────────────
const A = "#1d4ed8";       // primary accent — forest green
const A2 = "#1e3a8a";      // darker shade
const A_LIGHT = "#eff6ff"; // tint for backgrounds
const GOLD = "#d4a843";    // warm gold for dark backgrounds

// ─── TIMELINE DATA ────────────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  { id:1, year:1976, month:"1976", decade:"1970s", category:"Background", categoryColor:"#6b7280", title:"Epstein Joins Bear Stearns", summary:"Jeffrey Epstein is hired at Bear Stearns as a junior assistant to a floor trader, rising quickly despite lacking a college degree.", detail:"Epstein had studied physics at NYU and Cooper Union but left without a degree. He initially worked as a math and physics teacher at the Dalton School in Manhattan, where he befriended the father of a Bear Stearns executive. He rose to become a limited partner, working in the firm's options trading division.", significance:"Establishes his entry point into elite financial networks." },
  { id:2, year:1981, month:"1981", decade:"1980s", category:"Background", categoryColor:"#6b7280", title:"Departs Bear Stearns Under Unclear Circumstances", summary:"Epstein leaves Bear Stearns in 1981. He subsequently founds his own financial advisory firm, eventually renamed J. Epstein & Co.", detail:"Epstein has stated he left voluntarily. Others have suggested the departure was related to regulatory issues. He subsequently founded his own financial advisory firm, initially called Intercontinental Assets Group, later renamed J. Epstein & Co.", significance:"Begins his independent financial career that would make him extraordinarily wealthy." },
  { id:3, year:1987, month:"1987", decade:"1980s", category:"Background", categoryColor:"#6b7280", title:"Meets Les Wexner — The Central Financial Relationship", summary:"Epstein is introduced to Leslie Wexner, founder of L Brands. Within years, Wexner grants Epstein power of attorney and control over his personal finances.", detail:"Through mutual contacts in the Jewish philanthropic community, Epstein is introduced to Wexner. Within a few years, Wexner grants Epstein an extraordinary degree of control: power of attorney, management of his personal finances, and eventually the deed to his Manhattan mansion on East 71st Street. How Epstein accumulated such influence over one of America's wealthiest men remains a central mystery of his life.", significance:"The financial foundation of Epstein's wealth and social power." },
  { id:4, year:1991, month:"1991", decade:"1990s", category:"Background", categoryColor:"#6b7280", title:"Acquires East 71st Street Mansion from Wexner", summary:"Wexner transfers ownership of his nine-story Manhattan townhouse to Epstein. The mansion becomes a hub for gatherings mixing finance, politics, academia, and entertainment.", detail:"The mansion, one of the largest private residences in Manhattan, had been purchased and renovated by Wexner. Its transfer to Epstein — for $0 in some accounts, for nominal consideration in others — exemplified the unusual nature of their financial arrangement.", significance:"Establishes Epstein's New York power base and social hub." },
  { id:5, year:1994, month:"~1994", decade:"1990s", category:"Alleged Conduct", categoryColor:"#b45309", title:"Alleged Abuse Begins — Earliest Victim Accounts", summary:"According to multiple civil complaints and victim testimony, Epstein's pattern of recruiting and abusing underage girls begins in the early-to-mid 1990s at his Palm Beach residence.", detail:"Victim accounts, documented in civil litigation and the Miami Herald's investigation, place the beginning of Epstein's abuse of minors in the mid-1990s. Recruiters — including, according to accusers, Ghislaine Maxwell — would identify young women and girls and bring them to Epstein's properties.", significance:"Establishes the earliest documented timeline of the alleged criminal conduct.", milestone:true },
  { id:6, year:1998, month:"1998", decade:"1990s", category:"Background", categoryColor:"#6b7280", title:"Purchases Little Saint James Island, USVI", summary:"Epstein purchases a 72-acre private island in the U.S. Virgin Islands for approximately $7.95 million, constructing extensive private facilities.", detail:"Little Saint James, located off the eastern tip of St. Thomas, would become perhaps the most discussed of Epstein's properties. Epstein constructed a main residence, helipad, private dock, and extensive support facilities. Witnesses described the island as a location where abuse occurred.", significance:"Creates a private, remote location that becomes central to later legal proceedings." },
  { id:7, year:1999, month:"1999", decade:"1990s", category:"Background", categoryColor:"#6b7280", title:"Deepens Harvard and Scientific Connections", summary:"Epstein begins cultivating relationships with prominent academics and donates $6.5 million to Harvard, establishing a mathematical biology research program.", detail:"Epstein donated $6.5 million to Harvard to establish a mathematical biology and evolutionary dynamics research program. He cultivated relationships with prominent scientists including Stephen Jay Gould and Martin Nowak. These relationships gave him a veneer of intellectual respectability and access to elite academic conferences.", significance:"Illustrates how money purchased legitimacy and insulation from scrutiny." },
  { id:8, year:2002, month:"2002", decade:"2000s", category:"Background", categoryColor:"#6b7280", title:"New York Magazine Profile — 'International Mystery Man'", summary:"New York Magazine publishes a profile describing Epstein as a 'well-connected money manager and man about town,' documenting his properties and elite connections without scrutiny.", detail:"The profile, published in October 2002, describes his properties, scientific interests, and social connections to figures including Donald Trump, Bill Clinton, and various celebrities without probing the source of his wealth. It exemplifies how wealth and connections shield individuals from journalistic scrutiny.", significance:"Documents the carefully curated public persona and how elite media played a role in normalizing his status." },
  { id:9, year:2003, month:"2003", decade:"2000s", category:"Background", categoryColor:"#6b7280", title:"Clinton Foundation Flights on Epstein Aircraft", summary:"Former President Bill Clinton takes multiple flights on Epstein's private aircraft, according to flight logs later obtained in civil litigation.", detail:"Flight logs show Clinton aboard Epstein's Boeing 727 on multiple occasions in 2002 and 2003. Clinton's spokesperson confirmed four trips and stated Secret Service agents were present. Clinton has denied visiting Epstein's private properties. The logs illustrate how Epstein's social network crossed all political party lines — this was not a partisan story.", significance:"Illustrates that Epstein's access to power was bipartisan — spanning administrations and parties." },
  { id:10, year:2005, month:"Mar 2005", decade:"2000s", category:"Investigation", categoryColor:A, title:"FIRST COMPLAINT — Palm Beach Police Open Investigation", summary:"A mother contacts Palm Beach Police after her 14-year-old stepdaughter reports being taken to Epstein's home. Detective Joseph Recarey opens a year-long investigation identifying ~40 potential victims.", detail:"The initial complaint came in March 2005. Detective Recarey conducted one of the most thorough investigations Palm Beach PD had undertaken. Over twelve months he interviewed victim after victim, identified approximately 40 potential accusers, and documented a consistent pattern of conduct. He compiled extensive evidence and referred the case to the FBI, believing it required federal resources.", significance:"The origin of the legal case — and a demonstration that ordinary citizens and law enforcement, not powerful institutions, first sought accountability.", milestone:true },
  { id:11, year:2006, month:"Mid 2006", decade:"2000s", category:"Investigation", categoryColor:A, title:"FBI Opens Federal Investigation", summary:"The FBI formally opens a federal investigation following the Palm Beach referral, assembling a case for serious federal sex trafficking charges.", detail:"The FBI's investigation expanded significantly on what Palm Beach Police had compiled. Agents conducted additional victim interviews, subpoenaed financial records, obtained warrants, and built a comprehensive case supporting multiple serious federal charges. Internal records later released suggest agents believed they had a strong case.", significance:"Escalates the case to federal jurisdiction — where wealth and political connection would ultimately intervene." },
  { id:12, year:2007, month:"Mid 2007", decade:"2000s", category:"Legal", categoryColor:"#7c3aed", title:"Epstein's Legal Team Engages — Negotiations Begin", summary:"Epstein assembles a formidable legal team including Alan Dershowitz, Roy Black, and Gerald Lefcourt. Negotiations with U.S. Attorney Alexander Acosta's office begin.", detail:"The legal team Epstein retained was among the most prominent in the country. Negotiations with Acosta's office began in mid-2007. This is where the two-tier justice system becomes visible: an ordinary defendant with 40 identified victims would face the full force of federal prosecution. Epstein's wealth bought the most powerful legal defense available.", significance:"The moment where systemic inequality in the justice system began to determine the outcome." },
  { id:13, year:2008, month:"Jun 2008", decade:"2000s", category:"Legal", categoryColor:"#7c3aed", title:"NON-PROSECUTION AGREEMENT SIGNED", summary:"Epstein enters a secret non-prosecution agreement. He pleads guilty to two state felony counts, serves ~13 months largely on work release, and co-conspirators receive immunity. Victims are not informed.", detail:"The agreement, signed in June 2008, had no parallel in recent prosecutorial history for a case of its scope. Epstein pleaded guilty in Florida state court to solicitation of prostitution and procurement of a minor. He was sentenced to 18 months, serving about 13 months largely on work release — permitted to leave the county jail up to 12 hours daily to work at his private office. The agreement also immunized 'any potential co-conspirators.' Crucially, victims were not informed before it was finalized — later found to violate the Crime Victims' Rights Act.", significance:"The starkest illustration of wealth buying immunity: 40 identified victims, and the outcome was a sweetheart deal unavailable to any ordinary defendant.", milestone:true },
  { id:14, year:2009, month:"2009", decade:"2000s", category:"Legal", categoryColor:"#7c3aed", title:"Victims File Lawsuit Challenging Non-Prosecution Agreement", summary:"Victims represented by attorney Paul Cassell file suit arguing they were denied statutory rights when prosecutors failed to notify them of the NPA, beginning a decade-long legal battle.", detail:"The lawsuit, filed under the Crime Victims' Rights Act, was the first formal legal challenge to the non-prosecution agreement. The victims — ordinary people fighting an agreement made above their heads — pursued this case for a decade before a federal judge vindicated them.", significance:"Ordinary citizens refuse to accept a system that silenced them. The fight for accountability comes from the people, not institutions." },
  { id:15, year:2010, month:"2010", decade:"2010s", category:"Background", categoryColor:"#6b7280", title:"Epstein's Financial Activities Continue Post-Conviction", summary:"Despite his sex offender status, Epstein continues operating his financial business. Leon Black begins paying Epstein tens of millions for financial advice.", detail:"Financial records show that between 2012 and 2017, Apollo Global Management co-founder Leon Black paid Epstein approximately $158 million in fees — after his conviction as a sex offender. Black has stated these were legitimate financial services. The payments were made years after Epstein's conviction was public record.", significance:"Illustrates that conviction did not end elite acceptance of Epstein — wealth insulated him from the social consequences ordinary people face." },
  { id:16, year:2011, month:"2011", decade:"2010s", category:"Legal", categoryColor:"#7c3aed", title:"Virginia Giuffre Files Civil Lawsuit", summary:"Virginia Roberts Giuffre files a lawsuit against Epstein, alleging she was recruited as a teenager and trafficked to powerful men. Her case becomes the most prominent legal action.", detail:"Giuffre, who says she was recruited by Ghislaine Maxwell at age 17, alleges she was trafficked to multiple high-profile individuals. Her lawsuit names several defendants. Her courage in speaking publicly — as a survivor from an ordinary background, pursuing accountability against the wealthy and powerful — became a catalyst for others.", significance:"A survivor refuses to be silenced. The accountability movement in this case is built on the courage of individuals, not institutions." },
  { id:17, year:2014, month:"Dec 2014", decade:"2010s", category:"Legal", categoryColor:"#7c3aed", title:"Court Filing Names Prince Andrew and Others", summary:"A court filing in ongoing civil litigation includes allegations naming Prince Andrew, Alan Dershowitz, and others, drawing international headlines.", detail:"The filing, submitted by attorneys Bradley Edwards and Paul Cassell, included allegations that Giuffre was trafficked to Prince Andrew on three occasions and to Alan Dershowitz on multiple occasions. Both denied the allegations. The court ultimately struck the filing as unnecessary to proceedings at that stage.", significance:"First major public legal document naming high-profile individuals beyond Epstein — confirming this was a systemic, not individual, failure." },
  { id:18, year:2016, month:"2016", decade:"2010s", category:"Background", categoryColor:"#6b7280", title:"Purchases Great Saint James — Second USVI Island", summary:"Epstein purchases a second island adjacent to Little Saint James in the U.S. Virgin Islands for approximately $22.5 million.", detail:"The purchase of Great Saint James expanded Epstein's USVI holdings significantly. The acquisition was seen as part of Epstein's effort to control the waters and airspace around his primary island. His wealth allowed him to literally buy geographic isolation.", significance:"Wealth purchasing physical insulation from oversight — a pattern throughout his story." },
  { id:19, year:2018, month:"Nov 2018", decade:"2010s", category:"Investigation", categoryColor:A, title:"MIAMI HERALD 'PERVERSION OF JUSTICE' INVESTIGATION", summary:"Reporter Julie K. Brown publishes a landmark investigative series documenting the full scope of the Epstein case and the controversial NPA. The series directly precipitates federal action.", detail:"Brown's 'Perversion of Justice' series was the result of years of investigative reporting by a journalist who refused to let the story die. She documented the NPA negotiations, identified victims who had not previously spoken publicly, and laid out the timeline of prosecutorial decisions. The series earned the Miami Herald a Polk Award and triggered the SDNY's renewed investigation.", significance:"A single journalist's persistence accomplished what institutions had failed to do. This is how accountability happens — through people who refuse to give up.", milestone:true },
  { id:20, year:2019, month:"Feb 2019", decade:"2010s", category:"Legal", categoryColor:"#7c3aed", title:"Federal Judge Rules NPA Violated Victims' Rights", summary:"U.S. District Judge Kenneth Marra rules that the 2008 non-prosecution agreement was negotiated in violation of the Crime Victims' Rights Act.", detail:"Judge Marra's ruling vindicated what victims had argued for a decade: that they had been deliberately excluded from a process that was supposed to protect them. The ruling found that prosecutors had an obligation to inform Epstein's victims about the negotiations before the agreement was executed.", significance:"Ten years after the secret deal was signed, victims finally received a judicial finding that their rights had been violated. Justice delayed, but not abandoned." },
  { id:21, year:2019, month:"Jul 6, 2019", decade:"2010s", category:"Investigation", categoryColor:A, title:"SDNY UNSEALS INDICTMENT — EPSTEIN ARRESTED", summary:"Federal prosecutors in the SDNY unseal a new indictment charging Epstein with sex trafficking of minors and conspiracy. He is arrested at Teterboro Airport returning from France.", detail:"The indictment charged Epstein with creating and maintaining a network of underage girls whom he sexually exploited at his New York and Florida residences. The charges carried a potential 45-year sentence. This prosecution was made possible by the persistence of victims and journalists over a decade — not by institutional self-correction.", significance:"Proof that sustained public pressure and journalistic accountability can force institutional action even years later.", milestone:true },
  { id:22, year:2019, month:"Jul 8, 2019", decade:"2010s", category:"Legal", categoryColor:"#7c3aed", title:"Bail Denied — Epstein Ordered Held at MCC", summary:"Judge Richard Berman denies Epstein bail, citing the seriousness of charges, strength of evidence, and risk of flight.", detail:"Epstein's attorneys proposed home confinement at his Manhattan mansion with electronic monitoring. Prosecutors successfully argued the package was inadequate given his access to private aircraft, foreign contacts, and vast financial resources. For once, wealth could not purchase freedom — at least immediately.", significance:"A moment where the system functioned as intended. The contrast with 2008 is stark." },
  { id:23, year:2019, month:"Jul 12, 2019", decade:"2010s", category:"Legal", categoryColor:"#7c3aed", title:"Acosta Resigns as Labor Secretary", summary:"Alexander Acosta, who negotiated the 2008 NPA, resigns from his position as Secretary of Labor amid intense public scrutiny of his role in the deal.", detail:"Acosta had defended the 2008 agreement in a press conference, claiming it was the best outcome available. The defense was widely criticized. His resignation was the first significant consequence for an official involved in the 2008 agreement — though he faced no criminal or formal professional sanction.", significance:"Public pressure produced the only institutional accountability anyone involved in the 2008 deal has faced." },
  { id:24, year:2019, month:"Aug 10, 2019", decade:"2010s", category:"Death", categoryColor:"#374151", title:"EPSTEIN FOUND DEAD IN FEDERAL CUSTODY", summary:"Jeffrey Epstein is found unresponsive in his cell at the MCC. The NYC medical examiner rules his death a suicide by hanging. Controversy erupts immediately over the circumstances.", detail:"Epstein was found in his cell on the morning of August 10, 2019, and pronounced dead at New York Presbyterian Hospital. The NYC medical examiner ruled suicide by hanging. Dr. Michael Baden, hired by Epstein's brother, concluded the physical evidence was more consistent with homicide. The failure of cell checks, malfunction of surveillance cameras, and his removal from suicide watch weeks earlier generated enormous controversy. Two correctional officers charged with falsifying records entered deferred prosecution agreements; their cases were dismissed.", significance:"Epstein's death ended criminal prosecution before a trial could expose who else was involved. The questions his death prevented from being answered are the ones the public most needs answered.", milestone:true },
  { id:25, year:2020, month:"Jan 2020", decade:"2020s", category:"Legal", categoryColor:"#7c3aed", title:"USVI Files Civil Suit Against Epstein Estate", summary:"The U.S. Virgin Islands AG files a civil lawsuit against Epstein's estate, alleging his islands were the base of a decades-long trafficking operation.", detail:"The USVI lawsuit alleged that Epstein had trafficked dozens of young women and girls through his island properties, cultivated relationships with local officials to avoid scrutiny, and improperly obtained millions in tax benefits. The lawsuit demonstrates that accountability can continue through civil channels even when criminal prosecution ends.", significance:"Civil litigation by a small U.S. territory pursued accountability that federal criminal institutions had abandoned." },
  { id:26, year:2020, month:"Jul 2020", decade:"2020s", category:"Legal", categoryColor:"#7c3aed", title:"GHISLAINE MAXWELL ARRESTED", summary:"Ghislaine Maxwell, Epstein's longtime associate and alleged chief recruiter, is arrested at her property in Bradford, New Hampshire on six federal counts.", detail:"Maxwell had been largely out of public sight since Epstein's 2019 arrest. She was charged with conspiracy to entice minors, enticement of a minor, conspiracy to transport minors, transportation of a minor, sex trafficking conspiracy, and sex trafficking of a minor. She denied all charges.", significance:"The first arrest of a co-conspirator — demonstrating that accountability, though slow, was possible.", milestone:true },
  { id:27, year:2021, month:"Nov–Dec 2021", decade:"2020s", category:"Legal", categoryColor:"#7c3aed", title:"Maxwell Trial — Four Accusers Testify", summary:"The federal trial of Ghislaine Maxwell begins in New York. Four accusers testify under pseudonyms about being recruited and abused as teenagers.", detail:"The trial ran from late November to late December 2021. Four accusers testified, identified as Jane, Kate, Carolyn, and Annie Farmer. Their testimony described being recruited as teenagers, transported to Epstein's properties, and sexually abused. Maxwell did not testify in her own defense.", significance:"Survivors finally had their accounts heard in open court. This moment belonged to the victims, not the powerful." },
  { id:28, year:2021, month:"Dec 29, 2021", decade:"2020s", category:"Legal", categoryColor:"#7c3aed", title:"MAXWELL CONVICTED ON FIVE COUNTS", summary:"After six days of deliberation, Ghislaine Maxwell is convicted on five of six counts including sex trafficking of a minor. She is the only person convicted in connection with Epstein's operation.", detail:"Maxwell was convicted of: conspiracy to entice minors; enticement of a minor; conspiracy to transport minors; transportation of a minor; and sex trafficking of a minor. She was acquitted on one count of enticing a minor.", significance:"The only criminal conviction directly connected to the Epstein trafficking operation. Significant — but partial. The question of who else will face accountability remains unanswered.", milestone:true },
  { id:29, year:2022, month:"Feb 2022", decade:"2020s", category:"Legal", categoryColor:"#7c3aed", title:"Jean-Luc Brunel Found Dead in Paris Prison", summary:"French modeling agent Jean-Luc Brunel, under investigation for crimes connected to Epstein, is found dead in his cell at La Santé prison. Authorities rule his death a suicide.", detail:"Brunel had been placed under formal investigation by French authorities in December 2020 for rape, sexual assault, and sexual harassment of minors. He had been identified by multiple Epstein accusers as having recruited young models. His death ended the French investigation before it could be concluded.", significance:"A second key figure dies before trial. The pattern raises legitimate questions that demand answers." },
  { id:30, year:2022, month:"Feb 2022", decade:"2020s", category:"Legal", categoryColor:"#7c3aed", title:"Prince Andrew Settles with Virginia Giuffre", summary:"Prince Andrew reaches a financial settlement with Virginia Giuffre, who alleged he sexually abused her when she was 17. No admission of liability. Andrew is stripped of royal titles.", detail:"The settlement amount was not publicly disclosed, though reports suggested it was in the millions of pounds. Prince Andrew simultaneously agreed to make a substantial donation to Giuffre's victims' charity. He was subsequently stripped of his HRH title and royal military affiliations.", significance:"A survivor achieved accountability against one of the most powerful figures in the British establishment. The settlement was not an admission of guilt — but the stripping of titles reflected public judgment." },
  { id:31, year:2022, month:"Jun 2022", decade:"2020s", category:"Legal", categoryColor:"#7c3aed", title:"Maxwell Sentenced to 20 Years in Federal Prison", summary:"Judge Alison Nathan sentences Ghislaine Maxwell to 20 years in federal prison. Several victims speak at sentencing.", detail:"At sentencing, several victims spoke, describing the impact of the abuse on their lives. Maxwell, in a statement, expressed sympathy for victims but did not admit guilt. Prosecutors had requested 30 to 55 years. Judge Nathan imposed 20 years.", significance:"Survivors' voices heard at sentencing — a measure of justice, though advocates note the sentence was below what prosecutors sought.", milestone:true },
  { id:32, year:2023, month:"Jan 2023", decade:"2020s", category:"Documents", categoryColor:"#059669", title:"First Major Sealed Document Release — Giuffre v. Maxwell", summary:"A federal judge orders unsealing of documents from the Giuffre v. Maxwell civil case, including deposition transcripts sealed for years. Names and allegations become public.", detail:"The unsealing order, issued by Judge Loretta Preska, required the release of materials including deposition transcripts, travel records, and correspondence. These documents had been kept from the public for years. Their release was the result of sustained legal action by victims and press freedom advocates.", significance:"Transparency achieved through the persistence of survivors and journalists — demonstrating that public pressure works.", milestone:true },
  { id:33, year:2024, month:"Jan 2024", decade:"2020s", category:"Documents", categoryColor:"#059669", title:"Additional Documents Released — More Names Disclosed", summary:"Further sealed documents from civil proceedings are released, naming additional individuals referenced in the record. Media organizations publish extensive coverage.", detail:"The January 2024 releases included additional deposition transcripts and court filings. Many named individuals had their connections to Epstein documented for the first time in public legal proceedings. The releases demonstrate that the full picture of who moved in Epstein's orbit remains a matter of ongoing public interest.", significance:"The public's right to know is being established piece by piece — through courts, journalists, and ordinary people who refuse to let this story be buried." },
  { id:34, year:2024, month:"Mid 2024", decade:"2020s", category:"Legal", categoryColor:"#7c3aed", title:"USVI Settlement — Epstein Estate Pays, Islands Forfeited", summary:"Epstein's estate settles the USVI civil lawsuit. The settlement includes a substantial financial payment and forfeiture of both island properties, which are subsequently demolished.", detail:"The settlement required the Epstein estate to pay tens of millions of dollars, surrender title to both islands, and comply with other terms. The USVI government subsequently demolished the structures on Little Saint James — criticized by some victims' advocates who argued the properties should be preserved as evidence.", significance:"Civil accountability succeeded where criminal prosecution failed. The demolition of the islands removed physical evidence — another loss for the historical record." },
  { id:35, year:2024, month:"Late 2024", decade:"2020s", category:"Documents", categoryColor:"#059669", title:"FBI File Releases — FOIA Litigation Produces Investigative Materials", summary:"Portions of the FBI's investigative file on Epstein are released following sustained FOIA litigation, illuminating the bureau's investigation and internal deliberations.", detail:"The released FBI materials — heavily redacted in many areas — include interview summaries, internal communications, and investigative memoranda. They shed light on how the FBI approached the case and what agents believed about the evidence at various stages. Significant portions remain withheld, and litigation to obtain further materials continues.", significance:"The public's right to know what its government did — and didn't do — is being enforced through legal pressure by journalists and advocates." },
  { id:36, year:2025, month:"Early 2025", decade:"2020s", category:"Documents", categoryColor:"#059669", title:"Additional Sealed Records Released Under Court Order", summary:"Further document releases under continuing court orders produce new materials from civil proceedings. Advocacy organizations continue litigating for remaining sealed records.", detail:"The rolling document releases ordered by Judge Preska in the Giuffre v. Maxwell proceedings continue into 2025. Each release generates public reporting and interest, while legal proceedings over access to remaining materials continue in parallel.", significance:"The fight for transparency is ongoing. Each release is a small victory for the public record." },
  { id:37, year:2026, month:"Mar 2026", decade:"2020s", category:"Documents", categoryColor:"#059669", title:"Continued FBI File Disclosures — Ongoing as of This Report", summary:"As of March 2026, the FBI continues rolling disclosures under court orders and FOIA compliance. Significant materials remain sealed. Maxwell appeal rejected. No additional criminal charges filed.", detail:"The Epstein case remains legally active: ongoing FBI document releases; Maxwell's appeal rejected; residual civil claims continuing. No additional criminal charges related to Epstein's trafficking operation have been filed as of early 2026. The full picture — who was involved, who was protected, and why — has not yet been publicly established.", significance:"The case is not closed. The demand for full accountability — from a public that has not forgotten — continues.", milestone:true },
];

const CATEGORY_COLORS = {
  "Background":"#6b7280","Alleged Conduct":"#b45309","Investigation":A,"Legal":"#7c3aed","Death":"#374151","Documents":"#059669",
};
const DECADES = ["1970s","1980s","1990s","2000s","2010s","2020s"];

// ─── OVERVIEW CHART ───────────────────────────────────────────────────────────
function OverviewChart({ events, activeDecade, onDecadeClick }) {
  const decadeCounts = DECADES.map(d => ({
    decade: d,
    total: events.filter(e => e.decade === d).length,
    byCategory: Object.keys(CATEGORY_COLORS).reduce((acc, cat) => { acc[cat] = events.filter(e => e.decade === d && e.category === cat).length; return acc; }, {}),
  }));
  const maxCount = Math.max(...decadeCounts.map(d => d.total));
  return (
    <div style={{ background:"#1e3a8a", border:`1px solid ${A2}`, padding:"1.5rem", marginBottom:"1.75rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.25rem", flexWrap:"wrap", gap:"0.75rem" }}>
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.14em", textTransform:"uppercase", color:GOLD, marginBottom:"0.3rem" }}>Event Density by Decade</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1rem", fontWeight:700, color:"rgba(240,237,230,0.92)" }}>{events.length} Documented Events · 1976 – 2026</div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.65rem" }}>
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} style={{ display:"flex", alignItems:"center", gap:"0.3rem" }}>
              <div style={{ width:8, height:8, background:color, flexShrink:0 }} />
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", color:"rgba(240,237,230,0.55)" }}>{cat}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", gap:"0.6rem", alignItems:"flex-end", height:"110px" }}>
        {decadeCounts.map(({ decade, total, byCategory }) => {
          const isActive = activeDecade === decade;
          const barH = maxCount > 0 ? (total / maxCount) * 100 : 0;
          return (
            <div key={decade} onClick={() => onDecadeClick(isActive ? null : decade)}
              style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer", gap:"0.3rem" }}>
              <div style={{ width:"100%", height:`${barH}%`, display:"flex", flexDirection:"column-reverse", border:`2px solid ${isActive?GOLD:"transparent"}`, transition:"border 0.2s", position:"relative", minHeight:total>0?"6px":"0" }}>
                {Object.entries(CATEGORY_COLORS).map(([cat, color]) => {
                  const count = byCategory[cat];
                  if (!count) return null;
                  return <div key={cat} title={`${cat}: ${count}`} style={{ width:"100%", height:`${(count/total)*100}%`, background:color, minHeight:"2px", opacity:isActive?1:0.7 }} />;
                })}
                <div style={{ position:"absolute", top:"-1.4rem", left:"50%", transform:"translateX(-50%)", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:isActive?GOLD:"rgba(240,237,230,0.45)", fontWeight:isActive?600:400, whiteSpace:"nowrap" }}>{total}</div>
              </div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", color:isActive?GOLD:"rgba(240,237,230,0.45)", fontWeight:isActive?600:400, whiteSpace:"nowrap" }}>{decade}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop:"0.75rem", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", color:"rgba(240,237,230,0.3)" }}>Click a decade bar to filter · Click again to clear</div>
    </div>
  );
}

// ─── TIMELINE EVENT CARD ──────────────────────────────────────────────────────
function EventCard({ event, index, isExpanded, onToggle }) {
  const isLeft = index % 2 === 0;
  const Content = (
    <div style={{
      maxWidth:"370px", width:"100%",
      marginLeft: isLeft ? "auto" : 0,
      background: isExpanded ? "var(--surface)" : "var(--surface-soft)",
      border:`1px solid ${isExpanded ? event.categoryColor : "var(--border-light)"}`,
      borderLeft: isLeft ? `1px solid ${isExpanded?event.categoryColor:"var(--border-light)"}` : `3px solid ${event.categoryColor}`,
      borderRight: isLeft ? `3px solid ${event.categoryColor}` : `1px solid ${isExpanded?event.categoryColor:"var(--border-light)"}`,
      transition:"all 0.2s",
      boxShadow: isExpanded ? "0 4px 18px rgba(0,0,0,0.1)" : "none",
      overflow:"hidden",
    }}>
      <div onClick={onToggle} style={{ cursor:"pointer", padding:"0.85rem 1rem 0" }}>
        <div style={{ display:"flex", gap:"0.4rem", alignItems:"center", marginBottom:"0.4rem", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", letterSpacing:"0.1em", textTransform:"uppercase", background:event.categoryColor, color:"var(--surface)", padding:"0.1rem 0.4rem" }}>{event.category}</span>
          {event.milestone && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.48rem", letterSpacing:"0.1em", textTransform:"uppercase", border:`1px solid ${event.categoryColor}`, color:event.categoryColor, padding:"0.08rem 0.3rem" }}>KEY EVENT</span>}
        </div>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.9rem", fontWeight:700, color:"var(--text)", lineHeight:1.35, marginBottom:"0.4rem" }}>{event.title}</h3>
        <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.73rem", lineHeight:1.7, color:"var(--text-dark)", marginBottom:"0.5rem" }}>{event.summary}</p>
      </div>
      <button onClick={onToggle} style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.4rem",
        padding:"0.4rem 1rem", background:isExpanded?`${event.categoryColor}18`:`${event.categoryColor}0d`,
        borderTop:`1px solid ${event.categoryColor}33`, border:"none", cursor:"pointer",
        transition:"background 0.2s",
      }}>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", color:event.categoryColor, letterSpacing:"0.08em", textTransform:"uppercase" }}>
          {isExpanded ? "Collapse" : "Read more"}
        </span>
        <span style={{ fontSize:"0.7rem", color:event.categoryColor, transition:"transform 0.25s", display:"inline-block", transform:isExpanded?"rotate(180deg)":"rotate(0deg)" }}>▼</span>
      </button>
      {isExpanded && (
        <div style={{ padding:"0.75rem 1rem 1rem", borderTop:`1px solid ${event.categoryColor}22` }}>
          <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.7rem", lineHeight:1.75, color:"var(--text-muted)", marginBottom:"0.55rem", fontStyle:"italic" }}>{event.detail}</p>
          <div style={{ background:`${event.categoryColor}10`, borderLeft:`2px solid ${event.categoryColor}`, padding:"0.45rem 0.6rem" }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.48rem", letterSpacing:"0.1em", textTransform:"uppercase", color:event.categoryColor, marginBottom:"0.2rem" }}>Significance</div>
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.68rem", lineHeight:1.65, color:"var(--text-dark-2)" }}>{event.significance}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 48px 1fr", marginBottom:"0.1rem" }}>
      <div style={{ paddingRight:"1.25rem", paddingBottom:"1.75rem", display:"flex", justifyContent:"flex-end" }}>{isLeft ? Content : <div />}</div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
        <div style={{ width:"2px", background:`${A}33`, position:"absolute", top:0, bottom:0, left:"50%", transform:"translateX(-50%)" }} />
        <div style={{ position:"relative", zIndex:2, marginTop:"0.5rem" }}>
          <button onClick={onToggle} style={{ width:event.milestone?18:12, height:event.milestone?18:12, borderRadius:event.milestone?"0":"50%", background:isExpanded?event.categoryColor:"#1e3a8a", border:`2px solid ${event.categoryColor}`, cursor:"pointer", padding:0, boxShadow:event.milestone?`0 0 10px ${event.categoryColor}55`:"none", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {event.milestone && <div style={{ width:5, height:5, background:isExpanded?"#1e3a8a":event.categoryColor }} />}
          </button>
        </div>
        <div style={{ position:"relative", zIndex:2, marginTop:"0.25rem", background:"var(--bg)", padding:"0.08rem 0.2rem" }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.48rem", color:event.categoryColor, fontWeight:600, whiteSpace:"nowrap" }}>{event.month}</span>
        </div>
      </div>
      <div style={{ paddingLeft:"1.25rem", paddingBottom:"1.75rem" }}>{!isLeft ? Content : <div />}</div>
    </div>
  );
}

// ─── TIMELINE PAGE ────────────────────────────────────────────────────────────
function TimelinePage() {
  const [expandedId, setExpandedId] = useState(null);
  const [activeDecade, setActiveDecade] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [milestonesOnly, setMilestonesOnly] = useState(false);

  const filtered = TIMELINE_EVENTS.filter(e => {
    if (activeDecade && e.decade !== activeDecade) return false;
    if (activeCategory && e.category !== activeCategory) return false;
    if (milestonesOnly && !e.milestone) return false;
    return true;
  });

  return (
    <div style={{ animation:"fadeIn 0.3s ease", padding:"1.75rem 0 5rem" }}>
      <div style={{ borderTop:`3px solid var(--text)`, paddingTop:"1rem", marginBottom:"1.5rem" }}>
        <div style={{ display:"flex", gap:"0.65rem", alignItems:"center", marginBottom:"0.65rem" }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", background:A, color:"var(--surface)", padding:"0.18rem 0.5rem" }}>Timeline</span>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--text-muted-5)" }}>{TIMELINE_EVENTS.length} documented events · Interactive</span>
        </div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,4vw,2.5rem)", fontWeight:900, color:"var(--text)", lineHeight:1.18, letterSpacing:"-0.02em", marginBottom:"1rem" }}>A Complete Documented Timeline of the Epstein Case: 1976 – 2026</h1>
        <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.95rem", fontStyle:"italic", color:"var(--text-muted)", lineHeight:1.65, borderLeft:`3px solid ${A}`, paddingLeft:"0.9rem", maxWidth:"620px" }}>From the corridors of Bear Stearns to a federal prison cell — every documented event in a case that transcends party lines and exposes how wealth and power operate above the law.</p>
        <div style={{ display:"flex", gap:"0.75rem", paddingTop:"0.75rem", borderTop:"1px solid var(--border)", marginTop:"1rem", flexWrap:"wrap" }}>
          {[`Investigations Desk`, `March 8, 2026`, `Interactive — click events to expand`].map((item, i) => (
            <span key={i} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", color:"var(--text-muted-3)" }}>{i>0&&<span style={{ marginRight:"0.75rem", color:"var(--border-faint)" }}>|</span>}{item}</span>
          ))}
        </div>
      </div>

      <OverviewChart events={TIMELINE_EVENTS} activeDecade={activeDecade} onDecadeClick={setActiveDecade} />

      <div style={{ display:"flex", gap:"0.45rem", flexWrap:"wrap", alignItems:"center", padding:"0.8rem 1rem", background:"var(--surface)", border:"1px solid var(--border-light)", marginBottom:"2rem" }}>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.1em", color:"var(--text-muted-5)", textTransform:"uppercase", marginRight:"0.2rem" }}>Filter:</span>
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <button key={cat} onClick={() => setActiveCategory(activeCategory===cat?null:cat)}
            style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", padding:"0.22rem 0.6rem", border:`1px solid ${activeCategory===cat?color:"var(--border)"}`, background:activeCategory===cat?color:"transparent", color:activeCategory===cat?"var(--surface)":"var(--text-muted)", cursor:"pointer", transition:"all 0.15s" }}>
            {cat}
          </button>
        ))}
        <div style={{ width:"1px", height:"18px", background:"var(--border-light)", margin:"0 0.2rem" }} />
        <button onClick={() => setMilestonesOnly(!milestonesOnly)}
          style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", padding:"0.22rem 0.6rem", border:`1px solid ${milestonesOnly?GOLD:"var(--border)"}`, background:milestonesOnly?"#1e3a8a":"transparent", color:milestonesOnly?GOLD:"var(--text-muted)", cursor:"pointer", transition:"all 0.15s" }}>
          ★ Key Events Only
        </button>
        {(activeCategory||activeDecade||milestonesOnly) && (
          <button onClick={() => { setActiveCategory(null); setActiveDecade(null); setMilestonesOnly(false); }}
            style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.55rem", background:"none", border:"none", color:A, cursor:"pointer", textDecoration:"underline", marginLeft:"auto" }}>clear all</button>
        )}
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.55rem", color:"var(--border-faint)", marginLeft:"auto" }}>{filtered.length} / {TIMELINE_EVENTS.length} events</span>
      </div>

      {DECADES.filter(d => !activeDecade || d === activeDecade).map(decade => {
        const decadeEvents = filtered.filter(e => e.decade === decade);
        if (!decadeEvents.length) return null;
        return (
          <div key={decade} style={{ marginBottom:"0.5rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 48px 1fr", marginBottom:"1.25rem" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:"0.75rem" }}><div style={{ flex:1, height:"1px", background:`${A}44` }} /></div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ background:"#1e3a8a", padding:"0.28rem 0.45rem", border:`1px solid ${A}` }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.1em", color:GOLD, fontWeight:600 }}>{decade}</span>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", paddingLeft:"0.75rem" }}><div style={{ flex:1, height:"1px", background:`${A}44` }} /></div>
            </div>
            {decadeEvents.map((event, idx) => (
              <div key={event.id} style={{ animation:"fadeIn 0.25s ease both", animationDelay:`${idx*0.03}s` }}>
                <EventCard event={event} index={idx} isExpanded={expandedId===event.id} onToggle={() => setExpandedId(expandedId===event.id?null:event.id)} />
              </div>
            ))}
          </div>
        );
      })}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 48px 1fr", marginTop:"1rem" }}>
        <div /><div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ width:"2px", height:"36px", background:`${A}33` }} />
          <div style={{ background:"#1e3a8a", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:7, height:7, background:GOLD }} /></div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", color:"var(--text-faint)", marginTop:"0.4rem", textAlign:"center" }}>ONGOING<br />2026</div>
        </div><div />
      </div>

      <div style={{ marginTop:"3rem", padding:"1.1rem 1.25rem", background:"#1e3a8a" }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.54rem", letterSpacing:"0.12em", textTransform:"uppercase", color:GOLD, marginBottom:"0.55rem" }}>Editorial & Legal Notice</div>
        <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.7rem", lineHeight:1.72, color:"rgba(240,237,230,0.62)", fontStyle:"italic" }}>All events documented in this timeline are drawn from public court records, official FBI file releases, established investigative journalism, and court-ordered document disclosures. Where individuals are named, their appearance in official records does not constitute an allegation of wrongdoing. All persons are presumed innocent unless convicted by a court of law.</p>
      </div>
    </div>
  );
}

// ─── ARTICLE POSTS ────────────────────────────────────────────────────────────
const POSTS = [
  {
    id:1, slug:"fbi-files-released",
    title:"FBI Files on Epstein Released: What the Documents Reveal",
    excerpt:"After years of legal battles waged by journalists and victims' advocates, federal authorities have released portions of the FBI's investigative files. What the documents reveal — and what they still conceal — matters to every citizen, regardless of political affiliation.",
    body:`After years of legal battles by journalists, victims' advocates, and transparency organizations, federal authorities have released portions of the FBI's investigative files relating to Jeffrey Epstein, the financier who died in federal custody in August 2019 while awaiting trial on sex trafficking charges.

This is not a partisan story. Epstein's network crossed every political party and every ideological boundary. The demand for transparency and accountability is not a left or right position — it is a basic expectation that the law applies equally to all people, regardless of wealth or social standing.

**What the Files Contain**

The released materials include interview summaries, travel logs, financial records, and correspondence that investigators compiled during multiple phases of inquiry into Epstein's activities. They document the FBI's efforts to identify victims, trace the movement of money through Epstein's network of entities, and map the social and professional connections that prosecutors believed were relevant to understanding the scope of his conduct.

Among the most discussed elements are flight logs from Epstein's private aircraft, address books seized during searches of his properties, and witness statements describing the environment at his various residences — including his Manhattan townhouse, his Palm Beach estate, his New Mexico ranch, and his private island in the U.S. Virgin Islands.

**The 2008 Non-Prosecution Agreement**

A central controversy running through the investigative record is the 2008 non-prosecution agreement that Epstein's legal team negotiated with federal prosecutors in Florida, led at the time by then-U.S. Attorney Alexander Acosta. Under that agreement, Epstein pleaded guilty to state charges of solicitation of prostitution and procurement of minors, received an 18-month sentence of which he served about 13 months largely on work release, and was granted immunity from federal prosecution along with unnamed co-conspirators.

Victims and their attorneys were not informed of the agreement before it was finalized — a process that a federal judge later ruled violated the Crime Victims' Rights Act. An ordinary defendant — without Epstein's wealth and connections — would not have received this treatment.

**The 2019 Arrest and Death**

In July 2019, federal prosecutors in the Southern District of New York unsealed a new indictment charging Epstein with sex trafficking of minors and conspiracy. He was arrested at Teterboro Airport on his return from France. Epstein died on August 10, 2019, in his cell at the Metropolitan Correctional Center. The NYC medical examiner ruled his death a suicide by hanging. A pathologist hired by his brother disputed that conclusion.

**What Remains Sealed**

Large portions of the investigative record remain sealed or redacted. Significant materials — including those relating to potential co-conspirators and the conduct of law enforcement officials involved in the 2008 agreement — remain subject to legal dispute. The public's right to this information is being pursued through the courts, case by case, year by year.`,
    author:"Bureau Correspondent", date:"March 8, 2026", category:"FBI Files",
    tags:["epstein","fbi","investigation","documents"], readTime:"9 min read", featured:true,
  },
  {
    id:2, slug:"high-profile-names",
    title:"The Epstein Files: High-Profile Names in the Documents",
    excerpt:"The FBI files and court records reference hundreds of individuals across the political spectrum — from both parties, from every walk of elite life. The presence of powerful names on both sides of the aisle is not a partisan fact. It is a structural one.",
    body:`**⚠ IMPORTANT DISCLAIMER — PLEASE READ CAREFULLY**

The individuals listed below appear in documents associated with Jeffrey Epstein — including FBI investigative files, flight logs, address books, deposition transcripts, and civil court filings. **Appearance in these records does not imply, suggest, or constitute evidence of any illegal activity, criminal conduct, or moral wrongdoing of any kind.**

People appear in these records for many reasons: as social acquaintances, business contacts, individuals who attended large gatherings, witnesses interviewed by investigators, people whose names appeared in address books, or simply because they were contacted by Epstein. Many have explicitly denied any knowledge of or involvement in criminal conduct and have never been charged with any offense.

No individual named below has been charged with crimes related to Epstein's conduct unless separately and explicitly noted. The purpose of this documentation is journalistic and historical — to provide an accurate record of who appeared in official documents and in what context, not to imply guilt by association.

Readers are strongly encouraged to review primary source documents and seek additional context before drawing any conclusions about any individual.

---

**A Note on the Political Nature of This List**

The individuals below include prominent figures from both major U.S. political parties, foreign heads of state, business leaders, academics, and entertainers. This is not a story about one party or one ideology. Epstein's access to power was universal because the problem this case exposes — that extreme wealth purchases access, protection, and special treatment under the law — is not a partisan problem. It is a systemic one. We present this information in that spirit.

---

**20 High-Profile Individuals Named in Epstein-Related Documents**

**1. Prince Andrew (Duke of York)**
Named in multiple depositions and civil proceedings. Virginia Giuffre alleged she was directed to have sexual contact with Prince Andrew on three occasions. Prince Andrew has consistently and categorically denied these allegations. He reached a financial settlement with Giuffre in 2022 without admission of liability. His name appears in Epstein's address book and flight logs.

**2. Bill Clinton**
Former U.S. President (Democrat). His name appears in Epstein's address book and flight logs. A spokesperson stated he took four trips on Epstein's plane in 2002–2003 for Clinton Foundation work, with Secret Service present. He has denied visiting Epstein's private properties.

**3. Donald Trump**
Current U.S. President (Republican). His name appears in Epstein's address book. Trump and Epstein were photographed together at social events in the 1990s and early 2000s. Trump stated in 2019 he had a falling out with Epstein "a long time ago." He has not been accused of involvement in Epstein's criminal conduct.

**4. Alan Dershowitz**
Harvard Law professor emeritus. He was part of Epstein's legal defense team that negotiated the 2008 NPA. Virginia Giuffre named him in a lawsuit; Dershowitz denied all allegations. A federal judge later dismissed Giuffre's claims against him with prejudice following a settlement.

**5. Ghislaine Maxwell**
British socialite convicted in December 2021 on five federal counts including sex trafficking of a minor. She is currently serving a 20-year federal prison sentence. Maxwell is the only individual directly convicted in connection with Epstein's trafficking operation.

**6. Jean-Luc Brunel**
French modeling agent named by multiple accusers as having recruited young women for Epstein. He was found dead in his Paris prison cell in February 2022 while awaiting trial; French authorities ruled his death a suicide.

**7. Les Wexner**
Founder and former CEO of L Brands. Epstein's most prominent known financial client, who granted him power of attorney in the 1990s. Wexner has stated he was defrauded by Epstein and was unaware of any criminal conduct.

**8. Leon Black**
Co-founder of Apollo Global Management. Financial records show he paid Epstein approximately $158 million between 2012 and 2017 — after Epstein's conviction. Black stepped down as Apollo's CEO in 2021. He has stated the payments were for legitimate financial services.

**9. Bill Gates**
Co-founder of Microsoft. Flight logs show he traveled on Epstein's aircraft on at least one occasion in 2013. Gates has stated this was a mistake in judgment and he met Epstein solely to discuss philanthropic work.

**10. Lawrence Summers**
Former U.S. Treasury Secretary and Harvard president. He met with Epstein on multiple occasions. Epstein made donations to Harvard during Summers' tenure. Summers has stated he met Epstein for intellectual discussions.

**11. Ehud Barak**
Former Israeli Prime Minister and Defense Minister. Flight logs and financial records show ongoing connections to Epstein. He has acknowledged knowing Epstein but denied any involvement in or knowledge of criminal conduct.

**12. Glenn Dubin**
New York hedge fund manager. Named in depositions as having been present at Epstein's properties. He has denied any wrongdoing.

**13. Stephen Hawking (deceased)**
The late theoretical physicist. His name appears in documents relating to a scientific conference at Epstein's Virgin Islands property in 2006. His estate has stated his attendance was for a legitimate academic symposium.

**14. Kevin Spacey**
Actor. Named in flight logs and associated with Epstein in social contexts documented in records. He has not been accused of involvement in Epstein's trafficking operation specifically.

**15. Chris Tucker**
Actor and comedian. Appears in flight logs for Epstein's aircraft on trips documented in court filings. No allegations of wrongdoing have been made against him.

**16. Naomi Campbell**
Model. Her name appears in Epstein's address book and in social contexts in the documents. No allegations of wrongdoing have been made against her.

**17. Harvey Weinstein**
Film producer currently serving a prison sentence for rape and sexual assault convictions unrelated to the Epstein case. His name appears in Epstein's address book in documents relating to overlapping social circles.

**18. David Copperfield**
Illusionist and entertainer. Named in depositions in connection with visits to Epstein's properties. He has denied any wrongdoing.

**19. Michael Bloomberg**
Former Mayor of New York City (Independent/Democrat). His name appears in Epstein's address book. No allegations of wrongdoing have been made against him.

**20. Woody Allen**
Film director. His name has appeared in documents and depositions associated with Epstein's social network. No allegations of wrongdoing specifically related to Epstein's trafficking operation have been made against him in this context.

---

This list is drawn from publicly available court filings, released FBI documents, and established investigative reporting. It is not exhaustive. Journalists and researchers are directed to the SDNY court docket and relevant FOIA releases.`,
    author:"Investigations Desk", date:"March 7, 2026", category:"FBI Files",
    tags:["epstein","documents","connections","fbi"], readTime:"14 min read", featured:true,
  },
  {
    id:3, slug:"complete-timeline", isTimeline:true,
    title:"A Complete Documented Timeline of the Epstein Case: 1976 – 2026",
    excerpt:"From Epstein's entry into elite financial networks to the ongoing release of sealed FBI documents — every major documented event across five decades, sourced from public court records and investigative journalism.",
    body:"TIMELINE_COMPONENT",
    author:"Investigations Desk", date:"March 8, 2026", category:"Timeline",
    tags:["epstein","timeline","investigation","maxwell"], readTime:"Interactive", featured:false,
  },
  {
    id:4, slug:"maxwell-aftermath",
    title:"After Maxwell: What the Conviction Left Unanswered",
    excerpt:"Ghislaine Maxwell is serving 20 years. But victims and advocates say the case closed with more questions than answers about who else may be held accountable — and whether a system that protects the wealthy will ever fully reckon with what happened.",
    body:`When Ghislaine Maxwell was convicted in December 2021 on five federal counts including sex trafficking of a minor, prosecutors and victims' advocates described it as justice long denied. But for many of the women who had spent years seeking accountability, the verdict marked an incomplete reckoning.

Maxwell was convicted. Epstein died before trial. And everyone else in the network has faced no criminal charge. This is not a partisan observation. It is a factual one — and it raises a question that should concern every citizen regardless of political affiliation: does the law apply equally to those with money and connections?

**The Co-Conspirator Question**

The 2008 non-prosecution agreement granted immunity not only to Epstein but to "co-conspirators" who were not named in the document. The identity of those individuals has been the subject of legal disputes for years. A federal judge ruled in 2019 that the agreement's execution violated the Crime Victims' Rights Act, but that ruling did not automatically expose the co-conspirators or result in new charges.

**The Structural Problem**

This case is a window into how wealth functions in the American legal system. Epstein's 2008 deal was not the product of insufficient evidence — investigators believed they had a strong case. It was the product of resources: the most expensive lawyers, the most powerful social connections, the ability to negotiate in secret. Ordinary people accused of crimes with 40 identified victims do not receive this treatment.

**What Victims Want**

Survivors have been consistent in stating that their goal was never limited to the conviction of Maxwell. Many have expressed continued determination to hold accountable all individuals who participated in their abuse. Civil litigation, which has produced more document releases than the criminal proceedings, has continued to advance that effort. As of early 2026, no additional criminal charges related to the Epstein trafficking operation have been filed.

The fight for accountability is not over. And it does not belong to any party — it belongs to the public.`,
    author:"Legal Affairs Correspondent", date:"February 28, 2026", category:"Court Records",
    tags:["maxwell","conviction","epstein","victims"], readTime:"7 min read", featured:false,
  },
  {
    id:5, slug:"palm-beach-2005",
    title:"Palm Beach 2005: How the First Investigation Unraveled",
    excerpt:"A teenager's report to police set off a local investigation that identified dozens of victims. Ordinary law enforcement built a strong case. Then federal prosecutors with powerful connections stepped in — and the case took a different turn.",
    body:`The case that became one of the most consequential federal investigations of the early 21st century began not with a powerful institution — but with a single mother calling a local police department in Palm Beach, Florida in the spring of 2005.

A woman contacted Palm Beach Police to say that her teenage stepdaughter had been brought to the home of a wealthy financier named Jeffrey Epstein and paid for sexual acts. The girl was 14 years old.

Detective Joseph Recarey was assigned to the case. Over the next year, he interviewed victim after victim, traced connections through a network of recruiters and intermediaries, and built what he and his supervisors believed was a strong case. This is how accountability is supposed to work: ordinary people reporting harm, ordinary law enforcement pursuing truth. By the time he referred the matter to federal authorities, he had identified approximately 40 potential victims.

**The Transition to Federal Jurisdiction**

The referral to the FBI and the U.S. Attorney's office was intended to expand the investigation — federal law provided for more serious charges and longer sentences. What followed, however, was the negotiation of the non-prosecution agreement. Detective Recarey later gave interviews describing his reaction to the agreement as one of profound disbelief.

This is the moment the story stops being about law enforcement and starts being about power. Epstein's wealth purchased a legal defense team that negotiated privately with federal prosecutors — excluding the victims from a process that was legally required to include them.

**The Victims' Experience**

For the women and girls who had cooperated with the Palm Beach investigation, the resolution of the case was devastating. Many had been told they had built a strong case. None had been informed that negotiations were underway. The agreement that resulted kept Epstein largely free, immunized unnamed co-conspirators, and left victims legally unable to pursue federal claims.

This is not a story of a system that failed to find evidence. It is a story of a system that found evidence, built a case — and then deferred to wealth and power.`,
    author:"Investigations Desk", date:"February 20, 2026", category:"Investigation",
    tags:["epstein","investigation","victims"], readTime:"8 min read", featured:false,
  },
  {
    id:7, slug:"acosta-npa-2008",
    title:"The Deal That Let Epstein Walk: Inside the 2008 Non-Prosecution Agreement",
    excerpt:"In 2008, federal prosecutors offered Jeffrey Epstein a sweetheart deal that shielded him — and unnamed co-conspirators — from federal prosecution. A federal judge later ruled it violated the law. The man who signed it became Secretary of Labor.",
    body:`In 2008, after the FBI had assembled a comprehensive federal case against Jeffrey Epstein, prosecutors in the Southern District of Florida — led by U.S. Attorney Alexander Acosta — negotiated a secret agreement that would become one of the most scrutinized prosecutorial decisions in recent American history.

The agreement, known as a non-prosecution agreement (NPA), allowed Epstein to plead guilty to two state charges: solicitation of prostitution and procurement of a minor for prostitution. He received an 18-month county jail sentence — of which he served approximately 13 months, largely on "work release" that allowed him to leave the facility up to 12 hours a day, six days a week. He was required to register as a sex offender.

**What the Agreement Did**

The NPA did something unusual even beyond the lenient sentence: it granted immunity not just to Epstein, but to "any potential co-conspirators." The identities of those co-conspirators were not disclosed in the agreement and remain a subject of intense legal dispute more than fifteen years later.

The agreement was negotiated in private. Victims were not notified. This secrecy, as a federal judge later ruled, was not an oversight — it was a violation of the Crime Victims' Rights Act, a federal law that entitles victims to be informed of and heard in proceedings that affect their cases.

**The Victims' Experience**

For the dozens of women who had cooperated with law enforcement — who had submitted to difficult interviews, relived traumatic experiences, and been assured that a serious federal case was being built — the agreement was a profound betrayal. Many learned of it only from news reports. Some discovered that the very plea deal that was supposed to represent accountability had foreclosed their ability to pursue federal civil claims.

**Acosta's Defense and Resignation**

Alexander Acosta became Secretary of Labor in 2017 under President Trump. When the Miami Herald's 2018 reporting by journalist Julie K. Brown brought the Epstein case back into public view, Acosta's role in the NPA became front-page news again.

In a press conference, Acosta defended the deal as the best achievable given the circumstances — claiming that local Florida authorities might have pursued nothing at all, and that the NPA at least secured some punishment. Critics, including prosecutors and legal scholars, disputed that framing. In 2019, following Epstein's federal arrest, Acosta resigned.

**The Structural Question**

This case is not simply about one prosecutor making one decision. It is about a system in which the most expensive legal defense teams can negotiate privately with federal prosecutors — excluding the people most harmed by the defendant's conduct. It is about a system in which the outcome of a federal criminal proceeding can be determined not by the strength of the evidence, but by the social and financial resources of the accused.

An ordinary defendant facing charges of trafficking dozens of minors, with 40 identified victims, does not receive this treatment. The question is not whether Epstein was guilty — the evidence was overwhelming. The question is why the law was applied so differently to him than it would have been to anyone without his connections. That question has not been fully answered.`,
    author:"Legal Affairs Correspondent", date:"March 1, 2026", category:"Court Records",
    tags:["epstein","investigation","documents","victims"], readTime:"8 min read", featured:false,
  },
  {
    id:6, slug:"virgin-islands",
    title:"Little Saint James: How a Private Island Became a Symbol of Unaccountable Power",
    excerpt:"Epstein purchased a private island in the U.S. Virgin Islands in 1998. For two decades, wealth bought him geographic insulation from oversight. When accountability finally came, it came through a civil lawsuit from a small government — not the federal institutions that should have acted first.",
    body:`Jeffrey Epstein purchased Little Saint James, a 72-acre private island in the U.S. Virgin Islands, in 1998. He subsequently purchased a second island, Great Saint James, in 2016. Together they formed a private compound — geographically remote, economically powerful, and largely insulated from the kind of accountability ordinary citizens face.

The island is a physical metaphor for the entire Epstein story: wealth purchasing separation from the rules that govern everyone else.

In January 2020, the U.S. Virgin Islands Attorney General's office filed a civil lawsuit against Epstein's estate, alleging that the territory had been used as the epicenter of a sex trafficking operation for more than two decades, and that Epstein had used his economic influence to obtain tax benefits and avoid scrutiny.

**Settlement and Aftermath**

Epstein's estate reached a settlement with the U.S. Virgin Islands in 2024. The terms included a substantial financial payment and the forfeiture of both island properties. The physical structures on Little Saint James were subsequently demolished.

For many observers and advocates, the demolition of the property represented the erasure of a crime scene — and of whatever physical evidence might have remained. The USVI investigation demonstrated that civil litigation, pursued by a small government with limited resources against one of the largest private estates in America, could succeed where federal criminal institutions had initially failed.

This is, again, a story of accountability coming from below. Not from powerful federal institutions, but from a small territory's attorney general who decided to pursue the case anyway.

The question this case leaves open — who else was involved, who else was protected, and what systemic changes are needed to prevent it from happening again — does not belong to one party. It belongs to all of us.`,
    author:"Bureau Correspondent", date:"February 12, 2026", category:"Investigation",
    tags:["epstein","virgin islands","investigation"], readTime:"6 min read", featured:false,
  },
];

const CATEGORIES = ["All","Investigation","Court Records","FBI Files","Timeline","Do Your Research","Archive","Community"];
const TAGS_LIST = ["epstein","fbi","investigation","maxwell","documents","victims","timeline","connections"];

// ─── EXPANDABLE PARAGRAPH BODY RENDERER ──────────────────────────────────────
function ExpandableParagraph({ html, isDisc, isNum, index }) {
  const [open, setOpen] = useState(index < 2);
  const plainText = html.replace(/<[^>]+>/g,"");
  const isLong = plainText.length > 200;
  const PREVIEW_LEN = 220;

  // Numbered person entries (e.g. "**1. Prince Andrew...")
  if (isNum) {
    const previewHtml = plainText.slice(0, 100) + (plainText.length > 100 ? "…" : "");
    return (
      <div style={{ margin:"0.85rem 0", border:`1px solid var(--border-warm)`, borderLeft:`3px solid ${A}`, background: open ? "var(--surface)" : "var(--surface-soft)", overflow:"hidden", transition:"background 0.2s" }}>
        <div style={{ padding:"0.75rem 1rem" }}>
          <p dangerouslySetInnerHTML={{ __html: open ? html : previewHtml }} style={{ fontFamily:"'Merriweather',serif", fontSize:"0.85rem", lineHeight:1.8, color:"var(--text)", margin:0 }} />
        </div>
        <div style={{ padding:"0 1rem 0.65rem", display:"flex", justifyContent:"flex-start" }}>
          <button onClick={() => setOpen(!open)} style={{
            fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.1em", textTransform:"uppercase",
            background: open ? "transparent" : A, color: open ? A : "var(--surface)",
            border:`1px solid ${A}`, padding:"0.2rem 0.65rem", cursor:"pointer", transition:"all 0.2s",
            display:"flex", alignItems:"center", gap:"0.3rem"
          }}>
            {open ? "Show less ▲" : "Read more ▼"}
          </button>
        </div>
      </div>
    );
  }

  // Short paragraphs — render directly, no toggle needed
  if (!isLong) {
    return (
      <p dangerouslySetInnerHTML={{ __html:html }}
        style={{ fontFamily:"'Merriweather',serif", fontSize:"0.93rem", lineHeight:1.9, color:"var(--text-darkest)", marginBottom:"1rem",
          background:isDisc?"var(--a-light)":"transparent", padding:isDisc?"0.7rem 0.9rem":"0",
          border:isDisc?`1px solid ${A}44`:"none", borderLeft:isDisc?`4px solid ${A}`:"none" }} />
    );
  }

  // Long paragraphs — show preview with "Read more" button below
  const previewText = plainText.slice(0, PREVIEW_LEN);
  const previewHtml = open ? html : previewText + "…";

  return (
    <div style={{ marginBottom:"1.1rem", borderLeft:`3px solid ${open ? A : "var(--border-light)"}`, paddingLeft:"0.9rem", transition:"border-color 0.2s", background:isDisc?"var(--a-light)":"transparent", padding:isDisc?"0.7rem 0.9rem 0.4rem":"0 0 0 0.9rem", border:isDisc?`1px solid ${A}33`:"none", borderLeft:`3px solid ${open ? A : "var(--border-light)"}` }}>
      <p dangerouslySetInnerHTML={{ __html: previewHtml }}
        style={{ fontFamily:"'Merriweather',serif", fontSize:"0.9rem", lineHeight:1.85, color: open ? "var(--text-darkest)" : "var(--text-dark)", margin:"0 0 0.55rem 0", transition:"color 0.2s" }} />
      <button onClick={() => setOpen(!open)} style={{
        fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.1em", textTransform:"uppercase",
        background: open ? "transparent" : A, color: open ? A : "var(--surface)",
        border:`1px solid ${A}`, padding:"0.22rem 0.7rem", cursor:"pointer", transition:"all 0.2s",
        display:"inline-flex", alignItems:"center", gap:"0.3rem", marginBottom: open ? "0.5rem" : "0"
      }}>
        {open ? "Show less ▲" : "Read more ▼"}
      </button>
    </div>
  );
}

function renderBody(body) {
  return body.split("\n\n").filter(Boolean).map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**") && para.split("**").length === 3) {
      const text = para.slice(2, -2);
      const isWarn = text.startsWith("⚠");
      return <h3 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:isWarn?"1rem":"1.3rem", color:isWarn?A:"var(--text)", margin:isWarn?"0 0 0.65rem":"2.25rem 0 0.65rem", fontWeight:700, borderBottom:isWarn?"none":`1px solid var(--text)`, paddingBottom:isWarn?"0":"0.25rem", letterSpacing:"-0.01em" }}>{text}</h3>;
    }
    if (para.startsWith("---")) return <hr key={i} style={{ border:"none", borderTop:"2px solid var(--text)", margin:"1.75rem 0" }} />;
    const isDisc = para.includes("Appearance in these records does not imply") || para.includes("People appear in these records") || para.includes("No individual named below") || para.includes("Readers are strongly encouraged");
    const isNum = /^\*\*\d+\./.test(para);
    const html = para.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>");
    return <ExpandableParagraph key={i} html={html} isDisc={isDisc} isNum={isNum} index={i} />;
  });
}

// ─── GITHUB COMMENTS CONFIG ──────────────────────────────────────────────────
// These are injected by Vite at build time from environment variables.
// Set them in your .env file or GitHub Actions secrets.
// The repo must be PUBLIC for the API to work without a token.
// Comments are stored as replies to a single pinned GitHub Issue.
const GH_OWNER  = import.meta.env.VITE_GITHUB_REPO_OWNER  || "YOUR_USERNAME";
const GH_REPO   = import.meta.env.VITE_GITHUB_REPO_NAME   || "YOUR_REPO";
const GH_ISSUE  = import.meta.env.VITE_GITHUB_COMMENTS_ISSUE || "1";
const GH_API    = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/issues/${GH_ISSUE}/comments`;

// ── INPUT SANITISER: strips tags, limits length ───────────────────────────────
// Never trust user input — strip any HTML before storing or rendering.
function sanitize(str) {
  return String(str)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/`/g, "&#x60;")
    .slice(0, 2000); // hard cap at 2000 chars
}

function formatRelativeTime(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

// ── RATE LIMIT: max 3 posts per session (stored in sessionStorage) ─────────────
function getRateCount() {
  try { return parseInt(sessionStorage.getItem("er_comment_count") || "0", 10); } catch { return 0; }
}
function bumpRateCount() {
  try { sessionStorage.setItem("er_comment_count", String(getRateCount() + 1)); } catch {}
}
const RATE_LIMIT = 3;

// ─── COMMENT SECTION ─────────────────────────────────────────────────────────
function CommentSection() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [posted, setPosted] = useState(false);
  const [rateCount, setRateCount] = useState(getRateCount);

  // ── Fetch existing comments from GitHub Issues API ─────────────────────────
  useEffect(() => {
    setLoading(true);
    fetch(`${GH_API}?per_page=100&sort=created&direction=asc`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API error: ${r.status}`);
        return r.json();
      })
      .then(data => {
        // Parse comment body: format is "**Name:** message"
        const parsed = data.map(c => {
          const body = c.body || "";
          const nameMatch = body.match(/^\*\*(.+?)\*\*: /);
          const author = nameMatch ? sanitize(nameMatch[1]) : "Anonymous";
          const text = nameMatch
            ? sanitize(body.slice(nameMatch[0].length))
            : sanitize(body);
          return {
            id: c.id,
            author,
            text,
            time: formatRelativeTime(c.created_at),
            avatar: c.user?.avatar_url || null,
            replies: [], // GitHub Issues doesn't have nested replies natively
          };
        });
        setComments(parsed);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load comments:", err);
        setError("Could not load comments. GitHub API may be rate-limited. Try again in a minute.");
        setLoading(false);
      });
  }, []);

  // ── Post a new comment to GitHub Issues ────────────────────────────────────
  // Since GitHub Issues API requires authentication for writes, we use a
  // serverless function proxy (see README for setup). If no proxy is configured,
  // we fall back to opening a pre-filled GitHub issue in a new tab.
  const submitComment = async () => {
    const text = newText.trim();
    const author = newAuthor.trim() || "Anonymous";
    if (!text) return;
    if (text.length > 2000) { setError("Comment must be under 2000 characters."); return; }
    if (rateCount >= RATE_LIMIT) { setError(`You've posted ${RATE_LIMIT} comments this session. Please wait before posting again.`); return; }

    const safeAuthor = sanitize(author);
    const safeText = sanitize(text);
    const body = `**${safeAuthor}**: ${safeText}`;

    // Try the proxy endpoint first (see api/comment.js)
    const proxyUrl = `${window.location.origin}/api/comment`;

    setPosting(true);
    setError(null);

    try {
      const res = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });

      if (res.ok) {
        const created = await res.json();
        bumpRateCount();
        setRateCount(getRateCount());
        setComments(prev => [...prev, {
          id: created.id || Date.now(),
          author: safeAuthor,
          text: safeText,
          time: "just now",
          avatar: null,
          replies: [],
        }]);
        setNewText("");
        setNewAuthor("");
        setPosted(true);
        setTimeout(() => setPosted(false), 4000);
      } else {
        throw new Error("Proxy returned error");
      }
    } catch {
      // Fallback: open GitHub issue tab with pre-filled body
      const issueUrl = `https://github.com/${GH_OWNER}/${GH_REPO}/issues/${GH_ISSUE}`;
      const ghCommentUrl = `${issueUrl}#new_comment_field`;
      const encoded = encodeURIComponent(body);
      window.open(`${issueUrl}`, "_blank", "noopener,noreferrer");
      setError("Auto-posting not configured. Your comment has been copied — paste it on the GitHub page that just opened, or see README to enable direct posting.");
      if (navigator.clipboard) navigator.clipboard.writeText(body).catch(()=>{});
    }

    setPosting(false);
  };

  const submitReply = (parentId) => {
    // Replies in GitHub Issues = just another top-level comment with @mention context
    const text = replyText.trim();
    const author = replyAuthor.trim() || "Anonymous";
    if (!text) return;
    const parent = comments.find(c => c.id === parentId);
    const replyBody = parent ? `↩ *Reply to ${parent.author}:*\n\n**${sanitize(author)}**: ${sanitize(text)}` : `**${sanitize(author)}**: ${sanitize(text)}`;
    setNewText(replyBody.replace(/\n/g, "\n"));
    setNewAuthor(author);
    setReplyText(""); setReplyAuthor(""); setReplyingTo(null);
  };

  return (
    <div style={{ animation:"fadeIn 0.3s ease", padding:"1.75rem 0 5rem" }}>
      <div style={{ borderTop:"3px solid var(--text)", paddingTop:"1rem", marginBottom:"2rem" }}>
        <div style={{ display:"flex", gap:"0.65rem", alignItems:"center", marginBottom:"0.65rem" }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", background:A, color:"var(--surface)", padding:"0.18rem 0.5rem" }}>Community</span>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--text-muted-5)" }}>{comments.length} voices · {comments.reduce((a,c)=>a+c.replies.length,0)} replies</span>
        </div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.4rem,3.5vw,2.2rem)", fontWeight:900, color:"var(--text)", lineHeight:1.2, marginBottom:"0.75rem" }}>The Public Record — Your Voice</h1>
        <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.9rem", fontStyle:"italic", color:"var(--text-muted)", lineHeight:1.65, borderLeft:`3px solid ${A}`, paddingLeft:"0.9rem", maxWidth:"600px" }}>This is a space for communities — from every background and every belief — to come together around the shared demand for truth, transparency, and equal justice. Speak up. Listen. Connect with others who care.</p>
      </div>

      <div style={{ background:"var(--surface)", border:`1px solid ${A}44`, borderTop:`3px solid ${A}`, padding:"1.25rem", marginBottom:"2.5rem" }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.12em", textTransform:"uppercase", color:A, marginBottom:"0.9rem", fontWeight:600 }}>Join the Conversation</div>
        <input
          value={newAuthor} onChange={e=>setNewAuthor(e.target.value)}
          placeholder="Your name (optional)"
          style={{ width:"100%", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.72rem", padding:"0.5rem 0.75rem", border:"1px solid var(--border-light)", borderBottom:`2px solid ${A}22`, outline:"none", marginBottom:"0.65rem", color:"var(--text-dark-2)", background:"var(--surface-soft)" }}
        />
        <textarea
          value={newText} onChange={e=>setNewText(e.target.value)}
          placeholder="What are your thoughts? What should people know? What do you demand?"
          rows={4}
          style={{ width:"100%", fontFamily:"'Merriweather',serif", fontSize:"0.82rem", lineHeight:1.7, padding:"0.65rem 0.75rem", border:"1px solid var(--border-light)", borderBottom:`2px solid ${A}22`, outline:"none", resize:"vertical", color:"var(--text-dark-2)", background:"var(--surface-soft)" }}
        />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"0.65rem", flexWrap:"wrap", gap:"0.5rem" }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", color:"var(--text-faint)", letterSpacing:"0.03em" }}>
            {rateCount}/{RATE_LIMIT} posts this session · {newText.length}/2000 chars
          </span>
          <button onClick={submitComment} disabled={posting || rateCount >= RATE_LIMIT}
            style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.08em", textTransform:"uppercase", background: rateCount >= RATE_LIMIT ? "var(--text-muted-4)" : A, color:"var(--surface)", border:"none", padding:"0.55rem 1.35rem", cursor: rateCount >= RATE_LIMIT ? "not-allowed" : "pointer", fontWeight:600, opacity: posting ? 0.7 : 1 }}>
            {posting ? "Posting…" : "Post Comment"}
          </button>
        </div>
      </div>

      {/* ── Status messages ── */}
      {error && (
        <div style={{ background:`${A}18`, border:`1px solid ${A}44`, borderLeft:`3px solid ${A}`, padding:"0.75rem 1rem", marginBottom:"1rem", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", color:"var(--text-dark)", lineHeight:1.55 }}>
          ⚠ {error}
          <button onClick={()=>setError(null)} style={{ float:"right", background:"none", border:"none", color:"var(--text-muted-2)", cursor:"pointer", fontSize:"0.7rem" }}>✕</button>
        </div>
      )}
      {posted && (
        <div style={{ background:"#059669", padding:"0.65rem 1rem", marginBottom:"1rem", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", color:"#fff", letterSpacing:"0.06em" }}>
          ✓ Comment posted — thank you for your voice.
        </div>
      )}

      {/* ── Comment list ── */}
      {loading ? (
        <div style={{ padding:"3rem", textAlign:"center", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", color:"var(--text-muted-4)", letterSpacing:"0.08em" }}>
          Loading comments from the public record…
        </div>
      ) : (
      <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
        {comments.length === 0 && !error && (
          <div style={{ padding:"2.5rem 0", textAlign:"center", fontFamily:"'Merriweather',serif", fontStyle:"italic", color:"var(--text-muted-5)", fontSize:"0.85rem" }}>
            No comments yet. Be the first to speak up.
          </div>
        )}
        {comments.map((c) => (
          <div key={c.id} style={{ borderTop:`1px solid var(--border-light)`, padding:"1.25rem 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.6rem" }}>
              {c.avatar ? (
                <img src={c.avatar} alt="" width={32} height={32}
                  style={{ borderRadius:"50%", flexShrink:0 }}
                  referrerPolicy="no-referrer" />
              ) : (
              <div style={{ width:32, height:32, borderRadius:"50%", background:A, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.72rem", color:"var(--surface)", fontWeight:600 }}>{c.author[0].toUpperCase()}</span>
              </div>
              )}
              <div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.65rem", fontWeight:600, color:"var(--text)", letterSpacing:"0.03em" }}>{c.author}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", color:"var(--text-faint)" }}>{c.time}</div>
              </div>
            </div>
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.88rem", lineHeight:1.75, color:"var(--text-dark-2)", marginBottom:"0.75rem", paddingLeft:"2.5rem" }}>{c.text}</p>
            <div style={{ paddingLeft:"2.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
              <button onClick={()=>setReplyingTo(replyingTo===c.id?null:c.id)} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.08em", textTransform:"uppercase", background:"none", border:`1px solid ${A}66`, color:A, padding:"0.22rem 0.65rem", cursor:"pointer" }}>
                ↩ Reply {c.replies.length > 0 && `(${c.replies.length})`}
              </button>
            </div>
            {c.replies.length > 0 && (
              <div style={{ marginTop:"0.9rem", marginLeft:"2.5rem", paddingLeft:"1rem", borderLeft:`2px solid ${A}33` }}>
                {c.replies.map(r => (
                  <div key={r.id} style={{ marginBottom:"0.85rem" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.35rem" }}>
                      <div style={{ width:24, height:24, borderRadius:"50%", background:A2, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--surface)", fontWeight:600 }}>{r.author[0].toUpperCase()}</span>
                      </div>
                      <div>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", fontWeight:600, color:"var(--text)" }}>{r.author}</span>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", color:"var(--text-faint)", marginLeft:"0.5rem" }}>{r.time}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.82rem", lineHeight:1.72, color:"var(--text-dark)", paddingLeft:"1.85rem" }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
            {replyingTo === c.id && (
              <div style={{ marginTop:"0.9rem", marginLeft:"2.5rem", padding:"0.9rem 1rem", background:`${A_LIGHT}`, border:`1px solid ${A}44`, borderLeft:`3px solid ${A}` }}>
                <input
                  value={replyAuthor} onChange={e=>setReplyAuthor(e.target.value)}
                  placeholder="Your name (optional)"
                  style={{ width:"100%", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.68rem", padding:"0.4rem 0.6rem", border:"1px solid var(--border-light)", outline:"none", marginBottom:"0.5rem", color:"var(--text-dark-2)", background:"var(--surface)" }}
                />
                <textarea
                  value={replyText} onChange={e=>setReplyText(e.target.value)}
                  placeholder="Write a reply…"
                  rows={3}
                  style={{ width:"100%", fontFamily:"'Merriweather',serif", fontSize:"0.8rem", lineHeight:1.65, padding:"0.5rem 0.6rem", border:"1px solid var(--border-light)", outline:"none", resize:"vertical", color:"var(--text-dark-2)", background:"var(--surface)" }}
                />
                <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.5rem", justifyContent:"flex-end" }}>
                  <button onClick={()=>{setReplyingTo(null);setReplyText("");setReplyAuthor("");}} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", background:"none", border:"1px solid var(--border)", color:"var(--text-muted-2)", padding:"0.35rem 0.85rem", cursor:"pointer" }}>Cancel</button>
                  <button onClick={()=>submitReply(c.id)} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.06em", textTransform:"uppercase", background:A, color:"var(--surface)", border:"none", padding:"0.35rem 0.85rem", cursor:"pointer", fontWeight:600 }}>Post Reply</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      )} {/* end loading conditional */}
    </div>
  );
}

// ─── DO YOUR RESEARCH PAGE ────────────────────────────────────────────────────
function ResearchPage() {
  const [epsteinWarningAccepted, setEpsteinWarningAccepted] = useState(false);
  const [jmailWarningAccepted, setJmailWarningAccepted] = useState(false);

  return (
    <div style={{ animation:"fadeIn 0.3s ease", padding:"1.75rem 0 5rem" }}>
      <div style={{ borderTop:"3px solid var(--text)", paddingTop:"1rem", marginBottom:"2.5rem" }}>
        <div style={{ display:"flex", gap:"0.65rem", alignItems:"center", marginBottom:"0.65rem" }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", background:A, color:"var(--surface)", padding:"0.18rem 0.5rem" }}>Resources</span>
        </div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,4vw,2.5rem)", fontWeight:900, color:"var(--text)", lineHeight:1.18, letterSpacing:"-0.02em", marginBottom:"0.9rem" }}>Do Your Research</h1>
        <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.95rem", fontStyle:"italic", color:"var(--text-muted)", lineHeight:1.7, borderLeft:`3px solid ${A}`, paddingLeft:"0.9rem", maxWidth:"640px" }}>
          An informed public is the most powerful force for accountability. Below are three essential resources — an interactive network map, real emails from Congress, and a primary source document archive. Know what you are looking at before you look.
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1.5rem", alignItems:"start" }}>
        <div style={{ border:`1px solid ${A}55`, borderTop:`4px solid ${A}`, overflow:"hidden" }}>
          <div style={{ padding:"1.5rem 1.5rem 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"0.75rem" }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:900, color:"var(--text)", lineHeight:1.2 }}>jmail.world</h2>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.1em", textTransform:"uppercase", background:A, color:"var(--surface)", padding:"0.15rem 0.45rem", whiteSpace:"nowrap" }}>Real Emails</span>
            </div>
            <div style={{ background:"#1e3a8a", border:`1px solid ${A}`, padding:"0.85rem 1rem", marginBottom:"1rem", borderLeft:`3px solid ${GOLD}` }}>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase", color:GOLD, marginBottom:"0.3rem" }}>You are logged in as Jeffrey Epstein</div>
              <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.78rem", lineHeight:1.65, color:"rgba(240,237,230,0.85)", fontStyle:"italic" }}>These are real emails released by Congress.</p>
            </div>
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.85rem", lineHeight:1.8, color:"var(--text-dark)", marginBottom:"1rem" }}>
              Explore by name, search, visit a random page, contribute to the starred list, or vote for an unredaction.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", marginBottom:"1.25rem" }}>
              {[["🔍","Search by name","Find emails involving any individual"],["🎲","Random page","Stumble into the archive"],["⭐","Starred list","Contribute notable finds"],["🗳","Vote to unredact","Help surface hidden content"]].map(([icon,label,desc])=>(
                <div key={label} style={{ padding:"0.6rem 0.75rem", border:`1px solid ${A}33`, background:"var(--a-light)" }}>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", fontWeight:600, color:"var(--text)", marginBottom:"0.15rem" }}>{icon} {label}</div>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", color:"var(--text-muted-4)", letterSpacing:"0.02em" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          {!jmailWarningAccepted ? (
            <div style={{ background:"var(--a-light)", padding:"0.85rem 1.5rem", borderTop:`1px solid ${A}33`, display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", lineHeight:1.55, color:"var(--text-muted-4)", flex:1, letterSpacing:"0.03em" }}>
                ⚠ This is an external platform. Exercise your own judgment when sharing personal information online. Independent · Private · Community-owned.
              </p>
              <button onClick={() => setJmailWarningAccepted(true)}
                style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--surface)", background:A, border:"none", padding:"0.55rem 1.1rem", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                I Understand →
              </button>
            </div>
          ) : (
            <div style={{ background:"var(--a-light)", padding:"0.85rem 1.5rem", borderTop:`1px solid ${A}33`, display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", lineHeight:1.55, color:"var(--text-muted-4)", flex:1, letterSpacing:"0.03em" }}>
                ⚠ External platform · Independent · Private · Community-owned
              </p>
              <a href="https://jmail.world" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--surface)", background:A, padding:"0.55rem 1.1rem", textDecoration:"none", whiteSpace:"nowrap", flexShrink:0, display:"inline-block" }}>
                Visit jmail.world →
              </a>
            </div>
          )}
        </div>

        {/* ── EPSTEIN EXPOSED NETWORK CARD ── */}
        <div style={{ border:`1px solid ${A}55`, borderTop:`4px solid ${A}`, overflow:"hidden" }}>
          <div style={{ padding:"1.5rem 1.5rem 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"0.75rem", flexWrap:"wrap" }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:900, color:"var(--text)", lineHeight:1.2 }}>Epstein Exposed</h2>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.1em", textTransform:"uppercase", background:A, color:"var(--surface)", padding:"0.15rem 0.45rem", whiteSpace:"nowrap" }}>Network Map</span>
            </div>
            <div style={{ background:A2, border:`1px solid ${A}`, padding:"0.85rem 1rem", marginBottom:"1rem", borderLeft:`3px solid ${GOLD}` }}>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase", color:GOLD, marginBottom:"0.3rem" }}>227 Nodes · 912 Links · Interactive</div>
              <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.78rem", lineHeight:1.65, color:"rgba(240,237,230,0.85)", fontStyle:"italic" }}>141,000+ documents, flight logs, and connections mapped.</p>
            </div>
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.85rem", lineHeight:1.8, color:"var(--text-dark)", marginBottom:"1rem" }}>
              An interactive graph of every known connection in the Epstein network. Click any node to explore who they are. Double-click to see their full network. Filter by category: Academic, Business, Celebrity, Legal, Politician, Royalty, and more.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", marginBottom:"1.25rem" }}>
              {[["🗺","Network Graph","Interactive node map"],["🔗","Connection Paths","Degrees of separation"],["✈","Flight Logs","Who flew with whom"],["📄","141k+ Docs","Search the archive"]].map(([icon,label,desc])=>(
                <div key={label} style={{ padding:"0.6rem 0.75rem", border:`1px solid ${A}33`, background:"var(--a-light)" }}>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", fontWeight:600, color:"var(--text)", marginBottom:"0.15rem" }}>{icon} {label}</div>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", color:"var(--text-muted-4)", letterSpacing:"0.02em" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:"var(--a-light)", padding:"0.85rem 1.5rem", borderTop:`1px solid ${A}33`, display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", lineHeight:1.55, color:"var(--text-muted-4)", flex:1, letterSpacing:"0.03em" }}>
              ⚠ External platform · Public research tool · Data updated Feb 2026
            </p>
            <a href="https://epsteinexposed.com/network" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--surface)", background:A, padding:"0.55rem 1.1rem", textDecoration:"none", whiteSpace:"nowrap", flexShrink:0, display:"inline-block" }}>
              Explore Network →
            </a>
          </div>
        </div>

        <div style={{ border:"1px solid #55555533", borderTop:`4px solid var(--text-muted)`, overflow:"hidden" }}>
          <div style={{ padding:"1.5rem 1.5rem 0" }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-muted)", marginBottom:"0.6rem", fontWeight:600 }}>Primary Source Archive</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:900, color:"var(--text)", marginBottom:"0.75rem", lineHeight:1.2 }}>The Epstein Library</h2>
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.85rem", lineHeight:1.8, color:"var(--text-dark)", marginBottom:"0.85rem" }}>
              The Epstein Library is a public archive of court documents, FOIA releases, and investigative materials related to the Epstein case. It is one of the most comprehensive collections of primary source documents available to the public.
            </p>
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.85rem", lineHeight:1.8, color:"var(--text-dark)", marginBottom:"1.25rem" }}>
              Reading the actual documents — not summaries, not media interpretations — is the most powerful thing a citizen can do. The record speaks for itself. Understand what was done, what was hidden, and what is still being fought over in the courts.
            </p>
          </div>
          {!epsteinWarningAccepted ? (
            <div style={{ padding:"0.85rem 1.5rem", borderTop:"1px solid var(--border-light)", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", lineHeight:1.55, color:"var(--text-muted-4)", flex:1, letterSpacing:"0.03em" }}>
                ⚠ Contains graphic descriptions of abuse &amp; trafficking of minors. For research &amp; accountability purposes. Survivors: your wellbeing comes first.
              </p>
              <button onClick={() => setEpsteinWarningAccepted(true)}
                style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--surface)", background:"var(--text-dark)", border:"none", padding:"0.55rem 1.1rem", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                I Understand →
              </button>
            </div>
          ) : (
            <div style={{ padding:"0.85rem 1.5rem", borderTop:"1px solid var(--border-light)", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", lineHeight:1.55, color:"var(--text-muted-4)", flex:1, letterSpacing:"0.03em" }}>
                ⚠ Graphic content — primary source documents · Public record
              </p>
              <a href="https://www.epsteinlibrary.com" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--surface)", background:"var(--text-dark)", padding:"0.55rem 1.1rem", textDecoration:"none", whiteSpace:"nowrap", flexShrink:0, display:"inline-block" }}>
                Access Archive →
              </a>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop:"3rem", padding:"1.5rem 1.75rem", background:"#1e3a8a", borderLeft:`4px solid ${GOLD}` }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.14em", textTransform:"uppercase", color:GOLD, marginBottom:"0.55rem" }}>Why This Matters</div>
        <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.88rem", lineHeight:1.8, color:"rgba(240,237,230,0.85)", fontStyle:"italic" }}>
          "The most dangerous thing about powerful people doing terrible things is not that they do them — it is that the rest of us don't know. Ignorance is their greatest protection. Your curiosity, your research, and your willingness to share what you learn are the most powerful tools for change that exist."
        </p>
      </div>
    </div>
  );
}

// ─── ARTICLE VIEW ─────────────────────────────────────────────────────────────
function ArticleView({ post, onBack, onNavigate }) {
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollPct(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (post.isTimeline) {
    return (
      <div style={{ animation:"fadeIn 0.3s ease" }}>
        <button onClick={onBack} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", background:"none", border:"none", cursor:"pointer", color:"var(--text-muted-2)", letterSpacing:"0.1em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:"0.4rem", padding:0, marginBottom:"1.5rem" }}
          onMouseEnter={e=>e.currentTarget.style.color=A} onMouseLeave={e=>e.currentTarget.style.color="var(--text-muted-2)"}>← Front Page</button>
        <TimelinePage />
      </div>
    );
  }
  return (
    <div style={{ animation:"fadeIn 0.3s ease", padding:"1.75rem 0 5rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap", gap:"0.5rem" }}>
        <button onClick={onBack} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", background:"none", border:"none", cursor:"pointer", color:"var(--text-muted-2)", letterSpacing:"0.1em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:"0.4rem", padding:0 }}
          onMouseEnter={e=>e.currentTarget.style.color=A} onMouseLeave={e=>e.currentTarget.style.color="var(--text-muted-2)"}>← Front Page</button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: post.title, text: post.excerpt });
            } else {
              navigator.clipboard?.writeText(window.location.href).then(() => {
                const btn = document.querySelector(".share-btn");
                if (btn) { btn.textContent = "✓ Copied"; setTimeout(()=>{ btn.textContent = "Share ↗"; }, 2000); }
              });
            }
          }}
          className="share-btn"
          style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.54rem", letterSpacing:"0.08em", textTransform:"uppercase", background:"transparent", border:`1px solid ${A}`, color:A, padding:"0.25rem 0.65rem", cursor:"pointer" }}
          onMouseEnter={e=>{ e.currentTarget.style.background=A; e.currentTarget.style.color="var(--surface)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=A; }}
        >Share ↗</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr min(260px,27%)", gap:"2.5rem", alignItems:"start" }}>
        <article>
          <div style={{ borderTop:"3px solid var(--text)", paddingTop:"1.1rem", marginBottom:"1.5rem" }}>
            <div style={{ display:"flex", gap:"0.65rem", alignItems:"center", marginBottom:"0.7rem", flexWrap:"wrap" }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", background:A, color:"var(--surface)", padding:"0.18rem 0.5rem" }}>{post.category}</span>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--text-muted-4)" }}>{post.readTime}</span>
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,4vw,2.5rem)", fontWeight:900, color:"var(--text)", lineHeight:1.18, letterSpacing:"-0.02em", marginBottom:"1rem" }}>{post.title}</h1>
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"1rem", fontStyle:"italic", color:"var(--text-muted)", lineHeight:1.65, marginBottom:"1rem", borderLeft:`3px solid ${A}`, paddingLeft:"0.9rem" }}>{post.excerpt}</p>
            <div style={{ display:"flex", gap:"0.75rem", paddingTop:"0.75rem", borderTop:"1px solid var(--border)", flexWrap:"wrap", alignItems:"center" }}>
              {[`By ${post.author}`, post.date, post.readTime].map((item, i) => (
                <span key={i} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", color:"var(--text-muted-3)" }}>{i>0&&<span style={{ marginRight:"0.75rem", color:"var(--border-faint)" }}>|</span>}{item}</span>
              ))}
              <div style={{ marginLeft:"auto", display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
                {post.tags.map(t=>(
                  <button key={t} onClick={()=>{ onBack(); setTimeout(()=>{ /* setActiveTag will be handled by onNavigate pattern */ }, 0); }}
                    style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", padding:"0.15rem 0.4rem", border:`1px solid ${A}55`, background:"var(--a-light)", color:A, cursor:"pointer" }}>#{t}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ maxWidth:"680px" }}>{renderBody(post.body)}</div>
        </article>
        <aside style={{ position:"sticky", top:"20px", borderLeft:"1px solid var(--border)", paddingLeft:"1.5rem" }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.14em", textTransform:"uppercase", color:A, borderBottom:`2px solid ${A}`, paddingBottom:"0.4rem", marginBottom:"1rem" }}>Related Coverage</div>
          {POSTS.filter(p=>p.id!==post.id).slice(0,5).map(p=>(
            <div key={p.id} onClick={()=>onNavigate&&onNavigate(p)} style={{ marginBottom:"1rem", paddingBottom:"1rem", borderBottom:"1px solid var(--border-light)", cursor:"pointer" }}
              onMouseEnter={e=>e.currentTarget.style.background="var(--surface-soft)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.1em", textTransform:"uppercase", color:A, marginBottom:"0.25rem" }}>{p.category}</div>
              <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.82rem", fontWeight:700, color:"var(--text)", lineHeight:1.35 }}
                onMouseEnter={e=>e.currentTarget.style.color=A} onMouseLeave={e=>e.currentTarget.style.color="var(--text)"}>{p.title}</h4>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", color:"var(--text-faint)", marginTop:"0.2rem" }}>{p.readTime}</div>
            </div>
          ))}
          <div style={{ background:"#1e3a8a", padding:"1rem", marginTop:"1rem" }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.54rem", letterSpacing:"0.12em", textTransform:"uppercase", color:GOLD, marginBottom:"0.55rem" }}>A Note on Partisanship</div>
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.7rem", lineHeight:1.7, fontStyle:"italic", color:"rgba(240,237,230,0.75)" }}>This archive does not take a political side. It takes the side of truth, transparency, and equal justice. The names in these files span every party. The demand for accountability belongs to everyone.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}



// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const isYear = target > 1000;
        const start = isYear ? target - 12 : 0;
        const startTime = performance.now();
        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(start + (target - start) * eased));
          if (progress < 1) requestAnimationFrame(animate);
          else setCount(target);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// ─── READING PROGRESS BAR ─────────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(pct);
      setVisible(scrolled > 200);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:"3px", zIndex:9999, background:"rgba(0,0,0,0.08)" }}>
      <div style={{ height:"100%", width:`${progress}%`, background:A, transition:"width 0.1s linear", boxShadow:`0 0 8px ${A}88` }} />
    </div>
  );
}

// ─── FLOATING DARK MODE BUTTON ────────────────────────────────────────────────
function FloatingDarkToggle({ dark, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 180);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!scrolled) return null;
  const btnStyle = (bottom) => ({
    position:"fixed", bottom, right:"1.5rem", zIndex:9000,
    width:42, height:42, borderRadius:"50%",
    border:`2px solid ${GOLD}44`,
    fontSize:"1rem", cursor:"pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
    boxShadow:"0 4px 18px rgba(0,0,0,0.3)",
    transition:"all 0.25s ease",
    animation:"fadeIn 0.3s ease",
  });
  return (
    <>
      {/* Dark mode toggle */}
      <button
        onClick={onToggle}
        title={dark ? "Light mode" : "Dark mode"}
        style={{ ...btnStyle("1.5rem"), background: dark ? A : "#1e3a8a", color: dark ? "#fff" : GOLD }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}
      >
        {dark ? "☀" : "☾"}
      </button>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
        title="Back to top"
        style={{ ...btnStyle("4.5rem"), background:"var(--surface)", color:A }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; e.currentTarget.style.background=A; e.currentTarget.style.color="#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.background="var(--surface)"; e.currentTarget.style.color=A; }}
      >
        ↑
      </button>
    </>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function EpsteinRecord() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setMounted(true), 50); return ()=>clearTimeout(t); }, []);
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem("epstein-record-dark");
      if (stored !== null) return stored === "true";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch { return false; }
  });
  const toggleDark = () => setDark(d => {
    const next = !d;
    try { localStorage.setItem("epstein-record-dark", String(next)); } catch {}
    return next;
  });
  const topRef = useRef(null);
  const scrollTop = () => topRef.current?.scrollIntoView({ behavior:"smooth" });
  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
        scrollTop();
      }
      if (e.key === "Escape") { searchRef.current?.blur(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = POSTS.filter(p => {
    const catOk = activeCategory==="All" || p.category===activeCategory;
    const tagOk = !activeTag || p.tags.includes(activeTag);
    const searchOk = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return catOk && tagOk && searchOk;
  });
  const featured = filtered.filter(p=>p.featured);
  const rest = filtered.filter(p=>!p.featured);
  const today = new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});

  return (
    <>
      <ReadingProgress />
      <FloatingDarkToggle dark={dark} onToggle={toggleDark} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}

        /* ── LIGHT THEME (default) ── */
        :root {
          --bg: #f0ede6;
          --text: #1a1a1a;
          --surface: #ffffff;
          --surface-soft: #fafaf9;
          --surface-tint: #f0f5f8;
          --border-light: #dddddd;
          --border: #cccccc;
          --border-faint: #bbbbbb;
          --border-warm: #e8e4da;
          --border-warm-2: #e8e4dc;
          --text-faint: #aaaaaa;
          --text-muted-5: #999999;
          --text-muted-4: #888888;
          --text-muted-3: #777777;
          --text-muted-2: #666666;
          --text-muted: #555555;
          --text-dark: #444444;
          --text-dark-2: #333333;
          --text-darkest: #222222;
          --divider: #eeeeee;
          --scrollbar-track: #f0ede6;
          --a-light: #eff6ff;
        }

        /* ── DARK THEME ── */
        [data-theme="dark"] {
          --bg: #0a0c10;
          --text: #f0f2f8;
          --surface: #13161f;
          --surface-soft: #1c1f2b;
          --surface-tint: #1a2035;
          --border-light: #353a50;
          --border: #2e3347;
          --border-faint: #252938;
          --border-warm: #353a50;
          --border-warm-2: #353a50;
          --text-faint: #6670a0;
          --text-muted-5: #7880a8;
          --text-muted-4: #8890b8;
          --text-muted-3: #99a0c4;
          --text-muted-2: #adb5d0;
          --text-muted: #bec5d8;
          --text-dark: #cdd3e8;
          --text-dark-2: #dce2f0;
          --text-darkest: #eaeef8;
          --divider: #2e3347;
          --scrollbar-track: #0a0c10;
          --a-light: #0f1a35;
        }

        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:var(--scrollbar-track);}
        ::-webkit-scrollbar-thumb{background:${A};}
        nav::-webkit-scrollbar{display:none;}
        nav{-ms-overflow-style:none;scrollbar-width:none;}
        @media print {
          .dm-toggle, button.share-btn { display:none!important; }
          [data-theme="dark"] { --bg:#fff; --text:#000; --surface:#fff; --surface-soft:#f5f5f5; --border:#ccc; --text-muted:#555; }
          footer { page-break-before: always; }
        }
        @media (max-width: 640px) {
          .story-card h2 { font-size: 1.1rem!important; }
          aside { display: none; }
        }
        ::placeholder{color:var(--text-faint);opacity:1;}
        [data-theme="dark"] input,
        [data-theme="dark"] textarea { color-scheme: dark; }
        /* ── Extra dark mode contrast boosts ── */
        [data-theme="dark"] strong { color: var(--text-darkest); }
        [data-theme="dark"] h1, [data-theme="dark"] h2, [data-theme="dark"] h3 { color: var(--text) !important; }
        [data-theme="dark"] .nav-btn { color: var(--text-dark) !important; }
        [data-theme="dark"] .nav-btn:hover { color: #6ea8ff !important; }
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes dmToggle{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
        .story-card h2,.story-card h3{transition:color 0.15s;}
        .story-card:hover h2,.story-card:hover h3{color:${A}!important;}
        .nav-btn:hover{color:${A}!important;}
        .tag-btn:hover{background:${A}!important;color:#fff!important;border-color:${A}!important;}
        .dm-toggle{transition:background 0.25s,border-color 0.25s,transform 0.15s;}
        .dm-toggle:hover{transform:scale(1.08);}
        .theme-ready * { transition: background-color 0.25s ease, border-color 0.2s ease, color 0.2s ease; }
        .theme-ready button, .theme-ready a, .theme-ready input, .theme-ready textarea { transition: background-color 0.25s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease; }
      `}</style>

      <div ref={topRef} data-theme={dark?"dark":undefined} className={mounted?"theme-ready":""} style={{ minHeight:"100vh", background:"var(--bg)" }}>

        {/* Civic message banner */}
        <div style={{ background:"#1e3a8a", padding:"0.6rem 1.5rem" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
            <div style={{ width:3, height:28, background:GOLD, flexShrink:0 }} />
            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.72rem", lineHeight:1.6, color:"rgba(240,237,230,0.82)", fontStyle:"italic", flex:1 }}>
              <strong style={{ color:GOLD, fontStyle:"normal" }}>This is not a partisan issue.</strong> The names in these files span both parties, every ideology, every class of the powerful. The demand for equal justice, full transparency, and systemic reform belongs to all of us — left, right, and center. <strong style={{ color:"rgba(240,237,230,0.95)", fontStyle:"normal" }}>The people vs. the powerful has no party.</strong>
            </p>
          </div>
        </div>

        {/* Ticker */}
        <div style={{ background:A, padding:"0.3rem 0", overflow:"hidden" }}>
          <div style={{ display:"flex", gap:"0", alignItems:"center" }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.14em", background:GOLD, color:"#1a1a1a", padding:"0.35rem 0.75rem", fontWeight:700, flexShrink:0, zIndex:2, position:"relative" }}>DEVELOPING</span>
            <div style={{ overflow:"hidden", flex:1 }}>
              <div style={{ display:"flex", animation:"tickerScroll 32s linear infinite", whiteSpace:"nowrap" }}>
                {[...["FBI continues rolling disclosure of Epstein investigative files","Maxwell appeal rejected by Second Circuit","New civil suits filed in SDNY · Victims pursue additional accountability","Document releases ongoing through Q1 2026","Fight for transparency continues — demand full disclosure","Epstein network map: 227 nodes, 141,000+ documents now public"],...["FBI continues rolling disclosure of Epstein investigative files","Maxwell appeal rejected by Second Circuit","New civil suits filed in SDNY · Victims pursue additional accountability","Document releases ongoing through Q1 2026","Fight for transparency continues — demand full disclosure","Epstein network map: 227 nodes, 141,000+ documents now public"]].map((item,i)=>(
                  <span key={i} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", color:"rgba(240,237,230,0.85)", letterSpacing:"0.03em", paddingRight:"3.5rem" }}>
                    <span style={{ color:`${GOLD}bb`, marginRight:"0.6rem" }}>◆</span>{item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Masthead */}
        <div style={{ background:"var(--bg)", padding:"1.25rem 1.5rem 0" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:"0.6rem", borderBottom:"1px solid var(--border-faint)", marginBottom:"0.75rem", flexWrap:"wrap", gap:"0.5rem" }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--text-muted-2)" }}>{today}</span>
              <div style={{ position:"relative", flex:"0 1 280px" }}>
                <input ref={searchRef} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                  placeholder="Search the archive… (press / to focus)"
                  style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.62rem", background:"var(--surface)", border:"1px solid var(--border)", borderBottom:`2px solid ${A}`, color:"var(--text)", padding:"0.35rem 2rem 0.35rem 0.65rem", outline:"none", width:"100%", letterSpacing:"0.03em" }} />
                <span style={{ position:"absolute", right:"0.5rem", top:"50%", transform:"translateY(-50%)", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.65rem", color:"var(--text-faint)", pointerEvents:"none" }}>⌕</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--text-muted-2)" }}>Vol. CXLVII · Est. 2019</span>
                <button
                  className="dm-toggle"
                  onClick={toggleDark}
                  title={dark ? "Switch to light mode" : "Switch to dark mode"}
                  style={{
                    display:"flex", alignItems:"center", gap:"0.4rem",
                    fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.54rem",
                    letterSpacing:"0.08em", textTransform:"uppercase",
                    background: dark ? A : "transparent",
                    color: dark ? "var(--surface)" : A,
                    border:`1px solid ${A}`,
                    padding:"0.25rem 0.6rem",
                    cursor:"pointer", flexShrink:0,
                  }}
                >
                  <span style={{ fontSize:"0.85rem", lineHeight:1 }}>{dark ? "☀" : "☾"}</span>
                  <span>{dark ? "Light" : "Dark"}</span>
                </button>
              </div>
            </div>
            <div style={{ textAlign:"center", borderTop:"3px double var(--text)", borderBottom:"3px double var(--text)", padding:"0.9rem 0" }}>
              <button onClick={()=>{setCurrentPost(null);setActiveCategory("All");setActiveTag(null);setSearchQuery("");scrollTop();}} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"block", width:"100%" }}>
                <div style={{ fontFamily:"'UnifrakturMaguntia',Georgia,serif", fontSize:"clamp(2rem,7vw,4.8rem)", lineHeight:1, color:"var(--text)" }}>The Epstein Record</div>
                <div style={{ fontFamily:"'Merriweather',serif", fontSize:"0.7rem", fontStyle:"italic", color:"var(--text-muted)", marginTop:"0.4rem", letterSpacing:"0.06em" }}>
                  For Accountability · For Transparency · For Equal Justice Under Law
                </div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:A, letterSpacing:"0.1em", marginTop:"0.35rem", textTransform:"uppercase" }}>
                  The People vs. The Powerful · Stand Together · Demand the Truth
                </div>
              </button>
            </div>
            <nav style={{ display:"flex", alignItems:"center", borderBottom:"1px solid var(--text-faint)", overflowX:"auto", scrollbarWidth:"none" }}>
              <div style={{ display:"flex", flexWrap:"nowrap", minWidth:"max-content", width:"100%", justifyContent:"center" }}>
                {CATEGORIES.map((c,i)=>{
                  const isDYR = c === "Do Your Research";
                  return (
                    <button key={c} className="nav-btn" onClick={()=>{setActiveCategory(c);setCurrentPost(null);setActiveTag(null);scrollTop();}}
                      style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: isDYR?"0.48rem":"0.62rem", letterSpacing: isDYR?"0.04em":"0.08em", textTransform:"uppercase", background:"none", border:"none", cursor:"pointer", padding: isDYR?"0.35rem 0.7rem":"0.5rem 0.9rem", color:activeCategory===c?A:"var(--text-dark)", fontWeight:activeCategory===c?600:400, borderRight:i<CATEGORIES.length-1?"1px solid var(--border)":"none", borderBottom:activeCategory===c?`2px solid ${A}`:"2px solid transparent", transition:"color 0.15s", lineHeight: isDYR?1.35:1, whiteSpace: isDYR?"normal":"nowrap", maxWidth: isDYR?"72px":"none", textAlign: isDYR?"center":"left", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.1rem" }}>
                      {c === "Community" && (
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", marginBottom:"1px" }}>
                          <rect x="9" y="0" width="2" height="4" fill={activeCategory===c?A:"var(--text-muted-4)"} />
                          <polygon points="0,6 7,1 14,6" fill={activeCategory===c?A:"var(--text-muted-4)"} />
                          <rect x="1" y="6" width="12" height="6" fill={activeCategory===c?A:"var(--text-muted-4)"} opacity="0.7" />
                          <rect x="5.5" y="8.5" width="3" height="3.5" fill={activeCategory===c?"var(--bg)":"var(--border-warm-2)"} />
                        </svg>
                      )}
                      {isDYR ? <>Do Your<br/>Research</> : c}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>

        {/* Main */}
        <main style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 1.5rem" }}>
          {currentPost ? (
            <div key={currentPost.id} style={{animation:"fadeIn 0.3s ease"}}><ArticleView post={currentPost} onBack={()=>{setCurrentPost(null);scrollTop();}} onNavigate={(p)=>{setCurrentPost(p);scrollTop();}} /></div>
          ) : activeCategory === "Community" ? (
            <CommentSection />
          ) : activeCategory === "Do Your Research" ? (
            <ResearchPage />
          ) : activeCategory === "Archive" ? (
            <div style={{ animation:"slideUp 0.35s ease", padding:"1.5rem 0 5rem" }}>
              <div style={{ borderTop:"3px solid var(--text)", paddingTop:"1rem", marginBottom:"1.5rem" }}>
                <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:900, color:"var(--text)" }}>Full Archive</h1>
                <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.8rem", fontStyle:"italic", color:"var(--text-muted-2)", marginTop:"0.35rem" }}>{POSTS.length} reports on record</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1.5rem" }}>
                {POSTS.map(p=>(
                  <div key={p.id} className="story-card" onClick={()=>{setCurrentPost(p);scrollTop();}}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--surface-soft)"}
                    onMouseLeave={e=>e.currentTarget.style.background="var(--surface)"}
                    style={{ border:"1px solid var(--border-light)", borderTop:`3px solid ${A}`, padding:"1.1rem", cursor:"pointer", background:"var(--surface)", transition:"background 0.2s" }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.1em", textTransform:"uppercase", color:A, marginBottom:"0.4rem" }}>{p.category}</div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1rem", fontWeight:700, color:"var(--text)", lineHeight:1.35, marginBottom:"0.5rem" }}>{p.title}</h3>
                    <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.72rem", lineHeight:1.65, color:"var(--text-muted-2)" }}>{p.excerpt.slice(0,120)}…</p>
                    <div style={{ marginTop:"0.65rem", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", color:"var(--text-faint)" }}>{p.date} · {p.readTime}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // ── FIX: wrap front page content in a fragment ──
            <>
              {/* Call to action banner */}
              <div style={{ background:"#1e3a8a", padding:"1.5rem 1.75rem", marginBottom:"2rem", borderLeft:`4px solid ${GOLD}`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, right:0, width:"3px", height:"100%", background:`${GOLD}44` }} />
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.25rem", fontWeight:900, fontStyle:"italic", color:"var(--bg)", marginBottom:"0.6rem", lineHeight:1.4 }}>
                  "When ordinary people come together — neighbors, survivors, journalists, citizens of every background — no wall of power, money, or secrecy can stand forever."
                </div>
                <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.75rem", lineHeight:1.75, color:"rgba(240,237,230,0.78)" }}>
                  This archive was built by the persistence of survivors who refused to be erased, reporters who refused to be bought, and communities who refused to forget. The fight for a world where the law applies equally to every human being — rich or poor, powerful or ordinary — belongs to all of us. <strong style={{ color:GOLD }}>Share this. Talk about it. Demand change together.</strong>
                </p>
              </div>

              {(activeTag||searchQuery||activeCategory!=="All") && (
                <div style={{ background:`${A_LIGHT}`, border:`1px solid ${A}44`, borderLeft:`4px solid ${A}`, padding:"0.6rem 1rem", marginBottom:"1.25rem", display:"flex", gap:"0.75rem", alignItems:"center", flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--text-muted-2)" }}>FILTERED:</span>
                  {activeCategory!=="All" && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", background:A, color:"var(--surface)", padding:"0.12rem 0.45rem" }}>{activeCategory}</span>}
                  {activeTag && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", background:"#1e3a8a", color:"var(--bg)", padding:"0.12rem 0.45rem" }}>#{activeTag}</span>}
                  {searchQuery && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", color:"var(--text-muted)" }}>"{searchQuery}"</span>}
                  <button onClick={()=>{setActiveCategory("All");setActiveTag(null);setSearchQuery("");}} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", background:"none", border:"none", cursor:"pointer", color:A, marginLeft:"auto", textDecoration:"underline" }}>clear</button>
                </div>
              )}

              {filtered.length===0 && <div style={{ padding:"4rem", textAlign:"center" }}><p style={{ fontFamily:"'Merriweather',serif", fontStyle:"italic", color:"var(--text-muted-5)" }}>No articles match your search.</p></div>}

              <div style={{ display:"grid", gridTemplateColumns:"1fr min(272px,28%)", gap:"2.5rem" }}>
                <div>
                  {featured.length > 0 && (
                    <section style={{ marginBottom:"2.5rem" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"3px solid var(--text)", borderBottom:"1px solid var(--text)", padding:"0.35rem 0", marginBottom:"1.5rem" }}>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.14em", textTransform:"uppercase", color:A, fontWeight:600 }}>Top Stories</span>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", color:"var(--text-muted-5)" }}>{today}</span>
                      </div>
                      <div className="story-card" onClick={()=>setCurrentPost(featured[0])}
                        onMouseEnter={e=>e.currentTarget.style.background="var(--surface-soft)"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                        style={{ cursor:"pointer", marginBottom:"1.75rem", paddingBottom:"1.75rem", borderBottom:"2px solid var(--text)", padding:"0.85rem", margin:"-0.85rem -0.85rem 1.75rem", transition:"background 0.2s" }}>
                        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center", marginBottom:"0.6rem" }}>
                          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase", background:A, color:"var(--surface)", padding:"0.15rem 0.45rem" }}>{featured[0].category}</span>
                          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", color:"var(--text-muted-5)" }}>{featured[0].readTime}</span>
                        </div>
                        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,3.8vw,2.5rem)", fontWeight:900, color:"var(--text)", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:"0.8rem" }}>{featured[0].title}</h2>
                        <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.9rem", lineHeight:1.75, color:"var(--text-dark)", marginBottom:"0.75rem", maxWidth:"580px" }}>{featured[0].excerpt}</p>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--text-muted-4)" }}>By {featured[0].author} · {featured[0].date}</span>
                      </div>
                      {featured[1] && (
                        <div className="story-card" onClick={()=>setCurrentPost(featured[1])}
                          onMouseEnter={e=>e.currentTarget.style.background="var(--surface-soft)"}
                          onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                          style={{ cursor:"pointer", paddingLeft:"1rem", borderLeft:`3px solid ${A}`, marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom:"1px solid var(--border-light)", transition:"background 0.2s" }}>
                          <div style={{ display:"flex", gap:"0.6rem", alignItems:"center", marginBottom:"0.5rem" }}>
                            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase", background:"#1e3a8a", color:"var(--bg)", padding:"0.14rem 0.45rem" }}>{featured[1].category}</span>
                          </div>
                          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.1rem,2.5vw,1.65rem)", fontWeight:700, color:"var(--text)", lineHeight:1.25, marginBottom:"0.55rem" }}>{featured[1].title}</h2>
                          <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.83rem", lineHeight:1.72, color:"var(--text-muted)", marginBottom:"0.55rem" }}>{featured[1].excerpt}</p>
                          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:"var(--text-muted-4)" }}>By {featured[1].author} · {featured[1].date}</span>
                        </div>
                      )}
                    </section>
                  )}
                  {rest.length > 0 && (
                    <section>
                      <div style={{ borderTop:"3px solid var(--text)", borderBottom:"1px solid var(--text)", padding:"0.35rem 0", marginBottom:"1.25rem" }}>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-muted)" }}>Archive</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem 2rem" }}>
                        {rest.map(p=>(
                          <div key={p.id} className="story-card" onClick={()=>setCurrentPost(p)}
                            onMouseEnter={e=>e.currentTarget.style.background="var(--surface-soft)"}
                            onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                            style={{ cursor:"pointer", paddingBottom:"1.25rem", borderBottom:"1px solid var(--border-light)", padding:"0.6rem", margin:"-0.6rem -0.6rem 0.65rem", transition:"background 0.2s" }}>
                            <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", marginBottom:"0.45rem" }}>
                              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.1em", textTransform:"uppercase", color:A, fontWeight:600 }}>{p.category}</span>
                              <span style={{ color:"var(--border)" }}>·</span>
                              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", color:"var(--text-faint)" }}>{p.readTime}</span>
                            </div>
                            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.97rem", fontWeight:700, color:"var(--text)", lineHeight:1.35, marginBottom:"0.45rem" }}>{p.title}</h3>
                            <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.76rem", lineHeight:1.65, color:"var(--text-muted)", marginBottom:"0.55rem" }}>{p.excerpt.length>110?p.excerpt.slice(0,110)+"…":p.excerpt}</p>
                            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", color:"var(--text-faint)" }}>{p.author} · {p.date}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Sidebar */}
                <aside>
                  <div style={{ background:"#1e3a8a", padding:"1.1rem", marginBottom:"1.75rem", borderLeft:`3px solid ${GOLD}` }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.12em", textTransform:"uppercase", color:GOLD, marginBottom:"0.55rem" }}>Why This Matters</div>
                    <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.72rem", lineHeight:1.72, color:"rgba(240,237,230,0.78)", fontStyle:"italic" }}>This case is not about Democrats or Republicans. It is about whether the law applies equally to the powerful and the ordinary. The answer, so far, is incomplete. That is everyone's problem.</p>
                  </div>

                  <div style={{ borderTop:`3px solid ${A}`, marginBottom:"1.75rem" }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.14em", textTransform:"uppercase", color:A, padding:"0.45rem 0", borderBottom:"1px solid var(--border-light)", marginBottom:"0.6rem" }}>Section Index</div>
                    {CATEGORIES.slice(1).map(c=>{
                      const count = POSTS.filter(p=>p.category===c).length;
                      return (
                        <div key={c} onClick={()=>{setActiveCategory(c);setActiveTag(null);scrollTop();}} style={{ display:"flex", justifyContent:"space-between", padding:"0.4rem 0", borderBottom:"1px dotted var(--border-light)", cursor:"pointer" }}>
                          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.65rem", color:activeCategory===c?A:"var(--text-dark-2)", fontWeight:activeCategory===c?600:400 }}
                            onMouseEnter={e=>e.currentTarget.style.color=A} onMouseLeave={e=>e.currentTarget.style.color=activeCategory===c?A:"var(--text-dark-2)"}>{c}</span>
                          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", color:"var(--border-faint)" }}>{count}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ borderTop:"3px solid var(--text)", marginBottom:"1.75rem" }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-muted)", padding:"0.45rem 0", borderBottom:"1px solid var(--border-light)", marginBottom:"0.7rem" }}>Tags</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
                      {TAGS_LIST.map(t=>(
                        <button key={t} className="tag-btn" onClick={()=>setActiveTag(t===activeTag?null:t)}
                          style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", padding:"0.2rem 0.55rem", border:`1px solid ${activeTag===t?A:"var(--border)"}`, background:activeTag===t?A:"transparent", color:activeTag===t?"var(--surface)":"var(--text-muted-2)", cursor:"pointer", transition:"all 0.15s" }}>#{t}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ border:"1px solid var(--border)", marginBottom:"1.75rem" }}>
                    <div style={{ background:"#1e3a8a", padding:"0.5rem 0.85rem" }}>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.14em", textTransform:"uppercase", color:GOLD }}>Archive at a Glance</span>
                    </div>
                    <div style={{ padding:"0.85rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
                      {[[7,"Reports"],[37,"Timeline Events"],[20,"Named Individuals"],[2019,"Est."]].map(([n,l])=>(
                        <div key={l} style={{ textAlign:"center", padding:"0.5rem 0", borderBottom:"1px solid var(--divider)" }}>
                          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.6rem", fontWeight:900, color:A, lineHeight:1 }}><AnimatedCounter target={n} /></div>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--text-muted-5)", marginTop:"0.25rem" }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background:"#1e3a8a", padding:"1.1rem" }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.12em", textTransform:"uppercase", color:GOLD, marginBottom:"0.65rem", borderBottom:`1px solid ${A}44`, paddingBottom:"0.5rem" }}>Editorial Notice</div>
                    <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.7rem", lineHeight:1.72, fontStyle:"italic", color:"rgba(240,237,230,0.7)" }}>All reporting is drawn from public court records, official document releases, and established investigative journalism. Appearance in these files does not constitute an allegation of wrongdoing. All individuals are presumed innocent unless convicted.</p>
                  </div>
                </aside>
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <footer style={{ background:"#1e3a8a", color:"var(--bg)", padding:"2rem 1.5rem", borderTop:`3px double ${A}` }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", padding:"1rem 0 1.5rem", borderBottom:`1px solid ${A}44`, marginBottom:"1.5rem" }}>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.05rem", fontStyle:"italic", color:"rgba(240,237,230,0.85)", maxWidth:"660px", margin:"0 auto", lineHeight:1.75 }}>
                "Communities that watch out for each other — that speak up, show up, and refuse to look away — are the only force that has ever made the powerful accountable. We are stronger together than any institution."
              </p>
              <div style={{ marginTop:"0.85rem", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", color:GOLD, letterSpacing:"0.1em" }}>UNITE · INFORM · DEMAND CHANGE</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"2rem", marginBottom:"1.5rem" }}>
              <div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.14em", textTransform:"uppercase", color:GOLD, marginBottom:"0.7rem" }}>About This Archive</div>
                <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.7rem", lineHeight:1.72, color:"rgba(240,237,230,0.6)", fontStyle:"italic" }}>This archive documents the Epstein investigation using public records and established reporting. It is a non-partisan journalistic resource dedicated to transparency and equal justice. All individuals are presumed innocent unless convicted.</p>
              </div>
              <div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.14em", textTransform:"uppercase", color:GOLD, marginBottom:"0.7rem" }}>Primary Sources</div>
                {["SDNY Court Filings","FBI FOIA Releases","Miami Herald / Julie K. Brown","USVI Civil Litigation","Maxwell Trial Transcript"].map(s=>(
                  <div key={s} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", color:"rgba(240,237,230,0.45)", marginBottom:"0.3rem" }}>— {s}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.14em", textTransform:"uppercase", color:GOLD, marginBottom:"0.7rem" }}>Legal Notice</div>
                <p style={{ fontFamily:"'Merriweather',serif", fontSize:"0.7rem", lineHeight:1.72, color:"rgba(240,237,230,0.6)", fontStyle:"italic" }}>Mention of any individual in these documents does not constitute an allegation of wrongdoing. Readers should consult primary sources and seek legal context before drawing conclusions.</p>
              </div>
            </div>
            <div style={{ borderTop:`1px solid ${A}33`, paddingTop:"1rem", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem" }}>
              <span style={{ fontFamily:"'UnifrakturMaguntia',Georgia,serif", fontSize:"1.1rem", color:"rgba(240,237,230,0.4)" }}>The Epstein Record</span>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.55rem", color:"rgba(240,237,230,0.25)" }}>Non-Partisan · Public Record · {today}</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
