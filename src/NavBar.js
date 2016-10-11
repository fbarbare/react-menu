var path = require('path');
var React = require('react');
var Radium = require('radium');
var Link = require('react-router').Link;
var LinkRadium = Radium(Link);
var isUrl = require('is-url');
var StyleRoot = require('radium').StyleRoot;
var PureMixin = require('react-pure-render/mixin');
var Icons = require('react-icons/lib/fa');
var colors = require('./stylesVariables').colors;

var styles = {
  nav: {
    position: 'fixed',
    zIndex: 20,
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    padding: '0 10px',
    width: '100%',
    height: '50px',
    lineHeight: '50px',
    transition: '.1s 0s ease-in-out'
  },

  menu_button: {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '0 5px 3px 5px',
    height: '100%',
    border: 'none',
    fontSize: '14px',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',

    '@media (min-width: 500px)': {
      padding: '0 15px 3px 15px',
      fontSize: '16px'
    }
  },

  logo: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: '5px',
    height: '100%',
    color: 'inherit',
    fontSize: '14px',
    fontFamily: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',

    '@media (min-width: 500px)': {
      fontSize: '18px'
    },
    '@media (min-width: 800px)': {
      fontSize: '22px'
    }
  },

  logo_image: {
    boxSizing: 'border-box',
    padding: '5px 0',
    maxWidth: '100%',
    maxHeight: '100%'
  },

  items: {
    display: 'inline-block',
    float: 'right',
    margin: 0,
    padding: 0,
    height: '100%'
  },

  item: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    height: '100%',
    listStyle: 'none',
    padding: '0 5px',
    fontSize: '14px',
    backgroundColor: 'transparent',

    '@media (min-width: 500px)': {
      fontSize: '18px'
    }
  },

  item_link: {
    display: 'inline-block',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    border: 0,
    padding: 0,
    height: '100%',
    opacity: 1,
    font: 'inherit',
    color: 'inherit',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    cursor: 'pointer',

    ':hover': {
      opacity: 0.6
    }
  },

  separator: {
    margin: '14px 0px',
    width: '1px',
    height: 'calc(100% - 28px)',
    opacity: 0.6,
    cursor: 'initial',

    '@media (min-width: 500px)': {
      margin: '12px 0px',
      height: 'calc(100% - 24px)'
    }
  }
};

var NavBar = React.createClass({
  mixins: [PureMixin],

  onMenuButtonClick: function (event) {
    if (typeof this.props.onMenuButtonClick === 'function') {
      this.props.onMenuButtonClick(event);
    }
  },

  getColor: function () {
    return colors[this.props.color || 'dark1'] || this.props.color;
  },
  getBackgroundColor: function () {
    return colors[this.props.backgroundColor || 'light1'] || this.props.backgroundColor;
  },
  getBoxShadow: function () {
    return this.props.boxShadow ? '0 1px 8px rgba(0,0,0,0.3)' : 'initial';
  },

  render: function () {
    var self = this,
        props = self.props,
        rootHref = props.rootHref || '/',
        logo = props.logo || '',
        Logo,
        color = self.getColor(),
        backgroundColor = self.getBackgroundColor(),
        boxShadow = self.getBoxShadow();

    if (typeof logo === 'function') {
      Logo = props.logo;
    } else if (isUrl(logo)) {
      Logo = <img src={logo} style={styles.logo_image} />;
    } else {
      Logo = logo;
    }

    return (
      <section>
        <div ref="nav" style={[styles.nav, {color: color, backgroundColor: backgroundColor, boxShadow: boxShadow}]}>
          <button style={styles.menu_button} onClick={self.onMenuButtonClick}>
            <Icons.FaBars />
          </button>
          <LinkRadium className="notranslate" style={styles.logo} to={rootHref}>
            {Logo}
          </LinkRadium>
          {props.navItems
            ? <ul style={styles.items}>
                {props.navItems.map(function (navItemGroup, index) {
                  return navItemGroup.map(function (item) {
                    switch (item.get('type')) {
                      case 'button':
                        return self.renderButton(item);
                      case 'link':
                        return self.renderLink(item);
                      case 'separator':
                        return self.renderSeparator(item);
                    };
                  });
                })}
              </ul>
            : null
          }
        </div>
      </section>
    )
  },

  renderSeparator: function (item) {
    var backgroundColor = item.get('color') || this.getColor();

    return (
      <li key="nav-item-separator" style={styles.item}>
        <span key="nav-item-separator-line" style={[styles.item_link, styles.separator, {backgroundColor: backgroundColor}]}></span>
      </li>
    );
  },

  renderButton: function (item) {
    var Icon = Icons[item.get('logo')];
    var style = {};

    if (item.get('color')) {
      style.color = item.get('color');
    }

    if (Icon) {
      return (
        <li key={'nav-item-' + item.get('name')} style={styles.item}>
          <button key={'nav-item-link-' + item.get('name')} style={[styles.item_link, style]} onClick={item.get('onClick')}>
            <Icon />
          </button>
        </li>
      );
    } else {
      console.error('The icon ' + item.get('logo') + ' does not exist.');
    }
  },

  renderLink: function (item) {
    var Icon = Icons[item.get('logo')];
    var style = {};

    if (item.get('color')) {
      style.color = item.get('color');
    }

    if (Icon) {
      return (
        <li key={'nav-item-' + item.get('name')} style={styles.item}>
          <a key={'nav-item-link-' + item.get('name')} style={[styles.item_link, style]} target="_blank" href={item.get('link')} onClick={item.get('onClick')}>
            <Icon />
          </a>
        </li>
      );
    } else {
      console.error('The icon ' + item.get('logo') + ' does not exist.');
    }
  }
});

module.exports = Radium(NavBar);
