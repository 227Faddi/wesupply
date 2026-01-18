import type { Metadata } from 'next';
import './globals.css'

export const metadata: Metadata = {
  title: 'WeSupply - Healthy Meals Delivered Weekly',
  description: 'Get personalized meal plans delivered to your door. Save time, eat clean, hit your goals with WeSupply.',
  openGraph: {
    title: 'WeSupply - Healthy Meals Delivered Weekly',
    description: 'Get personalized meal plans delivered to your door.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#faf8f6]">
        {children}
      </body>
    </html>
  );
}
