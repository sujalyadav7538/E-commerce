class CheckParams {
    checkUsername(val) {
      const usernameregex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/;
      if (!usernameregex.test(val)) {
        return { status: true, mssg: "MUST CONTAIN ALL PARAMETERS!!" };
      }
      return { status: true, mssg: "Valid" };
    }
  
    checkEmail(email) {
      const shouldHave = "@gmail.com";
      if (email.includes(shouldHave)) {
        return { status: true, mssg: "Valid" };
      }
      return { status: false, mssg: "NOT A VALID EMAIL!!" };
    }
    checkPassword(pass) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(pass)) {
        return {
          status: false,
          mssg: "Password Must Contain (1 capital letter,1 small letter, 1 special character,length of 8 min)!",
        };
      }
      return { status: true, mssg: "Valid" };
    }
  }

export default CheckParams; 