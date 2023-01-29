import { useRouter } from 'next/router';
import { useContext, useState } from 'react'; 
import { Avatar, MenuItem, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { AuthContext } from '../../context/AuthContext';

import styles from './styles.module.scss';

export default function UserMenuComponent() {
    const i18nShared = useTranslations('Shared');
    const { locale } = useRouter();
    const [open, setOpen] = useState(false);
    const { setAuthenticated } = useContext(AuthContext);

    const openMenu = () => {
        setOpen(!open);
    };

    const closeMenu = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
    };

    const logOut = () => {
        setAuthenticated(false);
    }

    return (
        <div className={styles.avatarButtonContainer} onBlur={closeMenu} tabIndex={0} role="menu">
            <Avatar onClick={openMenu} className={styles.avatarButton}>G</Avatar>
            {open && (
                <div className={styles.menu}>
                    <Link href="/settings/profile">
                        <MenuItem disableRipple>
                            { i18nShared('Profile', { locale }).toString() }
                        </MenuItem>
                    </Link>
                    <Divider />
                    <MenuItem disableRipple onClick={logOut}>
                        { i18nShared('LogOut', { locale }).toString() }
                    </MenuItem>
                </div>
            )}
        </div>
    );
}