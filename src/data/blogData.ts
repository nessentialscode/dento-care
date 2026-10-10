export interface ClinicalImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  isFeatured?: boolean;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  categoryEn: string;
  readTime: string;
  author: {
    name: string;
    degrees: string;
    designation: string;
    institution: string;
  };
  summary: string;
  paragraphs: {
    text: string;
    highlight?: boolean;
    quote?: boolean;
  }[];
  keyTakeaways: string[];
  disclaimer: string;
  images: ClinicalImage[];
}

export const PUBLISHED_ARTICLE: BlogArticle = {
  slug: 'sharp-teeth-oral-cancer-awareness',
  title: '“മൂർച്ചയേറിയ പല്ലുകൾ നിസ്സാരമാക്കരുത്”',
  category: 'ക്ലിനിക്കൽ ബോധവൽക്കരണം',
  categoryEn: 'Clinical Oral Medicine & Awareness',
  readTime: '3 min read',
  author: {
    name: 'Dr. Abdulla Mufeed',
    degrees: 'MDS',
    designation: 'Associate Professor in Oral Medicine & Radiology',
    institution: 'MES Dental College, Perinthalmanna',
  },
  summary: 'വായിലെ മൂർച്ചയുള്ളതും പൊട്ടിയതുമായ പല്ലുകൾ മൂലം മൃദുകലകളിൽ നിരന്തരം ഉണ്ടാകുന്ന അസ്വസ്ഥതയും (chronic irritation), ഇതുമൂലം ഉണ്ടാകാവുന്ന സങ്കീർണ്ണതകളെക്കുറിച്ചും ഓർമ്മപ്പെടുത്തുന്ന ക്ലിനിക്കൽ അനുഭവക്കുറിപ്പ്.',
  paragraphs: [
    {
      text: 'കുറച്ചു മാസങ്ങൾക്കു മുമ്പ് പ്രായമായ അച്ഛനെയും കൂട്ടി OP-യിൽ വന്ന 36 കാരനായ അവിവാഹിതനായ ഒരു ചെറുപ്പക്കാരൻ... നാവിന്റെ ഇടത് വശത്തായി ഒരു മുറിവാണ് പ്രശ്നം.',
    },
    {
      text: 'ആഴ്ചകൾക്കു മുമ്പ് എടുത്തുകളഞ്ഞ താഴത്തെ വരിയിലെ പൊട്ടിയ, മൂർച്ചയുള്ള പല്ലായിരുന്നു കാരണം. പല്ലെടുത്ത് ഒഴിവാക്കിയെങ്കിലും “മുറിവ്” മാറിപ്പോയില്ല!',
    },
    {
      text: 'പ്രാഥമിക പരിശോധനയിൽ സംഗതി അൽപം ഗൗരവമുള്ളതായിരുന്നു — CA tongue (നാവിലെ അർബുദം).',
      highlight: true,
    },
    {
      text: 'പാലിയേറ്റീവ് കെയറിലെ കോഴ്സിൽ “Breaking Bad News” ക്ലാസെടുത്ത Shaji സാറിനെ മനസ്സിൽ ഓർത്തു... കാര്യം അച്ഛനേയും മകനേയും സാവകാശം പറഞ്ഞ് ബോധ്യപ്പെടുത്തി, biopsy ചെയ്ത് ഉറപ്പുവരുത്തി... ആൾ ഇപ്പോൾ RCC-യിൽ ചികിത്സ തേടുന്നു.',
    },
    {
      text: 'പുകയിലയും പുകവലിയും മുറുക്കാനും വായിലെ കാൻസറിനു പ്രധാന കാരണങ്ങളാണെന്ന് പ്രത്യേകം പറയേണ്ടതില്ലല്ലോ... പക്ഷേ ജീവിതത്തിൽ ഒരിക്കൽ പോലും പുകയില ഉപയോഗിച്ചിട്ടില്ലാത്ത (as told by many of them) ഇതുപോലുള്ള വ്യക്തികളിൽ Oral Cancer കണ്ടുവരുന്നത് ഇപ്പോൾ അപൂർവമല്ല.',
    },
    {
      text: 'കഴിഞ്ഞ 1–2 വർഷത്തിനുള്ളിൽ സമാനമായ അഞ്ചോളം കേസുകൾ... മൂർച്ചയുള്ള പൊട്ടിയ പല്ല് കൂടാതെ വേറെ അറിയപ്പെട്ട കാരണങ്ങൾ ഒന്നും ഇല്ല.',
    },
    {
      text: 'മൂർച്ചയുള്ള വസ്തുക്കൾ മുഖേന നിരന്തരം ഉണ്ടാകുന്ന അസ്വസ്ഥത (chronic irritation) വായിലെ മൃദുകലകളുടെ (oral mucosa) അടിസ്ഥാന ഘടനയിൽ രൂപ-ഭാവ മാറ്റങ്ങൾ ഉണ്ടാക്കുമെന്നും കാൻസറിനു കാരണമാകാമെന്നും കാലങ്ങളോളമായി അറിവുള്ളതാണ്. പക്ഷേ ഭൂരിഭാഗം ജനങ്ങളും നല്ലൊരു ശതമാനം ഡോക്ടർമാരും ഇതിനെ അവഗണിക്കുന്നു, അല്ലെങ്കിൽ വേണ്ടത്ര ബോധവാന്മാരല്ല!!',
    },
    {
      text: 'എന്തിനധികം, ഈ വിഷയത്തിൽ കൃത്യമായ പഠനങ്ങളും ഗവേഷണങ്ങളും പോലും വിരളം!!',
    },
    {
      text: 'തിരിച്ചറിയുക... മൂർച്ചയേറിയ പല്ലുകൾ നിസ്സാരമാക്കരുത്...',
      highlight: true,
    },
    {
      text: '“A lot of oral cancers are preventable.”',
      quote: true,
    },
  ],
  keyTakeaways: [
    'പൊട്ടിയതോ മൂർച്ചയുള്ളതോ ആയ പല്ലുകൾ നാക്കിലോ കവിളിലോ നിരന്തരം ഉരസുന്നത് നിസ്സാരമായി കാണരുത്.',
    'പല്ല് നീക്കം ചെയ്ത ശേഷവും രണ്ടാഴ്ചയിലധികം ഉണങ്ങാത്ത വായ്പുണ്ണുകളോ മുറിവുകളോ ഉണ്ടെങ്കിൽ വിദഗ്ദ്ധ പരിശോധന തേടുക.',
    'പുകയില ശീലങ്ങൾ ഇല്ലാത്തവരിലും ക്രമാനുഗതമായ പരിശോധന അർബുദ സാധ്യതകളെ മുൻകൂട്ടി തിരിച്ചറിയാൻ സഹായിക്കും.',
  ],
  disclaimer: 'This article is provided for general educational purposes and does not replace professional medical evaluation or advice.',
  images: [
    {
      id: 'image-1',
      src: '/images/blog/sharp-teeth-tongue-lesion-main.png',
      alt: 'Clinical photograph showing a raised exophytic lesion on the lateral border of the tongue',
      caption: 'Clinical presentation: Raised exophytic mucosal lesion observed along the lateral border of the tongue',
      isFeatured: true,
    },
    {
      id: 'image-2',
      src: '/images/blog/posterior-teeth-intraoral-lesion.png',
      alt: 'Clinical intraoral view displaying tissue irritation and ulceration adjacent to fractured posterior mandibular teeth',
      caption: 'Intraoral view: Chronic mucosal irritation and tissue alterations adjacent to fractured posterior mandibular dentition',
    },
    {
      id: 'image-3',
      src: '/images/blog/intraoral-examination-lingual-view.png',
      alt: 'Clinical examination view of the oral cavity and lingual mucosa adjacent to posterior dentition',
      caption: 'Intraoral clinical inspection: Lingual mucosal area and dental alignment in the lower arch',
    },
    {
      id: 'image-4',
      src: '/images/blog/tongue-lateral-examination.png',
      alt: 'Clinical view showing mucosal changes along the lateral border of the tongue',
      caption: 'Clinical inspection: Surface mucosal changes and lateral border evaluation',
    },
  ],
};

// ONLY this single published article is exposed — no placeholders or fake articles.
export const BLOG_ARTICLES: BlogArticle[] = [PUBLISHED_ARTICLE];
