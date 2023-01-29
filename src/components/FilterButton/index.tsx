/* eslint-disable react/require-default-props */

import { ChangeEvent, Dispatch, forwardRef, SetStateAction, useImperativeHandle, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Button, Divider, OutlinedInput, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { TopicProps } from '../../interfaces/Topic';
import { StatusProps } from '../../interfaces/Status';
import { CategoryProps } from '../../interfaces/Category';

import styles from './styles.module.scss';

interface FilterProps {
    placeholder: string;
    topics?: TopicProps[];
    setTopics?: Dispatch<SetStateAction<TopicProps[]>>
    status?: StatusProps[];
    setStatus?: Dispatch<SetStateAction<StatusProps[]>>
    categories?: CategoryProps[];
    setCategories?: Dispatch<SetStateAction<CategoryProps[]>>
}

function FilterButtonComponent({
    placeholder, 
    topics,
    setTopics,
    status,
    setStatus,
    categories,
    setCategories
}: FilterProps, ref) {
    const i18nShared = useTranslations('Shared');
    const { locale } = useRouter();
    const [open, setOpen] = useState(false);
    const [filteredList, setFilteredList] = useState({ status, topics, categories });
    const hasNoResults = !filteredList.status?.length && !filteredList.topics?.length && !filteredList.categories?.length;
    const [numberFiltersApplied, setNumberFiltersApplied] = useState(0);

    const openMenu = () => {
        setOpen(!open);
    };

    const closeMenu = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
    };

    const filterByTerm = ({ target: { value : searchedTerm }}: ChangeEvent<HTMLInputElement>) => {
        if (!searchedTerm) setFilteredList({ status, topics, categories });

        const filterFactory = l => l?.filter(({ name }) => name.toLowerCase().startsWith(searchedTerm.toLowerCase()));
        setFilteredList({ status: filterFactory(status), topics: filterFactory(topics), categories: filterFactory(categories) });
    };

    const filterByTopic = (topic: TopicProps) => {
        setTopics(topics.map(item => {
            if (item.id === topic.id) {
                item.markedByFilter = !topic.markedByFilter;
                setNumberFiltersApplied(item.markedByFilter ? numberFiltersApplied + 1 : numberFiltersApplied - 1);
            }
            
            return item;
        }));
    };
    
    const filterByCategory = (category: CategoryProps) => {
        setCategories(categories.map(item => {
            if (item.id === category.id) {
                item.markedByFilter = !category.markedByFilter;
                setNumberFiltersApplied(item.markedByFilter ? numberFiltersApplied + 1 : numberFiltersApplied - 1);
            }

            return item;
        }));
    };

    const filterByStatus = (itemStatus: StatusProps) => {
        const isMarked = status.find(({ markedByFilter }) => markedByFilter);
        let numberFilters = isMarked ? numberFiltersApplied : numberFiltersApplied + 1;

        setStatus(status.map(item => {
            item.markedByFilter = item.id === itemStatus.id ? !itemStatus.markedByFilter : false;

            if (item.id === itemStatus.id && !item.markedByFilter) {
                numberFilters = numberFiltersApplied - 1;
            }

            return item;
        }));

        setNumberFiltersApplied(numberFilters);
    };

    const removeAllFilters = () => {
        const resetFactory = (previousState) => {
            return previousState.map(item => {
                item.markedByFilter = false;
                return item;
            });
        };

        if (status) setStatus(resetFactory);
        if (topics) setTopics(resetFactory);
        if (categories) setCategories(resetFactory);
        setNumberFiltersApplied(0);
    };

    useImperativeHandle(ref, () => ({ filterByTopic, filterByCategory, filterByStatus }));

    return (
        <div className={styles.filterButtonContainer} onBlur={closeMenu} tabIndex={0} role="menu">
            <Button 
                disableRipple 
                color='inherit' 
                onClick={openMenu} 
                startIcon={<FilterListIcon />}
                className={styles.filterButton}
            >
                { i18nShared('Filter', { locale }).toString() }
                {!!numberFiltersApplied && <span className={styles.numberFiltersAppliedContainer}>{numberFiltersApplied}</span>}
            </Button>
            {!!numberFiltersApplied && (
                <Button 
                    disableRipple 
                    color='inherit' 
                    onClick={removeAllFilters}
                    className={styles.clearFilterButton}
                >
                    <CloseIcon />
                </Button>
            )}
            {open && (
                <div className={styles.menu}>
                    <OutlinedInput
                        autoFocus
                        className={styles.searchInput}
                        placeholder={placeholder}
                        onChange={filterByTerm}
                    />
                    <Divider />
                    <ul className={styles.menuContainer}>
                        {filteredList.status && filteredList.status.map(item => (
                            <MenuItem key={item.id} disableRipple onClick={() => filterByStatus(item)}>
                                <span className={styles.markerColor} style={{ borderColor: item.color }} />
                                {item.name}
                                {item.markedByFilter && <CheckIcon className={styles.checkIcon} />}
                            </MenuItem>
                        ))}
                        { !!filteredList.topics?.length && <Divider />}
                        {filteredList.topics && filteredList.topics.map(item => (
                            <MenuItem key={item.id} disableRipple onClick={() => filterByTopic(item)}>
                                <span>#</span>
                                {item.name}
                                {item.markedByFilter && <CheckIcon className={styles.checkIcon} />}
                            </MenuItem>
                        ))}
                        { !!filteredList.categories?.length && <Divider />}
                        {filteredList.categories && filteredList.categories.map(item => (
                            <MenuItem key={item.id} disableRipple onClick={() => filterByCategory(item)}>
                                <span className={styles.markerColor} style={{ borderColor: item.color }} />
                                {item.name}
                                {item.markedByFilter && <CheckIcon className={styles.checkIcon} />}
                            </MenuItem>
                        ))}
                        {hasNoResults && (
                            <div className={styles.warningMessageContainer}>
                                <p>{ i18nShared('NoResultsFound', { locale }).toString() }</p>
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default forwardRef(FilterButtonComponent);
