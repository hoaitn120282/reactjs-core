import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const transitionStyles = {
    entering: { opacity: 0, display: 'none' },
    entered: { opacity: 1, display: 'block' }
};

class TransitionComponent extends Component {
    render() {
        const { source, dest, children, duration } = this.props;

        const defaultStyle = {
            transition: `all ${duration}ms ease-in-out`,
            opacity: 0,
            display: 'none'
        };
        return (
            <Transition in={source === dest} timeout={duration}>
                {state => (
                    <div
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                    >
                        {children}
                    </div>
                )}
            </Transition>
        );
    }
}

TransitionComponent.defaultProps = {
    duration: 0
};

TransitionComponent.propTypes = {
    source: PropTypes.any,
    dest: PropTypes.any,
    children: PropTypes.any.isRequired,
    duration: PropTypes.number
};

export default TransitionComponent;
