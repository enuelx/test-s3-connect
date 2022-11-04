const success = Object.freeze({
  EMAIL_UPDATED:
    'Email updated. Please, check your email to verify your account',
  EMAIL_VERIFICATION_SENT: "Verification email sent! Don't let it go cold…",
  EMAIL_VERIFIED: 'Email verified',
  EMAIL_FORGOT_PASSWORD_SENT: 'Email sent! Check your inbox (or spam folder)',
  GENERIC_ACTION: (action) => `Successfully ${action}!`,
  LOGGED: "Welcome, Cypher. We've been expecting you",
  LOGOUT: 'Cypher Out!',
  PASSWORD_CHANGED: 'Alright, you have a new password now!',
  VALIDATION_WAIT: 'Gives us some secs to validate it and reload the data',
  VALIDATION_STARTED: 'Alright, validation started!',
  VALIDATION_CANCELED:
    'Validation canceled! You can start a new one if you want',
  VALIDATION_FINISHED: 'Validation finished! Go check your wallets',
  WALLET_ASSOCIATED: "Wallet associated! How 'bout a crisp high-five!",
  WALLET_REMOVED: 'Wallet removed successfully! Cheers.',
  WALLET_MAIN_SET: "Ok, that's your main wallet now!",
  TWITTER_LINK_SUCCESS: 'Twitter account linked successfully!'
});

const error = Object.freeze({
  CAPTCHA: 'Are you a robot? If not, please confirm your humanity',
  PASSWORD_MATCH: 'Passwords do not match. No more drinking, ser',
  UNAUTHORIZED: 'You are not authorized to do that. Go away.',
  VALIDATION_STATUS: 'We could not get the validation status. Try again?',
  VALIDATION_START: 'We could not start the validation. Try again?',
  WALLET_MAIN_SET:
    "There's been an error setting your main wallet. Hakuna your tatas and try again. Will ya?",
  WALLET_ASSOCIATION:
    "Caramba! Looks like there's been an error associating your wallet. Try again?",
  WALLET_REMOVING:
    "Damn. There's been an error removing your wallet. Try again?",
  WALLET_NOT_ASSOCIATED:
    'Oops! Looks like this wallet is not associated to this account',
  WRONG_PASSWORD: "That's not your password",
  TWITTER_LINK_INVALID:
    'Something is not quite right with twitter, try again later.'
});

export default {
  success,
  error
};
