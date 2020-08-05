import React from 'react';
import { Formik } from 'formik';
import './LoginPage.css';

import { UserService } from "../../services/UserService";

export default function LoginPage({ history }) {

    const validate = (values) => {
        const errors = {};

        if (!values.login) {
            errors.login = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    };

    const login = (values) => {
        UserService.login(values)
            .then(res => {
                UserService.setToken(res.token);
                history.push('/');
            })
            .catch(err => {
                alert(`${err.message}. Please try again`);
            });
    };

    return (
        <div className="form-container">
            <Formik
                initialValues={{ login: '', password: '' }}
                validate={validate}
                onSubmit={login}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <input
                                type="login"
                                name="login"
                                placeholder="login"
                                className="form-control"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.login}
                            />
                            <div className="form-group-error" style={{ opacity: errors.login && touched.login ? 1 : 0 }}>
                                {errors.login}
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
