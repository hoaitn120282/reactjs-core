import React from 'react';

const BLOCK_TAGS = {
    blockquote: 'quote',
    p: 'paragraph',
    pre: 'code'
};

// Add a dictionary of mark tags.
const MARK_TAGS = {
    i: 'italic',
    strong: 'bold',
    u: 'underline',
    del: 'strikethrough'
};

export default [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()];
            if (!type) return;
            return {
                kind: 'block',
                type: type,
                nodes: next(el.childNodes)
            };
        },
        serialize(object, children) {
            if (object.kind !== 'block') return;
            switch (object.type) {
                case 'code':
                    return (
                        <pre>
                            <code>{children}</code>
                        </pre>
                    );
                case 'paragraph':
                    return <p>{children}</p>;
                case 'quote':
                    return <blockquote>{children}</blockquote>;
                default:
                    return <p>{children}</p>;
            }
        }
    },
    // Add a new rule that handles marks...
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()];
            if (!type) return;
            return {
                kind: 'mark',
                type: type,
                nodes: next(el.childNodes)
            };
        },
        serialize(object, children) {
            if (object.kind !== 'mark') return;
            switch (object.type) {
                case 'bold':
                    return <strong>{children}</strong>;
                case 'italic':
                    return <i>{children}</i>;
                case 'underline':
                    return <u>{children}</u>;
                case 'strikethrough':
                    return <del>{children}</del>;

                default:
                    return <p>{children}</p>;
            }
        }
    }
];
