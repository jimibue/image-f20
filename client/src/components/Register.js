import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormInput } from "../customHooks/useFormInput";
import { AuthContext } from "../providers/AuthProvider";

const Register = (props) => {
  const email = useFormInput("testx@test.com", "Email");
  const password = useFormInput("123456", "Password");
  const passwordConfrimation = useFormInput("123456", "password Confrimation");
  const firstName = useFormInput("Bob", "First Name");
  const lastName = useFormInput("Dole", "Last Name");
  const stars = useFormInput(5, "stars");

  const { handleRegister, authLoading, authErrors } = useContext(AuthContext);
  const history = useHistory();

  // history.push('/pathname') => will take us to route

  const handleSubmit = (e) => {
    //need to do this
    e.preventDefault();

    // maybe check valid email, etc
    if (password.value !== passwordConfrimation.value) {
      alert("passwords don not match");
    } else {
      // regisiter user
      handleRegister(
        {
          email: email.value,
          password: password.value,
          first_name: firstName.value,
          last_name: lastName.value,
          stars: stars.value,
        },
        history
      );
    }
  };
  // if (authLoading) {
  //   return (
  //     <>
  //       <p>loading</p>
  //     </>
  //   );
  // }

  return (
    <div>
      {authErrors && (
        <>
          {authErrors.map((err) => (
            <p>{err}</p>
          ))}
        </>
      )}

      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <p>{email.label}</p>
        <input autoFocus {...email} />
        <p>{firstName.label}</p>
        <input autoFocus {...firstName} />
        <p>{lastName.label}</p>
        <input autoFocus {...lastName} />
        <p>{stars.label}</p>
        <input autoFocus {...stars} type="number" />

        <p>{password.label}</p>
        <input type="password" {...password} />
        <p>{passwordConfrimation.label}</p>
        <input type="password" {...passwordConfrimation} />
        {authLoading ? (
          <button disabled> spinner goes here</button>
        ) : (
          <button type="submit">register</button>
        )}
      </form>
    </div>
  );
};

export default Register;
