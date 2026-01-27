export type Language = keyof typeof translations;

export const translations = {
  en: {
    // Navigation
    navFeatures: "Features",
    features: {
      role: "The Role",
      importance: "Why it Matters",
      technical: "Technical Details",
      notFound: "Feature Not Found"
    },
    about: "About",
    wellnessHub: "Wellness Hub",
    howItWorks: "How it Works",
    login: "Login",
    getStarted: "Get Started",
    navDashboard: "Dashboard",
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

    dashboard: {
      title: "Dashboard",
      settings: "Settings",
      upgradeToPro: "Upgrade to Pro",
      activityLabels: {
         focusStart: "Focus Start",
         sedentaryAlert: "Sedentary Alert",
         postureCorrection: "Posture Correction",
         eyeStrain: "Eye Strain",
         hydration: "Hydration Check",
         stretchBreak: "Stretch Break",
         breathingExercise: "Breathing Exercise",
         ergoCheck: "Ergonomic Check",
         bioBreak: "Bio Break", 
         focusLost: "Focus Drift",
         focusGained: "Deep Work"
      },
      timeLabels: {
          justNow: "Just now",
          minAgo: "min ago",
          hourAgo: "h ago"
      }
    },
    components: {
      activityChart: {
        title: "Biometric Radar",
        labels: {
          focus: "Focus",
          posture: "Posture",
          energy: "Energy",
          health: "Health",
          hydration: "Hydration",
          breaks: "Breaks"
        }
      },
      healthCharts: {
        totalAlerts: "Total Alerts",
        today: "Today",
        fatigueDetection: "Fatigue Detection",
        avgFatigue: "Avg Fatigue",
        daily: "Daily",
        level: "Level"
      }
    },
    
    // Feature Details
    detailedFeatures: {
      featureLabels: {
        vision: "Vision",
        audio: "Audio",
        cognitive: "Cognitive",
        security: "Security",
        focus: "Focus",
        data: "Data"
      },
      "vision-biometrics": {
        title: "Vision Biometrics",
        purpose: "Analyzes eye movement patterns to detect cognitive load overload.",
        desc: "Analyzes eye movement patterns to detect cognitive load overload.",
        role: "Maintains a constant stream of visual health data.",
        importance: "Prevents digital eye strain and long-term vision degradation.",
        technical: "Uses MediaPipe for 478-point facial landmark detection at 30fps."
      },
      "vocal-stress-probe": {
        title: "Vocal Stress Probe",
        purpose: "Monitors voice tone and pitch to identify stress markers.",
        desc: "Monitors voice tone and pitch to identify stress markers.",
        role: "Acts as an auditory guardian for your mental state.",
        importance: "Vocal cords tighten under stress often before you feel it.",
        technical: "FFT analysis of vocal frequencies in real-time."
      },
      "predictive-burnout": {
        title: "Predictive Burnout",
        purpose: "Forecasts energy crashes before they happen.",
        desc: "Forecasts energy crashes before they happen.",
        role: "Strategic planner for your energy reserves.",
        importance: "Recovery is easier when you stop before hitting zero.",
        technical: "LSTM model trained on thousands of developer sessions."
      },
      "privacy-core": {
        title: "Privacy Core",
        purpose: "Ensures no raw biometric data leaves your device.",
        desc: "Ensures no raw biometric data leaves your device.",
        role: "The vault that keeps your data yours.",
        importance: "Health data is sensitive; we treat it as such.",
        technical: "Local processing with ephemeral memory buffers."
      },
      "adhd-hub": {
        title: "ADHD Hub",
        purpose: "Specialized environment for neurodivergent focus.",
        desc: "Specialized environment for neurodivergent focus.",
        role: "Filters out distractions and maintains dopamine loops.",
        importance: "Standard interfaces can be overwhelming for some.",
        technical: "Dynamic UI contrast and gamified feedback loops."
      },
      "platform-root": {
        title: "Platform Root",
        purpose: "Central command for all your wellness metrics.",
        desc: "Central command for all your wellness metrics.",
        role: "Historian of your health journey.",
        importance: "You play how you practice; see your trends.",
        technical: "Firestore real-time sync with offline persistence."
      }
    },
  },
  fr: {
    // Navigation
    navFeatures: "Fonctionnalités",
    features: {
      role: "Le Rôle",
      importance: "Pourquoi c'est important",
      technical: "Détails Techniques",
      notFound: "Fonctionnalité Introuvable"
    },
    about: "À propos",
    wellnessHub: "Centre de bien-être",
    howItWorks: "Comment ça marche",
    login: "Connexion",
    getStarted: "Commencer",
    navDashboard: "Tableau de bord",
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
    returnHome: "Retour Accueil",
    aboutDevWell: "À propos de DevWell",
    builtFor: "Conçu pour les",
    lateNights: "nuits blanches.",
    aboutMission: "DevWell est né d'un constat simple : le génie logiciel est un sport d'endurance, mais nous le traitons comme un sprint de 100m. Nous voulions créer un outil qui comprend l'humain derrière le clavier.",
    empathyFirst: "L'Empathie d'Abord",
    empathyDesc: "La plupart des outils de productivité sont conçus pour extraire plus de valeur. DevWell est conçu pour préserver la vôtre. Nous privilégions le bien-être à la production, car nous savons qu'une production de qualité est le sous-produit d'un esprit sain.",
    intelligenceGood: "L'Intelligence pour le Bien",
    intelligenceDesc: "En utilisant la puissance multimodale de Gemini, nous pouvons détecter des marqueurs de micro-fatigue dont l'utilisateur n'a même pas encore conscience. C'est comme avoir un coach de santé de classe mondiale qui veille sur vous.",

    // Wellness
    wellnessResources: "Ressources Bien-être",
    devWellnessHub: "Le Hub Bien-être Dév",
    wellnessHeroDesc: "Des protocoles validés scientifiquement pour garder votre biologie synchronisée avec votre base de code.",
    visionSecurity: "Sécurité Visuelle",
    rule202020: "La Règle 20-20-20",
    rule20Desc: "La fatigue oculaire numérique est la plainte n°1 des développeurs modernes. Toutes les 20 minutes, regardez quelque chose à 20 pieds (6m) pendant 20 secondes. Cela détend le muscle ciliaire et garde votre vision nette.",
    reducesHeadaches: "Réduit les maux de tête",
    preventsFocusShift: "Prévient le changement de focus permanent",
    resetsPressure: "Réinitialise la pression oculaire",

    dashboard: {
      title: "Tableau de Bord",
      settings: "Paramètres",
      upgradeToPro: "Passer Pro",
      activityLabels: {
         focusStart: "Début de Focus",
         sedentaryAlert: "Alerte Sédentarité",
         postureCorrection: "Correction de Posture",
         eyeStrain: "Fatigue Oculaire",
         hydration: "Vérification Hydratation",
         stretchBreak: "Pause Étirement",
         breathingExercise: "Exercice de Respiration",
         ergoCheck: "Vérification Ergonomique",
         bioBreak: "Pause Bio", 
         focusLost: "Perte de Focus",
         focusGained: "Travail Profond"
      },
      timeLabels: {
          justNow: "À l'instant",
          minAgo: "il y a min",
          hourAgo: "il y a h"
      }
    },
    components: {
      activityChart: {
        title: "Radar Biométrique",
        labels: {
          focus: "Focus",
          posture: "Posture",
          energy: "Énergie",
          health: "Santé",
          hydration: "Hydratation",
          breaks: "Pauses"
        }
      },
      healthCharts: {
        totalAlerts: "Total Alertes",
        today: "Aujourd'hui",
        fatigueDetection: "Détection Fatigue",
        avgFatigue: "Fatigue Moy.",
        daily: "Quotidien",
        level: "Niveau"
      }
    },
    
    // Feature Details
    detailedFeatures: {
      featureLabels: {
        vision: "Vision",
        audio: "Audio",
        cognitive: "Cognitif",
        security: "Sécurité",
        focus: "Focus",
        data: "Données"
      },
      "vision-biometrics": {
        title: "Biométrie Visuelle",
        purpose: "Analyse les mouvements oculaires pour détecter la surcharge cognitive.",
        desc: "Analyse les mouvements oculaires pour détecter la surcharge cognitive.",
        role: "Maintient un flux constant de données sur la santé visuelle.",
        importance: "Prévient la fatigue oculaire numérique et la dégradation de la vision.",
        technical: "Utilise MediaPipe pour la détection de 478 points faciaux à 30fps."
      },
      "vocal-stress-probe": {
        title: "Sonde de Stress Vocal",
        purpose: "Surveille le ton et la hauteur de la voix pour identifier les marqueurs de stress.",
        desc: "Surveille le ton et la hauteur de la voix pour identifier les marqueurs de stress.",
        role: "Agit comme un gardien auditif pour votre état mental.",
        importance: "Les cordes vocales se resserrent sous le stress avant même que vous ne le sentiez.",
        technical: "Analyse FFT des fréquences vocales en temps réel."
      },
      "predictive-burnout": {
        title: "Burnout Prédictif",
        purpose: "Prévoit les chutes d'énergie avant qu'elles ne surviennent.",
        desc: "Prévoit les chutes d'énergie avant qu'elles ne surviennent.",
        role: "Planificateur stratégique de vos réserves d'énergie.",
        importance: "La récupération est plus facile quand on s'arrête avant d'atteindre zéro.",
        technical: "Modèle LSTM entraîné sur des milliers de sessions de développeurs."
      },
      "privacy-core": {
        title: "Cœur de Confidentialité",
        purpose: "Garantit qu'aucune donnée biométrique brute ne quitte votre appareil.",
        desc: "Garantit qu'aucune donnée biométrique brute ne quitte votre appareil.",
        role: "Le coffre-fort qui garde vos données à vous.",
        importance: "Les données de santé sont sensibles ; nous les traitons comme telles.",
        technical: "Traitement local avec tampons de mémoire éphémères."
      },
      "adhd-hub": {
        title: "Hub TDAH",
        purpose: "Environnement spécialisé pour la concentration neurodivergente.",
        desc: "Environnement spécialisé pour la concentration neurodivergente.",
        role: "Filtre les distractions et maintient les boucles de dopamine.",
        importance: "Les interfaces standard peuvent être écrasantes pour certains.",
        technical: "Contraste UI dynamique et boucles de rétroaction ludifiées."
      },
      "platform-root": {
        title: "Racine de Plateforme",
        purpose: "Commande centrale pour toutes vos métriques de bien-être.",
        desc: "Commande centrale pour toutes vos métriques de bien-être.",
        role: "Historien de votre parcours de santé.",
        importance: "Vous jouez comme vous vous entraînez ; voyez vos tendances.",
        technical: "Synchro Firestore en temps réel avec persistance hors ligne."
      }
    },
  },
  ar: {
    // Navigation
    navFeatures: "المميزات",
    features: {
      role: "الدور",
      importance: "لماذا هذا مهم",
      technical: "تفاصيل تقنية",
      notFound: "الميزة غير موجودة"
    },
    about: "حول",
    wellnessHub: "مركز العافية",
    howItWorks: "كيف يعمل",
    login: "تسجيل الدخول",
    getStarted: "ابدأ الآن",
    navDashboard: "لوحة التحكم",
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

    dashboard: {
      title: "لوحة التحكم",
      settings: "الإعدادات",
      upgradeToPro: "الترقية للاحترافي",
      activityLabels: {
         focusStart: "بدء التركيز",
         sedentaryAlert: "تنبيه الخمول",
         postureCorrection: "تصحيح الوضعية",
         eyeStrain: "إجهاد العين",
         hydration: "فحص الترطيب",
         stretchBreak: "استراحة تمدد",
         breathingExercise: "تمرين تنفس",
         ergoCheck: "فحص بيئة العمل",
         bioBreak: "استراحة حيوية", 
         focusLost: "فقدان التركيز",
         focusGained: "عمل عميق"
      },
      timeLabels: {
          justNow: "الآن",
          minAgo: "منذ دقيقة",
          hourAgo: "منذ ساعة"
      }
    },
    components: {
      activityChart: {
        title: "الرادار الحيوي",
        labels: {
          focus: "التركيز",
          posture: "الوضعية",
          energy: "الطاقة",
          health: "الصحة",
          hydration: "الترطيب",
          breaks: "الاستراحات"
        }
      },
      healthCharts: {
        totalAlerts: "إجمالي التنبيهات",
        today: "اليوم",
        fatigueDetection: "كشف التعب",
        avgFatigue: "متوسط التعب",
        daily: "يومي",
        level: "مستوى"
      }
    },
    
    // Feature Details
    detailedFeatures: {
      featureLabels: {
        vision: "الرؤية",
        audio: "الصوت",
        cognitive: "إدراكي",
        security: "الأمان",
        focus: "التركيز",
        data: "البيانات"
      },
      "vision-biometrics": {
        title: "القياسات الحيوية البصرية",
        purpose: "يحلل أنماط حركة العين للكشف عن الحمل المعرفي الزائد.",
        desc: "يحلل أنماط حركة العين للكشف عن الحمل المعرفي الزائد.",
        role: "يحافظ على تدفق مستمر لبيانات صحة الرؤية.",
        importance: "يمنع إجهاد العين الرقمي وتدهور الرؤية على المدى الطويل.",
        technical: "يستخدم MediaPipe للكشف عن 478 نقطة في الوجه بمعدل 30 إطاراً في الثانية."
      },
      "vocal-stress-probe": {
        title: "مسبار التوتر الصوتي",
        purpose: "يراقب نبرة وطبقة الصوت لتحديد علامات التوتر.",
        desc: "يراقب نبرة وطبقة الصوت لتحديد علامات التوتر.",
        role: "يعمل كحارس سمعي لحالتك النفسية.",
        importance: "تشد الحبال الصوتية تحت الضغط غالباً قبل أن تشعر به.",
        technical: "تحليل FFT للترددات الصوتية في الوقت الحقيقي."
      },
      "predictive-burnout": {
        title: "التنبؤ بالاحتراق النفسي",
        purpose: "يتوقع انهيار الطاقة قبل حدوثه.",
        desc: "يتوقع انهيار الطاقة قبل حدوثه.",
        role: "مخطط استراتيجي لاحتياطيات الطاقة الخاصة بك.",
        importance: "يكون التعافي أسهل عندما تتوقف قبل الوصول إلى الصفر.",
        technical: "نموذج LSTM مدرب على آلاف جلسات المطورين."
      },
      "privacy-core": {
        title: "نواة الخصوصية",
        purpose: "يضمن عدم خروج أي بيانات حيوية خام من جهازك.",
        desc: "يضمن عدم خروج أي بيانات حيوية خام من جهازك.",
        role: "الخزنة التي تحافظ على بياناتك ملكاً لك.",
        importance: "البيانات الصحية حساسة؛ ونحن نتعامل معها على هذا الأساس.",
        technical: "معالجة محلية مع مخازن ذاكرة مؤقتة وتشفير."
      },
      "adhd-hub": {
        title: "مركز تشتت الانتباه",
        purpose: "بيئة مخصصة للتركيز العصبي المتنوع.",
        desc: "بيئة مخصصة للتركيز العصبي المتنوع.",
        role: "يصفي المشتتات ويحافظ على حلقات الدوبامين.",
        importance: "يمكن أن تكون الواجهات القياسية ساحقة للبعض.",
        technical: "تباين ديناميكي للواجهة وحلقات تغذية راجعة محفزة."
      },
      "platform-root": {
        title: "جذر المنصة",
        purpose: "القيادة المركزية لجميع مقاييس العافية الخاصة بك.",
        desc: "القيادة المركزية لجميع مقاييس العافية الخاصة بك.",
        role: "مؤرخ لرحلتك الصحية.",
        importance: "أنت تلعب كما تتدرب؛ شاهد اتجاهاتك.",
        technical: "مزامنة Firestore في الوقت الحقيقي مع استمرارية دون اتصال."
      }
    },
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

    metrics: { en: "Metrics", fr: "Métriques", ar: "المقاييس" },
    analytics: { en: "Analytics", fr: "Analytique", ar: "التحليلات" },
    aiFeedback: { en: "AI Reports", fr: "Rapports IA", ar: "تقارير الذكاء الاصطناعي" },
    neuralSentiment: { en: "Neural Sentiment", fr: "Sentiment Neural", ar: "المشاعر العصبية" },
    privacyEthics: { en: "Privacy & Ethics", fr: "Confidentialité & Éthique", ar: "الخصوصية والأخلاق" },
    adminProfile: { en: "Admin Profile", fr: "Profil Admin", ar: "ملف المسؤول" },
    directLogs: { en: "Direct Logs", fr: "Journaux Directs", ar: "السجلات المباشرة" },
    anonymityMeter: { en: "Anonymity Meter", fr: "Compteur d'Anonymat", ar: "مقياس المجهولية" },
    computingRisk: { en: "Computing Risk...", fr: "Calcul du Risque...", ar: "حساب المخاطر..." },
    exportSet: { en: "Export Anonymized Set", fr: "Exporter l'Ensemble Anonymisé", ar: "تصدير مجموعة مجهولة المصدر" },
    totalUsers: { en: "Total Users", fr: "Utilisateurs Totaux", ar: "إجمالي المستخدمين" },
    healthEvents: { en: "Health Events", fr: "Événements Santé", ar: "الأحداث الصحية" },
    supportTickets: { en: "Support Tickets", fr: "Tickets Support", ar: "تذاكر الدعم" },
    totalFeedback: { en: "Total Feedback", fr: "Commentaires Totaux", ar: "إجمالي التعليقات" },
    live: { en: "LIVE", fr: "EN DIRECT", ar: "مباشر" },
    aggregated: { en: "AGGREGATED", fr: "AGRÉGÉ", ar: "مجمعة" },
    pending: { en: "PENDING", fr: "EN ATTENTE", ar: "قيد الانتظار" },
    received: { en: "RECEIVED", fr: "REÇU", ar: "تم الاستلام" },
    aggregatedTrend: { en: "Aggregated Fatigue Trend", fr: "Tendance de Fatigue Agrégée", ar: "اتجاه التعب المجمع" },
    oscillation: { en: "7-Day Biometric Oscillation", fr: "Oscillation Biométrique 7 Jours", ar: "تذبذب حيوي لمدة 7 أيام" },
    alerts: { en: "ALERTS", fr: "ALERTES", ar: "تنبيهات" },
    stress: { en: "STRESS", fr: "STRESS", ar: "توتر" },
    systemActivity24h: { en: "24h System Activity", fr: "Activité Système 24h", ar: "نشاط النظام 24 ساعة" },
    tierGrowth: { en: "User Tier Growth", fr: "Croissance des Niveaux", ar: "نمو مستويات المستخدمين" },
    simpleUsers: { en: "Simple Users", fr: "Utilisateurs Simples", ar: "مستخدمين عاديين" },
    zenPro: { en: "Zen Pro", fr: "Zen Pro", ar: "زين برو" },
    alertHistogram: { en: "Alert Intensity Histogram", fr: "Histogramme d'Intensité d'Alerte", ar: "رسم بياني لشدة التنبيه" },
    alertsPerUser: { en: "Alerts per User", fr: "Alertes par Utilisateur", ar: "تنبيهات لكل مستخدم" },
    userCount: { en: "User Count", fr: "Nombre d'Utilisateurs", ar: "عدد المستخدمين" },
    userSatisfaction: { en: "User Satisfaction", fr: "Satisfaction Utilisateur", ar: "رضا المستخدم" },
    reviewers: { en: " REVIEWERS", fr: " EXAMINATEURS", ar: " مراجعين" },
    ticketDist: { en: "Support Ticket Distribution", fr: "Distribution des Tickets", ar: "توزيع التذاكر" },
    omniMetric: { en: "Omni-Metric Convergence", fr: "Convergence Omni-Métrique", ar: "تقارب المقاييس الشاملة" },
    unifiedView: { en: "Unified view of Alerts (X), Ratings (Y), and Volume (Radius)", fr: "Vue unifiée des Alertes (X), Notes (Y) et Volume (Rayon)", ar: "عرض موحد للتنبيهات (X)، التقييمات (Y)، والحجم (نصف القطر)" },
    totalEventsLabel: { en: "TOTAL EVENTS", fr: "TOTAL ÉVÉNEMENTS", ar: "إجمالي الأحداث" },
    avgQuality: { en: "AVG QUALITY", fr: "QUALITÉ MOY.", ar: "متوسط الجودة" },
    vectorReady: { en: "DATA_VECTOR_READY_FOR_TRAINING", fr: "VECTEUR_DONNEES_PRET", ar: "بيانات_موجهة_جاهزة" },
    noiseInjection: { en: "NOISE INJECTION", fr: "INJECTION DE BRUIT", ar: "ضخ الضوضاء" },
    encryptedUplink: { en: "ENCRYPTED UPLINK", fr: "LIAISON CHIFFRÉE", ar: "اتصال مشفر" },
  },
  // Landing Page
  landing: {
    heroTitle: { en: "Neural Wellness for the Modern Developer", fr: "Bien-être Neural pour le Développeur Moderne", ar: "العافية العصبية للمطور العصري" },
    heroSubtitle: { en: "The first biometric interface that prevents burnout before it happens. Powered by Gemini 3.", fr: "La première interface biométrique qui prévient l'épuisement avant qu'il ne survienne. Propulsé par Gemini 3.", ar: "أول واجهة بيومترية تمنع الإرهاق قبل حدوثه. مدعوم بواسطة Gemini 3." },
    startNeuralSync: { en: "Start Neural Sync", fr: "Démarrer Synchro Neurale", ar: "ابدأ المزامنة العصبية" },
    viewProtocol: { en: "View Protocol", fr: "Voir le Protocole", ar: "عرض البروتوكول" },
    systemStatus: { en: "SYSTEM STATUS", fr: "ÉTAT DU SYSTÈME", ar: "حالة النظام" },
    biometricActive: { en: "Biometric Monitoring Active", fr: "Surveillance Biométrique Active", ar: "مراقبة القياسات الحيوية نشطة" },
    biometricDesc: { en: "Real-time analysis of blinking frequency, yawing, and posture.", fr: "Analyse en temps réel de la fréquence de clignement, des bâillements et de la posture.", ar: "تحليل في الوقت الحقيقي لمعدل الرمش والتثاؤب والوضعية." },
    processTitle: { en: "THE PROCESS", fr: "LE PROCESSUS", ar: "العملية" },
    processHeading: { en: "How Neural Sync Works", fr: "Comment fonctionne Neural Sync", ar: "كيف تعمل المزامنة العصبية" },
    learnMore: { en: "Learn More", fr: "En savoir plus", ar: "المزيد" },
    step1Title: { en: "Calibration", fr: "Calibration", ar: "المعايرة" },
    step1Desc: { en: "We built a 12-point mesh of your face to establish your baseline energy levels.", fr: "Nous construisons un maillage de 12 points de votre visage pour établir vos niveaux d'énergie de base.", ar: "نقوم ببناء شبكة من 12 نقطة لوجهك لتأسيس مستويات الطاقة الأساسية لديك." },
    step2Title: { en: "Monitoring", fr: "Surveillance", ar: "المراقبة" },
    step2Desc: { en: "Our local AI watches for micro-expressions of fatigue that you miss.", fr: "Notre IA locale surveille les micro-expressions de fatigue que vous manquez.", ar: "يراقب ذكاؤنا الاصطناعي المحلي التعبيرات الدقيقة للتعب التي تفوتك." },
    step3Title: { en: "Intervention", fr: "Intervention", ar: "التدخل" },
    step3Desc: { en: "Gentle nudges and environment shifts keep you in the flow state longer.", fr: "Des coups de pouce doux et des changements d'environnement vous maintiennent dans l'état de flux plus longtemps.", ar: "تنبيهات لطيفة وتغييرات في البيئة تبقيك في حالة التدفق لفترة أطول." },
    poweredBy: { en: "POWERED BY GEMINI 3", fr: "PROPULSÉ PAR GEMINI 3", ar: "مدعوم بواسطة GEMINI 3" },
  },
  // Dashboard General
  dashboard: {
    title: { en: "Dashboard", fr: "Tableau de Bord", ar: "لوحة التحكم" },
    settings: { en: "Settings", fr: "Paramètres", ar: "الإعدادات" },
    upgradeToPro: { en: "UPGRADE TO PRO", fr: "PASSER PRO", ar: "الترقية للاحترافي" },
    newAlert: { en: "New Event", fr: "Nouv. Événement", ar: "حدث جديد" },
    loadingData: { en: "Decrypting Neural Command Layer...", fr: "Déchiffrement de la couche de commande neurale...", ar: "فك تشفير طبقة القيادة العصبية..." },
  },
  // Common
  common: {
    back: { en: "Back", fr: "Retour", ar: "رجوع" },
    save: { en: "Save", fr: "Enregistrer", ar: "حفظ" },
    cancel: { en: "Cancel", fr: "Annuler", ar: "إلغاء" },
    loading: { en: "Loading...", fr: "Chargement...", ar: "جاري التحميل..." },
    error: { en: "Error", fr: "Erreur", ar: "خطأ" },
    success: { en: "Success", fr: "Succès", ar: "نجاح" },
  },
  activityChart: {
    labels: {
       focus: { en: "Focus", fr: "Focus", ar: "التركيز" },
       posture: { en: "Posture", fr: "Posture", ar: "الوضعية" },
       energy: { en: "Energy", fr: "Énergie", ar: "الطاقة" },
       health: { en: "Health", fr: "Santé", ar: "الصحة" },
       hydration: { en: "Hydration", fr: "Hydratation", ar: "الترطيب" },
       breaks: { en: "Breaks", fr: "Pauses", ar: "فترات الراحة" },
    },
    title: {
      en: "Neural Balance",
      fr: "Équilibre Neural",
      ar: "التوازن العصبي",
    },
  },
  settingsPage: {
    neuralBridge: {
      title: { en: "Neural Bridge", fr: "Pont Neural", ar: "الجسر العصبي" },
      subtitle: { en: "Connect Mobile Sensor Node", fr: "Connecter le nœud de capteur mobile", ar: "توصيل عقدة الاستشعار المتنقلة" },
      description: { en: "Offload visual processing to your mobile device's dedicated neural engine. This reduces CPU load on your main workstation and allows for flexible sensor placement.", fr: "Déchargez le traitement visuel sur le moteur neuronal dédié de votre appareil mobile. Cela réduit la charge CPU sur votre poste de travail principal et permet un placement flexible des capteurs.", ar: "قم بتفريغ المعالجة البصرية إلى المحرك العصبي المخصص لجهازك المحمول. هذا يقلل من حمل وحدة المعالجة المركزية على محطة العمل الرئيسية الخاصة بك ويسمح بوضع مرن لأجهزة الاستشعار." },
      steps: { en: "1. Open DevWell on your mobile device.\n2. Select \"Link with Computer\" on login.\n3. Scan this neural imprint.", fr: "1. Ouvrez DevWell sur votre appareil mobile.\n2. Sélectionnez « Lier avec l'ordinateur » à la connexion.\n3. Scannez cette empreinte neurale.", ar: "1. افتح DevWell على جهازك المحمول.\n2. اختر \"الربط مع الكمبيوتر\" عند تسجيل الدخول.\n3. امسح هذه البصمة العصبية." },
      generate: { en: "Generate Link Signal", fr: "Générer le signal de liaison", ar: "توليد إشارة الربط" },
      session: { en: "Session", fr: "Session", ar: "جلسة" }
    }
  },
};

