import { useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SideBarComponent from '../SideBar';

import styles from './styles.module.scss';

export default function SettingsSideBarComponent() {
  const i18nShared = useTranslations('Shared');
  const { locale, pathname } = useRouter();

  const [routes] = useState([
    { id: 1, href: "/settings/profile", i18n: "Profile" },
    { id: 2, href: "/settings/notifications", i18n: "Notifications" }
  ]);

  return (
    <SideBarComponent className={styles.sideBar}>
        <List component="nav">
          {routes.map(route => (
            <Link key={route.id} href={route.href}>
              <ListItemButton className={`${styles.listItemButton} ${route.href === pathname && styles.active}`} >
                <ListItemText className={styles.text} primary={i18nShared(route.i18n, { locale }).toString()} />
              </ListItemButton>
            </Link>
          ))}
        </List>
    </SideBarComponent>
  );
}