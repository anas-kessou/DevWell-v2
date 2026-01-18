export type Language = keyof typeof translations;

export const translations = {
  en: {
    // Navigation
    features: "Features",
    about: "About",
    wellnessHub: "Wellness Hub",
    howItWorks: "How it Works",
    login: "Login",
    getStarted: "Get Started",
    dashboard: "Dashboard",
    settings: "Settings",
    pricing: "Pricing",
    docs: "Documentation",
    
    // Landing Page
    heroTitle: "Code Without the Burnout.",
    heroSubtitle: "DevWell uses world-class AI to analyze your physical and mental state in real-time, helping you maintain peak performance without sacrificing your health.",
    startNeuralSync: "Start Neural Sync",
    viewProtocol: "View Protocol",
    poweredBy: "Powered by Gemini 3 Neural Engine",
    systemStatus: "System Online",
    biometricActive: "Biometric Stream Active",
    biometricDesc: "DevWell is currently processing visual and auditory markers to ensure optimal ergonomic alignment and focus depth.",
    
    // Features
    processTitle: "The Process",
    processHeading: "Neural Synchronization",
    learnMore: "Learn More",
    step1Title: "Initialize Sensors",
    step1Desc: "Activate the secure neural HUD. The system connects to your camera and microphone to establish a real-time biometric stream.",
    step2Title: "AI Processing",
    step2Desc: "Our Gemini-powered engine analyzes micro-expressions, vocal tone, and posture 30 times per second to detect fatigue markers.",
    step3Title: "Wellness Tuning",
    step3Desc: "Receive instant, non-intrusive nudges to correct posture, take deep breaths, or enter 'Focus Mode' before burnout hits.",
    
    // Dashboard
    neuralHub: "NEURAL HUB",
    voice: "Voice",
    adhdMode: "ADHD Mode",
    proEngineActive: "Pro Engine Active",
    flowSynchronized: "Flow Synchronized",
    sensorsIdle: "Sensors Idle",
    status: "Status",
    unlockOracle: "Unlock Neural Oracle",
    summonOracle: "Summon Neural Oracle",
    wellnessScore: "Wellness Score",
    fatigueAnalysis: "Fatigue Analysis",
    weeklyActivity: "Weekly Activity",
    continuousImprovement: "Continuous Improvement Process",
    unlockPro: "Unlock Pro",
    upgradeToPro: "Upgrade to Zen Pro",
    advanceCareer: "Advance Your Career Velocity",
    
    // Settings
    generalSettings: "General Settings",
    language: "Language",
    selectLanguage: "Select Language",
    theme: "Theme",
    notifications: "Notifications",
    account: "Account",
    saveChanges: "Save Changes",
    
    // Settings specific
    privacyCore: "Privacy Core",
    privacySubtitle: "Advanced Neural Security Settings (Firebase Cloud Enabled)",
    cloudSynced: "Cloud Synced",
    
    // User Section
    demoInterface: "Demo Interface",
    verifiedLink: "Verified Neural Link",
    logOut: "Log Out",
    
    // AI Privacy
    anonymizationLayer: "Anonymization Layer",
    anonymizationSubtitle: "Pre-processing for Neural Uplink",
    scrubPii: "Scrub PII from Vision Analysis",
    scrubPiiDesc: "Strips biometric markers and environment metadata before sending frames to Gemini API.",
    aggregateConsent: "Aggregate Training Consent",
    aggregateConsentDesc: "Allow anonymized aggregates to be used for model fine-tuning (Differential Privacy enabled).",
    
    // Encryption
    encryptionHub: "Encryption Hub",
    encryptionSubtitle: "End-to-End Data Persistence",
    logEncryption: "Log Encryption Protocol",
    active: "Active",
    standard: "Standard",
    quantum: "Quantum-Resistant",
    
    // Data Management
    exportArchive: "Export Archive",
    exportDesc: "Download a full JSON record of your health events, settings, and AI-generated insights. All data is de-identified before export.",
    initDownload: "Initialize Download",
    thePurge: "The Purge",
    purgeDesc: "Permanently wipe all health history, biometric profiles, and predictive logs. This action is irreversible and terminates the neural link.",
    wipeData: "Wipe All Data",
    
    // Confirm Modal
    confirmPurge: "Confirm Data Purge",
    purgeWarning: "All biometric history on Firestore will be destroyed. This cannot be undone.",
    cancel: "Cancel",
    confirmDelete: "Confirm Delete",
    
    // Footer
    privacyProtocol: "Privacy Protocol V2.4.92 // HIPAA & GDPR Compliant Layer",
    
    // Auth
    welcomeBack: "Welcome Back",
    signInResume: "Sign in to resume your wellness journey.",
    emailAddress: "Email Address",
    password: "Password",
    signIn: "Sign In",
    signingIn: "Signing In...",
    orContinueWith: "Or continue with",
    dontHaveAccount: "Don't have an account?",
    joinNow: "Join Now",
    joinDevWell: "Join DevWell",
    startJourney: "Start your personalized wellness monitoring today.",
    fullName: "Full Name",
    createAccount: "Create Account",
    creatingAccount: "Creating Account...",
    alreadyHaveAccount: "Already have an account?",
    
    // Pricing
    backToHub: "Back to Hub",
    elevateFlow: "Elevate Your",
    neuralFlowTitle: "Neural Flow.",
    chooseProtocol: "Choose the protocol that matches your engineering intensity.",
    standardSync: "Standard Sync",
    baselineTracking: "Baseline Wellness Tracking",
    basicPosture: "Basic Posture Analysis",
    geminiFlash: "Gemini Flash Chat",
    wellnessStream: "Wellness Stream",
    sevenDayHistory: "7-Day History",
    focusChart: "Real-time Focus Trend",
    currentProtocol: "Current Protocol",
    mostPowerful: "Most Powerful",
    zenPro: "Zen Pro",
    neuralCommand: "The Neural Command Suite",
    predictiveOracle: "Predictive Burnout Oracle (Thinking)",
    veoVideo: "Veo 3.1 Neural Video Generation",
    multiSpeaker: "Multi-Speaker Voice TTS",
    unlimitedData: "Unlimited Historical Data",
    priorityAccess: "Priority Model Access (1M Context)",
    cortisolHeatmap: "Cortisol Heatmap (7-Day Pattern)",
    initUpgrade: "Initialize Upgrade",
    tryDemo: "Try Demo Account (No Card Required)",
    processingPayment: "Processing Neural Transaction...",
    secureGateway: "Secure Payment Gateway",
    encryptedTransaction: "256-Bit Encrypted Transaction",
    totalDue: "Total Due Today",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvc: "CVC",
    confirmPayment: "Confirm Payment",
    processing: "Processing...",
    
    // About
    returnHome: "Return Home",
    aboutDevWell: "About DevWell",
    builtFor: "We built this for the",
    lateNights: "late nights.",
    aboutMission: "DevWell was born from a simple observation: Software Engineering is an endurance sport, but we treat it like a 100m sprint. We wanted to build a tool that understands the human behind the keyboard.",
    empathyFirst: "Empathy First",
    empathyDesc: "Most productivity tools are built to extract more value. DevWell is built to preserve yours. We prioritize wellness over output, because we know high-quality output is a byproduct of a healthy mind.",
    intelligenceGood: "Intelligence for Good",
    intelligenceDesc: "Using Gemini's multimodal power, we can detect micro-fatigue markers that the user isn't even aware of yet. It's like having a world-class health coach watching your back.",

    // Wellness
    wellnessResources: "Wellness Resources",
    devWellnessHub: "The Dev Wellness Hub",
    wellnessHeroDesc: "Science-backed protocols to keep your biology in sync with your codebase.",
    visionSecurity: "Vision Security",
    rule202020: "The 20-20-20 Rule",
    rule20Desc: "Digital eye strain is the #1 complaint of modern devs. Every 20 minutes, look at something 20 feet away for 20 seconds. This relaxes the ciliary muscle and keeps your vision sharp.",
    reducesHeadaches: "Reduces headaches",
    preventsFocusShift: "Prevents permanent focus shift",
    resetsPressure: "Resets ocular pressure",
  },
  fr: {
    // Navigation
    features: "Fonctionnalités",
    about: "À propos",
    wellnessHub: "Centre de bien-être",
    howItWorks: "Comment ça marche",
    login: "Connexion",
    getStarted: "Commencer",
    dashboard: "Tableau de bord",
    settings: "Paramètres",
    pricing: "Tarifs",
    docs: "Documentation",
    
    // Landing Page
    heroTitle: "Codez sans vous épuiser.",
    heroSubtitle: "DevWell utilise une IA de classe mondiale pour analyser votre état physique et mental en temps réel, vous aidant à maintenir des performances optimales sans sacrifier votre santé.",
    startNeuralSync: "Démarrer Neural Sync",
    viewProtocol: "Voir le protocole",
    poweredBy: "Propulsé par le moteur neuronal Gemini 3",
    systemStatus: "Système en ligne",
    biometricActive: "Flux biométrique actif",
    biometricDesc: "DevWell traite actuellement les marqueurs visuels et auditifs pour assurer un alignement ergonomique optimal et une profondeur de concentration.",
    
    // Features
    processTitle: "Le Processus",
    processHeading: "Synchronisation Neurale",
    learnMore: "En savoir plus",
    step1Title: "Initialiser les capteurs",
    step1Desc: "Activez le HUD neuronal sécurisé. Le système se connecte à votre caméra et votre microphone pour établir un flux biométrique en temps réel.",
    step2Title: "Traitement IA",
    step2Desc: "Notre moteur propulsé par Gemini analyse les micro-expressions, le ton vocal et la posture 30 fois par seconde pour détecter les marqueurs de fatigue.",
    step3Title: "Ajustement bien-être",
    step3Desc: "Recevez des coups de pouce instantanés et non intrusifs pour corriger la posture, prendre de profondes respirations ou entrer en 'Mode Focus' avant l'épuisement.",
    
    // Dashboard
    neuralHub: "HUB NEURAL",
    voice: "Voix",
    adhdMode: "Mode TDAH",
    proEngineActive: "Moteur Pro Actif",
    flowSynchronized: "Flux Synchronisé",
    sensorsIdle: "Capteurs Inactifs",
    status: "Statut",
    unlockOracle: "Débloquer l'Oracle Neural",
    summonOracle: "Invoquer l'Oracle Neural",
    wellnessScore: "Score de Bien-être",
    fatigueAnalysis: "Analyse de Fatigue",
    weeklyActivity: "Activité Hebdomadaire",
    continuousImprovement: "Processus d'Amélioration Continue",
    unlockPro: "Débloquer Pro",
    upgradeToPro: "Passer à Zen Pro",
    advanceCareer: "Accélérez votre carrière",
    
    // Settings
    generalSettings: "Paramètres Généraux",
    language: "Langue",
    selectLanguage: "Choisir la langue",
    theme: "Thème",
    notifications: "Notifications",
    account: "Compte",
    saveChanges: "Sauvegarder",
    
    // Settings specific
    privacyCore: "Noyau de Confidentialité",
    privacySubtitle: "Paramètres de Sécurité Neuronale Avancés (Compatible Firebase Cloud)",
    cloudSynced: "Synchronisé au Cloud",
    
    // User Section
    demoInterface: "Interface de Démo",
    verifiedLink: "Lien Neural Vérifié",
    logOut: "Déconnexion",
    
    // AI Privacy
    anonymizationLayer: "Couche d'Anonymisation",
    anonymizationSubtitle: "Pré-traitement pour la Liaison Montante Neuronale",
    scrubPii: "Supprimer PII de l'Analyse Visuelle",
    scrubPiiDesc: "Supprime les marqueurs biométriques et les métadonnées de l'environnement avant d'envoyer les trames à l'API Gemini.",
    aggregateConsent: "Consentement à l'Entraînement Global",
    aggregateConsentDesc: "Permettre l'utilisation d'agrégats anonymisés pour l'ajustement du modèle (Confidentialité Différentielle activée).",
    
    // Encryption
    encryptionHub: "Hub de Chiffrement",
    encryptionSubtitle: "Persistance des Données de Bout en Bout",
    logEncryption: "Protocole de Chiffrement des Journaux",
    active: "Actif",
    standard: "Standard",
    quantum: "Résistant Quantique",
    
    // Data Management
    exportArchive: "Exporter l'Archive",
    exportDesc: "Téléchargez un enregistrement JSON complet de vos événements de santé, paramètres et analyses générées par l'IA. Toutes les données sont désidentifiées avant l'exportation.",
    initDownload: "Initialiser le Téléchargement",
    thePurge: "La Purge",
    purgeDesc: "Effacer définitivement tout l'historique de santé, les profils biométriques et les journaux prédictifs. Cette action est irréversible et termine la liaison neuronale.",
    wipeData: "Effacer Toutes les Données",
    
    // Confirm Modal
    confirmPurge: "Confirmer la Purge des Données",
    purgeWarning: "Tout l'historique biométrique sur Firestore sera détruit. Cela ne peut pas être annulé.",
    confirmDelete: "Confirmer la Suppression",
    cancel: "Annuler",
    
    // Footer
    privacyProtocol: "Protocole de Confidentialité V2.4.92 // Couche conforme HIPAA & GDPR",
    
    // Auth
    welcomeBack: "Bon retour",
    signInResume: "Connectez-vous pour reprendre votre parcours de bien-être.",
    emailAddress: "Adresse e-mail",
    password: "Mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion en cours...",
    orContinueWith: "Ou continuer avec",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    joinNow: "Rejoindre maintenant",
    joinDevWell: "Rejoindre DevWell",
    startJourney: "Commencez votre suivi de bien-être personnalisé aujourd'hui.",
    fullName: "Nom complet",
    createAccount: "Créer un compte",
    creatingAccount: "Création de compte...",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    
    // Pricing
    backToHub: "Retour au Hub",
    elevateFlow: "Élevez Votre",
    neuralFlowTitle: "Flux Neural.",
    chooseProtocol: "Choisissez le protocole qui correspond à votre intensité d'ingénierie.",
    standardSync: "Synchro Standard",
    baselineTracking: "Suivi de bien-être de base",
    basicPosture: "Analyse posturale de base",
    geminiFlash: "Chat Gemini Flash",
    wellnessStream: "Flux de bien-être",
    sevenDayHistory: "Historique de 7 jours",
    focusChart: "Tendance de Focus en Temps Réel",
    currentProtocol: "Protocole Actuel",
    mostPowerful: "Le Plus Puissant",
    zenPro: "Zen Pro",
    neuralCommand: "La Suite de Commande Neuronale",
    predictiveOracle: "Oracle de Burnout Prédictif (Thinking)",
    veoVideo: "Génération Vidéo Neurale Veo 3.1",
    multiSpeaker: "TTS Voix Multi-locuteurs",
    unlimitedData: "Données Historiques Illimitées",
    priorityAccess: "Accès Modèle Prioritaire (Contexte 1M)",
    cortisolHeatmap: "Carte Thermique de Cortisol (7 jours)",
    initUpgrade: "Initialiser la Mise à Niveau",
    tryDemo: "Essayer le Compte Démo (Sans Carte)",
    processingPayment: "Traitement de la Transaction Neuronale...",
    secureGateway: "Passerelle de Paiement Sécurisée",
    encryptedTransaction: "Transaction Chiffrée 256-Bit",
    totalDue: "Total Dû Aujourd'hui",
    cardNumber: "Numéro de Carte",
    expiryDate: "Date d'Expiration",
    cvc: "CVC",
    confirmPayment: "Confirmer le Paiement",
    processing: "Traitement...",
    
    // About
    returnHome: "العودة للرئيسية",
    aboutDevWell: "حول DevWell",
    builtFor: "بنينا هذا من أجل",
    lateNights: "الليالي المتأخرة.",
    aboutMission: "ولد DevWell من ملاحظة بسيطة: هندسة البرمجيات هي رياضة تحمل، لكننا نعاملها مثل سباق 100 متر. أردنا بناء أداة تفهم الإنسان خلف لوحة المفاتيح.",
    empathyFirst: "التعاطف أولاً",
    empathyDesc: "تم بناء معظم أدوات الإنتاجية لاستخراج المزيد من القيمة. تم بناء DevWell للحفاظ على قيمتك. نحن نعطي الأولوية للعافية على الإنتاج، لأننا نعلم أن الإنتاج عالي الجودة هو نتاج ثانوي لعقل سليم.",
    intelligenceGood: "الذكاء للخير",
    intelligenceDesc: "باستخدام قوة Gemini متعددة الوسائط، يمكننا اكتشاف علامات التعب الدقيق التي قد لا يكون المستخدم على دراية بها بعد. إنه مثل وجود مدرب صحي عالمي يراقبك.",

    // Wellness
    wellnessResources: "موارد العافية",
    devWellnessHub: "مركز عافية المطورين",
    wellnessHeroDesc: "بروتوكولات مدعومة علمياً للحفاظ على تزامن بيولوجيتك مع قاعدة الكود الخاصة بك.",
    visionSecurity: "أمان الرؤية",
    rule202020: "قاعدة 20-20-20",
    rule20Desc: "إجهاد العين الرقمي هو الشكوى رقم 1 للمطورين الحديثين. كل 20 دقيقة، انظر إلى شيء على بعد 20 قدماً لمدة 20 ثانية. هذا يريح العضلة الهدبية ويحافظ على حدة رؤيتك.",
    reducesHeadaches: "يقلل الصداع",
    preventsFocusShift: "يمنع تحول التركيز الدائم",
    resetsPressure: "يعيد ضبط ضغط العين",
  },
  ar: {
    // Navigation
    features: "المميزات",
    about: "حول",
    wellnessHub: "مركز العافية",
    howItWorks: "كيف يعمل",
    login: "تسجيل الدخول",
    getStarted: "ابدأ الآن",
    dashboard: "لوحة التحكم",
    settings: "الإعدادات",
    pricing: "الأسعار",
    docs: "الوثائق",
    
    // Landing Page
    heroTitle: "برمج دون إرهاق.",
    heroSubtitle: "يستخدم DevWell ذكاءً اصطناعيًا عالمي المستوى لتحليل حالتك الجسدية والعقلية في الوقت الفعلي، مما يساعدك في الحفاظ على أعلى مستويات الأداء دون التضحية بصحتك.",
    startNeuralSync: "بدء المزامنة العصبية",
    viewProtocol: "عرض البروتوكول",
    poweredBy: "مدعوم بمحرك Gemini 3 العصبي",
    systemStatus: "النظام متصل",
    biometricActive: "التيار الحيوي نشط",
    biometricDesc: "يقوم DevWell حالياً بمعالجة العلامات البصرية والسمعية لضمان التوافق المريح وعمق التركيز.",
    
    // Features
    processTitle: "العملية",
    processHeading: "المزامنة العصبية",
    learnMore: "اعرف المزيد",
    step1Title: "تفعيل المستشعرات",
    step1Desc: "قم بتفعيل الواجهة العصبية الآمنة. يتصل النظام بالكاميرا والميكروفون لإنشاء تدفق حيوي في الوقت الفعلي.",
    step2Title: "معالجة الذكاء الاصطناعي",
    step2Desc: "يحلل محركنا المدعوم من Gemini التعبيرات الدقيقة، ونبرة الصوت، والوضعية 30 مرة في الثانية لاكتشاف علامات التعب.",
    step3Title: "ضبط العافية",
    step3Desc: "تلقى تنبيهات فورية وغير متطفلة لتصحيح الوضعية، أو أخذ أنفاس عميقة، أو الدخول في 'وضع التركيز' قبل حدوث الإرهاق.",
    
    // Dashboard
    neuralHub: "المحور العصبي",
    voice: "الصوت",
    adhdMode: "وضع قصور الانتباه",
    proEngineActive: "المحرك الاحترافي نشط",
    flowSynchronized: "التدفق متزامن",
    sensorsIdle: "المستشعرات خاملة",
    status: "الحالة",
    unlockOracle: "فتح العراف العصبي",
    summonOracle: "استدعاء العراف العصبي",
    wellnessScore: "نقطة العافية",
    fatigueAnalysis: "تحليل التعب",
    weeklyActivity: "النشاط الأسبوعي",
    continuousImprovement: "عملية التحسين المستمر",
    unlockPro: "فتح النسخة الاحترافية",
    upgradeToPro: "الترقية إلى Zen Pro",
    advanceCareer: "سريع مسارك المهني",
    
    // Settings
    generalSettings: "الإعدادات العامة",
    language: "اللغة",
    selectLanguage: "اختر اللغة",
    theme: "السمة",
    notifications: "الإشعارات",
    account: "الحساب",
    saveChanges: "حفظ التغييرات",
    
    // Settings specific
    privacyCore: "نواة الخصوصية",
    privacySubtitle: "إعدادات الأمان العصبي المتقدمة (ممكنة عبر سحابة فايربيس)",
    cloudSynced: "تمت المزامنة السحابية",
  
    // User Section
    demoInterface: "واجهة تجريبية",
    verifiedLink: "رابط عصبي موثق",
    logOut: "تسجيل الخروج",
  
    // AI Privacy
    anonymizationLayer: "طبقة إخفاء الهوية",
    anonymizationSubtitle: "معالجة مسبقة للوصلة العصبية الصاعدة",
    scrubPii: "إزالة المعلومات الشخصية من التحليل البصري",
    scrubPiiDesc: "يزيل العلامات الحيوية والبيانات الوصفية للبيئة قبل إرسال الإطارات إلى واجهة برمجة تطبيقات Gemini.",
    aggregateConsent: "الموافقة على التدريب التجميعي",
    aggregateConsentDesc: "السماح باستخدام المجاميع المجهولة لتحسين النموذج (تمكين الخصوصية التفاضلية).",
  
    // Encryption
    encryptionHub: "مركز التشفير",
    encryptionSubtitle: "استمرار البيانات من طرف إلى طرف",
    logEncryption: "بروتوكول تشفير السجلات",
    active: "نشط",
    standard: "قياسي",
    quantum: "مقاوم للكم",
  
    // Data Management
    exportArchive: "تصدير الأرشيف",
    exportDesc: "قم بتنزيل سجل JSON كامل لأحداث صحتك، والإعدادات، والتحليلات التي تم إنشاؤها بواسطة الذكاء الاصطناعي. يتم إخفاء هوية جميع البيانات قبل التصدير.",
    initDownload: "بدء التنزيل",
    thePurge: "التطهير",
    purgeDesc: "محو دائم لجميع تاريخ الصحة، والملفات الشخصية الحيوية، وسجلات التنبؤ. هذا الإجراء لا يمكن التراجع عنه وينهي الرابط العصبي.",
    wipeData: "محو جميع البيانات",
  
    // Confirm Modal
    confirmPurge: "تأكيد تطهير البيانات",
    purgeWarning: "سيتم تدمير جميع السجلات الحيوية على Firestore. لا يمكن التراجع عن هذا.",
    confirmDelete: "تأكيد الحذف",
    cancel: "إلغاء",
    
    // Footer
    privacyProtocol: "بروتوكول الخصوصية الإصدار 2.4.92 // طبقة متوافقة مع HIPAA و GDPR",
    
    // Auth
    welcomeBack: "مرحبًا بعودتك",
    signInResume: "سجل الدخول لاستئناف رحلة عافيتك.",
    emailAddress: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    orContinueWith: "أو استمر مع",
    dontHaveAccount: "ليس لديك حساب؟",
    joinNow: "انضم الآن",
    joinDevWell: "انضم إلى DevWell",
    startJourney: "ابدأ مراقبة عافيتك الشخصية اليوم.",
    fullName: "الاسم الكامل",
    createAccount: "إنشاء حساب",
    creatingAccount: "جاري إنشاء الحساب...",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    
    // Pricing
    backToHub: "العودة إلى المركز",
    elevateFlow: "ارفع مستواك",
    neuralFlowTitle: "التدفق العصبي.",
    chooseProtocol: "اختر البروتوكول الذي يتناسب مع كثافة هندستك.",
    standardSync: "المزامنة القياسية",
    baselineTracking: "تتبع العافية الأساسي",
    basicPosture: "تحليل الوضعية الأساسي",
    geminiFlash: "دردشة Gemini Flash",
    wellnessStream: "تدفق العافية",
    sevenDayHistory: "سجل 7 أيام",
    focusChart: "اتجاه التركيز في الوقت الحقيقي",
    currentProtocol: "البروتوكول الحالي",
    mostPowerful: "الأكثر قوة",
    zenPro: "Zen Pro",
    neuralCommand: "مجموعة القيادة العصبية",
    predictiveOracle: "أوراكل الاحتراق التنبؤي (تفكير)",
    veoVideo: "توليد الفيديو العصبي Veo 3.1",
    multiSpeaker: "تحويل النص إلى كلام متعدد الأصوات",
    unlimitedData: "بيانات تاريخية غير محدودة",
    priorityAccess: "وصول ذو أولوية للنموذج (سياق 1M)",
    cortisolHeatmap: "خريطة حرارة الكورتيزول (نمط 7 أيام)",
    initUpgrade: "بدء الترقية",
    tryDemo: "جرب الحساب التجريبي (بدون بطاقة)",
    processingPayment: "جاري معالجة المعاملة العصبية...",
    secureGateway: "بوابة دفع آمنة",
    encryptedTransaction: "معاملة مشفرة 256 بت",
    totalDue: "الإجمالي المستحق اليوم",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvc: "رمز الأمان",
    confirmPayment: "تأكيد الدفع",
    processing: "جاري المعالجة...",
    
    // About
    returnHome: "العودة للرئيسية",
    aboutDevWell: "حول DevWell",
    builtFor: "بنينا هذا من أجل",
    lateNights: "الليالي المتأخرة.",
    aboutMission: "ولد DevWell من ملاحظة بسيطة: هندسة البرمجيات هي رياضة تحمل، لكننا نعاملها مثل سباق 100 متر. أردنا بناء أداة تفهم الإنسان خلف لوحة المفاتيح.",
    empathyFirst: "التعاطف أولاً",
    empathyDesc: "تم بناء معظم أدوات الإنتاجية لاستخراج المزيد من القيمة. تم بناء DevWell للحفاظ على قيمتك. نحن نعطي الأولوية للعافية على الإنتاج، لأننا نعلم أن الإنتاج عالي الجودة هو نتاج ثانوي لعقل سليم.",
    intelligenceGood: "الذكاء للخير",
    intelligenceDesc: "باستخدام قوة Gemini متعددة الوسائط، يمكننا اكتشاف علامات التعب الدقيق التي قد لا يكون المستخدم على دراية بها بعد. إنه مثل وجود مدرب صحي عالمي يراقبك.",

    // Wellness
    wellnessResources: "موارد العافية",
    devWellnessHub: "مركز عافية المطورين",
    wellnessHeroDesc: "بروتوكولات مدعومة علمياً للحفاظ على تزامن بيولوجيتك مع قاعدة الكود الخاصة بك.",
    visionSecurity: "أمان الرؤية",
    rule202020: "قاعدة 20-20-20",
    rule20Desc: "إجهاد العين الرقمي هو الشكوى رقم 1 للمطورين الحديثين. كل 20 دقيقة، انظر إلى شيء على بعد 20 قدماً لمدة 20 ثانية. هذا يريح العضلة الهدبية ويحافظ على حدة رؤيتك.",
    reducesHeadaches: "يقلل الصداع",
    preventsFocusShift: "يمنع تحول التركيز الدائم",
    resetsPressure: "يعيد ضبط ضغط العين",
  },
  // Admin & Analytics
  admin: {
    title: {
      en: "Analytics Dashboard",
      fr: "Tableau de Bord Analytique",
      ar: "لوحة تحكم التحليلات",
    },
    accessRequired: {
      en: "Admin Access Required",
      fr: "Accès Admin Requis",
      ar: "مطلوب وصول المسؤول",
    },
    enterPassword: {
      en: "Enter Admin Password",
      fr: "Entrez le mot de passe administrateur",
      ar: "أدخل كلمة مرور المسؤول",
    },
    accessButton: {
      en: "Access Dashboard",
      fr: "Accéder au tableau de bord",
      ar: "الدخول إلى لوحة التحكم",
    },
    invalidPassword: {
      en: "Invalid Password",
      fr: "Mot de passe invalide",
      ar: "كلمة مرور خاطئة",
    },
    systemOverview: {
      en: "System Overview",
      fr: "Aperçu du Système",
      ar: "نظرة عامة على النظام",
    },
    userGrowth: {
      en: "User Growth",
      fr: "Croissance des Utilisateurs",
      ar: "نمو المستخدمين",
    },
    activeSessions: {
      en: "Active Sessions",
      fr: "Sessions Actives",
      ar: "الجلسات النشطة",
    },
    systemHealth: {
      en: "System Health",
      fr: "Santé du Système",
      ar: "صحة النظام",
    },
    revenue: {
      en: "Revenue",
      fr: "Revenus",
      ar: "الإيرادات",
    },
    userActivityTrend: {
      en: "User Activity Trend",
      fr: "Tendance d'Activité Utilisateur",
      ar: "اتجاه نشاط المستخدم",
    },
    regionalDist: {
      en: "Regional Distribution",
      fr: "Distribution Régionale",
      ar: "التوزيع الإقليمي",
    },
    deviceUsage: {
      en: "Device Usage",
      fr: "Utilisation des Appareils",
      ar: "استخدام الأجهزة",
    },
    downloadReport: {
      en: "Download Report",
      fr: "Télécharger le Rapport",
      ar: "تحميل التقرير",
    },
    totalUsers: { en: "Total Users", fr: "Utilisateurs Totaux", ar: "إجمالي المستخدمين" },
    healthEvents: { en: "Health Events", fr: "Événements Santé", ar: "الأحداث الصحية" },
    supportTickets: { en: "Support Tickets", fr: "Tickets de Support", ar: "تذاكر الدعم" },
    totalFeedback: { en: "Total Feedback", fr: "Feedback Total", ar: "إجمالي التعليقات" },
    live: { en: "Live", fr: "En direct", ar: "مباشر" },
    aggregated: { en: "Aggregated", fr: "Agrégé", ar: "مجمعة" },
    pending: { en: "Pending", fr: "En attente", ar: "قيد الانتظار" },
    received: { en: "Received", fr: "Reçu", ar: "تم الاستلام" },
    aggregatedTrend: { en: "Aggregated Fatigue Trend", fr: "Tendance de Fatigue Agrégée", ar: "اتجاه التعب المجمع" },
    oscillation: { en: "7-Day Biometric Oscillation", fr: "Oscillation Biométrique 7 Jours", ar: "تذبذب حيوي لمدة 7 أيام" },
    alerts: { en: "Alerts", fr: "Alertes", ar: "تنبيهات" },
    stress: { en: "Stress", fr: "Stress", ar: "توتر" },
    systemActivity24h: { en: "24h System Activity", fr: "Activité Système 24h", ar: "نشاط النظام 24 ساعة" },
    tierGrowth: { en: "User Tier Growth", fr: "Croissance des Niveaux", ar: "نمو مستويات المستخدمين" },
    simpleUsers: { en: "Simple Users", fr: "Utilisateurs Simples", ar: "مستخدمين بسيطين" },
    zenPro: { en: "Zen Pro", fr: "Zen Pro", ar: "زين برو" },
    alertHistogram: { en: "Alert Intensity Histogram", fr: "Histogramme d'Intensité d'Alerte", ar: "رسم بياني لشدة التنبيه" },
    alertsPerUser: { en: "Alerts per User", fr: "Alertes par Utilisateur", ar: "تنبيهات لكل مستخدم" },
    userCount: { en: "User Count", fr: "Nombre d'Utilisateurs", ar: "عدد المستخدمين" },
    userSatisfaction: { en: "User Satisfaction", fr: "Satisfaction Utilisateur", ar: "رضا المستخدم" },
    reviewers: { en: "Reviewers", fr: "Examinateurs", ar: "المراجعين" },
    ticketDist: { en: "Support Ticket Distribution", fr: "Distribution des Tickets", ar: "توزيع التذاكر" },
    omniMetric: { en: "Omni-Metric Convergence", fr: "Convergence Omni-Métrique", ar: "تقارب المقاييس الشاملة" },
    unifiedView: { en: "Unified view of Alerts (X), Ratings (Y), and Volume (Radius) for quick AI ingestion.", fr: "Vue unifiée des Alertes (X), Notes (Y) et Volume (Rayon) pour une ingestion rapide par l'IA.", ar: "عرض موحد للتنبيهات (X)، التقييمات (Y)، والحجم (نصف القطر) لاستيعاب سريع للذكاء الاصطناعي." },
    avgQuality: { en: "Avg Quality", fr: "Qualité Moyenne", ar: "متوسط الجودة" },
    vectorReady: { en: "DATA_VECTOR_READY_FOR_TRAINING", fr: "VECTEUR_DONNEES_PRET_POUR_ENTRAINEMENT", ar: "بيانات_موجهة_جاهزة_للتدريب" },
  },
  // Support
  support: {
    title: {
      en: "Customer Support",
      fr: "Support Client",
      ar: "دعم العملاء",
    },
    subtitle: {
      en: "How can we help you today?",
      fr: "Comment pouvons-nous vous aider aujourd'hui ?",
      ar: "كيف يمكننا مساعدتك اليوم؟",
    },
    sendMessage: {
      en: "Send us a Message",
      fr: "Envoyez-nous un message",
      ar: "أرسل لنا رسالة",
    },
    form: {
      name: {
        en: "Your Name",
        fr: "Votre Nom",
        ar: "اسمك",
      },
      email: {
        en: "Email Address",
        fr: "Adresse Email",
        ar: "البريد الإلكتروني",
      },
      subject: {
        en: "Subject",
        fr: "Sujet",
        ar: "الموضوع",
      },
      message: {
        en: "Message",
        fr: "Message",
        ar: "الرسالة",
      },
      submit: {
        en: "Send Message",
        fr: "Envoyer le message",
        ar: "إرسال الرسالة",
      },
      sending: {
        en: "Sending...",
        fr: "Envoi...",
        ar: "جاري الإرسال...",
      },
    },
    contactInfo: {
      title: {
        en: "Direct Contact",
        fr: "Contact Direct",
        ar: "اتصال مباشر",
      },
      emailUs: {
        en: "Email Us",
        fr: "Envoyez un email",
        ar: "راسلنا",
      },
      callUs: {
        en: "Call Us",
        fr: "Appelez-nous",
        ar: "اتصل بنا",
      },
      visitUs: {
        en: "Visit Us",
        fr: "Visitez-nous",
        ar: "زرنا",
      },
    },
    faq: {
      title: {
        en: "Frequently Asked Questions",
        fr: "Questions Fréquemment Posées",
        ar: "الأسئلة الشائعة",
      },
    }
  },
  // Feedback
  feedback: {
    title: {
      en: "Rate Your Experience",
      fr: "Notez votre expérience",
      ar: "قيم تجربتك",
    },
    thankYou: {
      en: "Thank You!",
      fr: "Merci !",
      ar: "شكرًا لك!",
    },
    helpImprove: {
      en: "Your feedback helps us improve.",
      fr: "Vos commentaires nous aident à nous améliorer.",
      ar: "ملاحظاتك تساعدنا على التحسن.",
    },
    placeholder: {
      en: "Any comments?",
      fr: "Des commentaires ?",
      ar: "أي تعليقات؟",
    },
    submit: {
      en: "Submit Feedback",
      fr: "Envoyer les commentaires",
      ar: "إرسال التعليقات",
    },
  },
  // Components
  components: {
    activityChart: {
      title: {
        en: "Neural Balance",
        fr: "Équilibre Neural",
        ar: "التوازن العصبي",
      },
      optimization: {
        en: "Optimization",
        fr: "Optimisation",
        ar: "التحسين",
      },
      optimal: {
        en: "Optimal",
        fr: "Optimal",
        ar: "مثالي",
      },
    },
    healthCharts: {
      totalAlerts: {
        en: "Total Alerts (24h)",
        fr: "Total Alertes (24h)",
        ar: "إجمالي التنبيهات (24 ساعة)",
      },
      fatigueDetection: {
        en: "Fatigue Detection",
        fr: "Détection Fatigue",
        ar: "كشف التعب",
      },
      avgFatigue: {
        en: "Avg Fatigue/Hr",
        fr: "Fatigue Moy./Heure",
        ar: "متوسط التعب/ساعة",
      },
      today: {
        en: "Today",
        fr: "Aujourd'hui",
        ar: "اليوم",
      },
      daily: {
        en: "Daily",
        fr: "Quotidien",
        ar: "يومي",
      },
      wellnessTrend: {
        en: "Wellness Trend",
        fr: "Tendance Bien-être",
        ar: "اتجاه العافية",
      },
      level: {
        en: "Lvl",
        fr: "Niv",
        ar: "مستوى",
      },
    },
    focusTrend: {
      title: {
        en: "Focus Stability",
        fr: "Stabilité Focus",
        ar: "استقرار التركيز",
      },
      subtitle: {
        en: "Real-time attention span variance",
        fr: "Variance de l'attention en temps réel",
        ar: "تباين مدى الانتباه في الوقت الحقيقي",
      },
      live: {
        en: "LIVE FEED",
        fr: "EN DIRECT",
        ar: "بث مباشر",
      },
    },
    stressHeatmap: {
      title: {
        en: "Cortisol Heatmap",
        fr: "Carte Thermique Cortisol",
        ar: "خريطة حرارة الكورتيزول",
      },
      subtitle: {
        en: "7-Day Stress Pattern Recognition",
        fr: "Reconnaissance de modèle de stress sur 7 jours",
        ar: "التعرف على نمط التوتر لمدة 7 أيام",
      },
      proInsights: {
        en: "PRO INSIGHTS",
        fr: "INSIGHTS PRO",
        ar: "رؤى المحترفين",
      },
    },
    suggestions: {
      great: {
        title: {
          en: "Doing Great!",
          fr: "C'est super !",
          ar: "أداء رائع!",
        },
        message: {
          en: "Keep up the flow. Remember to hydrate every hour.",
          fr: "Gardez le rythme. N'oubliez pas de vous hydrater toutes les heures.",
          ar: "حافظ على التدفق. تذكر شرب الماء كل ساعة.",
        },
      },
      break: {
        title: {
          en: "Immediate Break Required",
          fr: "Pause Immédiate Requise",
          ar: "استراحة فورية مطلوبة",
        },
        message: {
          en: "Your fatigue levels are high. Take a 15-minute walk or rest your eyes now.",
          fr: "Vos niveaux de fatigue sont élevés. Faites une promenade de 15 minutes ou reposez vos yeux maintenant.",
          ar: "مستويات التعب لديك مرتفعة. خذ مشي لمدة 15 دقيقة أو أرح عينيك الآن.",
        },
      },
      rule20: {
        title: {
          en: "Try the 20-20-20 Rule",
          fr: "Essayez la règle 20-20-20",
          ar: "جرب قاعدة 20-20-20",
        },
        message: {
          en: "Every 20 minutes, look at something 20 feet away for 20 seconds.",
          fr: "Toutes les 20 minutes, regardez quelque chose à 20 pieds pendant 20 secondes.",
          ar: "كل 20 دقيقة، انظر إلى شيء يبعد 20 قدمًا لمدة 20 ثانية.",
        },
      },
      stretch: {
        title: {
          en: "Stretching Time",
          fr: "Temps d'Étirement",
          ar: "وقت التمدد",
        },
        message: {
          en: "Roll your shoulders and adjust your seat to improve posture.",
          fr: "Roulez vos épaules et ajustez votre siège pour améliorer la posture.",
          ar: "حرك كتفيك واضبط مقعدك لتحسين الوضعية.",
        },
      },
      tellMore: {
        en: "Tell Me More",
        fr: "En savoir plus",
        ar: "أخبرني المزيد",
      },
    },
    chatbot: {
      initial: {
        en: "Neural Interface Active. How may I assist you today?",
        fr: "Interface Neurale Active. Comment puis-je vous aider aujourd'hui ?",
        ar: "واجهة عصبية نشطة. كيف يمكنني مساعدتك اليوم؟",
      },
      placeholder: {
        en: "Type your message...",
        fr: "Tapez votre message...",
        ar: "اكتب رسالتك...",
      },
    },
  },
  // Documentation
  docs: {
    title: {
      en: "Documentation",
      fr: "Documentation",
      ar: "التوثيق",
    },
    nav: {
      gettingStarted: { en: "Getting Started", fr: "Commencer", ar: "البدء" },
      installation: { en: "Installation", fr: "Installation", ar: "التثبيت" },
      requirements: { en: "System Requirements", fr: "Configuration Requise", ar: "متطلبات النظام" },
      configuration: { en: "Configuration", fr: "Configuration", ar: "الإعدادات" },
      features: { en: "Features Guide", fr: "Guide des Fonctionnalités", ar: "دليل الميزات" },
      camera: { en: "Smart Camera", fr: "Caméra Intelligente", ar: "الكاميرا الذكية" },
      analytics: { en: "Analytics", fr: "Analytique", ar: "التحليلات" },
      wellness: { en: "Wellness Tools", fr: "Outils Bien-être", ar: "أدوات العافية" },
      api: { en: "API Reference", fr: "Référence API", ar: "مرجع API" },
      auth: { en: "Authentication", fr: "Authentification", ar: "المصادقة" },
      endpoints: { en: "Endpoints", fr: "Points de terminaison", ar: "نقاط النهاية" },
      limits: { en: "Rate Limits", fr: "Limites de taux", ar: "حدود المعدل" },
      troubleshooting: { en: "Troubleshooting", fr: "Dépannage", ar: "استكشاف الأخطاء وإصلاحها" },
      commonIssues: { en: "Common Issues", fr: "Problèmes Courants", ar: "مشاكل شائعة" },
      support: { en: "Support", fr: "Support", ar: "الدعم" },
    },
    welcome: {
      en: "DevWell Documentation",
      fr: "Documentation DevWell",
      ar: "توثيق DevWell",
    },
    subtitle: {
      en: "Comprehensive guide to integrating and using the DevWell wellness monitoring system.",
      fr: "Guide complet pour l'intégration et l'utilisation du système de surveillance du bien-être DevWell.",
      ar: "دليل شامل لدمج واستخدام نظام مراقبة العافية DevWell.",
    }
  },
  // Legal
  legal: {
    terms: {
      title: {
        en: "Terms of Service",
        fr: "Conditions d'Utilisation",
        ar: "شروط الخدمة",
      },
      lastUpdated: {
        en: "Last updated",
        fr: "Dernière mise à jour",
        ar: "آخر تحديث",
      },
      sections: {
        acceptance: { en: "Acceptance of Terms", fr: "Acceptation des Conditions", ar: "قبول الشروط" },
        license: { en: "Use License", fr: "Licence d'Utilisation", ar: "ترخيص الاستخدام" },
        disclaimer: { en: "Disclaimer", fr: "Avis de Non-responsabilité", ar: "إخلاء المسؤولية" },
        limitations: { en: "Limitations", fr: "Limitations", ar: "القيود" },
      }
    },
    privacy: {
      title: {
        en: "Privacy Policy",
        fr: "Politique de Confidentialité",
        ar: "سياسة الخصوصية",
      },
      sections: {
        collection: { en: "Information Collection", fr: "Collecte d'Information", ar: "جمع المعلومات" },
        use: { en: "Use of Information", fr: "Utilisation des Informations", ar: "استخدام المعلومات" },
        security: { en: "Data Security", fr: "Sécurité des Données", ar: "أمن البيانات" },
        thirdParty: { en: "Third-Party Services", fr: "Services Tiers", ar: "خدمات الطرف الثالث" },
      }
    }
  },
  // Feature Details
  features: {
    smartCamera: {
      title: { en: "Smart Camera", fr: "Caméra Intelligente", ar: "الكاميرا الذكية" },
      description: {
        en: "Real-time fatigue detection and posture monitoring using advanced computer vision.",
        fr: "Détection de la fatigue en temps réel et surveillance de la posture utilisant la vision par ordinateur avancée.",
        ar: "كشف التعب في الوقت الحقيقي ومراقبة الوضعية باستخدام الرؤية الحاسوبية المتقدمة."
      }
    },
    analytics: {
      title: { en: "Wellness Analytics", fr: "Analytique Bien-être", ar: "تحليلات العافية" },
      description: {
        en: "Track your progress with detailed charts and daily reports on your health metrics.",
        fr: "Suivez vos progrès avec des graphiques détaillés et des rapports quotidiens sur vos indicateurs de santé.",
        ar: "تتبع تقدمك مع رسوم بيانية مفصلة وتقارير يومية حول مقاييس صحتك."
      }
    },
    community: {
      title: { en: "Global Community", fr: "Communauté Mondiale", ar: "مجتمع عالمي" },
      description: {
        en: "Connect with other developers, share tips, and participate in wellness challenges.",
        fr: "Connectez-vous avec d'autres développeurs, partagez des conseils et participez à des défis de bien-être.",
        ar: "تواصل مع مطورين آخرين، شارك النصائح، وشارك في تحديات العافية."
      }
    },
    ai: {
      title: { en: "AI Assistant", fr: "Assistant IA", ar: "مساعد الذكاء الاصطناعي" },
      description: {
        en: "Your personal wellness coach powered by Gemini AI, available 24/7.",
        fr: "Votre coach bien-être personnel propulsé par Gemini AI, disponible 24/7.",
        ar: "مدربك الشخصي للعافية مدعوم من Gemini AI، متاح 24/7."
      }
    },
    button: {
      en: "Learn More",
      fr: "En savoir plus",
      ar: "اعرف المزيد"
    }
  },
  // Extended Legal & Feature Content
  legalContent: {
    terms: {
      intro: {
        en: "By accessing or using DevWell (\"The Platform\"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not use any services.",
        fr: "En accédant ou en utilisant DevWell (« La Plateforme »), vous acceptez d'être lié par ces Conditions d'utilisation. Si vous n'acceptez pas toutes les conditions de cet accord, vous ne pouvez utiliser aucun service.",
        ar: "من خلال الوصول إلى أو استخدام DevWell (\"المنصة\")، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على جميع شروط وأحكام هذه الاتفاقية، فلا يجوز لك استخدام أي خدمات.",
      },
      medicalDisclaimer: {
        en: "DevWell is a productivity and wellness tool, not a medical device. The Platform provides data visualization and AI-driven suggestions based on behavioral patterns. It does not diagnose, treat, or prevent any disease or medical condition. Do not use DevWell as a substitute for professional medical advice, diagnosis, or treatment.",
        fr: "DevWell est un outil de productivité et de bien-être, pas un dispositif médical. La plateforme fournit une visualisation des données et des suggestions basées sur l'IA en fonction des modèles comportementaux. Elle ne diagnostique, ne traite ni ne prévient aucune maladie ou condition médicale.",
        ar: "DevWell أداة للإنتاجية والعافية، وليست جهازًا طبيًا. توفر المنصة تصورًا للبيانات واقتراحات مدفوعة بالذكاء الاصطناعي بناءً على الأنماط السلوكية. لا تقوم بتشخيص أو علاج أو منع أي مرض أو حالة طبية.",
      },
      userResp: {
        item1: { en: "You are responsible for maintaining the security of your account credentials.", fr: "Vous êtes responsable du maintien de la sécurité de vos identifiants de compte.", ar: "أنت مسؤول عن الحفاظ على أمان بيانات اعتماد حسابك." },
        item2: { en: "You agree not to modify, reverse engineer, or hack the platform.", fr: "Vous acceptez de ne pas modifier, désosser ou pirater la plateforme.", ar: "أنت توافق على عدم تعديل أو هندسة عكسية أو اختراق المنصة." },
        item3: { en: "You agree to use the biometric features only for your own personal wellness tracking.", fr: "Vous acceptez d'utiliser les fonctionnalités biométriques uniquement pour votre suivi personnel de bien-être.", ar: "أنت توافق على استخدام الميزات البيومترية فقط لتتبع عافيتك الشخصية." },
      },
      subs: {
        text1: { en: "DevWell offers a \"Free Tier\" and a paid \"Pro Tier\".", fr: "DevWell propose un « Niveau Gratuit » et un « Niveau Pro » payant.", ar: "تقدم DevWell \"مستوى مجاني\" و \"مستوى احترافي\" مدفوع." },
        text2: { en: "Pro Tier unlocks \"Neural Oracle\" predictive AI features and deeper historical analytics.", fr: "Le Niveau Pro déverrouille les fonctionnalités d'IA prédictive « Neural Oracle » et des analyses historiques plus approfondies.", ar: "يفتح المستوى الاحترافي ميزات الذكاء الاصطناعي التنبؤية \"أوراكل العصبي\" وتحليلات تاريخية أعمق." },
      },
      liability: {
        text: { en: "In no event shall DevWell be liable for any indirect, incidental, special, consequential or punitive damages.", fr: "En aucun cas DevWell ne pourra être tenu responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs.", ar: "لا تتحمل DevWell بأي حال من الأحوال المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية." },
      }
    },
    privacy: {
      intro: {
        en: "At DevWell, we believe that workplace wellness tools should not be surveillance tools. Our \"Privacy Core\" architecture ensures that your biometric data is processed locally on your device specifically for your benefit.",
        fr: "Chez DevWell, nous pensons que les outils de bien-être au travail ne doivent pas être des outils de surveillance. Notre architecture « Privacy Core » garantit que vos données biométriques sont traitées localement sur votre appareil.",
        ar: "في DevWell، نؤمن بأن أدوات عافية مكان العمل لا ينبغي أن تكون أدوات مراقبة. تضمن بنية \"جوهر الخصوصية\" لدينا معالجة بياناتك البيومترية محليًا على جهازك."
      },
      biometrics: {
        en: "Biometric Streams (Video/Audio): Our applications process video and audio feeds in real-time within your browser's memory. These raw streams are analyzed for fatigue markers and then immediately discarded.",
        fr: "Flux Biométriques (Vidéo/Audio) : Nos applications traitent les flux vidéo et audio en temps réel dans la mémoire de votre navigateur. Ces flux bruts sont analysés pour détecter les signes de fatigue puis immédiatement supprimés.",
        ar: "تدفقات القياسات الحيوية (فيديو/صوت): تعالج تطبيقاتنا تدفقات الفيديو والصوت في الوقت الفعلي داخل ذاكرة متصفحك. يتم تحليل هذه التدفقات الخام بحثًا عن علامات التعب ثم يتم التخلص منها فورًا."
      },
      localFirst: {
        en: "We utilize a \"Local-First\" approach. Your daily detailed metrics are stored in your browser's IndexedDB. Only aggregated summaries are synchronized to our secure cloud servers.",
        fr: "Nous utilisons une approche « Local-First ». Vos mesures détaillées quotidiennes sont stockées dans l'IndexedDB de votre navigateur. Seuls les résumés agrégés sont synchronisés avec nos serveurs cloud sécurisés.",
        ar: "نحن نستخدم نهج \"الأولوية للمحلية\". يتم تخزين مقاييسك التفصيلية اليومية في IndexedDB بمتصفحك. تتم مزامنة الملخصات المجمعة فقط مع خوادمنا السحابية الآمنة."
      },
      noSurveillance: {
        en: "DevWell is designed for the individual developer. We do not provide \"Boss Mode\" or manager dashboards that allow employers to view an individual employee's status.",
        fr: "DevWell est conçu pour le développeur individuel. Nous ne fournissons pas de « Mode Patron » ou de tableaux de bord de gestionnaire permettant aux employeurs de voir le statut d'un employé individuel.",
        ar: "تم تصميم DevWell للمطور الفردي. نحن لا نوفر \"وضع الرئيس\" أو لوحات تحكم المديرين التي تسمح لأصحاب العمل بعرض حالة الموظف الفردي."
      },
      thirdParty: {
        en: "We utilize Google's Gemini models for advanced inference. Data sent to these models is stripped of all PII (Personally Identifiable Information).",
        fr: "Nous utilisons les modèles Gemini de Google pour une inférence avancée. Les données envoyées à ces modèles sont dépouillées de toutes les informations personnellement identifiables (PII).",
        ar: "نستخدم نماذج Gemini من Google للاستنتاج المتقدم. يتم تجريد البيانات المرسلة إلى هذه النماذج من جميع معلومات التعريف الشخصية (PII)."
      },
      contact: {
        en: "Contact our Data Protection Officer at privacy@devwell.ai",
        fr: "Contactez notre délégué à la protection des données à privacy@devwell.ai",
        ar: "اتصل بمسؤول حماية البيانات لدينا على privacy@devwell.ai"
      }
    }
  },
  detailedFeatures: {
    'vision-biometrics': {
      title: { en: 'Vision Biometrics', fr: 'Biométrie Visuelle', ar: 'القياسات الحيوية البصرية' },
      purpose: { en: "To continuously monitor the user's physical engagement and ocular health.", fr: "Surveiller en continu l'engagement physique et la santé oculaire de l'utilisateur.", ar: "لمراقبة المشاركة البدنية للمستخدم وصحة العين باستمرار." },
      role: { en: "Utilizes Gemini 3 Neural Vision model to analyze video feeds at 30fps. Detects blink frequency and posture.", fr: "Utilise le modèle Gemini 3 Neural Vision pour analyser les flux vidéo à 30fps.", ar: "يستخدم نموذج Gemini 3 للرؤية العصبية لتحليل تدفقات الفيديو بمعدل 30 إطارًا في الثانية." },
      importance: { en: "Catches micro-signs of fatigue early to prevent permanent strain.", fr: "Détecte précocement les micro-signes de fatigue pour éviter les tensions permanentes.", ar: "يلتقط العلامات الدقيقة للتعب مبكرًا لمنع الإجهاد الدائم." },
      technical: { en: "TensorFlow.js for local face mesh tracking. Privacy-first architecture.", fr: "TensorFlow.js pour le suivi local du maillage facial.", ar: "TensorFlow.js لتتبع شبكة الوجه محليًا." }
    },
    'vocal-stress-probe': {
        title: { en: 'Vocal Stress Probe', fr: 'Sonde de Stress Vocal', ar: 'مسبار الإجهاد الصوتي' },
        purpose: { en: "To identify latent mental stress through auditory analysis.", fr: "Identifier le stress mental latent par l'analyse auditive.", ar: "لتحديد الإجهاد العقلي الكامن من خلال التحليل السمعي." },
        role: { en: "Analyzes pitch variance, speech rate, and pause duration.", fr: "Analyse la variance de hauteur, le débit de parole et la durée des pauses.", ar: "يحلل تباين طبقة الصوت ومعدل الكلام ومدة التوقف." },
        importance: { en: "Detects emotional burnout before it becomes physical.", fr: "Détecte l'épuisement émotionnel avant qu'il ne devienne physique.", ar: "يكتشف الإرهاق العاطفي قبل أن يصبح جسديًا." },
        technical: { en: "WebAudio API coupled with Gemini Audio processing.", fr: "API WebAudio couplée au traitement audio Gemini.", ar: "واجهة برمجة تطبيقات WebAudio مقترنة بمعالجة صوت Gemini." }
    },
    'predictive-burnout': {
        title: { en: 'Predictive Burnout Model', fr: 'Modèle Prédictif d\'Épuisement', ar: 'نموذج التنبؤ بالاحتراق النفسي' },
        purpose: { en: "Forecasting exhaustion events before they happen.", fr: "Prévoir les événements d'épuisement avant qu'ils ne surviennent.", ar: "التنبؤ بأحداث الإرهاق قبل حدوثها." },
        role: { en: "Aggregates data to build a 4-hour forecast model.", fr: "Agrège les données pour construire un modèle de prévision sur 4 heures.", ar: "يجمع البيانات لبناء نموذج تنبؤ لمدة 4 ساعات." },
        importance: { en: "Allows for energy management rather than just time management.", fr: "Permet la gestion de l'énergie plutôt que la simple gestion du temps.", ar: "يسمح بإدارة الطاقة بدلاً من مجرد إدارة الوقت." },
        technical: { en: "TimeSeries analysis using weighted moving averages.", fr: "Analyse de séries chronologiques utilisant des moyennes mobiles pondérées.", ar: "تحليل السلاسل الزمنية باستخدام المتوسطات المتحركة المرجحة." }
    },
    'privacy-core': {
        title: { en: 'Privacy Core', fr: 'Noyau de Confidentialité', ar: 'جوهر الخصوصية' },
        purpose: { en: "To ensure biometric data remains under user control.", fr: "Garantir que les données biométriques restent sous le contrôle de l'utilisateur.", ar: "لضمان بقاء البيانات البيومترية تحت سيطرة المستخدم." },
        role: { en: "Scrubs PII from all data streams before local processing.", fr: "Supprime les PII de tous les flux de données avant le traitement local.", ar: "يقوم بتنظيف المعلومات الشخصية من جميع تدفقات البيانات قبل المعالجة المحلية." },
        importance: { en: "Trust is the foundation. We don't spy on you.", fr: "La confiance est la base. Nous ne vous espionnons pas.", ar: "الثقة هي الأساس. نحن لا نتجسس عليك." },
        technical: { en: "AES-256 Encryption for local logs. Ephemeral memory.", fr: "Chiffrement AES-256 pour les journaux locaux.", ar: "تشفير AES-256 للسجلات المحلية." }
    },
    'adhd-hub': {
        title: { en: 'ADHD Focus Hub', fr: 'Concentration TDAH', ar: 'مركز تركيز ADHD' },
        purpose: { en: "Environment for neurodivergent working styles.", fr: "Environnement pour les styles de travail neurodivergents.", ar: "بيئة لأنماط العمل المتباينة عصبيًا." },
        role: { en: "High-contrast, low-noise environment with micro-goals.", fr: "Environnement à contraste élevé et à faible bruit avec micro-objectifs.", ar: "بيئة عالية التباين ومنخفضة الضوضاء مع أهداف صغيرة." },
        importance: { en: "Standard tools overwhelm ADHD minds.", fr: "Les outils standard submergent les esprits TDAH.", ar: "الأدوات القياسية تغمر عقول ADHD." },
        technical: { en: "Dynamic UI contrast, distraction blocking.", fr: "Contraste UI dynamique, blocage des distractions.", ar: "تباين واجهة المستخدم الديناميكي، حجب التشتت." }
    },
    'platform-root': {
        title: { en: 'Platform Analytics Root', fr: 'Racine Analytique Plateforme', ar: 'جذر تحليلات المنصة' },
        purpose: { en: "Visualize long-term health trends.", fr: "Visualiser les tendances de santé à long terme.", ar: "تصور اتجاهات الصحة على المدى الطويل." },
        role: { en: "Stores aggregated, anonymized health events.", fr: "Stocke des événements de santé agrégés et anonymisés.", ar: "يخزن الأحداث الصحية المجمعة والمجهولة." },
        importance: { en: "Self-awareness requires data.", fr: "La conscience de soi nécessite des données.", ar: "الوعي الذاتي يتطلب بيانات." },
        technical: { en: "Firestore indexed queries, D3/Recharts.", fr: "Requêtes indexées Firestore, D3/Recharts.", ar: "استعلامات Firestore المفهرسة، D3/Recharts." }
    }
  },
  docsContent: {
    core: {
      title: { en: "01. Core Interface", fr: "01. Interface Principale", ar: "01. الواجهة الأساسية" },
      wellnessScore: {
         title: { en: "Wellness Score", fr: "Score de Bien-être", ar: "درجة العافية" },
         desc: { en: "Your central health metric (0-100%). It is calculated in real-time based on weighted inputs from:", fr: "Votre métrique de santé centrale (0-100%). Elle est calculée en temps réel en fonction des entrées pondérées provenant de :", ar: "مقياس صحتك المركزي (0-100٪). يتم احتسابه في الوقت الفعلي بناءً على المدخلات الموزونة من:" },
         items: [
           { en: "Posture Deviation Frequency", fr: "Fréquence de Déviation Posturale", ar: "تكرار انحراف الوضعية" },
           { en: "Blink Rate Variability", fr: "Variabilité du Taux de Clignement", ar: "تقلب معدل الرمش" },
           { en: "Vocal Stress Analysis", fr: "Analyse du Stress Vocal", ar: "تحليل الإجهاد الصوتي" },
           { en: "Session Duration without Breaks", fr: "Durée de Session sans Pause", ar: "مدة الجلسة بدون فترات راحة" }
         ]
      },
      statusEngine: {
         title: { en: "Status Engine", fr: "Moteur de Statut", ar: "محرك الحالة" },
         desc: { en: "The status indicator (top right) reflects your active subscription tier.", fr: "L'indicateur de statut (en haut à droite) reflète votre niveau d'abonnement actif.", ar: "يعكس مؤشر الحالة (أعلى اليمين) مستوى اشتراكك النشط." },
         freeTier: { en: "Free Tier", fr: "Niveau Gratuit", ar: "المستوى المجاني" },
         freeDesc: { en: "enables basic monitoring.", fr: "permet une surveillance de base.", ar: "يتيح المراقبة الأساسية." },
         proTier: { en: "Pro Tier (Zen Pro)", fr: "Niveau Pro (Zen Pro)", ar: "المستوى الاحترافي (Zen Pro)" },
         proDesc: { en: "unlocks the Neural Oracle (AI Chat), Meditation generation, and advanced burnout forecasting.", fr: "déverrouille l'Oracle Neural (Chat IA), la génération de méditation et la prévision avancée de l'épuisement.", ar: "يفتح أوراكل العصبي (دردشة الذكاء الاصطناعي)، وتوليد التأمل، وتوقعات الإرهاق المتقدمة." }
      }
    },
    biometrics: {
       title: { en: "02. Biometrics", fr: "02. Biométrie", ar: "02. القياسات الحيوية" },
       hud: {
          title: { en: "Neural Sync HUD (Camera)", fr: "HUD Synchro Neurale (Caméra)", ar: "HUD المزامنة العصبية (الكاميرا)" },
          desc: { en: "The central monitoring unit. Click \"INITIALIZE SYNC\" to activate.", fr: "L'unité centrale de surveillance. Cliquez sur « INITIALISER SYNCHRO » pour activer.", ar: "وحدة المراقبة المركزية. انقر فوق \"بدء المزامنة\" للتفعيل." },
          visual: { title: { en: "Visual Cortex", fr: "Cortex Visuel", ar: "القشرة البصرية" }, desc: { en: "Analyzes video feed 30fps for signs of fatigue (eye closure), posture slouching, and facial tension.", fr: "Analyse le flux vidéo à 30fps pour détecter les signes de fatigue, l'affaissement de la posture et la tension faciale.", ar: "يحلل تغذية الفيديو 30 إطارًا في الثانية بحثًا عن علامات التعب، وترهل الوضعية، وتوتر الوجه." } },
          audio: { title: { en: "Audio Cortex", fr: "Cortex Audio", ar: "القشرة السمعية" }, desc: { en: "Listens for 'Vocal Fry', sighs, or rapid speech patterns indicating high cortisol/stress levels.", fr: "Écoute le « Vocal Fry », les soupirs ou les modèles de parole rapide indiquant des niveaux élevés de cortisol/stress.", ar: "يستمع لـ 'خشخشة الصوت'، والتنهدات، أو أنماط الكلام السريع التي تشير إلى مستويات عالية من الكورتيزول/الإجهاد." } },
          privacy: { title: { en: "Privacy Note:", fr: "Note de Confidentialité :", ar: "ملاحظة الخصوصية:" }, desc: { en: "All biometric processing is performed ephemerally. Video frames are analyzed and immediately discarded. No raw footage is ever stored on servers.", fr: "Tout le traitement biométrique est effectué de manière éphémère. Les images vidéo sont analysées et immédiatement supprimées. Aucune séquence brute n'est jamais stockée sur les serveurs.", ar: "تتم جميع المعالجات البيومترية بشكل عابر. يتم تحليل إطارات الفيديو والتخلص منها فورًا. لا يتم تخزين أي لقطات خام على الخوادم." } }
       },
       handsFree: {
          title: { en: "Hands-Free Interaction", fr: "Interaction Mains-Libres", ar: "تفاعل بدون استخدام اليدين" },
          desc: { en: "Once synced, the HUD enters 'Conversation Mode'. You can speak naturally without clicking any buttons. The AI sees what you see and hears what you say, allowing for real-time ergonomic coaching (e.g., 'Do I look tired?').", fr: "Une fois synchronisé, le HUD passe en « Mode Conversation ». Vous pouvez parler naturellement sans cliquer sur aucun bouton. L'IA voit ce que vous voyez et entend ce que vous dites.", ar: "بمجرد المزامنة، يدخل HUD في 'وضع المحادثة'. يمكنك التحدث بشكل طبيعي دون النقر على أي أزرار. يرى الذكاء الاصطناعي ما تراه ويسمع ما تقوله." }
       }
    },
    oracle: {
       title: { en: "03. The Oracle", fr: "03. L'Oracle", ar: "03. العراف" },
       chat: {
          title: { en: "DevWell Oracle (Chatbot)", fr: "DevWell Oracle (Chatbot)", ar: "DevWell Oracle (روبوت الدردشة)" },
          desc: { en: "Your personal wellness companion (bottom right). It supports three distinct modes:", fr: "Votre compagnon de bien-être personnel (en bas à droite). Il prend en charge trois modes distincts :", ar: "رفيقك الشخصي للعافية (أسفل اليمين). يدعم ثلاثة أوضاع متميزة:" },
          modes: [
            { type: 'standard', name: { en: "Standard", fr: "Standard", ar: "قياسي" }, desc: { en: "Fast, conversational responses using Gemini Flash.", fr: "Réponses rapides et conversationnelles utilisant Gemini Flash.", ar: "استجابات سريعة ومحادثة باستخدام Gemini Flash." } },
            { type: 'reasoning', name: { en: "Reasoning", fr: "Raisonnement", ar: "استنتاج" }, desc: { en: "Uses Gemini Pro to maximize logic for complex wellness planning or burnout diagnosis.", fr: "Utilise Gemini Pro pour maximiser la logique pour la planification complexe du bien-être.", ar: "يستخدم Gemini Pro لتعظيم المنطق لتخطيط العافية المعقد أو تشخيص الاحتراق." } },
            { type: 'research', name: { en: "Research", fr: "Recherche", ar: "بحث" }, desc: { en: "Connects to Google Search to find scientific papers backing up wellness advice.", fr: "Se connecte à Google Search pour trouver des articles scientifiques étayant les conseils de bien-être.", ar: "يتصل ببحث Google للعثور على أوراق علمية تدعم نصائح العافية." } }
          ]
       }
    },
    proTools: {
       title: { en: "04. Pro Tools", fr: "04. Outils Pro", ar: "04. أدوات احترافية" },
       meditation: {
         title: { en: "Neural Meditation", fr: "Méditation Neurale", ar: "تأمل عصبي" },
         desc: { en: "Uses generative video AI to create custom, infinite loops of calming scenery.", fr: "Utilise l'IA générative vidéo pour créer des boucles infinies de paysages apaisants.", ar: "يستخدم الذكاء الاصطناعي التوليدي للفيديو لإنشاء حلقات لا نهائية مخصصة من المناظر الطبيعية المهدئة." }
       },
       forecast: {
         title: { en: "Predictive Forecast", fr: "Prévision Prédictive", ar: "التوقعات التنبؤية" },
         desc: { en: "Uses your historical data (last 50 sessions) to predict burnout risk 4-8 hours in advance.", fr: "Utilise vos données historiques (50 dernières sessions) pour prédire le risque d'épuisement 4 à 8 heures à l'avance.", ar: "يستخدم بياناتك التاريخية (آخر 50 جلسة) للتنبؤ بخطر الاحتراق قبل 4-8 ساعات." }
       }
    }
  }
};

