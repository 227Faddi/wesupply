import { montserrat, inter, poppins,  } from "./components/ui/fonts";
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
        className={`${poppins.className} ${montserrat.className}}  antialiased flex`}
        style={{ background: '#fff' }}
      >
        
       
        <div
          className="flex-1 custom-scrollbar"
          style={{  background: '#fff' }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}