/**
 * Class for form fields validator functions.
 */
class FormValidatorHelpers {
  /**
   * Checks if the name is correct.
   * @param   {String}  str  String to test
   * @return  {Boolean}      'true' if the name is correct 'false' if not
   */
  static isNameValid(str) {
    let regex =
      /^[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]{2,}\s[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]{2,}$/;
    return regex.test(str);
  }

  /**
   * Checks if the email is correct.
   * @param   {String}  str  String to test
   * @return  {Boolean}      'true' if the email is correct 'false' if not
   */
  static isEmailValid(str) {
    let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return regex.test(str);
  }

  /**
   * Checks if a string contains one upper case letter.
   * @param   {String}  str  String to test
   * @return  {Boolean}      'true' if the string contains one upper case letter 'false' if not
   */
  static containsOneUpperCaseLetter(str) {
    let regex = /[A-Z]+/;
    return regex.test(str);
  }

  /**
   * Checks if a string contains one lower case letter.
   * @param   {String}  str  String to test
   * @return  {Boolean}      'true' if the string contains one lower case letter 'false' if not
   */
  static containsOneLowerCaseLetter(str) {
    let regex = /[a-z]+/;
    return regex.test(str);
  }

  /**
   * Checks if a string contains one number.
   * @param   {String}  str  String to test
   * @return  {Boolean}      'true' if the string contains one number 'false' if not
   */
  static containsOneNumber(str) {
    let regex = /[0-9]+/;
    return regex.test(str);
  }

  /**
   * Checks if a string contains one special character.
   * @param   {String}  str  String to test
   * @return  {Boolean}      'true' if the string contains one special character 'false' if not
   */
  static containsOneSpecialCharacter(str) {
    let regex =
      /[\/\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/;
    return regex.test(str);
  }

  /**
   * Checks if a string has a minimum length of 8
   * @param   {String}  str     String to test
   * @return  {Boolean}         'true' if the email contains one number 'false' if not
   */
  static minimumLength(str) {
    let regex = /^.{8,}$/;
    return regex.test(str);
  }

  /**
   * Checks if the password is correct.
   * @param   {String}  str  String to test
   * @return  {Boolean}      'true' if the password is correct 'false' if not
   */
  static isPasswordValid(str) {
    // let regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g;
    // return regex.test(str);
    return (
      FormValidatorHelpers.containsOneUpperCaseLetter(str) &&
      FormValidatorHelpers.containsOneLowerCaseLetter(str) &&
      FormValidatorHelpers.containsOneNumber(str) &&
      FormValidatorHelpers.containsOneSpecialCharacter(str) &&
      FormValidatorHelpers.minimumLength(str)
    );
  }
}

export default FormValidatorHelpers;
