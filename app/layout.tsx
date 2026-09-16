import type { Metadata } from 'next';
import './globals.css';
import './brand.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: { default: 'LAMA Travelers | Experiencias en San Pedro de Atacama', template: '%s | LAMA Travelers' },
  description: 'Expediciones, tours, montaña, astronomía, wellness y transfers en San Pedro de Atacama. Diseñamos tu experiencia en Atacama.',
  metadataBase: new URL('https://lamatravelers.com'),
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
  openGraph: { title:'LAMA Travelers', description:'Atacama, hecho a tu medida.', type:'website', locale:'es_CL' }
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="es"><body><Header/><main>{children}</main><Footer/><WhatsAppButton/></body></html>
}
