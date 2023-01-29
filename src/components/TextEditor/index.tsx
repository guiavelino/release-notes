import { Button } from '@mui/material';

import styles from './styles.module.scss';

interface TextEditorProps {
    buttonText: string;
    className?: string;
}

export default function TextEditorComponent({ buttonText, className }: TextEditorProps) {
    return (
        <form className={`${styles.textEditorContainer} ${className}`}>
            <textarea />
            <Button color="inherit">
                {buttonText}
            </Button>
        </form>
    );
}

TextEditorComponent.defaultProps = {
    className: ''
}