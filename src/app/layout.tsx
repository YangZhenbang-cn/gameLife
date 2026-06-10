import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../lib/ThemeProvider';

export const metadata: Metadata = {
  title: 'Game Life - 游戏化个人状态面板',
  description: 'RPG 风格个人状态面板，多主题切换，本地优先，支持导入导出',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}