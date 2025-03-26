import { useEffect, useState } from 'react';
import Hero from '../pages/hero'
import WWA from '../pages/whatWeAre'
import Hotdeals from '../pages/hotdeals'
import TopSell from '../pages/topselling'
import Rfy from '../pages/recommend'
import Review from '../pages/review'
import MarketPrice from '../pages/marketPrice'
import CategorySlider from '../components/productCategory'
import axios from 'axios';  

const Home = () => 
{
    const [hotDeals, setHotDeals] = useState([]);
    const [marketPrices, setMarketPrices] = useState([]);
    const [topSelling, setTopSelling] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);
    const [newArrival, setNewArrival] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        // Fetch all section data when home page loads
        const fetchData = async () => {
          try {
            const [hotDealsRes, marketPricesRes, topSellingRes, bestSellerRes, newArrivalRes, topRatedRes, featuredRes] = await Promise.all([
              axios.get('/api/products?section=hotDeal'),
              axios.get('/api/products?section=todaysMarketPrice'),
              axios.get('/api/products?section=topSelling'),
              axios.get('/api/products?section=bestSeller'),
              axios.get('/api/products?section=newArrival'),
              axios.get('/api/products?section=topRated'),
              axios.get('/api/products?section=featured')
            ]);
            
            setHotDeals(hotDealsRes.data);
            setMarketPrices(marketPricesRes.data);
            setTopSelling(topSellingRes.data);
            setBestSeller(bestSellerRes.data);
            setNewArrival(newArrivalRes.data);
            setTopRated(topRatedRes.data);
            setFeatured(featuredRes.data);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
    
        fetchData();
      }, []);
    return (
        <div className='bg-slate-100/70'>
            <Hero />
            <WWA />
            <CategorySlider />
            <Hotdeals products={hotDeals} />
            <MarketPrice  products={marketPrices} />
            <TopSell products={topSelling} />
            <Rfy products={{ bestSeller, newArrival, topRated, featured }} />
            <Review />
        </div>
    );
};
export default Home;
