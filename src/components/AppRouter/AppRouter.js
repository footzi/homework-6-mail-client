// Реализуйте роутер приложения.
// Здесь должны быть обьявлены роуты,
// которые будут доступны авторизованному пользователю.
// - Home
// - InboxList
// - InboxMail
// - OutboxList
// - OutboxMail

// Так же в этом файле обьявите лейаут,
// используйте стили из AppRouter.module.css
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styles from './AppRouter.module.css';
import Home from '../Home';
import InboxList from '../InboxList';
import InboxMail from '../InboxMail';
import OutboxList from '../OutboxList';
import OutboxMail from '../OutboxMail';

export default class AppRouter extends Component {
  navigation = [
    {
      path: '/',
      name: 'Home',
      class: 'home'
    },
    {
      path: '/inbox',
      name: 'Inbox',
      class: 'inbox'
    },
    {
      path: '/outbox',
      name: 'Outbox',
      class: 'outbox'
    }
  ];

  renderTitle() {
    const { location } = this.props;
    const { pathname } = location;

    const setTitle = () => {
      if (pathname.indexOf('inbox') + 1) {
        return 'Inbox';
      } else if (pathname.indexOf('outbox') + 1) {
        return 'Outbox';
      } else {
        return 'Home';
      }
    };
    return <h3 className={styles.title}>{setTitle()}</h3>;
  }

  render() {
    const { match } = this.props;
    const { url } = match;
    
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <ul className={`${styles.navList} t-nav-list`}>
              {this.navigation.map(item => (
                <li className={styles.navElement} key={item.name}>
                  <Link
                    className={`${styles.link} t-link-${item.class}`}
                    to={`${url}${item.path}`}
                    aria-current="page"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.content}>
            {this.renderTitle()}
            <Switch>
              <Route path={url} exact component={Home} />
              <Route path={`${url}/inbox`} exact component={InboxList} />
              <Route path={`${url}/inbox/:id`} component={InboxMail} />
              <Route path={`${url}/outbox`} exact component={OutboxList} />
              <Route path={`${url}/outbox/:id`} component={OutboxMail} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
