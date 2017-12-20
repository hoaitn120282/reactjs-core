import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { FaBold, FaItalic, FaUnderline, FaCode, FaStrikethrough } from 'react-icons/lib/fa';
import classnames from 'classnames';

import styles from './style.scss';
/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph';

class EditorComponent extends Component {
    /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasMark = type => {
        const { value } = this.props;
        return value.activeMarks.some(mark => mark.type === type);
    };

    /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasBlock = type => {
        const { value } = this.props;
        return value.blocks.some(node => node.type === type);
    };
    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark = (event, type) => {
        event.preventDefault();
        const { onChange, value } = this.props;
        const change = value.change().toggleMark(type);
        onChange(change);
    };

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickBlock = (event, type) => {
        event.preventDefault();
        const { onChange, value } = this.props;
        const change = value.change();
        const { document } = value;

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                change
                    .setBlock(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else {
                change.setBlock(isActive ? DEFAULT_NODE : type);
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item');
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type);
            });

            if (isList && isType) {
                change
                    .setBlock(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else if (isList) {
                change.unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list').wrapBlock(type);
            } else {
                change.setBlock('list-item').wrapBlock(type);
            }
        }

        onChange(change);
    };
    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type);
        const onMouseDown = event => this.onClickMark(event, type);

        return (
            <span
                className={`${styles.button} ${classnames({ 'is-active': isActive })}`}
                onMouseDown={onMouseDown}
                data-active={isActive}
            >
                {icon}
            </span>
        );
    };

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderBlockButton = (type, icon) => {
        const isActive = this.hasBlock(type);
        const onMouseDown = event => this.onClickBlock(event, type);

        return (
            <span
                className={`${styles.button} ${classnames({ 'is-active': isActive })}`}
                onMouseDown={onMouseDown}
                data-active={isActive}
            >
                {icon}
            </span>
        );
    };

    /**
     * Render a Slate node.
     *
     * @param {Object} data
     * @return {Element}
     */

    renderNode = data => {
        const { attributes, children, node } = data;
        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>;
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>;
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>;
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>;
            case 'list-item':
                return <li {...attributes}>{children}</li>;
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>;
            default:
                return;
        }
    };

    /**
     * Render a Slate mark.
     *
     * @param {Object} data
     * @return {Element}
     */

    renderMark = data => {
        const { children, mark } = data;
        switch (mark.type) {
            case 'bold':
                return <strong>{children}</strong>;
            case 'code':
                return <code>{children}</code>;
            case 'italic':
                return <i>{children}</i>;
            case 'underlined':
                return <u>{children}</u>;
            case 'strikethrough':
                return <del>{children}</del>;
            default:
                return;
        }
    };

    /**
     * Render the toolbar.
     *
     * @return {Element}
     */

    renderToolbar = () => {
        return (
            <div className={styles.toolbarMenu}>
                {this.renderMarkButton('bold', <FaBold />)}
                {this.renderMarkButton('italic', <FaItalic />)}
                {this.renderMarkButton('underlined', <FaUnderline />)}
                {this.renderMarkButton('strikethrough', <FaStrikethrough />)}
                {this.renderMarkButton('code', <FaCode />)}

                {/* {this.renderBlockButton('heading-one', 'looks_one')}
                {this.renderBlockButton('heading-two', 'looks_two')}
                {this.renderBlockButton('block-quote', 'format_quote')}
                {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                {this.renderBlockButton('bulleted-list', 'format_list_bulleted')} */}
            </div>
        );
    };

    render() {
        const { toolbar } = this.props;
        return (
            <Fragment>
                {toolbar && this.renderToolbar()}
                <Editor renderNode={this.renderNode} renderMark={this.renderMark} spellCheck {...this.props} />
            </Fragment>
        );
    }
}

EditorComponent.defaultProps = {
    onChange: () => null,
    toolbar: true,
    value: Value.fromJSON({ document: { nodes: [] } })
};
EditorComponent.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    toolbar: PropTypes.bool
};

export default EditorComponent;
