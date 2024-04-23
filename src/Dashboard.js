import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import Purchases from './Purchases';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import './App.css';

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [purchaseData, setPurchaseData] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const chartRef = useRef(null);
  const productBChartRef = useRef(null);

  const dummyProducts = [
    { id: 1, name: 'ASUS VivoBook 15', image: 'https://m.media-amazon.com/images/I/71lYhcc++AL._SX679_.jpg', details: 'ASUS VivoBook 15 (2021), 15.6-inch (39.62 cm) HD, Dual Core Intel Celeron N4020, Thin and Light Laptop (4GB RAM/256GB SSD/Integrated Graphics/Windows 11 Home/Transparent Silver/1.8 Kg), X515MA-BR011W', price: '19,990', category: 'laptop' },
    { id: 2, name: 'Samsung Galaxy Book2', image: 'https://m.media-amazon.com/images/I/41o33bhM6YL._SX300_SY300_QL70_FMwebp_.jpg', details: 'Samsung Galaxy Book2 (NP750) Intel 12th Gen core i5 39.6cm (15.6") FHD Thin & Light Laptop (8 GB/512 GB/Windows 11/MS Office/Backlit Keyboard/Finger Print Reader/Silver/1.55Kg), NP750XED-KC1IN', price: '49,190', category: 'laptop' },
    { id: 3, name: 'HP Laptop 15s', image: 'https://m.media-amazon.com/images/I/41WIy4Od4mL._SX300_SY300_QL70_FMwebp_.jpg', details: 'HP Laptop 15s, 12th Gen Intel Core i3, 15.6-inch (39.6 cm), 8GB DDR4, 512GB SSD, Thin & Light, Dual Speakers (Win 11, MSO 2021, Silver, 1.69 kg), fq5007TU / FQ5327TU', price: '37,280', category: 'laptop' },
    { id: 4, name: 'Lenovo IdeaPad Gaming 3', image: 'https://m.media-amazon.com/images/I/513Gb-OHibL._SY300_SX300_QL70_FMwebp_.jpg', details: 'Lenovo IdeaPad Gaming 3 11th Gen Intel Core i5-11320H 15.6" (39.62cm) FHD IPS 60Hz Gaming Laptop (8GB/512GB SSD/Windows 11/NVIDIA RTX 2050 4GB/Alexa/3 Month Game Pass/Shadow Black/2.25Kg), 82K101PCIN', price: '47,990', category: 'laptop' },
    { id: 5, name: 'Acer Nitro V Gaming', image: 'https://m.media-amazon.com/images/I/61ADMalIXWL._SX679_.jpg', details: 'HP Chromebook x360 Intel Celeron N4120 14 inch(35.6 cm) Micro-Edge, Touchscreen, 2-in-1 Laptop (4GB RAM/64GB eMMC/Chrome OS 64/UHD Graphics,1.49kg), 14a-ca0504TU', price: '26,990', category: 'laptop' },
    { id: 6, name: 'HP Chromebook x360', image: 'https://m.media-amazon.com/images/I/4144VzbbZ6L._SX300_SY300_QL70_FMwebp_.jpg', details: 'Acer Nitro V Gaming Laptop 13th Gen Intel Core i5-13420H with RTX 4050 Graphics 6GB VRAM, 144Hz Display (16GB DDR5/512GB SSD/Windows 11 Home/Wi-Fi 6),15.6"(39.6cms) FHD ANV15-51', price: '77,875', category: 'laptop' },

    { id: 7, name: 'Redmi Note 13', image: 'https://m.media-amazon.com/images/I/41ZlnmlOM-L._SX300_SY300_QL70_FMwebp_.jpg', details: 'Redmi Note 13 5G (Arctic White, 6GB RAM, 128GB Storage) | 5G Ready | 120Hz Bezel-Less AMOLED | 7.mm Slimmest Note Ever | 108MP Pro-Grade Camera', price: '17,999', category: 'Mobile' },
    { id: 8, name: 'Oneplus Nord CE4', image: 'https://m.media-amazon.com/images/I/41bkMtA7usL._SX300_SY300_QL70_FMwebp_.jpg', details: 'Oneplus Nord CE4 (Celadon Marble, 8GB RAM, 256GB Storage)', price: '26,999', category: 'Mobile' },
    { id: 9, name: 'Vivo Y28', image: 'https://m.media-amazon.com/images/I/41htSxLeR3L._SY300_SX300_.jpg', details: 'Vivo Y28 5G (Glitter Aqua, 8GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers', price: '16,999', category: 'Mobile' },
    { id: 10, name: 'realme NARZO 70 Pro', image: 'https://m.media-amazon.com/images/I/41nRYrr3FGL._SX300_SY300_QL70_FMwebp_.jpg', details: 'realme NARZO 70 Pro 5G (Glass Green, 8GB RAM,128GB Storage) Dimensity 7050 5G Chipset | Horizon Glass Design | Segment 1st Flagship Sony IMX890 OIS Camera', price: '19,999', category: 'Mobile' },
    { id: 11, name: 'Samsung Galaxy M34', image: 'https://m.media-amazon.com/images/I/91ItZJh1FDL._SX679_.jpg', details: 'Samsung Galaxy M34 5G (Prism Silver,6GB,128GB)|120Hz sAMOLED Display|50MP Triple No Shake Cam|6000 mAh Battery|4 Gen OS Upgrade & 5 Year Security Update|12GB RAM with RAM+|Android 13|Without Charger', price: '14,999', category: 'Mobile' },
    { id: 12, name: 'TECNO Spark 20C', image: 'https://m.media-amazon.com/images/I/61iI4i1KmqL._SX679_.jpg', details: 'TECNO Spark 20C | Mystery White, (16GB*+128GB) | 50MP Main Camera + 8MP Selfie| 90Hz Dot-in Display with Dynamic Port & Dual Speakers with DTS | 5000mAh Battery |18W Type-C | Helio G36 Processor', price: '8,999', category: 'Mobile' },

    { id: 13, name: 'HONOR Pad 9', image: 'https://m.media-amazon.com/images/I/415gV21fNCL._SX300_SY300_QL70_FMwebp_.jpg', details: 'HONOR Pad 9 with Free Bluetooth Keyboard, 12.1-Inch 2.5K Display, 16GB (8+8GB Extended), 256GB Storage, Snapdragon 6 Gen 1 (4nm), 8 Speakers, Up-to 17 Hours, Android 13, WiFi Tablet, Metal Body, Gray', price: '24,999', category: 'tablet' },
    { id: 14, name: 'Xiaomi Pad 6', image: 'https://m.media-amazon.com/images/I/41o33bhM6YL._SX300_SY300_QL70_FMwebp_.jpg', details: 'Xiaomi Pad 6| Qualcomm Snapdragon 870| Powered by HyperOS | 144Hz Refresh Rate| 6GB, 128GB| 2.8K+ Display (11-inch/27.81cm) Tablet| Dolby Vision Atmos| Quad Speakers| Wi-Fi| Gray', price: '25,999', category: 'tablet' },
    { id: 15, name: 'Samsung Galaxy Tab A', image: 'https://m.media-amazon.com/images/I/31A9a+9u4tL._SX300_SY300_.jpg', details: 'Samsung Galaxy Tab A 10.1 Wi-Fi+4G Tablet 25.65 cm (10.1 inch), RAM 2 GB, ROM 32GB, Black', price: '12,495', category: 'tablet' },
    { id: 16, name: 'OnePlus Pad Go', image: 'https://m.media-amazon.com/images/I/31VKTpmJ6pL._SX300_SY300_QL70_FMwebp_.jpg', details: 'OnePlus Pad Go 28.85cm (11.35 inch) 2.4K 7:5 Ratio ReadFit Eye Care LCD Display, Dolby Atmos Quad Speakers, 4G LTE(Calling) + Wi-Fi Connectivity Tablet, 8GB RAM 128 GB Storage Expandable Up-to 1TB', price: '21,999', category: 'tablet' },
    { id: 17, name: 'Lenovo Tab M10 FHD Plus', image: 'https://m.media-amazon.com/images/I/41TsQphTpGL._SX300_SY300_QL70_FMwebp_.jpg', details: 'Lenovo Tab M10 FHD Plus(3rd Gen)| 10.61 Inch, 2K Display| 4 GB RAM, 128 GB ROM| Wi-Fi| Snapdragon Processor| 7700 mAH Battery| Quad Speakers with Dolby Atmos| TÜV Rheinland Low Blue Light Certified', price: '12,999', category: 'tablet' },
    { id: 18, name: 'realme Pad 2', image: 'https://m.media-amazon.com/images/I/71Ke-Of0OQL._SX679_.jpg', details: 'realme Pad 2 8 GB RAM 256 GB ROM 11.5 inch with Wi-Fi+4G Tablet (Imagination Grey)', price: '20,999', category: 'tablet' },
  ];

  const dummyPurchaseData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Purchased Products (A)',
        data: [10, 20, 15, 30, 25, 35, 20, 40, 30, 45, 50, 55],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (activeMenuItem === 'dashboard') {
      setTotalProducts(dummyProducts.length);
      setTotalPurchases(dummyPurchaseData.datasets[0].data.reduce((acc, curr) => acc + curr, 0));
      setPurchaseData(dummyPurchaseData);
    }
  }, [activeMenuItem]);

  useEffect(() => {
    if (!chartRef.current || !purchaseData) return;

    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: purchaseData,
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            labels: dummyPurchaseData.labels,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [purchaseData]);

  useEffect(() => {
    if (!productBChartRef.current) return;

    const productBData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Sales of products',
          data: [5000, 6000, 5500, 7000, 6500, 7500, 6000, 8000, 7000, 8500, 9000, 9500],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const productBChartInstance = new Chart(productBChartRef.current, {
      type: 'pie',
      data: productBData,
      options: {
        responsive: true,
      },
    });

    return () => {
      productBChartInstance.destroy();
    };
  }, []);

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item === 'Dashboard' ? 'dashboard' : item);
    setIsSidebarOpen(false);

    setShowAboutPage(item.toLowerCase() === 'about');
    setShowContactPage(item.toLowerCase() === 'contact');
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar activeMenuItem={activeMenuItem} onMenuItemClick={handleMenuItemClick} />
      </div>
      <div className={`main-content ${activeMenuItem !== 'dashboard' ? 'full-width' : ''}`}>
        <div className="menu-toggle" onClick={toggleSidebar}>
          <div className={`hamburger-icon ${isSidebarOpen ? 'open' : ''}`} />
        </div>
        {showAboutPage && <AboutPage />}
        {showContactPage && <ContactPage />}
        {activeMenuItem === 'dashboard' && (
          <div className="dashboard-blocks">
            <div className="block1">
              <h2>Total Products <br></br><br></br>{totalProducts}</h2>
              <FontAwesomeIcon icon={faCubes} className="icon" />
            </div>
            <div className="block2">
              <h2>Total Purchases <br></br><br></br>{totalPurchases}</h2>
              <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            </div>
          </div>
        )}
        {activeMenuItem === 'dashboard' && (
          <div className="chart-container">
            <h2>Purchased Products</h2>
            <canvas ref={chartRef} />
          </div>
        )}
        {activeMenuItem === 'dashboard' && (
          <div className="chart-container" id="productBChartContainer">
            <h2>Sales/Profit</h2>
            <canvas ref={productBChartRef} />
          </div>
        )}

        {activeMenuItem === 'products' && (
          <ProductList products={dummyProducts} />
        )}
        {activeMenuItem === 'purchases' && (
          <Purchases purchaseData={purchaseData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
