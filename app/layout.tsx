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
      <body className={`${poppins.className} `}>
        
     
        
        {children}
      

      </body>
    </html>
  );
}