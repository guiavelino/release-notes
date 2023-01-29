/* eslint-disable react/function-component-definition */

import { forwardRef, useImperativeHandle, useState, Ref } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { OutlinedInput } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import styles from './styles.module.scss';

export interface SearchModalMethods {
    openModal: () => void;
}

const SearchModalComponent = (_, ref: Ref<SearchModalMethods>) => {
    const i18nShared = useTranslations('Shared');
    const { locale } = useRouter();
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };
    
    const closeModal = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({ openModal }));
    
    return (
        <Dialog open={open} onClose={closeModal}>
            <DialogContent className={styles.dialog}>
                <OutlinedInput
                    autoFocus
                    startAdornment={<SearchOutlinedIcon />}
                    placeholder={`${i18nShared('SearchIdeas', { locale }).toString()}...`} 
                />
            </DialogContent>
        </Dialog>
    );
}

export default forwardRef(SearchModalComponent);