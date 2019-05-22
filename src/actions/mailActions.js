import axios from 'axios';

export function subscribeEmail({ email }) {
  const data = {
    email,
    status: 'subscribed'
  };

  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/mailchimp/v1/subscribe`, data);
}

export function sendContactForm(data) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/mail/v1/contact`, data);
}
