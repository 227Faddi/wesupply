import { montserrat, inter, poppins } from "./components/ui/fonts";
import Header from "./components/layout/Header";
import Image from 'next/image';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${poppins.variable} antialiased flex`}
        style={{ background: '#fff' }}
      >
        <Navbar />
        <div className="w-1/5"></div>
        <div
          className="flex-1 custom-scrollbar"
          style={{ marginRight: '20vw', background: '#fff' }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}