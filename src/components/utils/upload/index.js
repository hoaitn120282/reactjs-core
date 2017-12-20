import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Input, InputGroup } from 'reactstrap';
import { FaFolderOpen } from 'react-icons/lib/fa';

import { UPLOAD_MAX_FILE_SIZE } from 'constants/config';
import { wrapDrop, buttonDrop } from './style.scss';

const UploadComponent = props => {
    const { className = '' } = props;
    return (
        <Dropzone role="button" maxSize={UPLOAD_MAX_FILE_SIZE} {...props} className={`${wrapDrop} ${className}`}>
            <InputGroup>
                <Input disabled />
                <div role="button" className={buttonDrop}>
                    <FaFolderOpen />
                </div>
            </InputGroup>
        </Dropzone>
    );
};

UploadComponent.defaultProps = {
    className: ''
};

UploadComponent.propTypes = {
    className: PropTypes.string
};

export default UploadComponent;
