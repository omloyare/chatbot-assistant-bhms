// Environment variable configuration and validation
export const getEnvVar = (key: string, required = true): string => {
  const value = import.meta.env[key];
  if (!value && required) {
    console.error(`Missing required environment variable: ${key}`);
    return '';
  }
  return value || '';
};

export const config = {
  supabase: {
    url: getEnvVar('VITE_SUPABASE_URL', true),
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY', true),
  },
} as const;