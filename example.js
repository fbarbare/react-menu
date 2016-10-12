import React from 'react';
import ReactDOM from 'react-dom';
import PureMixin from 'react-pure-render/mixin';
import {fromJS} from 'immutable';
import {StyleRoot} from 'radium';
import {NavBar, PanelMenu} from './src/index';

var NavBarPanelMenuExample = React.createClass({
  mixins: [PureMixin],

  onMenuButtonClick: function () {
    this.refs.panelMenu.toggleMenu();
  },

  render: function () {
    var categories = fromJS([
      {
        "text": "Home",
        "logo": "FaHome",
        "color": "red",
        "highlight": true
      },
      {
        "text": "Destinations",
        "url": "/category/destinations",
        "logo": "FaPlane",
        "color": "#03a9f4"
      },
      {
        "text": "Fashion",
        "url": "/category/fashion",
        "logo": "FaSuitcase",
        "color": "#f0891f"
      },
      {
        "text": "Food",
        "url": "/category/food",
        "logo": "FaCutlery",
        "color": "#0f9d58"
      }
    ]);

    var socialMedias = fromJS([
      [
        {type: "link", "name": "snapchat", "logo": "FaSnapchatGhost", "link": "https://www.snapchat.com/add/myaccount"},
        {type: "link", "name": "instagram", "logo": "FaInstagram", "link": "https://www.instagram.com/myaccount/"},
        {type: "link", "name": "youtube", "logo": "FaYoutube", "link": "https://www.youtube.com/channel/myaccount"}
      ],
      [
        {type: "separator"}
      ],
      [
        {type: "button", "name": "translation", "logo": "FaLanguage", color: "#5591f2", component: 'div', props: {style: {width: '10px', height: '10px', backgroundColor: 'red'}}}
      ]
    ]);

    var footerItems = fromJS([
      {text: "Copyright 2016", logo: "FaCopyright"},
      {text: "All Rights Reserved"},
      {text: "Blog Policy", logo: "FaBook", url: "/policy"}
    ]);

    return (
      <StyleRoot>
        <NavBar rootHref="/" logo="My Site Name" onMenuButtonClick={this.onMenuButtonClick} navItems={socialMedias} color="brown" backgroundColor="oldlace" boxShadow />
        <PanelMenu ref="panelMenu" logo="My Logo" menuItems={categories} footerItems={footerItems} color="brown" backgroundColor="oldlace" boxShadow defaultOpen />
      </StyleRoot>
    );
  }
});

ReactDOM.render(
  <NavBarPanelMenuExample />,
  document.getElementById('app')
);
