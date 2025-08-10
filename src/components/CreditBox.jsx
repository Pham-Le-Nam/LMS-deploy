import React from 'react';
import PropTypes from 'prop-types';
import styles from './CreditBox.module.css';

import { usePageLeft } from './PageLeftContext';

function CreditBox() {
    const { pageLeft } = usePageLeft();

    return (
        <div className={styles.creditBox}>
            Số Giấy Còn Lại: {pageLeft}
        </div>
    );
}

export default CreditBox;