// useFormData.js
import { useState } from 'react';

const useFormData = (initialValues) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (callback) => (event) => {
        if (event) event.preventDefault();
        callback(formData);
    };

    return { formData, handleChange, handleSubmit };
};

export default useFormData;
