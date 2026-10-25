import React from "react";

// import form submition dependencies
import { useFormik, yupToFormErrors } from "formik";

// imnport form validation
import * as Yup from "yup";

// import routing
import { Link } from "react-router-dom";

// import styles
import styles from "../../../style";

// import images
import { location } from "../../../assets";

// import components
import Button from "../../../components/Button";

const ContactForm_test = () => {
  // Formik logics
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      terms: "",
    },

    // Yup form validations
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Name must be 30 characters or less.")
        .required("Name is required."),
      email: Yup.string()
        .email("Invalid email address.")
        .required("Email is required."),
      phone: Yup.string()
        .max(17, "Invalid phone number length.")
        .min(7, "Invalid phone number length."),
      subject: Yup.string().required("Subject is required."),
      message: Yup.string().required("Message is required."),
      terms: Yup.array().required("Terms of service must be checked."),
    }),

    // Submit form
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form
      method="post"
      className={` ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
      onSubmit={formik.handleSubmit}
    >
      <h2 className={`${styles.heading2} mb-4 w-1/2`}>Let's connect 👌</h2>
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col">
          {/* name input */}
          <div>
            <label
              className={`block font-poppins font-semibold text-sm ml-2 text-white ${
                formik.touched.name && formik.errors.name ? "text-red-500" : ""
              }`}
              htmlFor="name"
            >
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : "Name: "}
            </label>
            <input
              id=""
              className="bg-primary text-dimWhite border-gray-500 rounded-md border-2 w-full p-2 my-2 py-1 mb-2 focus:border-secondary focus:ring-secondary"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter name..."
            />
          </div>
          {/* email input */}
          <div>
            <label
              className={`block font-poppins font-semibold text-sm ml-2 text-white ${
                formik.touched.email && formik.errors.email
                  ? "text-red-500"
                  : ""
              }`}
              htmlFor="email"
            >
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "Email: "}
            </label>
            <input
              id=""
              className="bg-primary text-dimWhite border-gray-500 rounded-md border-2 w-full p-2 my-2 py-1 mb-2 focus:border-secondary focus:ring-secondary"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter email address..."
            />
          </div>
          {/* phone input */}
          <div>
            <label
              className={`block font-poppins font-semibold text-sm ml-2 text-white ${
                formik.touched.phone && formik.errors.phone
                  ? "text-red-500"
                  : ""
              }`}
              htmlFor="phone"
            >
              {formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : "Phone: "}
            </label>
            <input
              id=""
              className="bg-primary text-dimWhite border-gray-500 rounded-md border-2 w-full p-2 my-2 py-1 mb-2 focus:border-secondary focus:ring-secondary"
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter phone number..."
            />
          </div>
          {/* subject input */}
          <div>
            <label
              className={`block font-poppins font-semibold text-sm ml-2 text-white ${
                formik.touched.subject && formik.errors.subject
                  ? "text-red-500"
                  : ""
              }`}
              htmlFor="subject"
            >
              {formik.touched.subject && formik.errors.subject
                ? formik.errors.subject
                : "Subject: "}
            </label>
            <select
              id=""
              className="bg-primary text-dimWhite  border-gray-500 rounded-md border-2 w-full p-2 my-2 py-1 mb-2 focus:border-secondary focus:ring-secondary"
              type="subject"
              name="subject"
              placeholder="Enter subject..."
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="" disabled selected>
                Enter subject...
              </option>
              <option value="query" className="">
                General query
              </option>
              <option value="colaboration">Colaboration proposal</option>
              <option value="quote">Service quotation</option>
              <option value="issue">Repport an issue</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          {/* message input */}
          <div>
            <label
              className={`block font-poppins font-semibold text-sm ml-2 text-white ${
                formik.touched.message && formik.errors.message
                  ? "text-red-500"
                  : ""
              }`}
              htmlFor="message"
            >
              {formik.touched.message && formik.errors.message
                ? formik.errors.message
                : "Message: "}
            </label>
            <textarea
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-primary text-dimWhite border-gray-500 rounded-md border-2 w-full p-2 my-2 py-1 mb-2 focus:border-secondary focus:ring-secondary"
              name="message"
              id=""
              rows="10"
              placeholder="Type here..."
            />
          </div>
          {/* terms checkbox */}
          <div>
            <label
              className={`block font-poppins font-semibold text-sm ml-2 text-white ${
                formik.touched.terms && formik.errors.terms
                  ? "text-red-500"
                  : ""
              }`}
              htmlFor="terms"
            >
              {formik.touched.terms && formik.errors.terms
                ? formik.errors.terms
                : "Terms of service: "}
            </label>
            <div className="flex items-center gap-2 w-full p-2 my-2 py-1 mb-2">
              <input
                type="checkbox"
                name="terms"
                value="checked"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-primary w-5 h-5 text-secondary border-2 border-gray-500 active:bg-secondary focus:ring-secondary "
              />
              <p className={`${styles.paragraph2} max-w-[470px] `}>
                By clicking you agree to the {""}
                <Link to="/construction">
                  <span className="text-secondary">Terms and Services</span>.
                </Link>
              </p>
            </div>
          </div>
          {/* submit button */}
          <div>
            <Button type="submit" styles={`mt-10`} children={"Send message"} />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="pl-10">
            <ul className={`${styles.paragraph} max-w-[470px]`}>
              <li>
                <span className="text-secondary">Phone</span> +78 789456123
              </li>
              <li>
                <span className="text-secondary">Email</span>{" "}
                example@example.com
              </li>
              <li>
                <span className="text-secondary">Location</span> Manchester,
                United Kingdom
              </li>
            </ul>
            <div className="mt-10">
              <img src={location} alt="location" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm_test;
