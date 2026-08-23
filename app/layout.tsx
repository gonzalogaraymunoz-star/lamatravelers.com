import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'LAMA Travelers | Experiencias en San Pedro de Atacama', template: '%s | LAMA Travelers' },
  description: 'Expediciones, tours, montaña, astronomía, wellness y transfers en San Pedro de Atacama. Diseñamos tu experiencia en Atacama.',
  metadataBase: new URL('https://lamatravelers.com'),
  openGraph: { title:'LAMA Travelers', description:'Atacama, hecho a tu medida.', type:'website', locale:'es_CL' }
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="es"><body><Header/><main>{children}</main><Footer/></body></html>
}
