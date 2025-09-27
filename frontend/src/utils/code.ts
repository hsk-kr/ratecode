export type SupportedLanguage = (typeof supportedLanguages)[number];

export const supportedLanguages = [
  'text',
  'typescript',
  'javascript',
  'golang',
  'rust',
  'python',
  'java',
  'kotlin',
  'csharp',
  'html',
  'c_cpp',
  'ruby',
  'php',
  'lua',
] as const;

export const convertLanguageToCodeViewerLanguage = (
  language: SupportedLanguage
): string => {
  const codeViewerLanguages: Record<SupportedLanguage, string> = {
    text: 'plaintext',
    typescript: 'typescript',
    javascript: 'javascript',
    golang: 'go',
    rust: 'rust',
    python: 'python',
    java: 'java',
    kotlin: 'kotlin',
    csharp: 'csharp',
    html: 'html',
    c_cpp: 'cpp',
    ruby: 'ruby',
    php: 'php',
    lua: 'lua',
  };

  return codeViewerLanguages[language];
};
