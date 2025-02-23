import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import Form  from '../../../common/components/Form/Form';
import { Input } from '../../../common/components/Input/Input';
import { Select } from '../../../common/components/Select/Select';

/**
 * User registration page component with role selection.
 * 
 * @component
 * @example
 * return (
 *   <Signup />
 * )
 * 
 * @description
 * This component provides:
 * - User registration form with role selection
 * - Account creation functionality
 * - Success feedback and redirection
 * 
 * @returns {JSX.Element} Registration form interface
 * 
 * @see {@link Form} For form structure and error display
 * @see {@link Select} For role selection dropdown
 * @see {@link authService} For registration implementation
 */
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles form submission for user registration
   * @async
   * @function
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register(email, password, role);
      alert('Account created successfully! Please verify your email.');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Form title="Create Account" onSubmit={handleSubmit} error={error}>
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
      <Select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        options={[['USER', 'User'], ['ADMIN', 'Administrator']]}
      />
      <button type="submit">Create Account</button>
    </Form>
  );
};

export default Signup;