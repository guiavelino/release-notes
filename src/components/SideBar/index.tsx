import { ReactNode, useContext, useImperativeHandle, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

import { GlobalContext } from '../../context/GlobalContext';

import styles from './styles.module.scss';

interface SideBarProps {
  children?: ReactNode;
  className?: string;
  showPagesLink?: boolean;
}

export default function SideBarComponent({ children, className, showPagesLink }: SideBarProps) {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();
  const { isDesktop, globalRef } = useContext(GlobalContext);
  const [responsiveMenuIsOpen, setResponsiveMenuIsOpen] = useState(false);

  useImperativeHandle(globalRef, () => ({ 
    toggleResponsiveMenu: () => setResponsiveMenuIsOpen(!responsiveMenuIsOpen) 
  }));

  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isDesktop ? true : responsiveMenuIsOpen}
      onClose={() => setResponsiveMenuIsOpen(false)}
      sx={{ '& .MuiDrawer-paper': { width: 300, marginTop: isDesktop ? '48px' : 0 } }}
    >
      <div className={`${styles.sideBar} ${!isDesktop && styles.responsiveSideBar} ${className}`}>
        {!isDesktop && showPagesLink && (
          <List component="nav" className={styles.list}>
            <Link href="/ideas">
              <ListItemButton color="inherit" className={styles.listItemButton}>
                <AutoFixHighOutlinedIcon className={styles.icon} />
                <ListItemText className={styles.text} primary={i18nShared('Ideas', { locale }).toString()} />
              </ListItemButton>
            </Link>
            <Link href="/roadmap">
              <ListItemButton color="inherit" className={styles.listItemButton}>
                <MapOutlinedIcon className={styles.icon} />
                <ListItemText className={styles.text} primary={i18nShared('Roadmap', { locale }).toString()} />
              </ListItemButton>
            </Link>
            <Link href="/announcements">
              <ListItemButton color="inherit" className={styles.listItemButton}>
                <CampaignOutlinedIcon className={styles.icon} />
                <ListItemText className={styles.text} primary={i18nShared('Announcements', { locale }).toString()} />
              </ListItemButton>
            </Link>
          </List>
        )}
        {children}
      </div>
    </Drawer>
  );
}

SideBarComponent.defaultProps = {
  children: null,
  className: '',
  showPagesLink: false
}