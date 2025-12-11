// Translation system for OptimizeAI
const translations = {
  en: {
    // Navigation
    login: "Login",
    // Tool page
    teacherProfile: "Teacher Profile",
    selectTeacher: "Select a teacher that matches your teacher's marking style...",
    assignmentInstructions: "Assignment Instructions / Rubric",
    yourDraft: "Your Draft",
    uploadPhoto: "Upload Photo",
    pasteDraft: "Paste your assignment draft here... Or upload a photo of your artwork/project above.",
    instructionsPlaceholder: "Paste the question, rubric, or assignment instructions here... Or upload a photo of the rubric/instructions above.",
    analyzeAssignment: "Analyze Assignment",
    resultsPlaceholder: "Your results will appear here...",
    explainResults: "Explain Results",
    gradeLabel: "Grade",
    analysis: "Analysis",
    refineAnalysis: "Refine Analysis",
    feedbackPlaceholder: "Example: Focus more on structure, add more specific examples, emphasize clarity issues...",
    rewriteStrength: "Rewrite strength",
    generateRewrite: "Generate Rewrite",
    light: "Light",
    balanced: "Balanced",
    max: "Max",
    sliderHelp: "Light = gentle polish, Balanced = clear re-write, Max = full makeover.",
    outputFormat: "Output Format",
    essayFormat: "Essay Format",
    paragraphFormat: "Paragraph Format",
    bulletPoints: "Bullet Points",
    other: "Other",
    describeFormat: "Describe the format you want",
    formatExample: "Example: numbered list, outline format, dialogue format, etc.",
    // Profile dropdown
    accountDetails: "Account details",
    contactUs: "Contact us",
    logOut: "Log out",
    // Teachers
    msFrank: "Ms. Frank",
    msFrankDesc: "Loves artistic projects, is an easy marker",
    mrChen: "Mr. Chen",
    mrChenDesc: "Very strict marker and rarely gives high grades",
    msPatel: "Ms. Patel",
    msPatelDesc: "Focuses on creativity and originality, values effort",
    mrThompson: "Mr. Thompson",
    mrThompsonDesc: "Emphasizes structure and clarity, deducts for grammar errors",
    msRodriguez: "Ms. Rodriguez",
    msRodriguezDesc: "Values evidence and citations, strict about sources",
    mrKim: "Mr. Kim",
    mrKimDesc: "Likes detailed explanations, wants thorough analysis",
    msWilliams: "Ms. Williams",
    msWilliamsDesc: "Appreciates personal voice and unique perspectives",
    mrDavis: "Mr. Davis",
    mrDavisDesc: "Strict about deadlines, values organization and presentation",
    other: "Other",
    customTeacherName: "Teacher Name",
    customTeacherDesc: "Describe your teacher's marking style...",
    additionalNotes: "Additional Notes (Optional)",
    notesPlaceholder: "Any extra information about your teacher's preferences...",
    // Loading messages
    gradingWork: "is grading your work",
    rewritingBetter: "Rewriting a better version",
    thinking: "Thinking"
  },
  fr: {
    // Navigation
    login: "Connexion",
    // Tool page
    teacherProfile: "Profil de l'enseignant",
    selectTeacher: "Sélectionnez un enseignant qui correspond au style de notation de votre enseignant...",
    assignmentInstructions: "Instructions du devoir / Grille d'évaluation",
    yourDraft: "Votre brouillon",
    uploadPhoto: "Télécharger une photo",
    pasteDraft: "Collez votre brouillon de devoir ici... Ou téléchargez une photo de votre œuvre/projet ci-dessus.",
    instructionsPlaceholder: "Collez la question, la grille d'évaluation ou les instructions du devoir ici... Ou téléchargez une photo de la grille/instructions ci-dessus.",
    analyzeAssignment: "Analyser le devoir",
    gradeLabel: "Note",
    analysis: "Analyse",
    refineAnalysis: "Affiner l'analyse",
    feedbackPlaceholder: "Exemple : Concentrez-vous davantage sur la structure, ajoutez des exemples plus spécifiques, mettez l'accent sur les problèmes de clarté...",
    resultsPlaceholder: "Vos résultats apparaîtront ici...",
    explainResults: "Expliquer les résultats",
    rewriteStrength: "Intensité de réécriture",
    generateRewrite: "Générer une réécriture",
    light: "Léger",
    balanced: "Équilibré",
    max: "Maximum",
    sliderHelp: "Léger = polissage doux, Équilibré = réécriture claire, Maximum = refonte complète.",
    outputFormat: "Format de sortie",
    essayFormat: "Format essai",
    paragraphFormat: "Format paragraphe",
    bulletPoints: "Puces",
    other: "Autre",
    describeFormat: "Décrivez le format souhaité",
    formatExample: "Exemple : liste numérotée, format plan, format dialogue, etc.",
    // Profile dropdown
    accountDetails: "Détails du compte",
    contactUs: "Nous contacter",
    logOut: "Déconnexion",
    // Teachers
    msFrank: "Mme Frank",
    msFrankDesc: "Aime les projets artistiques, note facilement",
    mrChen: "M. Chen",
    mrChenDesc: "Très strict et donne rarement de bonnes notes",
    msPatel: "Mme Patel",
    msPatelDesc: "Se concentre sur la créativité et l'originalité, valorise l'effort",
    mrThompson: "M. Thompson",
    mrThompsonDesc: "Insiste sur la structure et la clarté, déduit pour les erreurs de grammaire",
    msRodriguez: "Mme Rodriguez",
    msRodriguezDesc: "Valorise les preuves et les citations, strict sur les sources",
    mrKim: "M. Kim",
    mrKimDesc: "Aime les explications détaillées, veut une analyse approfondie",
    msWilliams: "Mme Williams",
    msWilliamsDesc: "Apprécie la voix personnelle et les perspectives uniques",
    mrDavis: "M. Davis",
    mrDavisDesc: "Strict sur les délais, valorise l'organisation et la présentation",
    other: "Autre",
    customTeacherName: "Nom de l'enseignant",
    customTeacherDesc: "Décrivez le style de notation de votre enseignant...",
    additionalNotes: "Notes supplémentaires (optionnel)",
    notesPlaceholder: "Toute information supplémentaire sur les préférences de votre enseignant...",
    // Loading messages
    gradingWork: "évalue votre travail",
    rewritingBetter: "Réécriture d'une meilleure version",
    thinking: "Réflexion"
  },
  es: {
    // Navigation
    login: "Iniciar sesión",
    // Tool page
    teacherProfile: "Perfil del profesor",
    selectTeacher: "Selecciona un profesor que coincida con el estilo de calificación de tu profesor...",
    assignmentInstructions: "Instrucciones de la tarea / Rúbrica",
    yourDraft: "Tu borrador",
    uploadPhoto: "Subir foto",
    pasteDraft: "Pega tu borrador de tarea aquí... O sube una foto de tu obra/proyecto arriba.",
    instructionsPlaceholder: "Pega la pregunta, rúbrica o instrucciones de la tarea aquí... O sube una foto de la rúbrica/instrucciones arriba.",
    analyzeAssignment: "Analizar tarea",
    resultsPlaceholder: "Tus resultados aparecerán aquí...",
    explainResults: "Explicar resultados",
    gradeLabel: "Calificación",
    analysis: "Análisis",
    refineAnalysis: "Refinar análisis",
    feedbackPlaceholder: "Ejemplo: Enfócate más en la estructura, agrega ejemplos más específicos, enfatiza problemas de claridad...",
    rewriteStrength: "Intensidad de reescritura",
    generateRewrite: "Generar reescritura",
    light: "Ligero",
    balanced: "Equilibrado",
    max: "Máximo",
    sliderHelp: "Ligero = pulido suave, Equilibrado = reescritura clara, Máximo = transformación completa.",
    outputFormat: "Formato de salida",
    essayFormat: "Formato ensayo",
    paragraphFormat: "Formato párrafo",
    bulletPoints: "Viñetas",
    other: "Otro",
    describeFormat: "Describe el formato que deseas",
    formatExample: "Ejemplo: lista numerada, formato esquema, formato diálogo, etc.",
    // Profile dropdown
    accountDetails: "Detalles de la cuenta",
    contactUs: "Contáctanos",
    logOut: "Cerrar sesión",
    // Teachers
    msFrank: "Sra. Frank",
    msFrankDesc: "Le encantan los proyectos artísticos, es una calificadora fácil",
    mrChen: "Sr. Chen",
    mrChenDesc: "Calificador muy estricto y rara vez da calificaciones altas",
    msPatel: "Sra. Patel",
    msPatelDesc: "Se enfoca en la creatividad y originalidad, valora el esfuerzo",
    mrThompson: "Sr. Thompson",
    mrThompsonDesc: "Enfatiza la estructura y claridad, deduce por errores gramaticales",
    msRodriguez: "Sra. Rodriguez",
    msRodriguezDesc: "Valora la evidencia y citas, estricta con las fuentes",
    mrKim: "Sr. Kim",
    mrKimDesc: "Le gustan las explicaciones detalladas, quiere análisis exhaustivo",
    msWilliams: "Sra. Williams",
    msWilliamsDesc: "Aprecia la voz personal y perspectivas únicas",
    mrDavis: "Sr. Davis",
    mrDavisDesc: "Estricto con los plazos, valora la organización y presentación",
    other: "Otro",
    customTeacherName: "Nombre del profesor",
    customTeacherDesc: "Describe el estilo de calificación de tu profesor...",
    additionalNotes: "Notas adicionales (opcional)",
    notesPlaceholder: "Cualquier información adicional sobre las preferencias de tu profesor...",
    // Loading messages
    gradingWork: "está calificando tu trabajo",
    rewritingBetter: "Reescribiendo una mejor versión",
    thinking: "Pensando"
  },
  de: {
    // Navigation
    login: "Anmelden",
    // Tool page
    teacherProfile: "Lehrerprofil",
    selectTeacher: "Wählen Sie einen Lehrer aus, der dem Bewertungsstil Ihres Lehrers entspricht...",
    assignmentInstructions: "Aufgabenanweisungen / Bewertungsraster",
    yourDraft: "Ihr Entwurf",
    uploadPhoto: "Foto hochladen",
    pasteDraft: "Fügen Sie hier Ihren Aufgabenentwurf ein... Oder laden Sie oben ein Foto Ihrer Arbeit/Projekts hoch.",
    instructionsPlaceholder: "Fügen Sie hier die Frage, das Bewertungsraster oder die Aufgabenanweisungen ein... Oder laden Sie oben ein Foto des Bewertungsrasters/der Anweisungen hoch.",
    analyzeAssignment: "Aufgabe analysieren",
    gradeLabel: "Note",
    analysis: "Analyse",
    refineAnalysis: "Analyse verfeinern",
    feedbackPlaceholder: "Beispiel: Konzentrieren Sie sich mehr auf die Struktur, fügen Sie spezifischere Beispiele hinzu, betonen Sie Klarheitsprobleme...",
    resultsPlaceholder: "Ihre Ergebnisse erscheinen hier...",
    explainResults: "Ergebnisse erklären",
    rewriteStrength: "Umschreibungsstärke",
    generateRewrite: "Umschreibung generieren",
    light: "Leicht",
    balanced: "Ausgewogen",
    max: "Maximal",
    sliderHelp: "Leicht = sanfte Überarbeitung, Ausgewogen = klare Umschreibung, Maximal = komplette Überarbeitung.",
    outputFormat: "Ausgabeformat",
    essayFormat: "Aufsatzformat",
    paragraphFormat: "Absatzformat",
    bulletPoints: "Aufzählungspunkte",
    other: "Andere",
    describeFormat: "Beschreiben Sie das gewünschte Format",
    formatExample: "Beispiel: nummerierte Liste, Gliederungsformat, Dialogformat, etc.",
    // Profile dropdown
    accountDetails: "Kontodaten",
    contactUs: "Kontaktieren Sie uns",
    logOut: "Abmelden",
    // Teachers
    msFrank: "Frau Frank",
    msFrankDesc: "Liebt künstlerische Projekte, ist ein nachsichtiger Bewerter",
    mrChen: "Herr Chen",
    mrChenDesc: "Sehr strenger Bewerter und gibt selten gute Noten",
    msPatel: "Frau Patel",
    msPatelDesc: "Konzentriert sich auf Kreativität und Originalität, schätzt Anstrengung",
    mrThompson: "Herr Thompson",
    mrThompsonDesc: "Betonung von Struktur und Klarheit, Abzug für Grammatikfehler",
    msRodriguez: "Frau Rodriguez",
    msRodriguezDesc: "Schätzt Beweise und Zitate, streng bei Quellen",
    mrKim: "Herr Kim",
    mrKimDesc: "Mag detaillierte Erklärungen, möchte gründliche Analyse",
    msWilliams: "Frau Williams",
    msWilliamsDesc: "Schätzt persönliche Stimme und einzigartige Perspektiven",
    mrDavis: "Herr Davis",
    mrDavisDesc: "Streng bei Fristen, schätzt Organisation und Präsentation",
    other: "Andere",
    customTeacherName: "Lehrername",
    customTeacherDesc: "Beschreiben Sie den Bewertungsstil Ihres Lehrers...",
    additionalNotes: "Zusätzliche Notizen (optional)",
    notesPlaceholder: "Zusätzliche Informationen über die Präferenzen Ihres Lehrers...",
    // Loading messages
    gradingWork: "bewertet Ihre Arbeit",
    rewritingBetter: "Bessere Version wird umgeschrieben",
    thinking: "Denken"
  },
  zh: {
    // Navigation
    login: "登录",
    // Tool page
    teacherProfile: "教师档案",
    selectTeacher: "选择与您教师的评分风格相匹配的教师...",
    assignmentInstructions: "作业说明 / 评分标准",
    yourDraft: "您的草稿",
    uploadPhoto: "上传照片",
    pasteDraft: "在此粘贴您的作业草稿... 或在上方上传您的作品/项目照片。",
    instructionsPlaceholder: "在此粘贴问题、评分标准或作业说明... 或在上方上传评分标准/说明的照片。",
    analyzeAssignment: "分析作业",
    resultsPlaceholder: "您的结果将显示在这里...",
    gradeLabel: "成绩",
    analysis: "分析",
    refineAnalysis: "完善分析",
    feedbackPlaceholder: "例如：更关注结构，添加更具体的例子，强调清晰度问题...",
    explainResults: "解释结果",
    rewriteStrength: "改写强度",
    generateRewrite: "生成改写",
    light: "轻微",
    balanced: "平衡",
    max: "最大",
    sliderHelp: "轻微 = 温和润色，平衡 = 清晰改写，最大 = 完全改造。",
    outputFormat: "输出格式",
    essayFormat: "论文格式",
    paragraphFormat: "段落格式",
    bulletPoints: "要点",
    other: "其他",
    describeFormat: "描述您想要的格式",
    formatExample: "例如：编号列表、大纲格式、对话格式等。",
    // Profile dropdown
    accountDetails: "账户详情",
    contactUs: "联系我们",
    logOut: "登出",
    // Teachers
    msFrank: "弗兰克女士",
    msFrankDesc: "喜欢艺术项目，评分宽松",
    mrChen: "陈先生",
    mrChenDesc: "非常严格的评分者，很少给高分",
    msPatel: "帕特尔女士",
    msPatelDesc: "注重创造力和原创性，重视努力",
    mrThompson: "汤普森先生",
    mrThompsonDesc: "强调结构和清晰度，因语法错误扣分",
    msRodriguez: "罗德里格斯女士",
    msRodriguezDesc: "重视证据和引用，对来源要求严格",
    mrKim: "金先生",
    mrKimDesc: "喜欢详细解释，要求深入分析",
    msWilliams: "威廉姆斯女士",
    msWilliamsDesc: "欣赏个人声音和独特视角",
    mrDavis: "戴维斯先生",
    mrDavisDesc: "对截止日期严格，重视组织和展示",
    other: "其他",
    customTeacherName: "教师姓名",
    customTeacherDesc: "描述您教师的评分风格...",
    additionalNotes: "附加说明（可选）",
    notesPlaceholder: "关于您教师偏好的任何额外信息...",
    // Loading messages
    gradingWork: "正在评分您的作业",
    rewritingBetter: "正在改写更好的版本",
    thinking: "思考中"
  },
  ja: {
    // Navigation
    login: "ログイン",
    // Tool page
    teacherProfile: "教師プロフィール",
    selectTeacher: "あなたの教師の採点スタイルに一致する教師を選択してください...",
    assignmentInstructions: "課題の指示 / ルーブリック",
    yourDraft: "あなたの下書き",
    uploadPhoto: "写真をアップロード",
    pasteDraft: "ここに課題の下書きを貼り付けてください... または上記に作品/プロジェクトの写真をアップロードしてください。",
    instructionsPlaceholder: "ここに質問、ルーブリック、または課題の指示を貼り付けてください... または上記にルーブリック/指示の写真をアップロードしてください。",
    analyzeAssignment: "課題を分析",
    resultsPlaceholder: "結果がここに表示されます...",
    explainResults: "結果を説明",
    gradeLabel: "成績",
    analysis: "分析",
    refineAnalysis: "分析を改善",
    feedbackPlaceholder: "例：構造により焦点を当て、より具体的な例を追加し、明確さの問題を強調...",
    rewriteStrength: "書き直しの強度",
    generateRewrite: "書き直しを生成",
    light: "軽い",
    balanced: "バランス",
    max: "最大",
    sliderHelp: "軽い = 優しい仕上げ、バランス = 明確な書き直し、最大 = 完全な作り直し。",
    outputFormat: "出力形式",
    essayFormat: "エッセイ形式",
    paragraphFormat: "段落形式",
    bulletPoints: "箇条書き",
    other: "その他",
    describeFormat: "希望する形式を説明してください",
    formatExample: "例：番号付きリスト、アウトライン形式、対話形式など。",
    // Profile dropdown
    accountDetails: "アカウント詳細",
    contactUs: "お問い合わせ",
    logOut: "ログアウト",
    // Teachers
    msFrank: "フランク先生",
    msFrankDesc: "芸術的なプロジェクトを好み、採点が甘い",
    mrChen: "チェン先生",
    mrChenDesc: "非常に厳格な採点者で、高得点をめったに与えない",
    msPatel: "パテル先生",
    msPatelDesc: "創造性と独創性に焦点を当て、努力を重視",
    mrThompson: "トンプソン先生",
    mrThompsonDesc: "構造と明確さを強調し、文法エラーで減点",
    msRodriguez: "ロドリゲス先生",
    msRodriguezDesc: "証拠と引用を重視し、出典に厳格",
    mrKim: "キム先生",
    mrKimDesc: "詳細な説明を好み、徹底的な分析を求める",
    msWilliams: "ウィリアムズ先生",
    msWilliamsDesc: "個人的な声と独自の視点を評価",
    mrDavis: "デイビス先生",
    mrDavisDesc: "締切に厳格で、組織とプレゼンテーションを重視",
    other: "その他",
    customTeacherName: "教師名",
    customTeacherDesc: "あなたの教師の採点スタイルを説明してください...",
    additionalNotes: "追加メモ（オプション）",
    notesPlaceholder: "あなたの教師の好みに関する追加情報...",
    // Loading messages
    gradingWork: "あなたの作品を採点しています",
    rewritingBetter: "より良いバージョンを書き直しています",
    thinking: "考え中"
  }
};

// Function to get translation
function getTranslation(key, lang = 'en') {
  const langTranslations = translations[lang] || translations['en'];
  return langTranslations[key] || key;
}

// Function to apply translations to the page
function applyTranslations(lang = 'en') {
  // Update specific elements by ID
  const textElements = {
    'teacherProfile': 'teacherProfile',
    'selectTeacher': 'selectTeacher',
    'assignmentInstructions': 'assignmentInstructions',
    'yourDraft': 'yourDraft',
    'uploadPhoto': 'uploadPhoto',
    'analyzeAssignment': 'analyzeAssignment',
    'resultsPlaceholder': 'resultsPlaceholder',
    'explainResults': 'explainResults',
    'rewriteStrength': 'rewriteStrength',
    'generateRewrite': 'generateRewrite',
    'outputFormat': 'outputFormat',
    'accountDetails': 'accountDetails',
    'contactUs': 'contactUs',
    'logOut': 'logOut',
    'analysis': 'analysis',
    'gradeLabel': 'gradeLabel',
    'refineAnalysis': 'refineAnalysis',
    'customTeacherNameLabel': 'customTeacherName',
    'customTeacherDescLabel': 'customTeacherDesc',
    'additionalNotesLabel': 'additionalNotes',
    'describeFormatLabel': 'describeFormat'
  };
  
  Object.keys(textElements).forEach(key => {
    const element = document.getElementById(textElements[key]);
    if (element) {
      const translation = getTranslation(key, lang);
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else if (element.tagName === 'SPAN' && element.parentElement.tagName === 'LABEL') {
        // Handle spans inside labels (like upload buttons)
        element.textContent = translation;
      } else if (element.tagName === 'LABEL') {
        element.textContent = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
  
  // Handle textarea placeholders
  const pasteDraft = document.getElementById('pasteDraft');
  if (pasteDraft) {
    pasteDraft.placeholder = getTranslation('pasteDraft', lang);
  }
  
  // Handle instructions textarea placeholder
  const instructions = document.getElementById('instructions');
  if (instructions) {
    instructions.placeholder = getTranslation('instructionsPlaceholder', lang);
  }
  
  // Handle teacher custom section placeholders
  const teacherCustomName = document.getElementById('teacherCustomName');
  if (teacherCustomName) {
    const exampleText = lang === 'es' ? 'Ejemplo: Sr. Smith, Sra. Johnson...' : 
                       lang === 'fr' ? 'Exemple : M. Smith, Mme Johnson...' :
                       lang === 'de' ? 'Beispiel: Herr Smith, Frau Johnson...' :
                       lang === 'zh' ? '例如：史密斯先生，约翰逊女士...' :
                       lang === 'ja' ? '例：スミス先生、ジョンソン先生...' :
                       'Example: Mr. Smith, Ms. Johnson...';
    teacherCustomName.placeholder = exampleText;
  }
  
  const teacherCustom = document.getElementById('teacherCustom');
  if (teacherCustom) {
    teacherCustom.placeholder = getTranslation('customTeacherDesc', lang);
  }
  
  // Handle teacher notes placeholder
  const teacherNotes = document.getElementById('teacherNotes');
  if (teacherNotes) {
    teacherNotes.placeholder = getTranslation('notesPlaceholder', lang);
  }
  
  // Handle format custom placeholder
  const formatCustom = document.getElementById('formatCustom');
  if (formatCustom) {
    formatCustom.placeholder = getTranslation('formatExample', lang);
  }
  
  // Handle feedback placeholder
  const feedback = document.getElementById('feedback');
  if (feedback) {
    feedback.placeholder = getTranslation('feedbackPlaceholder', lang);
  }
  
  // Handle select options
  const rewriteFormat = document.getElementById('rewriteFormat');
  if (rewriteFormat) {
    const essayOpt = rewriteFormat.querySelector('option[value="essay"]');
    const paragraphOpt = rewriteFormat.querySelector('option[value="paragraph"]');
    const bulletsOpt = rewriteFormat.querySelector('option[value="bullets"]');
    const otherOpt = rewriteFormat.querySelector('option[value="other"]');
    if (essayOpt) essayOpt.textContent = getTranslation('essayFormat', lang);
    if (paragraphOpt) paragraphOpt.textContent = getTranslation('paragraphFormat', lang);
    if (bulletsOpt) bulletsOpt.textContent = getTranslation('bulletPoints', lang);
    if (otherOpt) otherOpt.textContent = getTranslation('other', lang);
  }
  
  // Update teacher options
  updateTeacherTranslations(lang);
  
  // Update slider labels
  const sliderLabels = document.querySelectorAll('.slider-tick-label');
  if (sliderLabels.length >= 2) {
    sliderLabels[0].textContent = getTranslation('light', lang);
    sliderLabels[1].textContent = getTranslation('max', lang);
  }
  
  const strengthLabel = document.getElementById('strengthLabel');
  if (strengthLabel) {
    const rewriteStrengthInput = document.getElementById('rewriteStrength');
    if (rewriteStrengthInput) {
      const currentValue = parseFloat(rewriteStrengthInput.value || 2);
      if (currentValue < 1.5) {
        strengthLabel.textContent = getTranslation('light', lang);
      } else if (currentValue < 2.5) {
        strengthLabel.textContent = getTranslation('balanced', lang);
      } else {
        strengthLabel.textContent = getTranslation('max', lang);
      }
    }
  }
  
  // Update slider help text
  const sliderHelp = document.querySelector('.slider-help');
  if (sliderHelp) {
    const light = getTranslation('light', lang);
    const balanced = getTranslation('balanced', lang);
    const max = getTranslation('max', lang);
    const helpText = getTranslation('sliderHelp', lang);
    sliderHelp.innerHTML = helpText.replace('Light', `<strong>${light}</strong>`).replace('Balanced', `<strong>${balanced}</strong>`).replace('Max', `<strong>${max}</strong>`);
  }
  
  // Update output placeholder
  const outputPlaceholder = document.getElementById('outputPlaceholder');
  if (outputPlaceholder) {
    outputPlaceholder.textContent = getTranslation('resultsPlaceholder', lang);
  }
  
  const outputBox = document.getElementById('output');
  if (outputBox && outputBox.classList.contains('placeholder')) {
    const placeholderP = outputBox.querySelector('p');
    if (placeholderP) {
      placeholderP.textContent = getTranslation('resultsPlaceholder', lang);
    }
  }
  
  // Update all upload photo buttons (there are multiple with same ID)
  const uploadPhotoElements = document.querySelectorAll('#uploadPhoto');
  uploadPhotoElements.forEach(el => {
    if (el.tagName === 'SPAN') {
      el.textContent = getTranslation('uploadPhoto', lang);
    }
  });
}

// Function to update teacher translations
function updateTeacherTranslations(lang) {
  const teacherMap = {
    'ms-frank': { name: 'msFrank', desc: 'msFrankDesc' },
    'mr-chen': { name: 'mrChen', desc: 'mrChenDesc' },
    'ms-patel': { name: 'msPatel', desc: 'msPatelDesc' },
    'mr-thompson': { name: 'mrThompson', desc: 'mrThompsonDesc' },
    'ms-rodriguez': { name: 'msRodriguez', desc: 'msRodriguezDesc' },
    'mr-kim': { name: 'mrKim', desc: 'mrKimDesc' },
    'ms-williams': { name: 'msWilliams', desc: 'msWilliamsDesc' },
    'mr-davis': { name: 'mrDavis', desc: 'mrDavisDesc' }
  };
  
  Object.keys(teacherMap).forEach(value => {
    const option = document.querySelector(`[data-value="${value}"]`);
    if (option) {
      const nameEl = option.querySelector('.teacher-name');
      const descEl = option.querySelector('.teacher-desc');
      if (nameEl) nameEl.textContent = getTranslation(teacherMap[value].name, lang);
      if (descEl) descEl.textContent = getTranslation(teacherMap[value].desc, lang);
    }
  });
  
  // Update "Other" option
  const otherOption = document.querySelector('[data-value="other"]');
  if (otherOption) {
    const nameEl = otherOption.querySelector('.teacher-name');
    if (nameEl) nameEl.textContent = getTranslation('other', lang);
  }
}

