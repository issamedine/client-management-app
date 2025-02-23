import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import Form  from '../../../common/components/Form/Form';
import { Input } from '../../../common/components/Input/Input';
import Button from '../../../common/components/Button/Button';

/**
 * Login page component handling user authentication.
 * 
 * @component
 * @example
 * return (
 *   <Login />
 * )
 * 
 * @description
 * This component provides:
 * - Login form with email and password fields
 * - Authentication error handling
 * - Redirection to home page on successful login
 * 
 * @returns {JSX.Element} Login form interface
 * 
 * @see {@link Form} For form structure and error display
 * @see {@link Input} For form input fields
 * @see {@link authService} For authentication implementation
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles form submission for user login
   * @async
   * @function
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Form title="Login" onSubmit={handleSubmit} error={error}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Sign In</Button>
    </Form>
  );
};

export default Login;