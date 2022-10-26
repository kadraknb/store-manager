const name = (nameValidation) => {
  if (!nameValidation) return { status: 400, message: '"name" is required' };
  
  if (nameValidation.length < 5) {
 return { status: 422, message: '"name" length must be at least 5 characters long' }; 
  }
  return false;
};

module.exports = { name };