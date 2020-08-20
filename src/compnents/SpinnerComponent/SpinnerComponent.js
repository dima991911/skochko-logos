import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropagateLoader from "react-spinners/PropagateLoader";
import './SpinnerComponent.css';

function SpinnerComponent({ isLoading }) {

    useEffect(() => {
        if (window.SmoothScroll) {
            if (isLoading) {
                window.SmoothScroll.setDisableScroll(true);
            } else {
                window.SmoothScroll.setDisableScroll(false);
            }
        }
    }, [isLoading]);

    return (
        <>
            {
                isLoading &&
                    <div className="spinner-container">
                        <div>
                            <PropagateLoader
                                size={25}
                                color="#fff"
                                loading={isLoading}
                            />
                        </div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
    }
};

export default connect(mapStateToProps, null)(SpinnerComponent);
