export const authenticateUser = async (phone: string, otp: string) => {
    if (otp === '1234') {
      return { id: '1', phone };
    } else {
      throw new Error('Invalid OTP');
    }
  };
  