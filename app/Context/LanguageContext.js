// app/Context/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Translation dictionaries
const translations = {
  English: {
    // Language Screen
    language: 'Language',
    selectLanguage: 'Select your preferred language for the app interface.',
    english: 'English',
    spanish: 'Spanish',
    french: 'French',
    german: 'German',
    chinese: 'Chinese',
    japanese: 'Japanese',
    
    // MovieScreenList & Navigation
    movies: 'Movies',
    series: 'Series',
    safehouseScreenings: 'Safehouse Screenings',
    watchlist: 'Watchlist',
    loginToAccess: 'Login to access Safehouse Screenings!',
    vionix: 'Vionix',
    
    // Settings Screen
    settings: 'Settings',
    accountSettings: 'Account Settings',
    notifications: 'Notifications',
    privacySecurity: 'Privacy & Security',
    helpSupport: 'Help & Support',
    aboutApp: 'About App',
    logout: 'Logout',
    logoutMessage: 'You have been logged out.',
    comingSoon: 'Coming Soon',
    featureNotImplemented: 'This feature is not implemented yet.',
    
    // Auth Screens
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    username: 'Username',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    signUp: "Sign Up",
    
    // Profile Screen
    profile: 'Profile',
    editProfile: 'Edit Profile',
    myWatchlist: 'My Watchlist',
    viewingHistory: 'Viewing History',
    
    // Search Screen
    search: 'Search',
    searchPlaceholder: 'Search movies, series...',
    
    // Favorites Screen
    favorites: 'Favorites',
    noFavorites: 'No favorites yet',
    
    // Movie Details
    description: 'Description',
    trailer: 'Trailer',
    watchNow: 'Watch Now',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    
    // Common
    home: 'Home',
    popular: 'Popular',
    topRated: 'Top Rated',
    nowPlaying: 'Now Playing',
    continueWatching: 'Continue Watching',
  },
  Spanish: {
    // Language Screen
    language: 'Idioma',
    selectLanguage: 'Selecciona tu idioma preferido para la interfaz de la aplicación.',
    english: 'Inglés',
    spanish: 'Español',
    french: 'Francés',
    german: 'Alemán',
    chinese: 'Chino',
    japanese: 'Japonés',
    
    // MovieScreenList & Navigation
    movies: 'Películas',
    series: 'Series',
    safehouseScreenings: 'Proyecciones de Safehouse',
    watchlist: 'Lista de seguimiento',
    loginToAccess: '¡Inicia sesión para acceder a las proyecciones de Safehouse!',
    vionix: 'Vionix',
    
    // Settings Screen
    settings: 'Configuración',
    accountSettings: 'Configuración de Cuenta',
    notifications: 'Notificaciones',
    privacySecurity: 'Privacidad y Seguridad',
    helpSupport: 'Ayuda y Soporte',
    aboutApp: 'Acerca de la App',
    logout: 'Cerrar Sesión',
    logoutMessage: 'Has cerrado sesión.',
    comingSoon: 'Próximamente',
    featureNotImplemented: 'Esta función no está implementada aún.',
    
    // Auth Screens
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    username: 'Nombre de Usuario',
    forgotPassword: '¿Olvidaste tu contraseña?',
    dontHaveAccount: "¿No tienes una cuenta?",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    signUp: "Registrarse",
    
    // Profile Screen
    profile: 'Perfil',
    editProfile: 'Editar Perfil',
    myWatchlist: 'Mi Lista',
    viewingHistory: 'Historial de Visualización',
    
    // Search Screen
    search: 'Buscar',
    searchPlaceholder: 'Buscar películas, series...',
    
    // Favorites Screen
    favorites: 'Favoritos',
    noFavorites: 'No hay favoritos aún',
    
    // Movie Details
    description: 'Descripción',
    trailer: 'Tráiler',
    watchNow: 'Ver Ahora',
    addToFavorites: 'Agregar a Favoritos',
    removeFromFavorites: 'Quitar de Favoritos',
    
    // Common
    home: 'Inicio',
    popular: 'Popular',
    topRated: 'Mejor Valorado',
    nowPlaying: 'En Cartelera',
    continueWatching: 'Continuar Viendo',
  },
  French: {
    // Language Screen
    language: 'Langue',
    selectLanguage: 'Sélectionnez votre langue préférée pour l\'interface de l\'application.',
    english: 'Anglais',
    spanish: 'Espagnol',
    french: 'Français',
    german: 'Allemand',
    chinese: 'Chinois',
    japanese: 'Japonais',
    
    // MovieScreenList & Navigation
    movies: 'Films',
    series: 'Séries',
    safehouseScreenings: 'Projections Safehouse',
    watchlist: 'Ma liste',
    loginToAccess: 'Connectez-vous pour accéder aux projections Safehouse !',
    vionix: 'Vionix',
    
    // Settings Screen
    settings: 'Paramètres',
    accountSettings: 'Paramètres du Compte',
    notifications: 'Notifications',
    privacySecurity: 'Confidentialité et Sécurité',
    helpSupport: 'Aide et Support',
    aboutApp: 'À Propos de l\'App',
    logout: 'Déconnexion',
    logoutMessage: 'Vous avez été déconnecté.',
    comingSoon: 'Bientôt Disponible',
    featureNotImplemented: 'Cette fonctionnalité n\'est pas encore implémentée.',
    
    // Auth Screens
    login: 'Connexion',
    register: 'S\'inscrire',
    email: 'E-mail',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    username: 'Nom d\'utilisateur',
    forgotPassword: 'Mot de passe oublié ?',
    dontHaveAccount: "Vous n'avez pas de compte ?",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    signUp: "S'inscrire",
    
    // Profile Screen
    profile: 'Profil',
    editProfile: 'Modifier le Profil',
    myWatchlist: 'Ma Liste',
    viewingHistory: 'Historique de Visionnage',
    
    // Search Screen
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher des films, séries...',
    
    // Favorites Screen
    favorites: 'Favoris',
    noFavorites: 'Aucun favori pour le moment',
    
    // Movie Details
    description: 'Description',
    trailer: 'Bande-annonce',
    watchNow: 'Regarder Maintenant',
    addToFavorites: 'Ajouter aux Favoris',
    removeFromFavorites: 'Retirer des Favoris',
    
    // Common
    home: 'Accueil',
    popular: 'Populaire',
    topRated: 'Mieux Notés',
    nowPlaying: 'Au Cinéma',
    continueWatching: 'Continuer à Regarder',
  },
  German: {
    // Language Screen
    language: 'Sprache',
    selectLanguage: 'Wählen Sie Ihre bevorzugte Sprache für die App-Oberfläche.',
    english: 'Englisch',
    spanish: 'Spanisch',
    french: 'Französisch',
    german: 'Deutsch',
    chinese: 'Chinesisch',
    japanese: 'Japanisch',
    
    // MovieScreenList & Navigation
    movies: 'Filme',
    series: 'Serien',
    safehouseScreenings: 'Safehouse Vorführungen',
    watchlist: 'Watchlist',
    loginToAccess: 'Melden Sie sich an, um auf Safehouse Vorführungen zuzugreifen!',
    vionix: 'Vionix',
    
    // Settings Screen
    settings: 'Einstellungen',
    accountSettings: 'Kontoeinstellungen',
    notifications: 'Benachrichtigungen',
    privacySecurity: 'Datenschutz & Sicherheit',
    helpSupport: 'Hilfe & Support',
    aboutApp: 'Über die App',
    logout: 'Abmelden',
    logoutMessage: 'Sie wurden abgemeldet.',
    comingSoon: 'Demnächst',
    featureNotImplemented: 'Diese Funktion ist noch nicht implementiert.',
    
    // Auth Screens
    login: 'Anmelden',
    register: 'Registrieren',
    email: 'E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',
    username: 'Benutzername',
    forgotPassword: 'Passwort vergessen?',
    dontHaveAccount: "Noch kein Konto?",
    alreadyHaveAccount: "Haben Sie bereits ein Konto?",
    signUp: "Registrieren",
    
    // Profile Screen
    profile: 'Profil',
    editProfile: 'Profil bearbeiten',
    myWatchlist: 'Meine Watchlist',
    viewingHistory: 'Wiedergabeverlauf',
    
    // Search Screen
    search: 'Suchen',
    searchPlaceholder: 'Filme, Serien suchen...',
    
    // Favorites Screen
    favorites: 'Favoriten',
    noFavorites: 'Noch keine Favoriten',
    
    // Movie Details
    description: 'Beschreibung',
    trailer: 'Trailer',
    watchNow: 'Jetzt ansehen',
    addToFavorites: 'Zu Favoriten hinzufügen',
    removeFromFavorites: 'Aus Favoriten entfernen',
    
    // Common
    home: 'Startseite',
    popular: 'Beliebt',
    topRated: 'Bestbewertet',
    nowPlaying: 'Jetzt im Kino',
    continueWatching: 'Weiterschauen',
  },
  Chinese: {
    // Language Screen
    language: '语言',
    selectLanguage: '选择您偏好的应用界面语言。',
    english: '英语',
    spanish: '西班牙语',
    french: '法语',
    german: '德语',
    chinese: '中文',
    japanese: '日语',
    
    // MovieScreenList & Navigation
    movies: '电影',
    series: '剧集',
    safehouseScreenings: '安全屋放映',
    watchlist: '观看列表',
    loginToAccess: '登录以访问安全屋放映！',
    vionix: 'Vionix',
    
    // Settings Screen
    settings: '设置',
    accountSettings: '账户设置',
    notifications: '通知',
    privacySecurity: '隐私与安全',
    helpSupport: '帮助与支持',
    aboutApp: '关于应用',
    logout: '退出登录',
    logoutMessage: '您已退出登录。',
    comingSoon: '即将推出',
    featureNotImplemented: '此功能尚未实现。',
    
    // Auth Screens
    login: '登录',
    register: '注册',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    username: '用户名',
    forgotPassword: '忘记密码？',
    dontHaveAccount: "没有账户？",
    alreadyHaveAccount: "已有账户？",
    signUp: "注册",
    
    // Profile Screen
    profile: '个人资料',
    editProfile: '编辑资料',
    myWatchlist: '我的列表',
    viewingHistory: '观看历史',
    
    // Search Screen
    search: '搜索',
    searchPlaceholder: '搜索电影、剧集...',
    
    // Favorites Screen
    favorites: '收藏',
    noFavorites: '暂无收藏',
    
    // Movie Details
    description: '简介',
    trailer: '预告片',
    watchNow: '立即观看',
    addToFavorites: '添加到收藏',
    removeFromFavorites: '从收藏中移除',
    
    // Common
    home: '首页',
    popular: '热门',
    topRated: '最高评分',
    nowPlaying: '正在上映',
    continueWatching: '继续观看',
  },
  Japanese: {
    // Language Screen
    language: '言語',
    selectLanguage: 'アプリのインターフェースで使用する言語を選択してください。',
    english: '英語',
    spanish: 'スペイン語',
    french: 'フランス語',
    german: 'ドイツ語',
    chinese: '中国語',
    japanese: '日本語',
    
    // MovieScreenList & Navigation
    movies: '映画',
    series: 'シリーズ',
    safehouseScreenings: 'セーフハウス上映',
    watchlist: 'ウォッチリスト',
    loginToAccess: 'セーフハウス上映にアクセスするにはログインしてください！',
    vionix: 'Vionix',
    
    // Settings Screen
    settings: '設定',
    accountSettings: 'アカウント設定',
    notifications: '通知',
    privacySecurity: 'プライバシーとセキュリティ',
    helpSupport: 'ヘルプとサポート',
    aboutApp: 'アプリについて',
    logout: 'ログアウト',
    logoutMessage: 'ログアウトしました。',
    comingSoon: '近日公開',
    featureNotImplemented: 'この機能はまだ実装されていません。',
    
    // Auth Screens
    login: 'ログイン',
    register: '登録',
    email: 'メール',
    password: 'パスワード',
    confirmPassword: 'パスワード確認',
    username: 'ユーザー名',
    forgotPassword: 'パスワードをお忘れですか？',
    dontHaveAccount: "アカウントをお持ちでないですか？",
    alreadyHaveAccount: "すでにアカウントをお持ちですか？",
    signUp: "登録",
    
    // Profile Screen
    profile: 'プロフィール',
    editProfile: 'プロフィール編集',
    myWatchlist: 'マイリスト',
    viewingHistory: '視聴履歴',
    
    // Search Screen
    search: '検索',
    searchPlaceholder: '映画、シリーズを検索...',
    
    // Favorites Screen
    favorites: 'お気に入り',
    noFavorites: 'お気に入りはまだありません',
    
    // Movie Details
    description: '説明',
    trailer: '予告編',
    watchNow: '今すぐ観る',
    addToFavorites: 'お気に入りに追加',
    removeFromFavorites: 'お気に入りから削除',
    
    // Common
    home: 'ホーム',
    popular: '人気',
    topRated: '高評価',
    nowPlaying: '現在公開中',
    continueWatching: '視聴を続ける',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [t, setT] = useState(translations.English);

  // Update translations when language changes
  useEffect(() => {
    setT(translations[language] || translations.English);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t, // Translation function
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};