import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useRef } from 'react'; 
import { useTranslations } from 'next-intl';
import { Button, IconButton, Toolbar } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import SearchModalComponent, { SearchModalMethods } from '../SearchModal';
import { GlobalContext } from '../../context/GlobalContext';
import { AuthContext } from '../../context/AuthContext';
import UserMenuComponent from '../UserMenu';

import styles from './styles.module.scss';

export default function HeaderComponent() {
    const i18nShared = useTranslations('Shared');
    const { locale } = useRouter();
    const { isDesktop, globalRef } = useContext(GlobalContext);
    const { isAuthenticated } = useContext(AuthContext);
    const searchIdeaModalRef = useRef<SearchModalMethods>(null);

    return (
        <Toolbar variant="dense" className={styles.header}>
            <section>
                {!isDesktop && (
                    <IconButton onClick={() => globalRef.current.toggleResponsiveMenu()}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Link href="/ideas">
                    <a className={styles.logo}>
                        <div className={styles.logoContainer}>
                            T
                        </div>  
                        {isDesktop && <h2>trocafone</h2>}
                    </a>
                </Link>
                {isDesktop && (
                    <>
                        <div className={styles.divider} />
                        <Link href="/ideas">
                            <Button startIcon={<AutoFixHighOutlinedIcon />} color="inherit">
                                { i18nShared('Ideas', { locale }).toString() }
                            </Button>
                        </Link>
                        <Link href="/roadmap">
                            <Button startIcon={<MapOutlinedIcon />} color="inherit">
                                { i18nShared('Roadmap', { locale }).toString() }
                            </Button>
                        </Link>
                        <Link href="/announcements">
                            <Button startIcon={<CampaignOutlinedIcon />} color="inherit">
                                { i18nShared('Announcements', { locale }).toString() }
                            </Button>
                        </Link>
                    </>
                )}
            </section>
            <section>
                <Button 
                    className={styles.searchIdeasButton} 
                    startIcon={<SearchOutlinedIcon />}
                    onClick={() => searchIdeaModalRef.current.openModal()}
                >
                    {isDesktop && (
                        <span className={styles.placeholder}>
                            { i18nShared('SearchIdeas', { locale }).toString() }...
                        </span> 
                    )}
                </Button>
                {isAuthenticated ? (
                    <UserMenuComponent />
                ) : (
                    <>
                        <Link href="/login">
                            <Button color="inherit" className={styles.loginButton}>
                                { i18nShared('Login', { locale }).toString() }
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button color="inherit" className={styles.signUpButton}>
                                { i18nShared('SignUp', { locale }).toString() }
                            </Button>
                        </Link>
                    </>
                )}
            </section>
            <SearchModalComponent ref={searchIdeaModalRef} />
        </Toolbar>
    );
}
