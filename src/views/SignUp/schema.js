export const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 8
    }
  }
}