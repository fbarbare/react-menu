var path = require('path');
var React = require('react');
var Radium = require('radium');
var fromJS = require('immutable').fromJS;
var Link = require('react-router').Link;
var LinkRadium = Radium(Link);
var isUrl = require('is-url');
var StyleRoot = require('radium').StyleRoot;
var PureMixin = require('react-pure-render/mixin');
var Icons = require('react-icons/lib/fa');
var colors = require('./stylesVariables').colors;
var Color = require('color');

var styles = {
  overlay: {
    position: 'fixed',
    zIndex: 30,
    visibility: 'hidden',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    backgroundColor: '#000000',
    transition: 'visibility 0.5s linear 0s, opacity 0.5s'
  },
  overlay_active: {
    transition: 'visibility 0s linear 0s, opacity 0.5s',
    visibility: 'visible',
    opacity: '0.6'
  },

  container: {
    position: 'fixed',
    zIndex: 31,
    overflow: 'hidden',
    top: 0,
    left: 0,
    width: 0,
    height: '100%',
    boxShadow: '0 8px 17px 0 rgba(0,0,0,0.2)',
    transition: 'width 0.5s'
  },
  container_active: {
    width: '300px'
  },

  panel: {
    position: 'relative',
    width: '300px',
    height: '100%'
  },

  header: {
    boxSizing: 'border-box',
    display: 'table',
    padding: '10px 16px 0 16px',
    width: '100%',
    height: '54px'
  },
  header_title_container: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  header_title: {
    fontSize: '24px',
    textDecoration: 'none',
    fontFamily: 'inherit',
    color: 'inherit',
    cursor: 'pointer'
  },

  close_button_container: {
    textAlign: 'right',
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  close_button: {
    display: 'inline-flex',
    border: 'none',
    padding: '0 10px',
    fontSize: '30px',
    fontWeight: 'bold',
    color: 'inherit',
    background: 'transparent',
    cursor: 'pointer'
  },

  separator: {
    margin: '10px 0',
    borderStyle: 'solid',
    borderWidth: '0px 0px 1px 0px'
  },

  menu_items: {
    margin: 0,
    border: 0,
    padding: 0
  },
  menu_item: {
    listStyle: 'none'
  },
  menu_item_link: {
    display: 'block',
    padding: '0 10px 0 20px',
    height: '50px',
    lineHeight: '50px',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  menu_item_icon: {
    verticalAlign: 'middle',
    paddingRight: '20px',
    width: '40px',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'center'
  },
  menu_item_title: {
    verticalAlign: 'middle',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: '500'
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    boxSizing: 'border-box',
    margin: 0,
    border: 0,
    padding: '20px',
    width: '100%',
    fontSize: '10px'
  },
  footer_item: {
    listStyle: 'none'
  },
  footer_item_container: {
  },
  footer_item_container_link: {
    color: 'inherit',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  footer_item_icon_container: {
    width: '10px',
    height: '13px',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  footer_item_icon: {
    verticalAlign: 'baseline'
  },
  footer_item_text: {
    marginLeft: '2px',
    padding: '0',
    fontFamily: 'inherit'
  },

};

var PanelMenu = React.createClass({
  mixins: [PureMixin],

  componentWillMount: function () {
    this.setState({active: this.props.defaultOpen || false});
  },

  toggleMenu: function () {
    this.setState({active: !this.state.active});
  },
  openMenu: function () {
    this.setState({active: true});
  },
  closeMenu: function () {
    this.setState({active: false});
  },

  getColor: function () {
    return colors[this.props.color || 'dark1'] || this.props.color;
  },
  getColorLight: function () {
    var color = Color(this.getColor());

    return color.alpha(0.1).rgbString();
  },
  getBackgroundColor: function () {
    return colors[this.props.backgroundColor || 'light1'] || this.props.backgroundColor;
  },
  getBoxShadow: function () {
    return this.props.boxShadow ? '0 1px 8px rgba(0,0,0,0.3)' : 'initial';
  },

  render: function () {
    var self = this,
        isActive = false,
        props = self.props,
        rootHref = props.rootHref || '/',
        logo = self.props.logo,
        Logo,
        color = self.getColor(),
        colorLight = self.getColorLight(),
        backgroundColor = self.getBackgroundColor();

    if (self.state.active) {
      isActive = true;
    }

    if (typeof logo === 'function') {
      Logo = <props.logo />;
    } else if (isUrl(logo)) {
      Logo = <img src={logo} style={styles.logo_image} />;
    } else {
      Logo = logo;
    }

    return (
      <section>
        <StyleRoot>
          <div style={[styles.overlay, isActive ? styles.overlay_active : null]} onClick={self.closeMenu}></div>
          <div style={[styles.container, {color: color, backgroundColor: backgroundColor}, isActive ? styles.container_active : null]}>
            <div style={styles.panel}>
              <div style={styles.header}>
                <div style={styles.header_title_container}>
                  <LinkRadium className="notranslate" style={styles.header_title} to={rootHref} onClick={self.closeMenu}>
                    {Logo}
                  </LinkRadium>
                </div>
                <div style={styles.close_button_container}>
                  <button style={styles.close_button} onClick={self.closeMenu}>
                    <Icons.FaAngleLeft />
                  </button>
                </div>
              </div>
              <div style={[styles.separator, {borderColor: colorLight}]}></div>
              <ul style={styles.menu_items}>
                {props.menuItems && props.menuItems.map(function (item, index) {
                  var color = item.get('color') || color,
                      Icon = Icons[item.get('logo')],
                      linkStyle = fromJS(styles.menu_item_link)
                        .mergeDeep(fromJS({':hover': {backgroundColor: colorLight}}))
                        .mergeDeep(item.get('highlight') ? fromJS({backgroundColor: colorLight}) : null),
                      linkActiveStyle = linkStyle.mergeDeep(fromJS({color: color}));

                  return (
                    <li key={'menu-item-' + index} style={styles.menu_item}>
                      <LinkRadium to={path.join(rootHref, item.get('url') || '')} style={linkStyle.toJS()} activeStyle={linkActiveStyle.toJS()} onClick={self.closeMenu} onlyActiveOnIndex>
                        {Icon
                          ? <span style={styles.menu_item_icon}>
                              <Icon />
                            </span>
                          : null
                        }
                        <span style={styles.menu_item_title}>{item.get('text')}</span>
                      </LinkRadium>
                    </li>
                  );
                })}
              </ul>
              <ul style={styles.footer}>
                {props.footerItems && props.footerItems.map(function (item, index) {
                  var linkProperties = {},
                      Container = 'div',
                      isLink = !!item.get('url'),
                      Icon = Icons[item.get('logo')];

                  if (isLink) {
                    Container = LinkRadium;
                    linkProperties.to = path.join(rootHref, item.get('url'));
                    linkProperties.onClick = self.closeMenu;
                  }

                  return (
                    <li key={'menu-footer-item-' + index} style={styles.footer_item}>
                      <Container style={[styles.footer_item_container, isLink ? styles.footer_item_container_link : null]} {...linkProperties}>
                        {Icon
                          ? <span style={styles.footer_item_icon_container}>
                              <Icon style={styles.footer_item_icon} />
                            </span>
                          : null
                        }
                        <span style={styles.footer_item_text}>{item.get('text')}</span>
                      </Container>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </StyleRoot>
      </section>
    );
  }
});

module.exports = Radium(PanelMenu);
