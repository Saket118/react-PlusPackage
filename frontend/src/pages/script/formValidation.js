export const validateContactForm = (values) => {
    const email_pattern = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    let tempErrors = {};
    let isValid = true;

  
    if (!values.applicant_name) {
      tempErrors.applicant_name = 'Name is required';
      isValid = false;
    }
    if (!values.applicant_email) {
      tempErrors.applicant_email = 'Email is required';
      isValid = false;
    }
    else if(!email_pattern.test(values.applicant_email)){
        tempErrors.applicant_email = "Email did'not matched ";
    }
    if (!values.applicant_subject) {
      tempErrors.applicant_subject = 'Subject is required';
      isValid = false;
    }
    if (!values.applicant_address) {
      tempErrors.applicant_address = 'Address is required';
      isValid = false;
    }
  
    return { tempErrors, isValid };
  };

  export const validateRegisterForm = (values) => {
    const email_pattern = /^((?!\.)[\w\-_.]*[^.])@([\w-]+\.)+[\w-]{2,}$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phone_pattern = /^[0-9]{7,15}$/;
    const zip_pattern = /^[0-9a-zA-Z\s-]{3,10}$/;
  
    let tempErrors = {};
    let isValid = true;
  
    const required = (field, name) => {
      if (!values[field] || values[field].trim() === '') {
        tempErrors[field] = `${name} is required`;
        isValid = false;
      }
    };
  
    // Required fields check
    required('reg_email', 'Email');
    required('reg_pass', 'Password');
    required('reg_cpass', 'Confirm Password');
    required('reg_type', 'Type');
    required('reg_title', 'Title');
    required('reg_name', 'Name');
    required('reg_qual', 'Qualification');
    required('reg_addr', 'Address');
    required('reg_city', 'City');
    required('reg_state', 'State');
    required('reg_zip', 'Zip Code');
    required('reg_country', 'Country');
    required('reg_phone', 'Phone');
  
    // Email format
    if (values.reg_email && !email_pattern.test(values.reg_email)) {
      tempErrors.reg_email = 'Invalid email format';
      isValid = false;
    }
  
    // Password strength format
    if (values.reg_pass && !password_pattern.test(values.reg_pass)) {
      tempErrors.reg_pass = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
      isValid = false;
    }
  
    // Password match
    if (
      values.reg_pass &&
      values.reg_cpass &&
      values.reg_pass !== values.reg_cpass
    ) {
      tempErrors.reg_cpass = 'Passwords do not match';
      isValid = false;
    }
  
    // Phone format
    if (values.reg_phone && !phone_pattern.test(values.reg_phone)) {
      tempErrors.reg_phone = 'Invalid phone number';
      isValid = false;
    }
  
    // ZIP code format
    if (values.reg_zip && !zip_pattern.test(values.reg_zip)) {
      tempErrors.reg_zip = 'Invalid zip code';
      isValid = false;
    }
  
    return { tempErrors, isValid };
  };
  