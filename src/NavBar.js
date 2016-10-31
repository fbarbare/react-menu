var path = require('path');
var React = require('react');
var Icons = require('react-icons/lib/fa');
var PureMixin = require('react-pure-render/mixin');
var Radium = require('radium');
var StyleRoot = require('radium').StyleRoot;
var Link = require('react-router').Link;
var LinkRadium = Radium(Link);
var isUrl = require('is-url');
var colors = require('./stylesVariables').colors;

var height = '50px';

var styles = {
  nav: {
    position: 'fixed',
    zIndex: 20,
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    padding: '0 10px',
    width: '100%',
    height: height,
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
    position: 'relative',
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
  item_dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    display: 'none',
    padding: '15px 20px 15px 20px',
    lineHeight: 'normal'
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

  componentWillMount: function () {
    if (typeof document === 'object' && document.body) {
      document.body.addEventListener('click', this.onBodyClick);
    }

    this.setState({activeItem: null});
  },
  componentWillUnmount: function () {
    if (typeof document === 'object' && document.body) {
      document.body.removeEventListener('click', this.onBodyClick);
    }
  },

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

  onBodyClick: function (event) {
    if (this.state.activeItem) {
      var activeElement = this.refs[this.state.activeItem + '-dropdown'];

      if (activeElement && !activeElement.contains(event.target)) {
        this.closeItemDropdown();
      }
    }
  },
  itemClick: function (item) {
    var newActiveItem = item.get('name');

    if (newActiveItem !== this.state.activeItem) {
      this.openItemDropdown(newActiveItem);
    }

    if (typeof item.get('onClick') === 'function') {
      item.get('onClick')();
    }
  },
  closeItemDropdown: function () {
    var self = this;

    setTimeout(function () {
      if (self.state.activeItem) {
        self.setState({activeItem: null});
      }
    }, 1);
  },
  openItemDropdown: function (activeItem) {
    var self = this;

    setTimeout(function () {
      self.setState({activeItem: activeItem});
    }, 1);
  },

  render: function () {
    var self = this,
        props = self.props,
        color = self.getColor(),
        backgroundColor = self.getBackgroundColor(),
        boxShadow = self.getBoxShadow(),
        logo;

    if (typeof props.logo === 'function') {
      logo = <props.logo />;
    } else if (isUrl(props.logo)) {
      logo = <img src={props.logo} style={styles.logo_image} />;
    } else {
      logo = props.logo;
    }

    return (
      <section style={!props.overflowSite ? {height} : null}>
        <StyleRoot>
          <div ref="nav" style={[styles.nav, {color: color, backgroundColor: backgroundColor, boxShadow: boxShadow}]}>
            {props.menuButtonActive !=== false
              <button style={styles.menu_button} onClick={self.onMenuButtonClick}>
                <Icons.FaBars />
              </button>
            }
            <LinkRadium className="notranslate" style={styles.logo} to={props.rootHref || '/'}>
              {logo}
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
        </StyleRoot>
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
    var self = this;
    var itemName = item.get('name');
    var isActive = itemName === this.state.activeItem;
    var dropdown = item.get('dropdown');
    var Icon = Icons[item.get('logo')];
    var style = {};


    if (Icon) {
      if (item.get('color')) {
        style.color = item.get('color');
      }

      if (dropdown) {
        var Component = dropdown.get('component');
        var props = dropdown.get('props');
        var color = dropdown.get('color') || this.getColor();
        var backgroundColor = dropdown.get('backgroundColor') || this.getBackgroundColor();
        var boxShadow = this.getBoxShadow();

        if (props) {
          props = props.toJS();
        }
      }

      return (
        <li ref={itemName} key={'nav-item-' + itemName} style={styles.item}>
          <button key={'nav-item-link-' + item.get('name')} style={[styles.item_link, style]} onClickCapture={self.itemClick.bind(self, item)}>
            <Icon />
          </button>
          {dropdown
            ? <div ref={itemName + '-dropdown'} style={[styles.item_dropdown, {color: color, backgroundColor: backgroundColor, boxShadow: boxShadow}, isActive ? {display: 'block'} : null]}>
                <Component {...props} />
              </div>
            : null
          }

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
