import { BrowserRouter } from 'react-router-dom';
import Nav from './components/nav'
// import Nav2 from './components/nav2'
import Category from './components/productCategory'
import Slider from './components/slider'
import WWA from './components/wwa'
import HDB from './components/hdb'
import HotDeals from './components/hotdeals'
import TSOTW from './components/tsotw'
import RFY from './components/rfy'
import Review from './components/review'
import FooterMain from './components/footermain'
import FooterPayment from './components/footerpayment'
import WhatsAppChat from './components/WhatsAppChat'
import ScrollToTop from './components/ScrollToTop'
// import { ModalProvider } from './ModalContext';
// import Search from './components/search'

export default function App() {


  return (
    <BrowserRouter>
      {/* <ModalProvider>
        <Nav />
      </ModalProvider> */}
      {/* <Nav2/> */}
      <Nav />
      {/* <Search/> */}
      <Category />
      <Slider />
      <div className='container mx-auto px-4 py-8 items-center justify-between'>
        <WWA />
      </div>
      <HDB />
      <HotDeals />
      <TSOTW />
      <RFY />
      <Review />
      <FooterMain />
      <FooterPayment />
      <WhatsAppChat />
      <ScrollToTop />
    </BrowserRouter>
  )
}