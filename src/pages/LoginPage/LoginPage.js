import React from 'react';
import { Formik } from 'formik';
import './LoginPage.css';

export default function LoginPage() {

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    };

    const login = (values) => {
        console.log(values);
    };

    return (
        <div className="form-container">
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={validate}
                onSubmit={login}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="form-control"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <div className="form-group-error" style={{ opacity: errors.email && touched.email ? 1 : 0 }}>
                                {errors.email}
                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="form-control"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <div className="form-group-error" style={{ opacity: errors.password && touched.password ? 1 : 0 }}>
                                {errors.password}
                            </div>
                        </div>
                        <button
                            className="form-button-submit"
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                        >
                            LOGIN
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
