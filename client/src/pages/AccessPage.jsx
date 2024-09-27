import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function AccessPage() {
  const mainFontColor= "text-black";
  const fontColor = "text-gray-600";
  const bgColor = "bg-white";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Separate useState hooks for each validation error
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newNameError, setNewNameError] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const navigate = useNavigate();
  const [pageToggle, setPageToggle] = useState(false);
  const [change, setChange] = useState(true);
  const [divHeight, setDivHeight] = useState("h-[150px]");
  const [divBorder, setDivBorder] = useState("rounded-t-lg rounded-b-[40%]");

  useEffect(() => {
    setDivHeight("h-[540px]");
    setDivBorder("rounded-lg");
    setTimeout(() => {
      setDivHeight("h-[150px]");
      setDivBorder("rounded-t-lg rounded-b-[40%]");
      setPageToggle(!pageToggle);
    }, 1000);
  }, [change]);

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const validateNewName = (name) => {
    if (name.length === 0) {
      return "Please enter your username.";
    } else if (name.length < 3) {
      return "There should be at least 3 characters.";
    } else if (name.length > 20) {
      return "There should be at most 20 characters.";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      return "Please use only alphabetical characters.";
    }
    return ""; // Valid name
  };

  const validateNewEmail = (email) => {
    if (email.length === 0) {
      return "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is not valid.";
    }
  };

  const validateNewPassword = (password) => {
    if (password.length === 0) {
      return "Please enter your password.";
    } else if (password.length < 6) {
      return "There should be at least 6 characters.";
    } else if (password.length > 20) {
      return "There should be at most 20 characters.";
    } else if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>?,.\/]+$/.test(password)) {
      return "Unallowed characters in use.";
    }

    return ""; // Valid name
  };

  const validateRegisterInputs = () => {
    let isValid = true;

    // Reset all error messages before validating
    setNewNameError("");
    setNewEmailError("");
    setNewPasswordError("");

    const newNameError = validateNewName(newName);
    if (newNameError) {
      setNewNameError(newNameError);
      isValid = false;
    }

    const newEmailError = validateNewEmail(newEmail);
    if (newEmailError) {
      setNewEmailError(newEmailError);
      // isValid = false;
    }

    const newPasswordError = validateNewPassword(newPassword);
    if (newPasswordError) {
      setNewPasswordError(newPasswordError);
      isValid = false;
    }

    return isValid;
  };

  const validateEmail = (email) => {
    if (email.length === 0) {
      return "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is not valid.";
    }
  };

  const validatePassword = (password) => {
    if (password.length === 0) {
      return "Please enter your password.";
    } else if (password.length < 6) {
      return "There should be at least 6 characters.";
    } else if (password.length > 20) {
      return "There should be at most 20 characters.";
    } else if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>?,.\/]+$/.test(password)) {
      return "Unallowed characters in use.";
    }

    return ""; // Valid name
  };

  const validateLoginInputs = () => {
    let isValid = true;

    // Reset all error messages before validating
    setEmailError("");
    setPasswordError("");

    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      isValid = false;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      isValid = false;
    }

    return isValid;
  };

  async function registerUser(event) {
    event.preventDefault();
    let isValid = validateRegisterInputs();
    if (!isValid) return; // Stop form submission if validation fails

    try {
      const response = await fetch("http://localhost:1337/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newEmail,
          newPassword,
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        console.log("register ok");

        navigate("/pages/verification");
      } else {
        console.log("register error");
        setNewEmailError("This email is already in use.");
        isValid = false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setNewNameError("Something went wrong. Please try again later.");
      setNewEmailError("Something went wrong. Please try again later.");
      setNewPasswordError("Something went wrong. Please try again later.");
    }
  }

  async function loginUser(event) {
    event.preventDefault();
    let isValid = validateLoginInputs();
    if (!isValid) return; // Stop form submission if validation fails

    try {
      const response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        console.log("login ok");
        navigate("/pages/home");
      } else if (data.status === "email_not_exists") {
        console.log("email_not_exists");
        setEmailError("This email is not registerd.");
      } else {
        console.log("login error");
        setPasswordError("Invalid password. Please check and try again.");
        isValid = false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setEmailError("Something went wrong. Please try again later.");
      setPasswordError("Something went wrong. Please try again later.");
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="rounded-lg shadow-[0px_19px_38px_rgba(0,0,0,0.3),0px_15px_12px_rgba(0,0,0,0.22)]">
          <div
            className={`absolute justify-start transition-all duration-500 w-[400px] bg-blue-400 z-10 ${divHeight} ${divBorder}`}
          >
            {pageToggle ? (
              <p
                className={`text-center text-[25px] font-bold pt-3  ${mainFontColor}`}
              >
                Register
              </p>
            ) : (
              <p
                className={`text-center text-[25px] font-bold pt-3  ${mainFontColor}`}
              >
                Login
              </p>
            )}
            {pageToggle ? (
              <p
                className={`text-center text-[18px] font-bold pt-3 pl-8 pr-8  ${mainFontColor} `}
              >
                Let's create your account. Please enter your information.
              </p>
            ) : (
              <p
                className={`text-center text-[18px] font-bold pt-3 pl-8 pr-8  ${mainFontColor}`}
              >
                Welcome Back! Please enter your email and password.
              </p>
            )}
          </div>

          {pageToggle ? (
            <div>
              <form
                onSubmit={registerUser}
                className={`flex flex-col h-[540px] w-[400px] justify-end p-5 space-y-0 rounded-lg shadow-xl ${bgColor}`}
              >
                <div className={`${newNameError ? "pb-0" : "pb-6"}`}>
                  <label
                    htmlFor="name"
                    className={` text-[15px] font-semibold ${fontColor}`}
                  >
                    Name:
                  </label>
                  <input
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                      setNewNameError(""); // Reset error on typing
                    }}
                    id="name"
                    type="text"
                    placeholder="Name"
                    className={`${newNameError ? "border-red-500" : "border-gray-300"} w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:border-blue-300`}
                  />
                  {newNameError && (
                    <p className="text-sm text-red-500 py-1 font-semibold">
                      {newNameError}
                    </p>
                  )}
                </div>

                <div className={`${newEmailError ? "pb-0" : "pb-6"}`}>
                  <label
                    htmlFor="email"
                    className={` text-[15px] font-semibold ${fontColor}`}
                  >
                    Email:
                  </label>
                  <input
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      setNewEmailError(""); // Reset error on typing
                    }}
                    id="email"
                    type="email"
                    placeholder="Email"
                    className={`${newEmailError ? "border-red-500" : "border-gray-300"} w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:border-blue-300`}
                  />
                  {newEmailError && (
                    <p className="text-sm text-red-500 py-1 font-semibold">
                      {newEmailError}
                    </p>
                  )}
                </div>

                <div className={`${newPasswordError ? "pb-0" : "pb-6"}`}>
                  <label
                    htmlFor="password"
                    className={`text-[15px] font-semibold ${fontColor}`}
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setNewPasswordError("");
                      }}
                      id="password"
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="Password"
                      className={`${newPasswordError ? "border-red-500" : "border-gray-300"} w-full p-2 border-2 rounded focus:outline-none focus:ring-1 focus:border-blue-300`}
                    />
                    <button
                      type="button"
                      onClick={toggleRegisterPasswordVisibility}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600  bg-white p-2 text-[20px] "
                    >
                      {showRegisterPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </button>
                  </div>
                  {newPasswordError && (
                    <p className="text-sm text-red-500 pt-1 pb-2 font-semibold">
                      {newPasswordError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={` py-2 text-[18px]  font-semibold  ${mainFontColor} transition duration-300 bg-blue-400 rounded hover:bg-blue-600 hover:text-gray-100`}
                >
                  Register
                </button>

                <div className="text-center pt-4">
                  <label className={` text-[16px] font-semibold ${fontColor}`}>
                    Already have an account :
                  </label>
                  <a
                    onClick={() => setChange(!change)}
                    className={`ml-2 text-[16px]  font-semibold ${fontColor} duration-100 hover:text-blue-600`}
                  >
                    Log In
                  </a>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <form
                onSubmit={loginUser}
                className={`flex flex-col h-[540px] w-[400px] justify-end p-5 rounded-lg shadow-xl bg-black/80 ${bgColor}`}
              >
                <div className={`${emailError ? "pb-0" : "pb-8"}`}>
                  <label
                    htmlFor="email"
                    className={` text-[15px] font-semibold ${fontColor}`}
                  >
                    Email:
                  </label>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(""); // Reset error on typing
                    }}
                    id="email"
                    type="email"
                    placeholder="Email"
                    className={`${emailError ? "border-red-500" : "border-gray-300"} w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:border-blue-300`}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500 py-1 font-semibold">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className={`${passwordError ? "pb-0" : "pb-8"}`}>
                  <label
                    htmlFor="password"
                    className={`text-[15px] font-semibold ${fontColor}`}
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                      id="password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Password"
                      className={`${passwordError ? "border-red-500" : "border-gray-300"} w-full p-2 border-2 rounded focus:outline-none focus:ring-1 focus:border-blue-300`}
                    />
                    <button
                      type="button"
                      onClick={toggleLoginPasswordVisibility}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600  bg-white p-2 text-[20px] "
                    >
                      {showLoginPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-sm text-red-500 pt-1 pb-2 font-semibold">
                      {passwordError}
                    </p>
                  )}
                </div>

                <div className="text-right pb-6">
                  <a
                    onClick={() => setChange(!change)}
                    className={`ml-2 text-[16px] font-semibold ${fontColor} duration-100 hover:text-blue-600`}
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className={`py-2 font-semibold text-[18px]   ${mainFontColor} transition duration-300 bg-blue-400 rounded hover:bg-blue-600 hover:text-gray-100`}
                >
                  Login
                </button>

                <div className="text-center pt-6">
                  <label className={` text-[16px] font-semibold ${fontColor}`}>
                    Don't have an account :
                  </label>
                  <a
                    onClick={() => setChange(!change)}
                    className={`ml-2 text-[16px] font-semibold ${fontColor} duration-100 hover:text-blue-600`}
                  >
                    Register
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AccessPage;
