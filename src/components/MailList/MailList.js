// Изучите файл `/cypress/integration/homework.spec.js`, чтобы понять,
// какие классы должен использовать компонент.
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MailList.module.css';

export default class MailList extends Component {
  render() {
    const { data, folder } = this.props;

    return (
      <div className={`${styles.container} t-${folder}-list`}>
        {data.map(item => (
          <Link key={item.id} to={`/app/${folder}/${item.id}`} className={styles.link}>
           {`${item.body.slice(0, 52)}...`}
          </Link>
        ))}
      </div>
    );
  }
}
