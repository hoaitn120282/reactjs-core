import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

import BaseLoading from './../Base';

const Loading = ({ loading, color }) => {
    const style = color
        ? {
              backgroundColor: color
          }
        : {};
    return (
        <BaseLoading loading={loading}>
            <div className={styles.skCubeGrid}>
                <div className={styles.skCube + ' ' + styles.skCube1} style={style} />
                <div className={styles.skCube + ' ' + styles.skCube2} style={style} />
                <div className={styles.skCube + ' ' + styles.skCube3} style={style} />
                <div className={styles.skCube + ' ' + styles.skCube4} style={style} />
                <div className={styles.skCube + ' ' + styles.skCube5} style={style} />
                <div className={styles.skCube + ' ' + styles.skCube6} style={style} />
                <div className={styles.skCube + ' ' + styles.skCube7} style={style} />
                <div className={styles.skCube + ' ' + styles.skCube8} style={style} />
                <div className={styles.skCube + ' ' + styles.skCube9} style={style} />
            </div>
        </BaseLoading>
    );
};

Loading.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string
};

export default Loading;
