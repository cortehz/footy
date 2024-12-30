import { AppSidebar } from '@/components/app-sidebar';
import { AppTopNav } from '@/components/app-top-nav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className} suppressHydrationWarning>
      <body className='flex flex-col bg-gray-100 text-foreground h-screen max-h-screen overflow-hidden'>
        <AppTopNav />
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <main className='flex flex-col items-center p-4 w-full bg-transparent mb-3 grow basis-0 overflow-y-auto'>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
