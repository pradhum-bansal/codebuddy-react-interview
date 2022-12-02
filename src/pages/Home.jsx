import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';

const MultiStepperForm = () => {
  const [step, setStep] = React.useState(1);
  const [formTouched, setFormTouched] = React.useState({});
  const [formData] = React.useState({});
  const navigate = useNavigate();

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = values => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/submit`, {
        // Adding method type
        method: 'POST',
        // Adding body or contents to send
        body: JSON.stringify({
          'emailId': values.email,
          'password': values.password,
          'firstName': values.firstName,
          'lastName': values.lastName,
          'address': values.address,
          'countryCode': values.countryCode,
          'phoneNumber': values.phone,
        }),
      })
        // Converting to JSON
        .then(response => {
          response.json();
          navigate('/posts');
        });
    }
  };

  const validationSchema = [
    yup.object().shape({
      email: yup.string().email('Email is invalid').required('Email is required'),
      password: yup
        .string()
        .matches(
          /(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/,
          'Password must contain 2 uppercase letters,\n 2 lowercase letters, 2 numbers, 2 special characters',
        )
        .required('Password is required'),
    }),
    yup.object().shape({
      firstName: yup
        .string()
        .matches(/^[a-zA-Z]{2,50}$/, 'First name is invalid')
        .required('First name is required'),
      // Address min 10
      address: yup
        .string()
        .min(10, 'Address must be at least 10 characters')
        .required('Address is required'),
    }),
    yup.object().shape({
      countryCode: yup.string().required('Country Code is required'),
      phone: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Phone number is invalid')
        .required('Phone number is required'),
      termsAndConditions: yup
        .boolean()
        .oneOf([true], 'Terms and Conditions must be accepted')
        .required('Please accept the terms and conditions'),
    }),
  ];

  return (
    <>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema[step - 1]}
        validateOnBlur={formTouched}
        onSubmit={handleFormSubmit}
        validateOnChange={false}
        validateOnMount={false}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="container">
            <div className="request-card mt-4  my-5">
              <div className="d-flex py-3 ">
                <h1 className="m-auto">Sign Up Form</h1>
              </div>

              <div className="d-flex justify-content-center w-100 align-items-center py-3">
                <div
                  className={step === 1 ? styles.active_step : styles.inactive_step}
                  onClick={() => {
                    setStep(1);
                  }}
                  aria-hidden="true"
                >
                  1
                </div>
                <div className={styles.dotted_line} />
                <div
                  aria-hidden="true"
                  className={step === 2 ? styles.active_step : styles.inactive_step}
                  onClick={() => {
                    if (step === 3) {
                      setStep(2);
                    } else if (
                      Object.keys(errors).length === 0 &&
                      Object.keys(touched).length > 0
                    ) {
                      setStep(2);
                    } else {
                      setFormTouched(true);
                    }
                  }}
                >
                  2
                </div>
                <div className={styles.dotted_line} />
                <div
                  aria-hidden="true"
                  className={step === 3 ? styles.active_step : styles.inactive_step}
                  onClick={() => {
                    if (Object.keys(errors).length === 0 && Object.keys(touched).length > 0) {
                      setStep(3);
                    } else {
                      setFormTouched(true);
                    }
                  }}
                >
                  3
                </div>
              </div>
              <div className=" py-3">
                {step === 1 && (
                  <div className="px-2">
                    <div className="form-group py-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="form-control"
                      />
                      <div className={errors.email || touched.email ? styles.error : ''}>
                        {(errors.email || touched.email) && errors.email}
                      </div>
                    </div>
                    <div className="form-group py-3">
                      <label htmlFor="password">Password</label>
                      <input
                        type="text"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className="form-control"
                      />
                      <div className={errors.password || touched.password ? styles.error : ''}>
                        {(errors.password || touched.password) && errors.password}
                      </div>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="px-2">
                    <div className="form-group py-3">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        className="form-control"
                      />
                      <div className={errors.firstName || touched.firstName ? styles.error : ''}>
                        {(errors.firstName || touched.firstName) && errors.firstName}
                      </div>
                    </div>
                    <div className="form-group py-3">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group py-3">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        className="form-control"
                      />
                      <div className={errors.address || touched.address ? styles.error : ''}>
                        {(errors.address || touched.address) && errors.address}
                      </div>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="px-2">
                    <div className="form-group py-3">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        className="form-control"
                      />
                      <div className={errors.phone && touched.phone ? styles.error : ''}>
                        {errors.phone && touched.phone && errors.phone}
                      </div>
                    </div>

                    <div className="form-group py-3">
                      <label htmlFor="countryCode">Country Code</label>
                      <select
                        className="form-select"
                        name="countryCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.countryCode}
                      >
                        <option value="">Select a country code</option>
                        <option value="+91">India</option>
                        <option value="+1">USA</option>
                      </select>
                      <div
                        className={errors.countryCode || touched.countryCode ? styles.error : ''}
                      >
                        {(errors.countryCode || touched.countryCode) && errors.countryCode}
                      </div>
                    </div>
                    <div className="py-3 d-flex">
                      <input
                        type="checkbox"
                        name="termsAndConditions"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.termsAndConditions}
                        className="mx-2"
                      />
                      <div>
                        <span htmlFor="termsAndConditions">Terms and Conditions</span>
                        <div
                          className={
                            errors.termsAndConditions || touched.termsAndConditions
                              ? styles.error
                              : ''
                          }
                        >
                          {(errors.termsAndConditions || touched.termsAndConditions) &&
                            errors.termsAndConditions}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center m-3">
                <div className="mx-3">
                  {step > 1 && (
                    <button
                      type="button"
                      className="btn btn-primary btn-lg w-100"
                      onClick={prevStep}
                    >
                      Prev
                    </button>
                  )}
                </div>
                <div className="mx-3 mt-2">
                  <button className="btn btn-success btn-lg w-100" type="submit">
                    {step === 3 ? 'Submit' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default MultiStepperForm;
