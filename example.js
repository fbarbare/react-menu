import React from 'react';
import ReactDOM from 'react-dom';
var PureMixin = require('react-pure-render/mixin');
var StyleRoot = require('radium').StyleRoot;
import {NavBar, PanelMenu} from './index';
import {fromJS} from 'immutable';

var NavBarPanelMenuExample = React.createClass({
  mixins: [PureMixin],

  onMenuButtonClick: function () {
    this.refs.panelMenu.toggleMenu();
  },

  onTranslationClick: function () {
    this.refs.panelMenu.toggleMenu();
  },

  render: function () {
    var categories = fromJS([
      {
        "id": 0,
        "text": "Home",
        "logo": "FaHome",
        "color": "red",
        "highlight": true
      },
      {
        "id": 1,
        "text": "Destinations",
        "url": "/category/destinations",
        "picture": "/photos/destinations/IMG_4626.jpg",
        "description": "Start your trip on The Search Of Happiness! Get all the information you need to start your (around the world or not) journey.",
        "keywords": "destination, destinations, traveling, travel, travels, trip, trips, voyage, around the world, backpack, backpacking, visit, visiting",
        "logo": "FaPlane",
        "parentId": 0,
        "color": "#03a9f4"
      },
      {
        "id": 3,
        "text": "Fashion",
        "url": "/category/fashion",
        "picture": "/photos/fashion/fashion.JPG",
        "description": "Wanna know more about fashion shows? About fashion/beauty products before buying them? That's the right place!",
        "keywords": "fashion, fashion show, makeup, beauty",
        "logo": "FaSuitcase",
        "parentId": 0,
        "color": "#f0891f"
      },
      {
        "id": 2,
        "text": "Food",
        "url": "/category/food",
        "picture": "/photos/food/IMG_2788-2.JPG",
        "description": "Foodie? We are... Check out our restaurant reviews and make sure you get the best dish on the menu!",
        "keywords": "dining, foodie, food, dish, eat, restaurant, reviews",
        "logo": "FaCutlery",
        "parentId": 0,
        "color": "#0f9d58"
      }
    ]);

    var socialMedias = fromJS([
      [
        {type: "link", "name": "snapchat", "logo": "FaSnapchatGhost", "link": "https://www.snapchat.com/add/tsohappiness"},
        {type: "link", "name": "instagram", "logo": "FaInstagram", "link": "https://www.instagram.com/thesearchofhappiness/"},
        {type: "link", "name": "youtube", "logo": "FaYoutube", "link": "https://www.youtube.com/channel/UCYD9J-DtfDNK2oFCXSDWXyg"}
      ],
      [
        {type: "separator"}
      ],
      [
        {type: "button", "name": "translation", "logo": "FaLanguage", color: "#5591f2", "onClick": this.onTranslationClick}
      ]
    ]);

    var footerItems = fromJS([
      {
        "text": "Copyright 2016 The Search Of Happiness",
        "logo": "FaCopyright"
      },
      {
        "text": "All Rights Reserved"
      },
      {
        "text": "Blog Policy",
        "logo": "FaBook",
        "url": "/policy"
      }
    ]);
    return (
      <StyleRoot>
        <NavBar rootHref="/" logo="https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png" boxShadow onMenuButtonClick={this.onMenuButtonClick} translationActive={true} navItems={socialMedias} backgroundColor="oldlace" color="brown" />
        <PanelMenu ref="panelMenu" logo="T.S.O.H." menuItems={categories} footerItems={footerItems} defaultOpen backgroundColor="oldlace" backgroundColor="oldlace" color="brown" />
      </StyleRoot>
    );
  }
});

ReactDOM.render(
  <NavBarPanelMenuExample />,
  document.getElementById('app')
);
