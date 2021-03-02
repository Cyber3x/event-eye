import React from 'react'

import twLogo from '../assets/images/twitter_w.png'
import fbLogo from '../assets/images/facebook_w.png'
import igLogo from '../assets/images/instagram_w.png'

import visa from '../assets/images/visa.png'
import erste from '../assets/images/erste.png'
import paypal from '../assets/images/paypal.png'
import mastercard from '../assets/images/mastercard.png'

const MainItem = ({ children }) => (
  <li className="text-white font-opensans mb-10 font-medium">{children}</li>
)

const Item = ({ children }) => (
  <li className="text-gray-500 font-opensans mb-5 text-sm font-semibold flex">
    {children}
  </li>
)
const Footer = () => {
  return (
    <div className="w-full" style={{ backgroundColor: '#080935' }}>
      <div className="w-3/4 mx-auto pt-20 pb-10 flex justify-between">
        <ul>
          <MainItem>Proizvod</MainItem>
          <Item>Glavne točke</Item>
          <Item>Cijena</Item>
          <Item>Booking</Item>
          <Item>Developeri</Item>
        </ul>
        <ul>
          <MainItem>Istraži više</MainItem>
          <Item>Kako funkcionira</Item>
          <Item>Prodavaj karte</Item>
          <Item>Postani verificirani</Item>
          <Item>Organizatori događaja</Item>
        </ul>
        <ul>
          <MainItem>Poveži se s nama</MainItem>
          <Item>Korisnička podrška</Item>
          <Item>
            <img
              src={twLogo}
              alt="twitter logo"
              className="w-5 h-5 mr-2"
              style={{ filter: 'opacity(0.5)' }}
            />
            Twitter
          </Item>
          <Item>
            <img
              src={igLogo}
              alt="instagram logo"
              className="w-5 h-5 mr-2"
              style={{ filter: 'opacity(0.5)' }}
            />
            Instagram
          </Item>
          <Item>
            <img
              src={fbLogo}
              alt="facebook logo"
              className="w-5 h-5 mr-2"
              style={{ filter: 'opacity(0.5)' }}
            />
            Facebook
          </Item>
        </ul>
        <ul>
          <MainItem>Metode plaćanja</MainItem>
          <div className="flex mb-6">
            <img src={visa} className="mr-4" />
            <img src={mastercard} />
          </div>
          <div className="flex">
            <img src={paypal} className="mr-4" />
            <img src={erste} />
          </div>
        </ul>
      </div>
      <p className="text-gray-500 text-sm text-center pb-10">
        &copy; Copyright 2021,{' '}
        <a href="https://github.com/Cyber3x">Neven Lukić</a>
      </p>
    </div>
  )
}

export default Footer
