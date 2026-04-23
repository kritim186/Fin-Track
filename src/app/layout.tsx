import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'FinTrack',
  description: 'Personal Finance Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-center" richColors theme="system" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
